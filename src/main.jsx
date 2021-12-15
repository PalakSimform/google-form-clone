import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './redux/store'
import AddForm from './features/AddForm'
import { Provider } from 'react-redux'

ReactDOM.render(
    <Provider store={store}>
      <AddForm />
    </Provider>,
  document.getElementById('root')
)
