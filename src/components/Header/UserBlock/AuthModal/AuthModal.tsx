import { ChangeEvent, useState } from 'react';
import styles from './AuthModal.module.css';
import { MouseEvent } from 'react';
import { Rings } from  'react-loader-spinner'
import { Modal } from '../../../Modal';
import { Input } from '../../../Input';
import { IAuthResponse } from '../../../../API/auth';
import { useDispatch, useSelector } from 'react-redux';
import { IState, updateTokenAction } from '../../../../store';
import { useLogout } from '../../../../utils/logout';

interface IAuthModal {
  onClose: () => void;
  onAuth: (username: string, password: string) => Promise<IAuthResponse>;
}

export function AuthModal({ onClose, onAuth }: IAuthModal) {
  const token = useSelector<IState, string>((state) => state.token);
  const logout = useLogout();

  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const [username, setUsername] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  function validateUsername() {
    if (username.length === 0) return 'Поле является обязательным';

    return '';
  }

  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  function validatePassword() {
    if (password.length === 0) return 'Поле является обязательным';

    return '';
  }

  function validate() {
    const validUsername = validateUsername();
    const validPassword = validatePassword();

    setUsernameError(validUsername);
    setPasswordError(validPassword);

    return !validUsername && !validPassword;
  }

  const usernameHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
  }

  const passwordHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  }

  const dispatch = useDispatch();

  const saveHandleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    setIsFetching(true);

    event.preventDefault();
    setIsTouched(true);

    setUsernameError('');
    setPasswordError('');
    setError('');

    if (validate()) {
      const response = await onAuth(username.trim(), password);
      switch (response.status) {
        case 'OK':
          dispatch(updateTokenAction(response.username, response.token));
          localStorage.setItem('username', response.username);
          localStorage.setItem('token', response.token);
          onClose();
          break;
        case 'INVALID':
          setUsernameError('username' in response.validData ? response.validData.username : '');
          setPasswordError('password' in response.validData ? response.validData.password : '');
          break;
        case 'ERROR':
          setError(response.errorData);
      }
    }

    setIsFetching(false);
  }

  const cancelHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClose();
  }

  const exitHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
    logout();
    onClose();
  }

  return (
    <Modal>
      {
        !token
        ? (<>
            <h2 className={styles.authModalHeading}>Авторизация</h2>

            <form className={styles.form}>
              <Input id='usernameInputId' type='text' label='Имя пользователя *' value={username} onChange={usernameHandleChange} error={usernameError} isTouched={isTouched} />
              <Input id='passwordInputId' type='password' label='Пароль *' value={password} onChange={passwordHandleChange} error={passwordError} isTouched={isTouched} />

              <div className={styles.btnGroup}>
                <button type='submit' className={styles.loginBtn} onClick={saveHandleClick} disabled={isFetching}>{isFetching ? <Rings color="#a9a9a9" height={20} width={20} /> : 'Войти'}</button>
                <button type='button' className={styles.cancelBtn} onClick={cancelHandleClick} disabled={isFetching}>Отмена</button>
              </div>

              {error && <div className={styles.error}>{error}</div>}
            </form>
          </>)
        : <div className={styles.exitContainer}>
            <h2 className={styles.authModalHeading}>Выход из системы</h2>

            <div className={styles.btnGroup}>
              <button type='submit' className={styles.exitBtn} onClick={exitHandleClick}>Выйти</button>
              <button type='button' className={styles.cancelBtn} onClick={cancelHandleClick} disabled={isFetching}>Отмена</button>
            </div>
          </div>
      }
    </Modal>
  );
}
