import styles from './Header.module.css';
import { UserBlock } from './UserBlock';
import { useSelector } from 'react-redux';
import { IState } from '../../store';

export function Header() {
  const username = useSelector<IState, string>((state) => state.username);

  return (
    <header className={styles.header}>
      <UserBlock username={username} />
    </header>
  );
}
