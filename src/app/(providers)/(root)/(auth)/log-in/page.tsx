'use client';
import Input from '@/components/Input';
import useInput from '@/hooks/useInput';
import { logIn, logOut } from '@/services/authService';
import { performToast } from '@/utils/performToast';
import { validateForm } from '@/utils/validateForm';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function LogInPage() {
  const router = useRouter();
  const emailInput = useInput('');
  const passwordInput = useInput('');

  const handleClick = async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    const logInData = { email, password };
    if (validateForm(logInData)) {
      try {
        const data = await logIn(logInData);
        performToast({ msg: '로그인 성공!', type: 'success' });
        router.replace('/');
      } catch {
        return performToast({ msg: '잘못된 로그인 정보입니다', type: 'error' });
      }
    }
  };

  const handleLogout = async () => {
    const data = await logOut();
    console.log('>>>', data);
  };
  return (
    <>
      <form className="my-5 flex flex-col gap-2">
        <Input label="Email" type="email" {...emailInput} />
        <Input label="Password" type="password" {...passwordInput} />
      </form>
      <div className="mt-10 flex flex-col gap-y-4">
        <button className="w-full rounded bg-black px-1.5 py-2 text-white" onClick={handleClick}>
          로그인
        </button>
        <Link href="/sign-up" className="w-full rounded bg-black px-1.5 py-2 text-center text-white">
          회원가입
        </Link>
        <button className="w-full rounded bg-yellow-400 px-1.5 py-2 text-black" onClick={handleLogout}>
          카카오 로그인이지만 지금은 로그아웃
        </button>
      </div>
    </>
  );
}

export default LogInPage;
