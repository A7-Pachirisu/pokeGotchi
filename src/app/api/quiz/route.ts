import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Question, Difficulty, QuestionsState } from '@/app/(providers)/(root)/game/quiz/quizTypes';

const cache: { [key: string]: string } = {};

const translateText = async (text: string, targetLang: string = 'ko', retryCount: number = 0): Promise<string> => {
  const MAX_RETRIES = 5; // 최대 재시도 횟수 설정
  const cacheKey = `${text}-${targetLang}`;
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  try {
    const response = await fetch('https://libretranslate.com/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        q: text,
        source: 'en',
        target: targetLang,
        format: 'text'
      })
    });

    const data = await response.json();
    console.log('API Response:', data);

    if (data.error) {
      throw new Error(data.error);
    }

    const translatedText = data.translatedText || (data.translations && data.translations[0].translatedText);
    console.log('Translated Text:', translatedText);

    cache[cacheKey] = translatedText;
    return translatedText;
  } catch (error) {
    if (error.message.includes('Slowdown')) {
      if (retryCount >= MAX_RETRIES) {
        throw new Error('Max retries reached. Please try again later.');
      }
      console.warn('Rate limit hit, retrying after delay...');
      await new Promise((res) => setTimeout(res, 2000)); // 2초 대기 후 재시도
      return translateText(text, targetLang, retryCount + 1);
    }
    throw error;
  }
};

const fetchQuizQuestions = async (amount: number, difficulty: Difficulty): Promise<QuestionsState[]> => {
  const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endpoint)).json();
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
  }));
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const amount = searchParams.get('amount');
  const difficulty = searchParams.get('difficulty');

  if (!amount || !difficulty) {
    return NextResponse.json({ error: 'Amount and difficulty are required' }, { status: 400 });
  }

  try {
    const questions = await fetchQuizQuestions(Number(amount), difficulty as Difficulty);

    const translatedQuestions = await Promise.all(
      questions.map(async (question: QuestionsState) => {
        const translatedQuestion = await translateText(question.question);
        const translatedAnswers = await Promise.all(question.answers.map((answer) => translateText(answer)));
        return {
          ...question,
          question: translatedQuestion,
          answers: translatedAnswers
        };
      })
    );

    return NextResponse.json(translatedQuestions, { status: 200 });
  } catch (error) {
    console.error('Translation Error:', error); // 오류 로그 출력
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
