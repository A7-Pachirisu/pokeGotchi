import React, { useState, ChangeEvent } from 'react';
import supabase from '@/supabase/client';

interface EditProfileModalProps {
  user: {
    id: string;
    profile_image: string | null;
    nickname: string | null;
    hashtags: string[] | null;
  };
  isOpen: boolean;
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ user, isOpen, onClose }) => {
  const [profile_image, setProfileImage] = useState<string | null>(user.profile_image || '');
  const [nickname, setNickname] = useState<string | null>(user.nickname || '');
  const [hashtags, setHashtags] = useState<string[]>(user.hashtags || []);

  const handleSave = async () => {
    console.log('전송할 업데이트 데이터:', { profile_image, nickname, hashtags });

    try {
      const updates = {
        profile_image: profile_image || null,
        nickname: nickname || null,
        hashtags: hashtags.length > 0 ? hashtags : []
      };

      const { data, error, status, statusText } = await supabase
        .from('users')
        .update<any>(updates)
        .eq('id', user.id)
        .select();

      console.log('API 응답 상태:', status, statusText);
      console.log('API 응답 데이터:', data);
      console.log('API 응답 오류:', error);

      if (error) {
        console.error('프로필 업데이트 중 오류 발생:', error.message);
      } else if (!data || data.length === 0) {
        console.warn('업데이트된 데이터가 반환되지 않았습니다.');
      } else {
        console.log('프로필 업데이트 성공:', data);
        onClose(); // 모달을 닫습니다.
      }
    } catch (error: any) {
      console.error('요청 중 오류 발생:', error.message);
    }
  };

  const handleAddHashtag = () => {
    setHashtags([...hashtags, '']);
  };

  const handleRemoveHashtag = (index: number) => {
    setHashtags(hashtags.filter((_, i) => i !== index));
  };

  const handleHashtagChange = (index: number, value: string) => {
    const newHashtags = [...hashtags];
    newHashtags[index] = value;
    setHashtags(newHashtags);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="w-[400px] bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">프로필 수정</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium">프로필 이미지</label>
          <input type="file" onChange={handleImageChange} className="w-full" />
          {profile_image && <img src={profile_image} alt="프로필 이미지" className="mt-2 h-24 w-24 object-cover rounded-full" />}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">닉네임</label>
          <input
            type="text"
            value={nickname || ''}
            onChange={(e) => setNickname(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">해시태그</label>
          {hashtags.map((hashtag, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={hashtag}
                onChange={(e) => handleHashtagChange(index, e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={() => handleRemoveHashtag(index)}
                className="ml-2 text-red-500"
              >
                삭제
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddHashtag}
            className="mt-2 text-blue-500"
          >
            해시태그 추가
          </button>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="mr-2 px-4 py-2 border border-gray-300 rounded-md"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
