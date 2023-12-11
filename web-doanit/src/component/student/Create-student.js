import React, {useEffect, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
// import '../Css/create-student.css';
import anh from '../image/default-avatar.png';
import * as Yup from "yup";
import {save} from "../../service/StudentService";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as gradeService from '../../service/GradeService';
import { storage } from "../../config/firebaseConfig";
const URL1 = "http://localhost:8080/api/get-all-grade";






export function Create() {
    const [grades, setGrades] = useState([])
    const [avatar,setAvatar]=useState(null)
    const [avatarUrl, setAvatarUrl] = useState('')





    useEffect(() => {
        findGrade();
    }, []);



    const findGrade = async () => {
        try {
            const result = await gradeService.findAllGrade(URL1);
            setGrades(result);
        } catch (error) {
            console.error("Error fetching grades:", error);
        }
    }



    const onAvatarChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setAvatar(event.target.files[0]);
            setAvatarUrl(URL.createObjectURL(event.target.files[0]));
        }
    };



    const handleAvatarUpload = async () => {
        try {
            if (avatar) {
                const uploadTask = storage.ref(`${avatar.name}`).put(avatar);
                await uploadTask;
                const downloadUrl = await storage.ref(avatar.name).getDownloadURL();
                setAvatarUrl(downloadUrl);
            }
        } catch (error) {
            console.error("Error uploading avatar:", error);
            throw error;
        }
    };




    return (
        <>
            <Formik
                initialValues=
                    {{
                        studentId: '',
                        name: '',
                        dateOfBirth: '',
                        address: '',
                        phone: '',
                        email: '',
                        avatar: null,
                        gender: false,
                        deleteFlag: '',
                        grade: 3,
                        account: ''
                    }}



                onSubmit={async (values) => {
                    try {

                        await handleAvatarUpload();
                        values.avatar = avatar.name;
                        save(values);

                        toast('🦄 Add student successfully!!!!');

                    } catch (error) {
                        console.error('Error uploading file or saving student:', error);
                    }

                }}




                validationSchema={Yup.object({
                    name: Yup.string()
                        .required('Tên sinh viên không được để trống')
                        .min(5, 'Tên sinh viên không được bé hơn 5')
                        .max(50, 'Tên sinh viên không được lớn hơn 50')
                        .matches(/^[a-zA-Z\s]+$/, "Tên sinh viên không được chứa ký tự đặc biệt"),
                    email: Yup.string()
                        .required('Email không được để trống')
                        .max(50, "Email không được lớn hơn 50")
                        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email không hợp lệ'),
                    phone: Yup.string()
                        .required('Số điện thoại không được để trống')
                        .min(10, "Số điện thoại phải tối thiểu 10 chữ số")
                        .matches(/^[0-9]+$/, 'Số điện thoại không hợp lệ'),
                    dateOfBirth: Yup.string()
                        .required("Ngày tháng năm không được để trống")
                        .matches(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/, "Ngày tháng năm  không hợp lệ")
                        .test('valid-age', '', function (value) {
                            const now = new Date();
                            const birthDate = new Date(value);
                            const age = now.getFullYear() - birthDate.getFullYear();

                            if (age < 18 || age > 50) {
                                return this.createError({
                                    path: 'dateOfBirth',
                                    message: 'Tuổi sinh viên phải từ 18 đến 50',
                                });
                            }

                            return true;
                        }),
                    address: Yup.string()
                        .required("Địa chỉ không được để trống")
                        .min(5, 'Địa chỉ không được bé hơn 5')
                        .max(50, 'Địa chỉ viên không được lớn hơn 50')

                })}
            >
                <Form>
                    <div className="khoahnd-container">

                        <div className="khoahnd-header">
                            <h2 className="khoahnd-title">THÊM MỚI SINH VIÊN</h2>
                        </div>

                        <div className="row">

                            <div className="col-md-3 mr-2">
                                <div className="khoahnd-avatar-container">
                                    <img src={avatarUrl || (avatar ? URL.createObjectURL(avatar) : anh)} alt="avatar" className="khoahnd-avatar" id="avatar-image" />
                                    <div className="khoahnd-form-group mt-2" style={{ textAlign: "center" }}>
                                        <input
                                            type="file"
                                            id="avatar"
                                            onChange={onAvatarChange}
                                            name="avatar"
                                            style={{
                                                display: 'none', // Hide the input
                                            }}
                                        />
                                        <label htmlFor="avatar" className={`btn btn-outline-primary label-custom `}>
                                            Chọn ảnh đại diện
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mr-5">
                                <div className="khoahnd-form-group">
                                    <label htmlFor="name">Tên sinh viên (<span
                                        className="text-danger">*</span>):</label>
                                    <Field type="text" className="form-control" id="name" name="name"/>
                                    <ErrorMessage name="name" className="text-danger" component="p"/>
                                </div>
                                <div className="khoahnd-form-group">
                                    <label htmlFor="dateOfBirth">Ngày Sinh (<span className="text-danger">*</span>):</label>
                                    <Field type="date" className="form-control" id="dateOfBirth"
                                           name="dateOfBirth"/>
                                    <ErrorMessage name="dateOfBirth" className="text-danger" component="p"/>
                                </div>
                                <div className="khoahnd-form-group">
                                    <label htmlFor="email">Email (<span className="text-danger">*</span>):</label>
                                    <Field type="text" className="form-control" id="email" name="email"/>
                                    <ErrorMessage name="email" className="text-danger" component="p"/>
                                </div>
                                <div className="khoahnd-form-group">
                                    <label htmlFor="grade">Lớp (<span className="text-danger">*</span>):</label>
                                    <Field as="select" className="form-control" id="grade" name="grade">
                                        {grades && grades.length > 0 ? (
                                            grades.map((grade) => (
                                                <option key={grade.gradeId} value={grade.gradeId}>{grade.name}</option>
                                            ))
                                        ) : (
                                            <option value="" disabled>Không có lớp nào</option>
                                        )}
                                    </Field>
                                    <ErrorMessage name="grade" className="text-danger" component="p"/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="khoahnd-form-group">
                                    <label htmlFor="phone">Số Điện Thoại (<span
                                        className="text-danger">*</span>):</label>
                                    <Field type="text" className="form-control" id="phone" name="phone"/>
                                    <ErrorMessage name="phone" className="text-danger" component="p"/>
                                </div>
                                <div className="khoahnd-form-group">
                                    <label htmlFor="address">Địa Chỉ (<span
                                        className="text-danger">*</span>):</label>
                                    <Field as="textarea" className="form-control" id="address" name="address"/>
                                    <ErrorMessage name="address" className="text-danger" component="p"/>
                                </div>
                                <div className="khoahnd-form-group">
                                    <label htmlFor="gender">Giới Tính (<span
                                        className="text-danger">*</span>):</label>
                                    <Field as="select" className="form-control" id="gender" name="gender">
                                        <option value={true}>Nam</option>
                                        <option value={false}>Nữ</option>
                                    </Field>
                                </div>
                                <div className="mt-3 khoahnd-save-exit-buttons">
                                    <button type="submit" className="btn btn-outline-success">Lưu</button>
                                    <button className="btn btn-outline-secondary ml-2">Thoát</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </>
    );
}
