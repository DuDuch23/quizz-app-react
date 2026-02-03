import type { Quiz } from "../types/Quiz";

type QuizQuestionProps = {
  question: Quiz;
  timer: number;
  score: number;
  index: number;
  total: number;
};

export function QuizQuestion({
  question,
  timer,
  score,
  index,
  total,
}: QuizQuestionProps) {
  return (
    <div className="question">
      <div className="timer">
        <p style={{ color: timer < 5 ? "red" : "black" }}>
          {timer}s
        </p>
      </div>

      <p>Question {index + 1} / {total}</p>

      <p>Score : {score}</p>

      <h3>{question.question}</h3>
    </div>
  );
}
