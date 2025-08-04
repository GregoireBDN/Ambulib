import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

/**
 * Route API pour récupérer la session utilisateur actuelle
 * Utilisée par le hook useSession côté client
 */
export async function GET() {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: "Aucune session active" },
        { status: 401 }
      );
    }

    return NextResponse.json(session);
  } catch (error) {
    console.error("Erreur lors de la récupération de la session:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la récupération de la session" },
      { status: 500 }
    );
  }
}