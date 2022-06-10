import styles from './CreateButton.module.css';
import { MouseEvent, useState } from 'react';
import { TaskModal } from '../../../TaskModal';
import { createTask } from '../../../../API/createTask';

export function CreateButton() {
  const [isCreateModalOpened, setIsCreateModalOpened] = useState(false);

  const openHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setIsCreateModalOpened(true);
  }

  const closeHandleClick = () => {
    setIsCreateModalOpened(false);
  }

  return (
    <>
      <button className={styles.btn} onClick={openHandleClick}>Создать задачу</button>
      {isCreateModalOpened && <TaskModal isEdit={false} onCreateTask={createTask} onClose={closeHandleClick} />}
    </>
  );
}
