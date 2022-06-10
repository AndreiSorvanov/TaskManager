import { ChangeEvent } from 'react';
import styles from './Checkbox.module.css';

interface ICheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Checkbox({ id, label, checked, onChange }: ICheckboxProps) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <input id={id} className={styles.input} type='checkbox' checked={checked} onChange={onChange} aria-required='true' />
    </div>
  );
}
