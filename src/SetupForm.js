import React from 'react'
import { useGlobalContext } from './context'

const SetupForm = () => {

  const { quiz, handleChange, handleSubmit, error } = useGlobalContext()

  return (
    <main>
      <section className='quiz quiz-small'>
        <form className='setup-form' onSubmit={(e) => handleSubmit(e)}>
          <h2>Setup Quiz</h2>
          {/* amount */}
          <div className='form-control'>
            <label htmlFor='amount'>number of questions</label>
            <input
              name='amount'
              id='amount'
              value={quiz.amount}
              onChange={(e) => handleChange(e)}
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
              onChange={(e) => handleChange(e)}
            >
              <option value='21'>sports</option>
              <option value='23'>history</option>
              <option value='24'>politics</option>
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
              onChange={(e) => handleChange(e)}
            >
              <option value='easy'>easy</option>
              <option value='medium'>medium</option>
              <option value='hard'>hard</option>
            </select>
          </div>
          {error && <p className='error'>can't generate questions, please try different options</p>}
          <button type='submit' className='submit-btn'>Start</button>
        </form>
      </section>
    </main>
  )
}

export default SetupForm
