const USER = 'AndreiSorvanov';

const BASE_URL = 'https://uxcandy.com/~shapoval/test-task-backend/v2';
export const TASKS_LIST_PATH = `${BASE_URL}/?developer=${USER}`;
export const CREATE_TASK_PATH = `${BASE_URL}/create?developer=${USER}`;
export const AUTH_PATH = `${BASE_URL}/login?developer=${USER}`;
export const GET_EDIT_TASK_PATH = (id: string) => `${BASE_URL}/edit/${id}?developer=${USER}`;

