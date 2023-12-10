import React, { useEffect, useState } from "react";
import {Field, Form, Formik, ErrorMessage, useFormikContext} from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import * as TeacherService from "../../service/TeacherService";
import * as FacultyService from "../../service/FacultyService";
import * as DegreeService from "../../service/DegreeService";
import "./createUpdateTeacher.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { storage } from "../../config/firebaseConfig";

export const CreateTeacher = () => {
    const [faculties, setFaculties] = useState([]);
    const [degrees, setDegrees] = useState([]);
    const [avatar, setAvatar] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState('');
    const [errorData, setErrorData] = useState({});

    const [isPhoneTouched, setIsPhoneTouched] = useState(true);
    const [isEmailTouched, setIsEmailTouched] = useState(true);
    const [isAgeTouched, setIsAgeTouched] = useState(true);
    const [isNameTouched, setIsNameTouched] = useState(true);

    const handlePhoneTouched = () => {
        setIsPhoneTouched(false);
    };

    const handleEmailTouched = () => {
        setIsEmailTouched(false);
    };

    const handleAgeTouched = () => {
        setIsAgeTouched(false);
    };

    const handleNameTouched = () => {
        setIsNameTouched(false);
    };





    useEffect(() => {
        const fetchData = async () => {
            try {
                const facultyList = await FacultyService.findAllFaculty();
                const degreeList = await DegreeService.findAllDegree();
                setFaculties(facultyList);
                setDegrees(degreeList);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);



    const initialValues = {
        name: "",
        dateOfBirth: "",
        address: "",
        phone: "",
        email: "",
        facultyId: 1,
        degreeId: 1,
        gender: true,
    };

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
                const snapshot = await uploadTask;
                const downloadUrl = await snapshot.ref.getDownloadURL();

                setAvatarUrl(downloadUrl);
            } else {
                errorData.avatar = "Avatar không được để trống"
                console.error("Avatar is null");
            }
        } catch (error) {
            console.error("Error uploading avatar:", error);
            throw error;
        }
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        dateOfBirth: Yup.string().required("Date of Birth is required"),
        address: Yup.string().required("Address is required"),
        phone: Yup.string().required("Phone is required").matches("^[0-9]+$","Số điện thoại phải đúng định dạng"),
        email: Yup.string().required("Email is required").email("Invalid email address"),

    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {

            await handleAvatarUpload();
            setIsPhoneTouched(true);
            setIsNameTouched(true);
            setIsEmailTouched(true);
            setIsAgeTouched(true)
            values.avatar = avatar.name;
            const response = await TeacherService.createTeacher(values);
            if (response !== null){
                setErrorData(response);
                toast("Thêm mới giáo viên thất bại");
            }else {
                toast("Thêm mới giáo viên thành công ");
                setErrorData({});
            }
        } catch (error) {
            toast("Thêm mới giáo viên thất bại");
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <div className="container mx-auto">
            <div className="row">
                <div className="col">
                    <h2 className="mt-3 mb-3 the-h2">Thêm Mới Giáo Viên</h2>
                </div>

            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                <Form id="teacherForm">
                    <div className="row">
                        <div className="col-4 d-flex flex-column">
                            <input
                                id="avatar"
                                type="file"
                                className="form-control"
                                placeholder="Name"
                                onChange={onAvatarChange}
                            />
                            <img
                                className="w-100"
                                style={{marginTop:"8px"}}
                                alt="avatar"
                                src={avatarUrl || (avatar ? URL.createObjectURL(avatar) : 'default-avatar.png')}
                            />
                            {errorData.errorFileFormat &&   (
                                <div>
                                    <span style={{color:"red"}}>{errorData.errorFileFormat}</span>
                                </div>
                            )}
                            {errorData.avatar &&   (
                                <div>
                                    <span style={{color:"red"}}>{errorData.avatar}</span>
                                </div>
                            )}
                            <label className="label-b">Chọn ảnh đại diện(<span style={{color:"red"}}>*</span>):</label>
                            <label htmlFor="avatar" className="label-custom">Chọn tep</label>

                        </div>
                        <div className="col-4">
                            <div className="form-group">
                                <label htmlFor="name" className="label-input">Tên Giáo Viên (<span style={{color:"red"}}>*</span>):</label>
                                <Field name="name" type="text" className="form-control" placeholder="Name">
                                    {({ field, form, meta }) => (
                                        <div>
                                            <input className="form-control" onFocus={handleNameTouched} type="text" {...field} placeholder="Name"/>

                                        </div>
                                    )}
                                </Field>
                                <ErrorMessage name="name" component="span" className="text-danger"/>
                                {errorData.errorNameSpecialCharacter && isNameTouched &&  (
                                    <div>
                                        <span style={{color:"red"}}>{errorData.errorNameSpecialCharacter}</span>
                                    </div>
                                )}


                                {errorData.errorNameLength && isNameTouched &&  (
                                    <div>
                                        <span style={{color:"red"}}>{errorData.errorNameLength}</span>
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="dateOfBirth" className="label-input-a">Ngày Sinh (<span style={{color:"red"}}>*</span>): </label>
                                <Field name="dateOfBirth" type="date" className="form-control">
                                    {({ field, form, meta }) => (
                                        <div>
                                            <input className="form-control" onFocus={handleAgeTouched} type="date" {...field} />

                                        </div>
                                    )}
                                </Field>
                                {errorData.errorDateMin && isAgeTouched &&  (
                                    <div>
                                        <span style={{color:"red"}}>{errorData.errorDateMin}</span>
                                    </div>
                                )}

                                {errorData.errorDateMax && isAgeTouched &&  (
                                    <div>
                                        <span style={{color:"red"}}>{errorData.errorDateMax}</span>
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="address" className="label-input-a">Địa Chỉ (<span style={{color:"red"}}>*</span>):</label>
                                <Field name="address" type="text" className="form-control" placeholder="Address">
                                    {({field, form, meta}) => (
                                        <div>
                                                <textarea className="form-control" style={{height:"125px"}}
                                                          type="text" {...field} placeholder="Phone"/>

                                        </div>
                                    )}
                                </Field>
                                <ErrorMessage name="address" component="span" className="text-danger"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone" className="label-input-a">Số Điện Thoại (<span style={{color:"red"}}>*</span>): </label>
                                <Field   name="phone" type="text" className="form-control" placeholder="Phone">
                                    {({ field, form, meta }) => (
                                        <div>
                                            <input className="form-control" onFocus={handlePhoneTouched} type="text" {...field} placeholder="Phone"/>

                                        </div>
                                    )}
                                </Field>
                                <ErrorMessage name="phone" component="span" className="text-danger"/>
                                {errorData.errorPhoneDuplicate && isPhoneTouched &&  (
                                    <div>
                                        <span style={{color:"red"}}>{errorData.errorPhoneDuplicate}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group">
                                <label htmlFor="email" className="label-input">Email (<span style={{color:"red"}}>*</span>):</label>
                                <Field name="email" type="email" className="form-control" placeholder="Email">
                                    {({ field, form, meta }) => (
                                        <div>
                                            <input className="form-control" onFocus={handleEmailTouched} type="text" {...field} placeholder="Phone"/>

                                        </div>
                                    )}
                                </Field>

                                <ErrorMessage name="email" component="span" className="text-danger"/>
                                {errorData.errorEmailDuplicate && isEmailTouched && (
                                    <div>
                                        <span style={{color:"red"}}>{errorData.errorEmailDuplicate}</span>
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="facultyId" className="label-input-a">Khoa (<span style={{color:"red"}}>*</span>): </label>
                                <Field name="facultyId" as="select" className="form-control">
                                    {faculties.map((faculty) => (
                                        <option key={faculty.id} value={faculty.id}>
                                            {faculty.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="facultyId" component="span" className="text-danger"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="degreeId" className="label-input-a">Học Vị (<span style={{color:"red"}}>*</span>): </label>
                                <Field name="degreeId" as="select" className="form-control">
                                    {degrees.map((degree) => (
                                        <option key={degree.id} value={degree.id}>
                                            {degree.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="degreeId" component="span" className="text-danger"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="gender" className="label-input-a">Giới Tính (<span style={{color:"red"}}>*</span>):</label>
                                <Field name="gender" as="select" className="form-control">
                                    <option value={true}>Male</option>
                                    <option value={false}>Female</option>
                                </Field>
                                <ErrorMessage name="gender" component="span" className="text-danger"/>
                            </div>
                            <div className="form-group d-flex justify-content-end">
                                <button type="submit" className="btn btn-outline-success me-2  mt-2">
                                    Lưu
                                </button>
                                <button type="reset" className="btn btn-outline-dark  mt-2">
                                    Hủy
                                </button>
                            </div>
                        </div>
                    </div>



                </Form>
                )}
            </Formik>

        </div>
    );
};

export default CreateTeacher;
