import { createStore, applyMiddleware } from 'redux';

//Takecare about the Asynchronous call for the action creators
import thunk from 'redux-thunk';
import axios from 'axios';
import reducers from '../client/reducers'; //Getting all the Combined Reducers for the Creation of the Store

export default (req) => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:9095',
    headers: {
      cookie: req.get('cookie') || '',
      Authorization: 'cs_By_Pass',
      reportUiUserName: 'osvaldo.martini@gmail.com'
    }
  });

  const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
  );

  return store;
};
