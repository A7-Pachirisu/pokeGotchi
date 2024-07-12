'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import QuestionCard from './_components/QuestionCard';
import supabase from '@/supabase/client';
import backgroundImage from '@/assets/background.png';
import { QuestionsState, Difficulty, AnswerObject } from '@/app/(providers)/(root)/game/quiz/quizTypes';

const gameSwal = withReactContent(Swal);
const TOTAL_QUESTIONS = 10;

const fetchUser = async () => {
  const response = await fetch('/api/auth/me');
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const updateQuizScore = async (score: number, userId: string, userEmail: string) => {
  const { data, error } = await supabase.from('users').select('gameScore_quiz, coins').eq('id', userId).single();
  if (error) {
    throw error;
  }

  const currentScore = data?.gameScore_quiz ?? 0;
  const currentCoins = data?.coins ?? 0;
  const additionalCoins = Math.floor(score / 100) * 10;
  const newCoins = currentCoins + additionalCoins;

  const { data: upsertData, error: upsertError } = await supabase
    .from('users')
    .upsert(
      { id: userId, gameScore_quiz: score > currentScore ? score : currentScore, coins: newCoins, email: userEmail },
      { onConflict: 'id' }
    );

  if (upsertError) {
    throw upsertError;
  }
};

const QuizGamePage: React.FC = () => {
  const queryClient = useQueryClient();
  const {
    data: user,
    error,
    isLoading
  } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser
  });

  const mutation = useMutation({
    mutationFn: (score: number) => updateQuizScore(score, user.id, user.email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  });

  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [gameOver, setGameOver] = useState(true);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);

    const response = await fetch(`/api/quiz?amount=${TOTAL_QUESTIONS}&difficulty=${Difficulty.EASY}`);
    if (!response.ok) {
      setLoading(false);
      throw new Error('Failed to fetch questions');
    }

    const newQuestions = await response.json();
    setQuestions(newQuestions);
    setLoading(false);
  };

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;

      if (correct) setScore((prev) => prev + 100);

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };

      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQ = number + 1;

    setNumber(nextQ);
  };

  const submitQuiz = () => {
    mutation.mutate(score);
    gameSwal
      .fire({
        title: `점수: ${score}`,
        icon: 'success',
        confirmButtonText: '게임 종료'
      })
      .then(() => {
        setGameOver(true);
        setScore(0);
        setUserAnswers([]);
        setNumber(0);
        setQuestions([]);
      });
  };

  return (
    <div className="flex max-h-screen flex-col items-center justify-center">
      <div className="relative h-[800px] w-[600px]">
        <Image
          src={backgroundImage}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="pointer-events-none"
        />
      </div>
      <div className="z-1 absolute flex w-full flex-col items-center">
        <h1 className="mb-8 bg-gradient-to-b from-white to-blue-300 bg-clip-text text-center text-5xl font-bold text-transparent drop-shadow-lg">
          POKE QUIZ
        </h1>
        {gameOver ? (
          <button
            className="mb-4 rounded-xl border-2 border-orange-600 bg-gradient-to-b from-white to-orange-300 px-8 py-2 shadow-md"
            onClick={startTrivia}
          >
            Start
          </button>
        ) : null}
        {!gameOver && !loading && userAnswers.length !== TOTAL_QUESTIONS ? (
          <button
            className="mt-4 rounded-xl border-2 border-red-600 bg-gradient-to-b from-white to-red-300 px-8 py-2 shadow-md"
            onClick={startTrivia}
          >
            Restart Quiz
          </button>
        ) : null}
        {!gameOver ? <p className="mb-4 text-2xl text-white">Score: {score}</p> : null}
        {loading ? <p className="text-2xl text-white">Loading Questions...</p> : null}
        {!loading && !gameOver && questions.length > 0 && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button
            className="mt-4 rounded-xl border-2 border-orange-600 bg-gradient-to-b from-white to-orange-300 px-8 py-2 shadow-md"
            onClick={nextQuestion}
          >
            Next Question
          </button>
        ) : null}
        {!gameOver && !loading && userAnswers.length === TOTAL_QUESTIONS ? (
          <button
            className="mt-4 rounded-xl border-2 border-green-600 bg-gradient-to-b from-white to-green-300 px-8 py-2 shadow-md"
            onClick={submitQuiz}
          >
            Submit
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default QuizGamePage;
