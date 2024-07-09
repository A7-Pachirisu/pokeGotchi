import Input from '@/components/Input';
import Link from 'next/link';

function LogInPage() {
  return (
    <>
      <form className="my-5 flex flex-col gap-2">
        <Input label="Email" />
        <Input label="Password" />
      </form>
      <div className="mt-10 flex flex-col gap-y-4">
        <button className="w-full rounded bg-black px-1.5 py-2 text-white">로그인</button>
        <Link href="/sign-up" className="w-full rounded bg-black px-1.5 py-2 text-center text-white">
          회원가입
        </Link>
        <button className="w-full rounded bg-yellow-400 px-1.5 py-2 text-black">카카오 로그인</button>
      </div>
    </>
  );
}

export default LogInPage;
