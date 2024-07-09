'use client';
import Input from '@/components/Input';
import useInput from '@/hooks/useInput';
import { validateForm } from '@/utils/validateForm';
import Link from 'next/link';
import 'react-toastify/dist/ReactToastify.css';

function SignUpPage() {
  const emailInput = useInput('');
  const passwordInput = useInput('');
  const passwordCheckInput = useInput('');

  const handleClick = () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    const passwordCheck = passwordCheckInput.value;

    console.log(email, password, passwordCheck);
    const isValidatedForm = validateForm({ email, password, passwordCheck });

    // if (isValidatedForm) {

    // }
  };
  return (
    <>
      <form className="my-5 flex flex-col gap-2">
        <Input label="Email" type="email" {...emailInput} />
        <Input label="Password" type="password" {...passwordInput} />
        <Input label="Password-check" type="password" {...passwordCheckInput} />
      </form>

      <div className="mt-10 flex flex-col gap-y-4">
        <button className="w-full rounded bg-black px-1.5 py-2 text-white" onClick={handleClick}>
          회원가입
        </button>
        <Link href="/log-in" className="w-full rounded bg-black px-1.5 py-2 text-center text-white">
          돌아가기
        </Link>
      </div>
    </>
  );
}

export default SignUpPage;
