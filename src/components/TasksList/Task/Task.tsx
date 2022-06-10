import { useSelector } from 'react-redux';
import { IState } from '../../../store';
import { EditButton } from './EditButton';
import styles from './Task.module.css';

export interface ITaskProps {
  id: string;
  username: string;
  email: string;
  text: string;
  status: string;
}

export function Task({ id, username, email, text, status }: ITaskProps) {
  const token = useSelector<IState, string>((state) => state.token);

  return (
    <li className={styles.taskContainer}>
      <article className={styles.task}>
        <div className={styles.info}>
          <div className={styles.taskInfo}>
            <span className={styles.id}>{`ID${id}`}</span>
            <span className={styles.status}>{status}</span>
          </div>
          <div className={styles.userInfo}>
            <span className={styles.username}>{username}</span>
            <span className={styles.email}>{email}</span>
          </div>
          <strong className={styles.text}>{text}</strong>
        </div>
        <div className={styles.buttons}>
          {token && <EditButton id={id} username={username} email={email} text={text} status={status} />}
        </div>
      </article>
    </li>
  );
}
