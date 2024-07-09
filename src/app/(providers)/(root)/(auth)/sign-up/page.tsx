import Input from '@/components/Input';
import Link from 'next/link';

function SignUpPage() {
  return (
    <>
      <form className="my-5 flex flex-col gap-2">
        <Input label="Email" />
        <Input label="Password" />
        <Input label="Password-check" />
      </form>

      <div className="mt-10 flex flex-col gap-y-4">
        <button className="w-full rounded bg-black px-1.5 py-2 text-white">회원가입</button>
        <Link href="/log-in" className="w-full rounded bg-black px-1.5 py-2 text-center text-white">
          돌아가기
        </Link>
      </div>
    </>
  );
}

export default SignUpPage;
