import styles from '../styles/Home.module.css';

interface LoadMoreButtonProps {
    onClick: () => void;
    loadingMore: boolean;
}

export default function LoadMoreButton({ onClick, loadingMore }: LoadMoreButtonProps) {
    return (
        <button onClick={onClick} className={styles.loadMoreButton} disabled={loadingMore}>
            {loadingMore ? 'Loading...' : 'Load More'}
        </button>
    );
}
