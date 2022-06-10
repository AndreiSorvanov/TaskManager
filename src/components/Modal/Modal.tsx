import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

interface IModal {
  children: React.ReactNode;
}

export function Modal({ children }: IModal) {
 useEffect(() => {
    const root = document.querySelector('#root');
    root?.classList.add(styles.inactive);

    return () => root?.classList.remove(styles.inactive);
  }, []);

  const node = document.querySelector('#modal');
  if (!node) return null;

  return ReactDOM.createPortal((
    <div className={styles.modal}>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  ), node);
}
