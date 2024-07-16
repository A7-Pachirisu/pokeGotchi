import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `/api/auth/callback`
      }
    });

    if (error) return NextResponse.json({ error: '로그인 실패', details: error.message });
    if (data) return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: '로그인 처리 중 네트워크 오류', details: error });
  }
}
