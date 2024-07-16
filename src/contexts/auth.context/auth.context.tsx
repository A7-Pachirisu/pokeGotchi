'use client';
import {
  getUserService,
  logInService,
  logInWithKaKaoService,
  logOutService,
  signUpService
} from '@/services/authService';
import { logInForm, signUpForm } from '@/types/formType';
import { performToast } from '@/utils/performToast';
import { validateForm } from '@/utils/validateForm';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { AuthContextValue } from './authContextType';

const initialValue: AuthContextValue = {
  isInitialized: false,
  isLoggedIn: false,
  me: null,
  logIn: () => {},
  logOut: () => {},
  signUp: () => {},
  logInWithKakao: () => {}
};

const AuthContext = createContext<AuthContextValue>(initialValue);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isInitialized, setIsInitialized] = useState<AuthContextValue['isInitialized']>(false);
  const [me, setMe] = useState<AuthContextValue['me']>(null);
  const isLoggedIn = !!me;

  // 로그인
  const logIn: AuthContextValue['logIn'] = useCallback(async (logInData: logInForm) => {
    if (me) {
      performToast({ msg: '이미 로그인이 되었습니다', type: 'warning' });
      return;
    }

    if (validateForm(logInData)) {
      try {
        const { user } = await logInService(logInData);

        performToast({ msg: '로그인 성공!', type: 'success' });
        setMe(user);
      } catch {
        performToast({ msg: '잘못된 로그인 정보입니다', type: 'error' });
      }
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (isInitialized && me && pathname === '/log-in') {
      router.replace('/');
      console.log('라우터 호출하고 다음 줄');
    }
  }, [isInitialized, me, pathname, router]);

  const logOut: AuthContextValue['logOut'] = async () => {
    if (!me) {
      performToast({ msg: '로그인한 유저가 없습니다', type: 'warning' });
      return;
    }
    await logOutService();
    performToast({ msg: '로그아웃 되었습니다!', type: 'success' });
    router.replace('/log-in');
    init();
  };

  const signUp: AuthContextValue['signUp'] = useCallback(async (signUpData: signUpForm) => {
    if (validateForm(signUpData)) {
      try {
        const data = await signUpService(signUpData);
        performToast({ msg: '회원가입이 성공하였습니다!', type: 'success' });
        router.push('/log-in');
      } catch {
        return performToast({ msg: '잘못된 회원가입 정보입니다', type: 'error' });
      }
    }
  }, []);

  // 카카오 로그인
  const logInWithKakao: AuthContextValue['logInWithKakao'] = async () => {
    try {
      const data = await logInWithKaKaoService();
      performToast({ msg: '로그인 성공!', type: 'success' });
      router.replace(data.url);
    } catch {
      return performToast({ msg: '잘못된 회원가입 정보입니다', type: 'error' });
    }
  };

  const init = () => {
    setMe(null);
    setIsInitialized(false);
  };

  useEffect(() => {
    (async () => {
      const user = await getUserService();
      if (!user.error && user) setMe(user);
    })();
    setIsInitialized(true);
  }, []);

  const value: AuthContextValue = {
    isInitialized,
    isLoggedIn,
    me,
    logIn,
    logOut,
    signUp,
    logInWithKakao
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
