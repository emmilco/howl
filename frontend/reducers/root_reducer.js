import { combineReducers } from 'redux';

import entsReducer from './ents_reducer';
import sessionReducer from './session_reducer';
import errorsReducer from './errors_reducer';
import uiReducer from './ui_reducer';

const rootReducer = combineReducers({
  ents: entsReducer,
  session: sessionReducer,
  errors: errorsReducer,
  ui: uiReducer
});

export default rootReducer;
