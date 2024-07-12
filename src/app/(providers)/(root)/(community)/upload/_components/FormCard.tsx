import React, { ChangeEvent, useRef } from 'react';
import Image from 'next/image';
import { FaRegImage } from 'react-icons/fa6';
import profile1 from '../../../../../../assets/random profile1.png';

interface FormCardProps {
  onFileSelect: (file: File | null) => void;
  previewImageUrl: string | null;
  content: string;
  setContent: (content: string) => void;
}

const FormCard: React.FC<FormCardProps> = ({ onFileSelect, previewImageUrl, content, setContent }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileSelect(file);
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  return (
    <div className="mt-10 flex w-full flex-col items-center">
      <div className="mb-5 flex w-[450px] items-center">
        <Image src={profile1} alt="profileImg" className="h-[50px] w-[50px] rounded-full border" />
        <p className="ml-5">ooo 님</p>
      </div>
      <main className="flex h-[400px] w-[450px] flex-col items-center justify-between rounded-xl border">
        <textarea
          placeholder="내용을 입력하세요..."
          className="mt-5 h-[200px] w-[420px] resize-none pl-[10px] pt-5"
          value={content}
          onChange={handleContentChange}
        />
        <div className="mb-5 ml-5 w-[420px] text-2xl">
          {previewImageUrl && (
            <img
              src={previewImageUrl}
              alt="Selected"
              className="fixed-preview-image mt-5"
              style={{ width: '100%', height: 'auto', maxWidth: '90%', maxHeight: '200px', objectFit: 'contain' }}
            />
          )}

          <input type="file" ref={fileInputRef} hidden onChange={handleFileChange} />
          <FaRegImage style={{ cursor: 'pointer', fontSize: '24px' }} onClick={handleIconClick} />
        </div>
      </main>
    </div>
  );
};

export default FormCard;
