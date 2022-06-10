import { MouseEvent } from 'react';
import styles from './Pagination.module.css';

interface IPaginationProps {
  current: number;
  total: number;
  onPrevClick: (event: MouseEvent<HTMLButtonElement>) => void;
  onNextClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function Pagination({ current, total, onPrevClick, onNextClick }: IPaginationProps) {
  const prevClassName = styles.prevPage + (current === 1 ? ` ${styles.hidden}` : '');
  const nextClassName = styles.nextPage + (current === total ? ` ${styles.hidden}` : '');

  return (
    <nav className={styles.pagination}>
      <button className={prevClassName} onClick={onPrevClick}>{'\u2190 Назад'}</button>
      <span>{`${current} из ${total}`}</span>
      <button className={nextClassName} onClick={onNextClick}>{'Вперёд \u2192'}</button>
    </nav>
  );
}
