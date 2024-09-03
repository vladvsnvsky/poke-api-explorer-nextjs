// src/components/Header.tsx
import Link from 'next/link';
import styles from '../styles/Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <h1>PokeApi Explorer Next.js 13</h1>
                <Link href="/" className={styles.homeButton}>
                    Home
                </Link>
            </nav>
        </header>
    );
}