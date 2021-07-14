import React, { useState } from 'react'
import { fetchQuizQuestions } from './api/api';

// Components
import QuestionCard from './components/QuestionCard'

// Types
import { AnswerObject, Difficulty, QuestionState } from './types/types';

// Styles
import styles from './css/App.module.css'

const App = () => {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true)

  const TotalQuestions = 10;

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {

      const answer = e.currentTarget.value;

      const correct = questions[number].correct_answer === answer;

      if (correct) setScore(prev => prev + 1)

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }

      setUserAnswers((prev) => [...prev, answerObject])
    }
  };

  const showNextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TotalQuestions) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion)
    }
  };

  const fetchQuestions = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TotalQuestions,
      Difficulty.EASY
    )
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([])
    setNumber(0);
    setLoading(false)
  };

  return (
    <body>
      <div className={styles.centeredDiv}>
        <h1 className={styles.heading}>REACT QUIZ</h1>
        {gameOver || userAnswers.length === TotalQuestions ? (
          <button className={styles.startButton} onClick={fetchQuestions}>
            {gameOver ? "Start" : "Restart"}
          </button>
        ) : null}
        {!gameOver ? <p className={styles.text}>Score: {score}</p> : null}
        {loading ? <p className={styles.text}>Loading Questions...</p> : null}
        {!loading && !gameOver && userAnswers.length !== 10 ? (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TotalQuestions}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        ) : null}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TotalQuestions - 1 ? (
          <button className={styles.startButton} onClick={showNextQuestion}>
            Next Question
          </button>
        ) : null}
      </div>
      <p className={styles.bottomDiv} style={{textAlign: 'center'}}>Made with <img className="image" width="20" height="20" alt="Heart" src="https://cdn.iconscout.com/icon/free/png-256/heart-1767836-1502416.png" /> by <a href="http://www.github.com/SaadFarhanIdress">Saad Farhan</a>
      <br />
      Don't forget to star my repository :) <br />Link: <a href="https://github.com/SaadFarhanIdress/project-6-quiz-app">https://github.com/SaadFarhanIdress/project-6-quiz-app</a></p>
    </body>
  )
}

export default App
