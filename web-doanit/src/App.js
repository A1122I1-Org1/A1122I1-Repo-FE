import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import {CreateTeacher} from "./component/teacher/createTeacher";
import {ListStudentAd} from "./component/student/ListStudentAd";
import {ListStudentTeacher} from "./component/student/ListStudentTeacher";
import {ListTeacher} from "./component/teacher/listTeacher";
import {Login} from "./component/login/login";
import {UserInfo} from "./component/userInfo/user-info";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./pages/HomePage";
import TopicTable from "./component/topic/TopicTable";
import {Create} from "./component/student/Create-student";
import {RegisterTeacher} from "./component/registerTeacher/RegisterTeacher";
import UpdateTeacher from "./component/teacher/updateTeacher";
function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/create-teacher" element={<CreateTeacher/>}/>
                <Route path="/student-list" element={<ListStudentAd/>}></Route>
                <Route path="/student-list-teacher" element={<ListStudentTeacher/>}></Route>
                <Route path="/teachers-list" element={<ListTeacher/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/user-info" element={<UserInfo/>}></Route>
                <Route path="/topic-table" element={<TopicTable/>}></Route>
                <Route path="/create-student" element={<Create/>}/>
                <Route path="/register-teacher" element={<RegisterTeacher/>}></Route>
                <Route path="/update-teacher/:id"  element={<UpdateTeacher/>}/>
            </Routes>
            <ToastContainer/>
        </>
    );
}

export default App;
