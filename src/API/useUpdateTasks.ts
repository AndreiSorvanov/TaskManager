import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { ITaskProps } from "../components/TasksList/Task";
import { TASKS_LIST_PATH } from "../config";
import { IState, updateIsLoadingAction, updatePageTasksAction, updatePageTasksErrorAction, updateTotalTasksCountAction } from "../store";

interface ITasksResp extends Omit<ITaskProps, 'status'> {
  status: 0 | 1 | 10 | 11;
}

const statusMap = {
  0: 'Задача не выполнена',
  1: 'Задача не выполнена, отредактирована админом',
  10: 'Задача выполнена',
  11: 'Задача отредактирована админом и выполнена',
};

export const doneStatuses = [statusMap[10], statusMap[11]];

export async function loadTasks(dispatch: Dispatch<AnyAction>, currentPage: number, sortField: string, sortAsc: boolean) {
  dispatch(updateIsLoadingAction(true));

  try {
    const { data: { message: { tasks, total_task_count } } }: { data: { message:  { tasks: Array<ITasksResp>, total_task_count: number } } } = await axios.get(TASKS_LIST_PATH, {
      params: {
        page: currentPage,
        sort_field: sortField,
        sort_direction: sortAsc ? 'asc' : 'desc',
      },
    });

    dispatch(updatePageTasksAction(tasks.map((task) => ({
      ...task,
      status: statusMap[task.status],
    }))));
    dispatch(updateTotalTasksCountAction(total_task_count));
  } catch (error) {
    console.error(error);
    dispatch(updatePageTasksErrorAction('Не удалось загрузить список'));
  }

  dispatch(updateIsLoadingAction(false));
}

export function useUpdateTasks() {
  const dispatch = useDispatch();
  const currentPage = useSelector<IState, number>((state) => state.currentPage);
  const sortField = useSelector<IState, string>((state) => state.sortField);
  const sortAsc = useSelector<IState, boolean>((state) => state.sortAsc);

  return () => {
    loadTasks(dispatch, currentPage, sortField, sortAsc);
  }
}
