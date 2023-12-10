import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import {CreateTeacher} from "./config/component/teacher/createTeacher";
import {ListStudentAd} from "./config/component/student/ListStudentAd";
import {ListStudentTeacher} from "./config/component/student/ListStudentTeacher";
import {Login} from "./config/component/login/login";
import {UserInfo} from "./config/component/userInfo/user-info";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./pages/HomePage";
import TopicTable from "./config/component/TopicTable";
import ListGroupAccount from "./config/component/ListGroupAccount/ListGroupAccount";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/create" element={<CreateTeacher/>}/>
                <Route path="/student-list" element={<ListStudentAd/>}></Route>
                <Route path="/student-list-teacher" element={<ListStudentTeacher/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/user-info" element={<UserInfo/>}></Route>
                <Route path="/topic-table" element={<TopicTable/>}></Route>
                <Route path="/group-table" element={<ListGroupAccount/>}></Route>
                
            </Routes>
            <ToastContainer/>
        </>
    );
}

export default App;
