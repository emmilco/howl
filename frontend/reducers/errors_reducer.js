import { combineReducers } from 'redux';

import sessionErrorsReducer from './session_errors_reducer';
import articleErrorsReducer from './article_errors_reducer';

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  article: articleErrorsReducer
});

export default errorsReducer;
