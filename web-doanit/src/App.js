import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import {CreateTeacher} from "./component/teacher/createTeacher";
import {ListStudentAd} from "./component/student/ListStudentAd";
import {ListStudentTeacher} from "./component/student/ListStudentTeacher";
import HomePage from "./pages/HomePage";
import TopicTable from "./component/TopicTable";
import {Create} from "./component/student/Create-student";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/create" element={<CreateTeacher/>}/>
                <Route path="/student-list" element={<ListStudentAd/>}></Route>
                <Route path="/student-list-teacher" element={<ListStudentTeacher/>}></Route>
                <Route path="/topic-table" element={<TopicTable/>}></Route>
                <Route path="/create-student" element={<Create/>}/>
            </Routes>
        </>
    );
}

export default App;
