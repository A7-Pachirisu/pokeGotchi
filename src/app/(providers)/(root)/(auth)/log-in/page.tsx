'use client';
import Input from '@/components/Input';
import { useAuth } from '@/contexts/auth.context/auth.context';
import useInput from '@/hooks/useInput';
import Link from 'next/link';

function LogInPage() {
  const { logIn, logOut } = useAuth();
  const emailInput = useInput('');
  const passwordInput = useInput('');

  const handleLogin = async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    const logInData = { email, password };
    await logIn(logInData);
  };

  const handleLogout = async () => await logOut();

  return (
    <>
      <form className="my-5 flex flex-col gap-2">
        <Input label="Email" type="email" {...emailInput} />
        <Input label="Password" type="password" {...passwordInput} />
      </form>
      <div className="mt-10 flex flex-col gap-y-4">
        <button className="w-full rounded bg-black px-1.5 py-2 text-white" onClick={handleLogin}>
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
