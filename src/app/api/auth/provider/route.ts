import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`
      }
    });

    // console.log('💙', data, error);
    if (error) return NextResponse.json({ error: '로그인 실패', details: error.message }, { status: 401 });
    if (data) return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: '로그인 처리 중 네트워크 오류', details: error }, { status: 500 });
  }
}
