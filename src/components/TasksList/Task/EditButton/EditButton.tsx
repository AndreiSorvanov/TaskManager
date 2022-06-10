import { MouseEvent, useState } from 'react';
import { editTask } from '../../../../API/editTask';
import { doneStatuses } from '../../../../API/useUpdateTasks';
import { TaskModal } from '../../../TaskModal';
import styles from './EditButton.module.css';

export interface IEditButtonProps {
  id: string;
  username: string;
  email: string;
  text: string;
  status: string;
}

export function EditButton({ id, username, email, text, status }: IEditButtonProps) {
  const [isEditModalOpened, setIsEditModalOpened] = useState(false);

  const openHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setIsEditModalOpened(true);
  }

  const closeHandleClick = () => {
    setIsEditModalOpened(false);
  }

  const initIsDone = doneStatuses.includes(status);

  return (
    <>
      <button className={styles.btn} onClick={openHandleClick}>
        <span className={styles.icon} aria-hidden='true'>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.7">
              <path d="M2 11.5V14H4.5L11.8733 6.62662L9.37333 4.12662L2 11.5ZM13.8067 4.69329C14.0667 4.43329 14.0667 4.01329 13.8067 3.75329L12.2467 2.19329C11.9867 1.93329 11.5667 1.93329 11.3067 2.19329L10.0867 3.41329L12.5867 5.91329L13.8067 4.69329Z" fill="#808080"/>
            </g>
          </svg>
        </span>
        Редактировать
      </button>
      {isEditModalOpened && <TaskModal isEdit={true} id={id} initUsername={username} initEmail={email} initText={text} initIsDone={initIsDone} onEditTask={editTask} onClose={closeHandleClick} />}
    </>
  );
}
