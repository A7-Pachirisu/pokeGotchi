import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export async function POST() {
  const supabase = createClient();
  await supabase.auth.signOut();

  return NextResponse.json('로그아웃 완료');
}
