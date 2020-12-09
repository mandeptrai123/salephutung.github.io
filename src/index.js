import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'

// Use Redux

import { Provider } from 'react-redux'
import Store from './Redux/Store'

import AppRouter from './AppRouter'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={Store}>
            <AppRouter />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
