import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import {CreateTeacher} from "./component/teacher/createTeacher";
function App() {
  return (
      <>
        <Routes>
          <Route path="/create"  element={<CreateTeacher/>}/>
        </Routes>
      </>
  );
}

export default App;
