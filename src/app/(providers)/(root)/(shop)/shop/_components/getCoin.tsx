'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/supabase/client';

type wallet = {
  coins: number;
};

export default function CoinsPage() {
  const [user, setUser] = useState<any>(null);
  const [coinInfo, setCoinInfo] = useState<wallet | null>(null);

  useEffect(() => {
    const UserandCoin = async () => {
      const supabase = createClient();
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser(); // 유저 정보를 가져옵니다.

      if (userError) {
        console.error('에러가 발생했습니다:', userError.message);
        return;
      }

      setUser(user); // 유저 정보를 상태에 저장합니다.

      if (user) {
        const { data, error } = await supabase
          .from('users') // 'coins' 테이블에서
          .select('coins') // 'coins' 컬럼을 선택하여
          .eq('user_id', user.id) // user_id가 현재 유저의 id와 일치하는 행을 가져옵니다.
          .single(); // 단일 행을 가져옵니다.

        if (error) {
          console.error('에러가 발생했습니다:', error.message);
        } else {
          setCoinInfo(data); // 코인 정보를 상태에 저장합니다.
        }
      }
    };

    UserandCoin(); // 유저 정보와 코인 정보를 가져오는 함수를 호출합니다.
  }, []);

  if (!user) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <div>
      <h1>{user.email}님의 코인 정보</h1>
      <div>
        {coinInfo ? ( // 코인 정보가 존재하는 경우
          <p>보유 코인: {coinInfo.coins}</p>
        ) : (
          // 코인 정보가 존재하지 않는 경우
          <p>코인 정보를 불러오는 중...</p>
        )}
      </div>
    </div>
  );
}
