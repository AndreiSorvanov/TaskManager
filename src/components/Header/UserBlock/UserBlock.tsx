import { MouseEvent, useState } from 'react';
import { IconAnon } from '../../../icons';
import { AuthModal } from './AuthModal';
import styles from './Userblock.module.css';
import { auth } from '../../../API/auth';

interface IUserBlockProps {
  avatarSrc?: string;
  username: string;
}

export function UserBlock({ avatarSrc, username }: IUserBlockProps) {
  const [isAuthModalOpened, setIsAuthModalOpened] = useState(false);

  const openHandleClick = (event: MouseEvent<HTMLDivElement>) => {
    setIsAuthModalOpened(true);
  }

  const closeHandleClick = () => {
    setIsAuthModalOpened(false);
  }
  return (
    <>
      <div className={styles.userBox} onClick={openHandleClick}>
        <div className={styles.avatarBox}>
          {avatarSrc
            ? <img src={avatarSrc} alt="Фото пользователя" className={styles.avatarImage} />
            : <IconAnon />
          }
        </div>
        <span className={styles.userName}>{username || 'Аноним'}</span>
      </div>
      {isAuthModalOpened && <AuthModal onAuth={auth} onClose={closeHandleClick} />}
    </>
  );
}
