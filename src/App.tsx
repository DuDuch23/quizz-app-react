import './App.css'
import { useEffect, useState } from 'react';
import type { Quiz } from './types/Quiz';
import type { Category } from './types/Category';
import { getRandomQuiz } from './api/getRandomQuiz';
import { getCategory } from './api/getCategory';
import { QuizForm } from "./components/QuizForm";
import { QuizQuestion } from "./components/QuizQuestion";
import { Answers } from "./components/Answers";

function App() {
  const [quizs, setQuizs] = useState<Quiz[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const [amount, setAmount] = useState<number>(5);
  // const [nbQuestion, setNbQuestion]
  const [category, setCategory] = useState<number | undefined>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [difficulty, setDifficulty] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean | undefined>(false);
  const [quizEnd, setQuizEnd] = useState<boolean | undefined>(false);
  const [score, setScore] = useState<number>(0);
  const [timer, setTimer] = useState<number>(15);
  const [error, setError] = useState<string | null>(null);
  const [enableError, setEnableError] = useState<boolean | false>(false);
  
  const [started, setStarted] = useState(false);

  const decodeHtml = (html :string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
  
  useEffect(() => {
    getCategory().then(setCategories);
  }, []);
  
  const startQuiz = () => {
    setLoading(true);
    getRandomQuiz({
      amount,
      category,
      difficulty,
    })
    .then(data => {
      if(!data || data.length === 0){
        throw new Error("Aucune question récupérée");
      }
      setQuizs(data);
    })

    .catch(() => {
      setError("Impossible de charger le quiz. Réessaie plus tard.");
      setLoading(false);
      setEnableError(true);
    })
    .finally(function (){
      // Simulez un chargement pour afficher l'indicateur de chargement, à décommenter pour tester le chargement
      // setTimeout(() => {
      //   setQuizEnd(false);
      //   setLoading(false);
      //   setStarted(true);
      //   setCurrentQuestionIndex(0);
      //   setTimer(15);
      // }, 2000);

      // et commenter ça
        setQuizEnd(false);
        setLoading(false);
        setStarted(true);
        setCurrentQuestionIndex(0);
        setTimer(15);
    });
  };
  
  const handleTimeOut = () => {
    // passe à la question suivante
    if (currentQuestionIndex < quizs.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizEnd(true);
      setStarted(false);
    }
  };
  
  useEffect(() => {
    if (timer === 0 && started) {
      handleTimeOut();
      return;
    }

    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, started]);

  useEffect(() => {
    if (started) {
      setTimer(15);
    }
  }, [currentQuestionIndex]);
  
  const currentQuestion = quizs[currentQuestionIndex];
  
  const answersQuestions = currentQuestion ? [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers] : [];

  answersQuestions.sort((a, b) => a.localeCompare(b));

  const handleAnswer = (answer:string) => {
    const currentQuestion = quizs[currentQuestionIndex];

    if(answer === currentQuestion.correct_answer){
      setScore(score => score +1);
    }

    if(currentQuestionIndex < quizs.length -1){
      setCurrentQuestionIndex(score => score + 1);
      setTimer(15);
    }else{
      setQuizEnd(true);
      setStarted(false);
      setCurrentQuestionIndex(0);
      setQuizs([]);
    }
  }

  return (
    <>
      {!started && !loading && !error && (
        <QuizForm
          amount={amount}
          setAmount={setAmount}
          categories={categories}
          setCategory={setCategory}
          setDifficulty={setDifficulty}
          startQuiz={startQuiz}
        />
      )}
      {error && <p className="error">Erreur lors de la récupération </p>}
      {loading && <p className='loading'>Chargement...</p>}


      {started && currentQuestion && (
        <>
          <QuizQuestion
            question={currentQuestion}
            timer={timer}
            score={score}
            index={currentQuestionIndex}
            total={quizs.length}
          />

          <Answers
            answers={answersQuestions.map(decodeHtml)}
            onAnswer={handleAnswer}
          />
        </>
      )}



      {
        quizEnd &&(
          <p>Quiz terminé ! Votre score est de : {score}</p>
        )
      }
      
    </>
  );
}

export default App;
