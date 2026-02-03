import { useEffect, useState } from "react";
import type { Quiz } from "../types/Quiz";
import { getRandomQuiz } from "../api/getRandomQuiz";

export function useGetRandomQuiz() {
  const [quizs, setQuizs] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRandomQuiz()
    .then(setQuizs) 
    .finally(() => setLoading(false));
  }, [])

  return { quizs, loading }
}
