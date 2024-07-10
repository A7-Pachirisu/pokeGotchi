'use client';
import Input from '@/components/Input';
import useInput from '@/hooks/useInput';
import { validateForm } from '@/utils/validateForm';
import Link from 'next/link';

function LogInPage() {
  const emailInput = useInput('');
  const passwordInput = useInput('');

  const handleClick = () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (validateForm({ email, password })) {
      console.log(email, password);
    }
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
        <button className="w-full rounded bg-yellow-400 px-1.5 py-2 text-black">카카오 로그인</button>
      </div>
    </>
  );
}

export default LogInPage;
