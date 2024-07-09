import { performToast } from './performToast';

interface validateFormProps {
  email: string;
  password: string;
  passwordCheck?: string;
}

const isNotEmpty = (value: string): boolean => {
  return value.trim() !== '';
};

const isMatchPasswords = (password: string, passwordCheck: string): boolean => {
  return password === passwordCheck;
};

export const validateForm = ({ email, password, passwordCheck = '' }: validateFormProps) => {
  if (!isNotEmpty(email)) {
    performToast({ msg: '이메일을 입력해주세요', type: 'error' });
    return false;
  }
  if (!isNotEmpty(password)) {
    performToast({ msg: '비밀번호를 입력해주세요', type: 'error' });
    return false;
  }
  if (!isNotEmpty(passwordCheck)) {
    performToast({ msg: '비밀번호 확인을 입력해주세요', type: 'error' });
    return false;
  }
  if (!isMatchPasswords(password, passwordCheck)) {
    performToast({ msg: '비밀번호와 비밀번호 확인이 일치하지 않습니다', type: 'error' });
    return false;
  }
};
