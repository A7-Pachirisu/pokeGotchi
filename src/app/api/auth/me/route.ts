import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const user = supabase.auth.getUser();

  if (!user) return NextResponse.json('유저가 없어요');
  return NextResponse.json(user);
}
