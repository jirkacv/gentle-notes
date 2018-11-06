import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { loadTranslations, setLocale, syncTranslationWithStore, i18nReducer } from 'react-redux-i18n';

import notesReducer from "./reducers/notesReducer";

import translations from './locales'


const middleware = [
    thunk
];

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'PRODUCTION') {
    middleware.push(createLogger({ duration: true}));
}

const store = createStore(
    combineReducers({
        notes: notesReducer,
        i18n: i18nReducer
    }),
    applyMiddleware(...middleware)
);

syncTranslationWithStore(store)
store.dispatch(loadTranslations(translations));
store.dispatch(setLocale('English'));

export default store;
