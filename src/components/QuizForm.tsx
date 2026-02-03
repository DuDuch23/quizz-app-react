import type { Category } from '../types/Category';

type QuizFormProps = {
  amount: number;
  setAmount: (n: number) => void;
  categories: Category[];
  setCategory: (c?: number) => void;
  setDifficulty: (d?: string) => void;
  startQuiz: () => void;
};

export function QuizForm({
  amount,
  setAmount,
  categories,
  setCategory,
  setDifficulty,
  startQuiz,
}: QuizFormProps) {
  return (
    <>
      <button onClick={startQuiz}>Commencer le quiz</button>

      <select value={amount} onChange={e => setAmount(Number(e.target.value))}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
      </select>

      <select
        onChange={e =>
          setCategory(e.target.value ? Number(e.target.value) : undefined)
        }
      >
        <option value="">Toutes les catégories</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <select onChange={e => setDifficulty(e.target.value || undefined)}>
        <option value="">Toutes difficultés</option>
        <option value="easy">Facile</option>
        <option value="medium">Moyen</option>
        <option value="hard">Difficile</option>
      </select>
    </>
  );
}
