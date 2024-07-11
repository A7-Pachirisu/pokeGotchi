import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) return NextResponse.json({ error: '유저 없음' }, { status: 401 });
    if (user) return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: '유저 정보 fetch 중 네트워크 오류', details: error }, { status: 500 });
  }
}
