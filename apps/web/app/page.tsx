import type { NextPage } from "next";
import Image from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

const Home: NextPage = async () => {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.logo}>
          <Image
            src="/turborepo-dark.svg"
            alt="Turborepo logo"
            width={180}
            height={38}
            priority
            className="imgLight"
          />
          <Image
            src="/turborepo-light.svg"
            alt="Turborepo logo"
            width={180}
            height={38}
            priority
            className="imgDark"
          />
        </div>
        <ol>
          <li>
            Get started by editing <code>apps/web/app/page.tsx</code>
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
              className={styles.logo}
            />
            Deploy now
          </a>
          <a
            href="https://turbo.build/docs"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
        <Button appName="web" className={styles.secondary}>
          Open alert
        </Button>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com/templates"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a href="https://turbo.build" target="_blank" rel="noopener noreferrer">
          <Image src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to turbo.build →
        </a>
      </footer>
    </div>
  );
};

export default Home;
