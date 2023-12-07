import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import NotFound from './pages/NotFound';
import MovieDetail from './pages/MovieDetail';
import App from './App'
/*
import시에 {}사용하는 것과 안하는 것의 차이
기능을 내보기하는 방법에 따라서 차이가 발생

{}가 없는 import는 export default로 내보기된 컴포넌트를 import
{}를 사용해서 가져올때에는 default값이 아닌 하나의 컴포넌트에 여러개의 export가 되어 있는 
경우 각각 가져오기 위해서 사용한다.
*/



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    // children: [
    //   /*children
    //   중첩 라우터를 children으로 연결하게 되면 내부에 있는 파일은 부모 요소의 링크를 
    //   기준으로 잡힌다. 내부에 children으로 작성하게 되면 중첩되는 url은 생략할 수 있다.
    //   */
    //   //{path : ''}
      
    // ]

  },
  {
    path: 'movie/:movieId',
    element : <MovieDetail/>
    
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
  
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
