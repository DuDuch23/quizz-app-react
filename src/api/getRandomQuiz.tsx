import type { Quiz } from "../types/Quiz";

interface QuizApiResponse {
  response_code: number;
  results: Quiz[];
}

type QuizParams = {
  amount: number;
  category?: number;
  difficulty?: string;
};

export async function getRandomQuiz({
  amount,
  category,
  difficulty
}: QuizParams): Promise<Quiz[]> {
  const params = new URLSearchParams({
    amount: amount.toString(),
  })

  if(category && category != undefined){
    params.append('category', category.toString());
  }

  if(difficulty && difficulty != undefined){
    params.append('difficulty', difficulty);
  }

  const response = await fetch(`https://opentdb.com/api.php?${params.toString()}`);
  const data: QuizApiResponse = await response.json();
  return data.results;
}
