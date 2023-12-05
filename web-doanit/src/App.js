import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import {CreateTeacher} from "./component/teacher/createTeacher";
import {ListStudentAd} from "./component/student/ListStudentAd";
import {ListStudentTeacher} from "./component/student/ListStudentTeacher";

function App() {
    return (
        <>
            <Routes>
                <Route path="/create" element={<CreateTeacher/>}/>
                <Route path="/student-list" element={<ListStudentAd/>}></Route>
                <Route path="/student-list-teacher" element={<ListStudentTeacher/>}></Route>
            </Routes>
        </>
    );
}

export default App;
