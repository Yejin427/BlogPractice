import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ListPage, PostPage, EditorPage, NotFoundPage} from '../pages';

const App = () =>{
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListPage/>} exact/>
          <Route path="/page/:page" element={<ListPage/>} />
          <Route path="/tag/:tag/:page?" element={<ListPage/>}/>
          <Route path="/post/:id" element={<PostPage/>}/>
          <Route path="/editor" element={<EditorPage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;