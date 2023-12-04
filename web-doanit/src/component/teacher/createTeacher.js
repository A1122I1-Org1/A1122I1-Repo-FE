import React, { useEffect, useState } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import * as TeacherService from "../../service/TeacherService";
import * as FacultyService from "../../service/FacultyService";
import * as DegreeService from "../../service/DegreeService";
import "./createTeacher.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { storage } from "../../config/firebaseConfig";

export const CreateTeacher = () => {
    const [faculties, setFaculties] = useState([]);
    const [degrees, setDegrees] = useState([]);
    const [avatar, setAvatar] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState('');

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
            const uploadTask = storage.ref(`${avatar.name}`).put(avatar);
            const snapshot = await uploadTask;
            const downloadUrl = await snapshot.ref.getDownloadURL();

            setAvatarUrl(downloadUrl);
        } catch (error) {
            console.error("Error uploading avatar:", error);
            throw error;
        }
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        dateOfBirth: Yup.string().required("Date of Birth is required"),
        address: Yup.string().required("Address is required"),
        phone: Yup.string().required("Phone is required"),
        email: Yup.string().required("Email is required").email("Invalid email address"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await handleAvatarUpload();
            values.avatar = avatar.name;
            const response = await TeacherService.createTeacher(values);
            toast.success("Teacher added successfully with ID: " + response.teacherId);
        } catch (error) {
            toast.error("Error adding teacher");
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <div className="container mx-auto">
            <div className="row">
                <div className="col">
                    <h2 className="mt-3 mb-3">Thêm Mới Giáo Viên</h2>
                </div>

            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
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
                                style={{width: '100px'}}
                                alt="avatar"
                                src={avatarUrl || (avatar ? URL.createObjectURL(avatar) : 'default-avatar.png')}
                            />
                            <label htmlFor="avatar" className="label-custom">Chọn tep</label>
                        </div>
                        <div className="col-4">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <Field name="name" type="text" className="form-control" placeholder="Name"/>
                                <ErrorMessage name="name" component="span" className="text-danger"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="dateOfBirth">Date of Birth</label>
                                <Field name="dateOfBirth" type="text" className="form-control"/>
                                <ErrorMessage name="dateOfBirth" component="span" className="text-danger"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <Field name="address" type="text" className="form-control" placeholder="Address"/>
                                <ErrorMessage name="address" component="span" className="text-danger"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <Field name="phone" type="text" className="form-control" placeholder="Phone"/>
                                <ErrorMessage name="phone" component="span" className="text-danger"/>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field name="email" type="email" className="form-control" placeholder="Email"/>
                                <ErrorMessage name="email" component="span" className="text-danger"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="facultyId">Faculty</label>
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
                                <label htmlFor="degreeId">Degree</label>
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
                                <label htmlFor="gender">Gender</label>
                                <Field name="gender" as="select" className="form-control">
                                    <option value={true}>Male</option>
                                    <option value={false}>Female</option>
                                </Field>
                                <ErrorMessage name="gender" component="span" className="text-danger"/>
                            </div>
                        </div>
                    </div>


                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </Form>

            </Formik>

        </div>
    );
};

export default CreateTeacher;
