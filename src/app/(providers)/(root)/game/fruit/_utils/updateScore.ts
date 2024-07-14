import supabase from '@/supabase/client';

export const updateScore = async (score: number, userId: string) => {
  try {
    const { data, error } = await supabase.from('users').select('gameScore_fruit, coins').eq('id', userId).single();

    if (error) throw error;

    const currentScore = data.gameScore_fruit ?? 0;
    const currentCoins = data.coins ?? 0;
    const additionalCoins = Math.floor(score / 10);
    const newCoins = currentCoins + additionalCoins;

    const { data: updateData, error: updateError } = await supabase
      .from('users')
      .update({ gameScore_fruit: score > currentScore ? score : currentScore, coins: newCoins })
      .eq('id', userId)
      .select();

    if (updateError) {
      console.error('Error updating user data:', updateError);
      throw updateError;
    }
  } catch (err) {
    console.error('갱신중 오류', err);
  }
};
