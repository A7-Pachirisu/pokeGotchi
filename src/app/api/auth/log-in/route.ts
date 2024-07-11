import { createClient } from '@/supabase/server';
import { logInForm } from '@/types/formType';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password }: logInForm = await request.json();

    const supabase = createClient();

    const {
      data: { user },
      error
    } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return NextResponse.json({ error: '로그인 실패', details: error.message }, { status: 401 });
    if (user) return NextResponse.json({ msg: '로그인 성공', user });
  } catch (error) {
    return NextResponse.json({ error: '로그인 처리 중 네트워크 오류', details: error }, { status: 500 });
  }
}
