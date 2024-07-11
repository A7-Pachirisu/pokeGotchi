'use client';

import React, { useState } from 'react';
import FormCard from './_components/FormCard';
import UploadBtn from './_components/UploadBtn';
import { supabase } from '@/supabase/supabaseClient';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImageUrl(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !content) return;

    const fileName = `${Date.now()}_${selectedFile.name.replace(/\s/g, '_')}`;
    const key = `images/${encodeURIComponent(fileName)}`;

    try {
      const { data: uploadData, error: uploadError } = await supabase.storage.from('sns').upload(key, selectedFile);

      if (uploadError) {
        console.error('파일 업로드 에러:', uploadError.message);
        return;
      }

      const { data } = supabase.storage.from('sns').getPublicUrl(key);
      const publicUrl = data.publicUrl;

      const { data: insertData, error: insertError } = await supabase
        .from('posts')
        .insert([{ content, img_url: publicUrl }]);

      if (insertError) {
        console.error('게시물 업로드 에러:', insertError.message);
      } else {
        console.log('게시물이 성공적으로 업로드 되었습니다:', insertData);
        setContent('');
        setSelectedFile(null);
        setPreviewImageUrl(null);
        router.push('/sns');
      }
    } catch (error) {
      console.error('일반 에러 발생:', (error as Error).message);
    }
  };

  return (
    <div>
      <header className="mt-10">
        <h1 className="ml-10 text-lg font-semibold">게시물 업로드</h1>
      </header>
      <FormCard
        onFileSelect={handleFileSelect}
        previewImageUrl={previewImageUrl}
        content={content}
        setContent={setContent}
      />
      <UploadBtn onClick={handleUpload} />
    </div>
  );
}

export default Page;
