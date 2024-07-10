import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { email, password }: { email: string; password: string } = await request.json();

  const supabase = createClient();
  const result = await supabase.auth.signUp({ email, password });

  console.log('🔥 회원가입', result);
  return NextResponse.json('회원가입 성공~!');
}
