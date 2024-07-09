import React from 'react';
import { AnswerObject } from '../page';

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({ question, answers, callback, userAnswer, questionNr, totalQuestions }) => (
  <div className="max-w-screen-lg rounded-lg border-2 border-[#0085a3] bg-[#ebfeff] p-5 text-center shadow-lg">
    <p className="mb-4 text-lg">
      Question: {questionNr} / {totalQuestions}
    </p>
    <p className="mb-4 text-lg" dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {answers.map((answer) => {
        const isCorrect = userAnswer?.correctAnswer === answer;
        const isUserClicked = userAnswer?.answer === answer;

        const buttonClassName = isCorrect
          ? 'bg-gradient-to-r from-green-400 to-green-600'
          : isUserClicked
            ? 'bg-gradient-to-r from-red-400 to-red-600'
            : 'bg-gradient-to-r from-blue-400 to-blue-600';

        return (
          <div
            key={answer}
            className={`mb-2 transition-opacity duration-300 ease-in-out hover:opacity-80 ${buttonClassName}`}
          >
            <button
              className="h-10 w-full cursor-pointer select-none rounded-lg text-sm text-white shadow-md"
              disabled={!!userAnswer}
              value={answer}
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </div>
        );
      })}
    </div>
  </div>
);

export default QuestionCard;
