import styles from './SortBlock.module.css';
import { ChangeEvent, MouseEvent } from 'react';

interface ISortBlock {
  sortField: string;
  sortAsc: boolean;
  sortFieldHandleClick: (event: MouseEvent<HTMLButtonElement>) => void;
  sortAscHandleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export function SortBlock({ sortField, sortAsc, sortFieldHandleClick, sortAscHandleChange }: ISortBlock) {
  return (
    <div className={styles.sortBlock}>
      <fieldset className={styles.group}>
        <legend>Сортировка:</legend>
        <div>
          <select className={styles.sortSelect} value={sortField} onChange={sortAscHandleChange}>
            <option value="id">ID</option>
            <option value="username">Имя</option>
            <option value="email">E-mail</option>
            <option value="status">Статус</option>
          </select>
          <button className={styles.orderBtn} onClick={sortFieldHandleClick}>{sortAsc ? '\u25B2' : '\u25BC'}</button>
        </div>
      </fieldset>
    </div>
  );
}
