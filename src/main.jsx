import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './redux/store'
import AddForm from './features/AddForm'
import { Provider } from 'react-redux'
import Mainbody from './components/Mainbody/Mainbody'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
    <Route path="/" element ={<AddForm />} />
    <Route path="getallforms" element ={<Mainbody />} />
    
    </Routes>
    </BrowserRouter>
    </Provider>,
  document.getElementById('root')
)
