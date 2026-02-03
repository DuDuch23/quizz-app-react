import type { Category } from "../types/Category";

interface CategoryApiResponse {
  trivia_categories: Category[]
}

export async function getCategory(): Promise<Category[]> {
  const response = await fetch("https://opentdb.com/api_category.php");
  const data: CategoryApiResponse = await response.json();
  return data.trivia_categories;
}
