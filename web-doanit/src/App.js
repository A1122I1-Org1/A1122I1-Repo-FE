import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import {CreateTeacher} from "./component/teacher/createTeacher";
import {ListStudentAd} from "./component/student/ListStudentAd";
import {ListStudentTeacher} from "./component/student/ListStudentTeacher";
import {Login} from "./component/login/login";
import {UserInfo} from "./component/userInfo/user-info";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <>
            <Routes>
                <Route path="/create" element={<CreateTeacher/>}/>
                <Route path="/student-list" element={<ListStudentAd/>}></Route>
                <Route path="/student-list-teacher" element={<ListStudentTeacher/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/user-info" element={<UserInfo/>}></Route>
            </Routes>
            <ToastContainer/>
        </>
    );
}

export default App;
