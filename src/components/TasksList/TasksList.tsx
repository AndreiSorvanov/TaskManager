import { ITaskProps, Task } from './Task';
import styles from './Taskslist.module.css';
import { useEffect } from 'react';
import { Rings } from  'react-loader-spinner'
import { useSelector } from 'react-redux';
import { IState } from '../../store';
import { PaginationContainer } from './PaginationContainer';
import { SortBlockContainer } from './SortBlockContainer';
import { useUpdateTasks } from '../../API/useUpdateTasks';

export function TasksList() {
  const currentPage = useSelector<IState, number>((state) => state.currentPage);
  const isLoading = useSelector<IState, boolean>((state) => state.isLoading);
  const pageTasks = useSelector<IState, Array<ITaskProps>>((state) => state.pageTasks);
  const pageTasksError = useSelector<IState, string>((state) => state.pageTasksError);
  const totalPagesCount = useSelector<IState, number>((state) => state.totalPagesCount);
  const sortField = useSelector<IState, string>((state) => state.sortField);
  const sortAsc = useSelector<IState, boolean>((state) => state.sortAsc);

  const updateTasks = useUpdateTasks();

  useEffect(() => {
    updateTasks();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, sortField, sortAsc]);


  return (
    <>
      {isLoading
        ? (<div className={styles.loader}>
            <Rings color="#a9a9a9" height={80} width={80} />
          </div>)
        : pageTasksError
          ? <div className={styles.error}>{pageTasksError}</div>
          : totalPagesCount !== 0
              ? (<>
                  <SortBlockContainer />
                  <ul className={styles.tasksList}>
                    {pageTasks.map((task) => <Task key={task.id} {...task} />)}
                  </ul>
                  <PaginationContainer current={currentPage} total={totalPagesCount} />
                </>)
              : <div className={styles.empty}>Нет задач</div>
      }
    </>
  );
}
