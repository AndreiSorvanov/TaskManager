import styles from './Title.module.css';

interface ITitleProps {
  title: string;
}

export function Title({ title }: ITitleProps) {
  return (
    <h1 className={styles.title}>{title}</h1>
  );
}
