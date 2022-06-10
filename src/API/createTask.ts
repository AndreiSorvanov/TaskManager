import axios from "axios";
import { CREATE_TASK_PATH } from "../config";

interface ICreateTaskResponseOk {
  status: 'OK';
}

interface ICreateTaskResponseInvalid {
  status: 'INVALID';
  validData: { [k: string]: string };
}

interface ICreateTaskResponseError {
  status: 'ERROR';
  errorData: string;
}

export type ICreateTaskResponse = ICreateTaskResponseOk | ICreateTaskResponseInvalid | ICreateTaskResponseError;

export async function createTask(username: string, email: string, text: string): Promise<ICreateTaskResponse> {
  try {
    const params = new URLSearchParams({
      username,
      email,
      text,
    });
    const response = await axios.post(CREATE_TASK_PATH, params);

    if (response.data.status === 'ok') {
      return { status: 'OK' };
    }
    else {
      return {
        status: 'INVALID',
        validData: { ...response.data.message },
      };
    }

  } catch (error) {
    return {
      status: 'ERROR',
      errorData: 'Ошибка сервера, попробуйте создать задачу позже'
    };
  }
}
