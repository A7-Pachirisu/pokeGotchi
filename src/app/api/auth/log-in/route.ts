import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { email, password }: { email: string; password: string } = await request.json();

  const supabase = createClient();
  const result = await supabase.auth.signInWithPassword({ email, password });

  console.log('✨ 로그인', result);
  return NextResponse.json('로그인 성공했슈');
}
