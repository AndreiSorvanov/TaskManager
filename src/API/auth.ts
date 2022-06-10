import axios from "axios";
import { AUTH_PATH } from "../config";

interface IAuthResponseOk {
  status: 'OK';
  username: string;
  token: string;
}

interface IAuthResponseInvalid {
  status: 'INVALID';
  validData: { [k: string]: string };
}

interface IAuthResponseError {
  status: 'ERROR';
  errorData: string;
}

export type IAuthResponse = IAuthResponseOk | IAuthResponseInvalid | IAuthResponseError;

export async function auth(username: string, password: string): Promise<IAuthResponse> {
  try {
    const params = new URLSearchParams({
      username,
      password,
    });
    const response = await axios.post(AUTH_PATH, params);

    if (response.data.status === 'ok') {
      return { status: 'OK', username, token: response.data.message.token };
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
      errorData: 'Ошибка сервера, попробуйте авторизоваться ещё раз'
    };
  }
}
