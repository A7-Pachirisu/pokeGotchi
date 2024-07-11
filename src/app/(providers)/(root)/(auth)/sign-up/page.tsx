'use client';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useAuth } from '@/contexts/auth.context/auth.context';
import useInput from '@/hooks/useInput';
import 'react-toastify/dist/ReactToastify.css';

function SignUpPage() {
  const { signUp } = useAuth();
  const emailInput = useInput('');
  const passwordInput = useInput('');
  const passwordCheckInput = useInput('');

  const handleSignUp = async () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    const passwordCheck = passwordCheckInput.value;

    const signUpData = { email, password, passwordCheck };

    await signUp(signUpData);
  };
  return (
    <>
      <form className="my-5 flex flex-col gap-2">
        <Input label="Email" type="email" {...emailInput} />
        <Input label="Password" type="password" {...passwordInput} />
        <Input label="Password-check" type="password" {...passwordCheckInput} />
      </form>

      <div className="mt-10 flex flex-col gap-y-4">
        <Button size="lg" onClick={handleSignUp}>
          회원가입
        </Button>
        <Button size="lg" intent="black" href="/log-in">
          돌아가기
        </Button>
      </div>
    </>
  );
}

export default SignUpPage;
