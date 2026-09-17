import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import styles from './Layout.module.css';

const navLinks = [
  { href: '/quizzes', label: 'Quizzes' },
  { href: '/create', label: 'Create quiz' },
];

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { pathname } = useRouter();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/quizzes" className={styles.logo}>
            Quiz Builder
          </Link>

          <nav className={styles.nav}>
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={isActive ? `${styles.link} ${styles.active}` : styles.link}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className={styles.main}>{children}</main>
    </>
  );
}
