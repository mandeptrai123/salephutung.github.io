// Create Context Handle State
import { createStore } from 'redux'
import Reducer from './Reducer'

const Store = createStore(Reducer);

export default Store;