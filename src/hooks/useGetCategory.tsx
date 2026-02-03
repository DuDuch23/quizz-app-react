import { useEffect, useState } from "react";
import type { Category } from "../types/Category";
import { getCategory } from "../api/getCategory";

export function useGetCategory() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCategory()
    .then(setCategories) 
    .finally(() => setLoading(false));
  }, [])

  return { categories, loading }
}
