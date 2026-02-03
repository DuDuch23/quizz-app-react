type AnswersProps = {
  answers: string[];
  onAnswer: (answer: string) => void;
};

export function Answers({ answers, onAnswer }: AnswersProps) {
  return (
    <div className="reponses">
      {answers.map((answer, index) => (
        <button key={index} onClick={() => onAnswer(answer)}>
          {answer}
        </button>
      ))}
    </div>
  );
}
