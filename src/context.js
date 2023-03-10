import axios from 'axios'
import React, { useState, useContext } from 'react'

// const API_ENDPOINT = 'https://opentdb.com/api.php?'


// const tempUrl = 'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {

  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 21,
    difficulty: 'easy'
  })

  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchQuestions = async (url) => {
    setLoading(true);
    setWaiting(false);

    const response = await axios(url).catch(err => { console.log(err); })

    if (response) {
      const data = response.data.results;

      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setWaiting(false);
        setError(false)
      } else {
        setWaiting(true)
        setError(true)
      }
    } else {
      setWaiting(true)
    }

  }

  const nextQuestion = () => {

    setIndex(prev => {

      const index = prev + 1

      if (index > questions.length - 1) {
        openModal()
        return 0
      } else {
        return index
      }

    })
  }

  const checkAnswer = (value) => {
    if (value) {
      setCorrect((oldState) => oldState + 1)
    }
    nextQuestion()
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setWaiting(true)
    setCorrect(0)
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setQuiz(prevQuiz => {

      return {
        ...prevQuiz,
        [name]: value
      }

    })

    console.log(quiz)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { amount, category, difficulty } = quiz

    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`

    fetchQuestions(url);
  }

  return <AppContext.Provider value={
    {
      waiting,
      loading,
      questions,
      index,
      correct,
      error,
      isModalOpen,
      quiz,
      nextQuestion,
      checkAnswer,
      closeModal,
      handleChange,
      handleSubmit
    }
  }>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
