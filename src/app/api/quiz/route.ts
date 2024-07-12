import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Question, Difficulty, QuestionsState } from '@/app/(providers)/(root)/game/quiz/quizTypes';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const amount = searchParams.get('amount');
  const difficulty = searchParams.get('difficulty');

  if (!amount || !difficulty) {
    return NextResponse.json({ error: 'Amount and difficulty are required' }, { status: 400 });
  }

  const fetchQuizQuestions = async (amount: number, difficulty: Difficulty): Promise<QuestionsState[]> => {
    const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json();
    return data.results.map((question: Question) => ({
      ...question,
      answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
    }));
  };

  try {
    const questions = await fetchQuizQuestions(Number(amount), difficulty as Difficulty);
    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}
