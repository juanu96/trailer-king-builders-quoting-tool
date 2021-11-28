import React from 'react'
import { hot } from 'react-hot-loader'
import './App.scss'

const App = function (props) {
  return (
    <div>
      <h1>WP React Plugin Backend</h1>
      <p className='plugin-description'>
            The values entered in the input fields is stored in React state and
            automatically updates the label (which is bound to state too).
      </p>
    </div>
  )
}

export default hot(module)(App)
