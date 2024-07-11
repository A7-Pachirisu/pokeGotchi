'use client';
import { getUserService, logInService, logOutService, signUpService } from '@/services/authService';
import { logInForm, signUpForm } from '@/types/formType';
import { performToast } from '@/utils/performToast';
import { validateForm } from '@/utils/validateForm';
import { useRouter } from 'next/navigation';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { AuthContextValue } from './authContextType';

const initialValue: AuthContextValue = {
  isInitialized: false,
  isLoggedIn: false,
  me: null,
  logIn: () => {},
  logOut: () => {},
  signUp: () => {}
};

const AuthContext = createContext<AuthContextValue>(initialValue);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  const [isInitialized, setIsInitialized] = useState<AuthContextValue['isInitialized']>(false);
  const [me, setMe] = useState<AuthContextValue['me']>(null);
  const isLoggedIn = !!me;

  const logIn = async (logInData: logInForm) => {
    if (me) {
      performToast({ msg: '이미 로그인이 되었습니다', type: 'warning' });
      return;
    }

    if (validateForm(logInData)) {
      try {
        const { user } = await logInService(logInData);
        router.replace('/');
        performToast({ msg: '로그인 성공!', type: 'success' });
        setMe(user);
      } catch {
        performToast({ msg: '잘못된 로그인 정보입니다', type: 'error' });
      }
      setIsInitialized(true);
    }
  };

  const logOut = async () => {
    if (!me) {
      performToast({ msg: '로그인한 유저가 없습니다', type: 'warning' });
      return;
    }
    await logOutService();
    performToast({ msg: '로그아웃 되었습니다!', type: 'success' });
    router.replace('/log-in');
    init();
  };

  const signUp = async (signUpData: signUpForm) => {
    if (validateForm(signUpData)) {
      try {
        const data = await signUpService(signUpData);
        performToast({ msg: '회원가입이 성공하였습니다!', type: 'success' });
        router.push('/log-in');
      } catch {
        return performToast({ msg: '잘못된 회원가입 정보입니다', type: 'error' });
      }
    }
  };

  const init = () => {
    setMe(null);
    setIsInitialized(false);
  };

  useEffect(() => {
    (async () => {
      const user = await getUserService();
      if (user) setMe(user);
    })();
    setIsInitialized(true);
  }, []);

  const value: AuthContextValue = {
    isInitialized,
    isLoggedIn,
    me,
    logIn,
    logOut,
    signUp
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
