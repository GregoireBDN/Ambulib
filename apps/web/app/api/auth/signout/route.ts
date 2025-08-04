import { authFetch } from "@/lib/authFetch";
import { BACKEND_URL } from "@/lib/constants";
import { deleteSession } from "@/lib/session";
import { NextResponse } from "next/server";

// Route GET pour les redirections directes
export async function GET() {
  try {
    await authFetch(`${BACKEND_URL}/auth/signout`, {
      method: "POST",
    });
    await deleteSession();
    return NextResponse.redirect(new URL("/", process.env.FRONTEND_URL || "http://localhost:3000"));
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    return NextResponse.redirect(new URL("/auth/signin?error=signout_failed", process.env.FRONTEND_URL || "http://localhost:3000"));
  }
}

// Route POST pour les appels fetch depuis le client
export async function POST() {
  try {
    // Essaie de notifier le backend, mais continue même en cas d'échec
    try {
      if (BACKEND_URL) {
        await authFetch(`${BACKEND_URL}/auth/signout`, {
          method: "POST",
        });
      }
    } catch (backendError) {
      console.warn("Impossible de notifier le backend de la déconnexion:", backendError);
      // Continue quand même avec la suppression de session locale
    }
    
    // Supprime toujours la session locale
    await deleteSession();
    
    return NextResponse.json(
      { message: "Déconnexion réussie" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    
    // Même en cas d'erreur, essaie de supprimer la session locale
    try {
      await deleteSession();
    } catch (sessionError) {
      console.error("Erreur suppression session:", sessionError);
    }
    
    return NextResponse.json(
      { message: "Déconnexion partielle réussie" },
      { status: 200 }
    );
  }
}
