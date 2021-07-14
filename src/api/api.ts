import { Difficulty, Question, QuestionState } from "../types/types"

const shuffler = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5);

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty): Promise<QuestionState[]> => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
    const data = await (await fetch(endpoint)).json();
    return data.results.map((question: Question) => ({
        ...question,
        answers: shuffler([
            ...question.incorrect_answers,
            question.correct_answer
        ])
    }));
}