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
  const [nickname, setNickname] = useState<string>(user.nickname || '');
  const [hashtags, setHashtags] = useState<string[]>(user.hashtags || []);
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [hashtagError, setHashtagError] = useState<string | null>(null);

  const handleSave = async () => {
    if (nickname.length > 8) {
      setNicknameError('닉네임은 최대 8글자까지 입력할 수 있습니다.');
      return;
    }


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

      if (error) {
        throw new Error(error.message);
      } else if (!data || data.length === 0) {
        console.warn('업데이트된 데이터가 반환되지 않았습니다.');
      } else {
        onClose();
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  };

  const handleAddHashtag = () => {
    if (hashtags.length >= 4) {
      setHashtagError('해시태그는 최대 4개까지 추가할 수 있습니다.');
      return;
    }
    setHashtagError(null);
    setHashtags([...hashtags, '']);
  };

  const handleRemoveHashtag = (index: number) => {
    setHashtagError(null);
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
      <div className="w-[400px] rounded-lg bg-white p-5 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">프로필 수정</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium">프로필 이미지</label>
          <input type="file" onChange={handleImageChange} className="w-full" />
          {profile_image && (
            <img src={profile_image} alt="프로필 이미지" className="mt-2 h-24 w-24 rounded-full object-cover" />
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">닉네임</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => {
              if (e.target.value.length <= 8) {
                setNickname(e.target.value);
                setNicknameError(null);
              } else {
                setNicknameError('닉네임은 최대 8글자까지 입력할 수 있습니다.');
              }
            }}
            className="mt-1 block w-full rounded-md border border-gray-300 p-1"
          />
        </div>
        {nicknameError && <div className="mb-2 text-xs text-red-500">{nicknameError}</div>}
        <div className="mb-4">
          <label className="block text-sm font-medium">해시태그</label>
          {hashtags.map((hashtag, index) => (
            <div key={index} className="mb-2 flex items-center">
              <input
                type="text"
                value={hashtag}
                onChange={(e) => handleHashtagChange(index, e.target.value)}
                className="mt-1 block w-80 rounded-md border border-gray-300 p-1"
              />
              <button type="button" onClick={() => handleRemoveHashtag(index)} className="ml-2 text-red-500">
                삭제
              </button>
            </div>
          ))}
          {hashtagError && <div className="mb-2 text-xs text-red-500">{hashtagError}</div>}
          <button type="button" onClick={handleAddHashtag} className="mt-2 text-blue-500">
            해시태그 추가
          </button>
        </div>
        <div className="flex justify-end">
          <button type="button" onClick={onClose} className="mr-2 rounded-md border border-gray-300 px-4 py-2">
            취소
          </button>
          <button type="button" onClick={handleSave} className="rounded-md bg-blue-500 px-4 py-2 text-white">
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
