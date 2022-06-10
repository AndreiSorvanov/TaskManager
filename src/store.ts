import { Reducer } from '@reduxjs/toolkit';
import { ActionCreator, AnyAction } from 'redux';
import { ITaskProps } from './components/TasksList/Task';

const UPDATE_TOKEN = 'UPDATE_TOKEN';
const UPDATE_CURRENT_PAGE = 'UPDATE_CURRENT_PAGE';
const UPDATE_IS_LOADING = 'UPDATE_IS_LOADING';
const UPDATE_PAGE_TASKS = 'UPDATE_PAGE_TASKS';
const UPDATE_PAGE_TASKS_ERROR = 'UPDATE_PAGE_TASKS_ERROR';
const UPDATE_TOTAL_TASKS_COUNT = 'UPDATE_TOTAL_TASKS_COUNT';
const UPDATE_SORT_FIELD = 'UPDATE_SORT_FIELD';
const UPDATE_SORT_ASC = 'UPDATE_SORT_ASC';

export interface IState {
  username: string;
  token: string;
  isLoading: boolean;
  currentPage: number;
  totalTasksCount: number;
  totalPagesCount: number;
  pageTasks: Array<ITaskProps>;
  pageTasksError: string;
  sortField: string;
  sortAsc: boolean;
}

const username = localStorage.getItem('username');
const token = localStorage.getItem('token');

const initialState: IState = {
  username: username ? username : '',
  token: token ? token : '',
  isLoading: false,
  currentPage: 1,
  totalTasksCount: 0,
  totalPagesCount: 0,
  pageTasks: [],
  pageTasksError: '',
  sortField: 'id',
  sortAsc: false,
}

function getTotalPagesCount(totalTasksCount: number, tasksCountOnPage: number = 3): number {
  return Math.ceil(totalTasksCount / tasksCountOnPage);
}

export const updateTokenAction: ActionCreator<AnyAction> = (username: string, token: string) => {
  return { type: UPDATE_TOKEN, username, token };
}

export const updateCurrentPageAction: ActionCreator<AnyAction> = (pageNumber: number) => {
  return { type: UPDATE_CURRENT_PAGE, pageNumber };
}

export const updateIsLoadingAction: ActionCreator<AnyAction> = (isLoading: boolean) => {
  return { type: UPDATE_IS_LOADING, isLoading };
}

export const updatePageTasksAction: ActionCreator<AnyAction> = (pageTasks: Array<ITaskProps>) => {
  return { type: UPDATE_PAGE_TASKS, pageTasks };
}

export const updatePageTasksErrorAction: ActionCreator<AnyAction> = (error: string) => {
  return { type: UPDATE_PAGE_TASKS_ERROR, error };
}

export const updateTotalTasksCountAction: ActionCreator<AnyAction> = (totalTasksCount: number) => {
  return { type: UPDATE_TOTAL_TASKS_COUNT, totalTasksCount };
}

export const updateSortFieldAction: ActionCreator<AnyAction> = (sortField: boolean) => {
  return { type: UPDATE_SORT_FIELD, sortField };
}

export const updateSortAscAction: ActionCreator<AnyAction> = (sortAsc: boolean) => {
  return { type: UPDATE_SORT_ASC, sortAsc };
}

export const rootReducer: Reducer<IState> = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TOKEN:
      return {
        ...state,
        username: action.username,
        token: action.token,
      }
    case UPDATE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.pageNumber,
      }
    case UPDATE_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PAGE_TASKS:
      return {
        ...state,
        pageTasks: action.pageTasks,
        pageTasksError: '',
      }
    case UPDATE_PAGE_TASKS_ERROR:
      return {
        ...state,
        pageTasks: [],
        pageTasksError: action.error,
        totalTasksCount: 0,
        totalPagesCount: 0,
      }
    case UPDATE_TOTAL_TASKS_COUNT:
      return {
        ...state,
        totalTasksCount: action.totalTasksCount,
        totalPagesCount: getTotalPagesCount(action.totalTasksCount),
      }
    case UPDATE_SORT_FIELD:
      return {
        ...state,
        sortField: action.sortField,
      }
    case UPDATE_SORT_ASC:
      return {
        ...state,
        sortAsc: action.sortAsc,
      }
    default:
      return state;
  }
}
