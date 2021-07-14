import React from 'react'
import { Props } from '../types/types'
import styles from '../css/App.module.css'

const QuestionCard: React.FC<Props> = ({ question, answers, callback, userAnswer, questionNr, totalQuestions }) => {
    return (
        <div>
            <p className={styles.questionNumber}>
                Question: {questionNr} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{ __html: question }} className={styles.text} />
            <div className={styles.text}>
                {answers.map((answer: string) => (
                    <div key={answer}>
                        <button disabled={userAnswer ? true : false} className={styles.options} value={answer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{ __html: answer }} />
                        </button>
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default QuestionCard
