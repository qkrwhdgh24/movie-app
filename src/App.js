import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './styled/GlobalStyle';
import Main from './pages/Main';
import { Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import NotFound from './pages/NotFound';
import MainVideos from './components/MianVideos';
import MovieList from './components/MovieList';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './store/reducer';
import MovieDetail from './pages/MovieDetail';
import Search from './components/Search';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
function App() {
    return (
        <>
            <GlobalStyle />
            {/* <App /> */}
            <Main/>
            <div className='search-container'>
            <Search/>
            </div>
            
            <MainVideos />
            <Provider store={store}>
                <MovieList />
            </Provider>
        </>
    )
}

export default App;
