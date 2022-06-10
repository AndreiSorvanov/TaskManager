import { ChangeEvent, useState } from 'react';
import styles from './TaskModal.module.css';
import { MouseEvent } from 'react';
import { Input } from '../Input';
import { Checkbox } from '../Checkbox';
import validator from 'validator'
import { useUpdateTasks } from '../../API/useUpdateTasks';
import { ICreateTaskResponse } from '../../API/createTask';
import { Rings } from  'react-loader-spinner'
import { Modal } from '../Modal';
import { useSelector } from 'react-redux';
import { IState } from '../../store';
import { IEditTaskResponse } from '../../API/editTask';
import { useLogout } from '../../utils/logout';

interface ITaskModal {
  isEdit: boolean;
  id?: string;
  initUsername?: string;
  initEmail?: string;
  initText?: string;
  initIsDone?: boolean
  onClose: () => void;
  onCreateTask?: (username: string, email: string, text: string) => Promise<IEditTaskResponse>;
  onEditTask?: (id: string, token: string, text: string, status: string) => Promise<ICreateTaskResponse>;
}

const onCreateTaskInit = (username: string, email: string, text: string) => new Promise<IEditTaskResponse>(() => {});
const onEditTaskInit = (id: string, token: string, text: string, status: string) => new Promise<ICreateTaskResponse>(() => {})

export function TaskModal({ isEdit = false, id, initUsername = '', initEmail = '', initText = '', initIsDone = false, onClose, onCreateTask = onCreateTaskInit, onEditTask = onEditTaskInit }: ITaskModal) {
  const token = useSelector<IState, string>((state) => state.token);

  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const [idError, setIdError] = useState<string>('');

  const [username, setUsername] = useState<string>(initUsername);
  const [usernameError, setUsernameError] = useState<string>('');
  function validateUsername() {
    if (username.length === 0) return 'Поле является обязательным';

    return '';
  }

  const [email, setEmail] = useState<string>(initEmail);
  const [emailError, setEmailError] = useState<string>('');
  function validateEmail() {
    if (email.length === 0) return 'Поле является обязательным';
    if (!validator.isEmail(email) || /[а-яА-ЯЁё]/.test(email)) return 'Email имеет неверный формат';

    return '';
  }

  const [text, setText] = useState<string>(initText);
  const [textError, setTextError] = useState<string>('');
  function validateText() {
    if (text.length === 0) return 'Поле является обязательным';

    return '';
  }

  const [isDone, setIsDone] = useState<boolean>(initIsDone);

  const [tokenError, setTokenError] = useState<string>('');


  function validate() {
    const validUsername = validateUsername();
    const validEmail = validateEmail();
    const validText = validateText();

    setUsernameError(validUsername);
    setEmailError(validEmail);
    setTextError(validText);

    return !validUsername && !validEmail && !validText;
  }

  const usernameHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
  }

  const emailHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  }

  const textHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
  }

  const isDoneHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsDone(event.currentTarget.checked);
  }

  const updateTasks = useUpdateTasks();
  const logout = useLogout();

  const saveHandleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    setIsFetching(true);

    event.preventDefault();
    setIsTouched(true);

    setIdError('');
    setUsernameError('');
    setEmailError('');
    setTextError('');
    setTokenError('');
    setError('');

    if (validate()) {
      const response = !isEdit
        ? await onCreateTask(username.trim(), email.trim(), text.trim())
        : await onEditTask(String(id), token, text.trim(), String(Number(isDone) * 10 + 1));

      switch (response.status) {
        case 'OK':
          onClose();
          updateTasks();
          break;
        case 'INVALID':
          setIdError('id' in response.validData ? response.validData.id : '');
          setUsernameError('username' in response.validData ? response.validData.username : '');
          setEmailError('email' in response.validData ? response.validData.email : '');
          setTextError('text' in response.validData ? response.validData.text : '');
          setTokenError('token' in response.validData ? response.validData.token : '');
          break;
        case 'ERROR':
          setError(response.errorData);
      }
    }

    setIsFetching(false);
  }

  const cancelHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClose();

    if (tokenError) {
      logout();
    }
  }

  return (
    <Modal>
      <h2 className={styles.taskModalHeading}>{isEdit ? `Редактирование задачи ${id}` : 'Создание задачи'}</h2>

      <form className={styles.form}>
        <Input id='usernameInputId' type='text' label='Имя пользователя *' value={username} onChange={usernameHandleChange} error={usernameError} isTouched={isTouched} isReadonly={isEdit} />
        <Input id='emailInputId' type='email' label='E-mail *' value={email} onChange={emailHandleChange} error={emailError} isTouched={isTouched} isReadonly={isEdit} />
        <Input id='textInputId' type='text' label='Текст задачи *' value={text} onChange={textHandleChange} error={textError} isTouched={isTouched} />
        {token && isEdit && <Checkbox id='isDoneInputId' label='Выполнена:' checked={isDone} onChange={isDoneHandleChange} />}

        <div className={styles.btnGroup}>
          <button type='submit' className={styles.saveBtn} onClick={saveHandleClick} disabled={isFetching}>{isFetching ? <Rings color="#a9a9a9" height={20} width={20} /> : 'Сохранить'}</button>
          <button type='button' className={styles.cancelBtn} onClick={cancelHandleClick} disabled={isFetching}>Отмена</button>
        </div>

        {idError && <div className={styles.error}>{idError}</div>}
        {tokenError && <div className={styles.error}>{'Необходимо авторизоваться'}</div>}
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </Modal>
  );
}
