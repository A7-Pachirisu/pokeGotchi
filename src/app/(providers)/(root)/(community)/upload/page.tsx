import Button from '@/components/Button';
import FormCard from './_components/FormCard';

function UploadPage() {
  return (
    <div className="flex h-full flex-col items-center px-10">
      <header className="mt-10 flex w-full justify-start">
        <h1 className="text-lg font-semibold">게시물 업로드</h1>
      </header>
      <FormCard />
      <Button intent="darkGrey" size="md" className="mt-10">
        업로드
      </Button>
    </div>
  );
}

export default UploadPage;
