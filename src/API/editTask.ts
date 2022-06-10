import axios from "axios";
import { GET_EDIT_TASK_PATH } from "../config";

interface IEditTaskResponseOk {
  status: 'OK';
}

interface IEditTaskResponseInvalid {
  status: 'INVALID';
  validData: { [k: string]: string };
}

interface IEditTaskResponseError {
  status: 'ERROR';
  errorData: string;
}

export type IEditTaskResponse = IEditTaskResponseOk | IEditTaskResponseInvalid | IEditTaskResponseError;

export async function editTask(id: string, token: string, text: string, status: string): Promise<IEditTaskResponse> {
  try {
    const params = new URLSearchParams({
      token,
      text,
      status,
    });
    const response = await axios.post(GET_EDIT_TASK_PATH(id), params);

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
      errorData: 'Ошибка сервера, попробуйте отредактировать задачу позже'
    };
  }
}
