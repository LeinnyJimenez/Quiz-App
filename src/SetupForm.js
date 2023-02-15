import React from 'react'
import { useGlobalContext } from './context'

const SetupForm = () => {

  const { quiz, handleChange, handleSubmit, error } = useGlobalContext()

  return (
    <main>
      <section className='quiz quiz-small'>
        <form className='setup-form'>
          <h2>Setup Quiz</h2>
          {/* amount */}
          <div className='form-control'>
            <label htmlFor='amount'>number of questions</label>
            <input
              name='amount'
              id='amount'
              value={quiz.amount}
              onChange={handleChange}
              className='form-input' min={1} max={15} />
          </div>
          {/* category */}
          <div className='form-control'>
            <label htmlFor='category'>Category</label>
            <select
              name='category'
              id='category'
              className='form-input'
              value={quiz.category}
              onChange={handleChange}
            >
              <option value='sports'>sports</option>
              <option value='history'>history</option>
              <option value='politics'>politics</option>
            </select>
          </div>
          {/* difficulty */}
          <div className='form-control'>
            <label htmlFor='difficulty'>difficulty</label>
            <select
              name='difficulty'
              id='difficulty'
              className='form-input'
              value={quiz.difficulty}
              onChange={handleChange}
            >
              <option value='easy'>easy</option>
              <option value='medium'>medium</option>
              <option value='hard'>hard</option>
            </select>
          </div>
          {error && <p className='error'>can't generate questions, please try different options</p>}
          <button type='submit' onSubmit={handleSubmit} className='submit-btn'>Start</button>
        </form>
      </section>
    </main>
  )
}

export default SetupForm
