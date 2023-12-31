import {ErrorMessage, Field, Form, Formik} from "formik";
import React, {useEffect, useState} from "react";
import '../css/ResgiterGroup.css'
import {toast} from "react-toastify";
import * as StudentService from "../service/StudentService"
import {save} from "../service/GroupAccountService";
import images from "../img/Jude-Bellingham-Real-01.jpg"
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {storage} from "../config/firebaseConfig";
import * as Yup from "yup"

export function ResgiterGroupStudent() {
    const [listAdd, setListAdd] = useState([]);
    const [students, setStudents] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [targetPage, setTargetPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageCount = totalPages;
    const [searchKey, setSearchKey] = useState("");
    const [searchKeyTmp, setSearchKeyTmp] = useState("");
    const [avatarUrls, setAvatarUrls] = useState([]);
    // ===========avatar======
    const fetchAvatars = async () => {
        try {
            const avatarUrls = await Promise.all(students.map(async (s) => {
                if (s.avatar) {
                    const downloadUrl = await storage.ref(s.avatar).getDownloadURL();
                    return downloadUrl;
                } else {
                    return null;
                }
            }));
            setAvatarUrls(avatarUrls);
        } catch (error) {
            console.error("Error fetching avatars from Firebase:", error);
        }
    };
    useEffect(() => {
        fetchAvatars();
    }, [students]);
    // ===================================
    // const navigate = useNavigate();
    //================================Call BE=======================
    useEffect(() => {
            const fetchApi = async () => {
                try {
                    const result = await StudentService.findAll(pageNumber, searchKey)
                    setStudents(result.content);
                    setTotalPages(result.totalPages);
                    // const resultGrade = await GradeService.findAll();
                    // setGrades(resultGrade);
                    // const resultFaculty = await FacultyService.findAll();
                    // setFaculties(resultFaculty)
                } catch (error) {
                    // Handle errors from the API call
                    console.error('Error fetching data:', error);
                    // You can set students to an empty array or display an error message
                    setStudents([]);
                    setTotalPages(0);
                }
            }
            fetchApi()
        }, [pageNumber, searchKey]
    )

    //============================Them List============================
    function removeProduct(student) {
        setListAdd(listAdd.filter(item => item !== student))
    }

    ////////////////////////////////////////////////////
    function addProduct(student) {
        // console.log(product)
        setListAdd(prevState => [...prevState, student])
    }

    //====================Search=============================
    const handleSearch = () => {
        setSearchKey(searchKeyTmp);
    };


    return (
        <>
            {/*===================Danh Sach Sinh Vien=============*/}
            <div className="container">
                <h2 className="mt-4 mb-4">Đăng ký nhóm sinh viên</h2>
                {/*====================search==============*/}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-8">
                        </div>
                        <div className="col-4">
                            <div className="input-group mb-3 rounded-pill border p-2">
                                <input type="text" className="form-control border-0" placeholder="Tìm kiếm"
                                       aria-label="Tìm kiếm"
                                       aria-describedby="button-addon2"
                                       value={searchKey}
                                       onChange={(e) => setSearchKeyTmp(e.target.value)}
                                       maxLength={30}/>
                                <button
                                    className="btn btn-outline-secondary border-0  btn-hover-none rounded-circle"
                                    type="button"
                                    id="button-addon2"
                                    onClick={handleSearch}
                                ><i className="bi bi-search"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {students.length === 0 ?
                        <h1 className="text-center">Dữ liệu không tồn tại </h1>
                        : <>
                            {students.map((s, index) => (
                                <div className="col-md-3 mb-4" key={index}>
                                    <div className="card">
                                        <LazyLoadImage
                                            effect="blur" src={avatarUrls[index]} className="card-img-top img-fluid"
                                            alt={`Sinh viên ${s.index}`} width="100%"
                                        />
                                        <div className="card-body white">
                                            <h5 className="card-title student-name">{s.name}</h5>
                                            <p className="card-text"><b> <i className="bi bi-code-square"></i> Mã sinh
                                                viên:</b> {"MSV".concat(s.studentId.toString().padStart(4, "0"))}</p>
                                            <p className="card-text"><b><i className="bi bi-window-sidebar"></i> Ngày
                                                sinh:</b> {s.dateOfBirth}</p>
                                        </div>
                                        <div className="card-footer" style={{height: "90px"}}>
                                            <div style={{textAlign: "center"}}>
                                                <button onClick={fn => addProduct(s)}
                                                        className="btn btn-outline-success"
                                                        style={{marginTop: "15px"}}>Đăng ký
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="row justify-content-center">
                                <div className="col-7 justify-content-center">
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination justify-content-center">
                                            <li className={`page-item ${pageNumber === 0 ? "disabled" : ""}`}>
                                                <a
                                                    className="page-link"
                                                    href="#"
                                                    aria-label="Previous"
                                                    onClick={() => setPageNumber((prevPage) => {
                                                        const newPageNumber = Math.max(prevPage - 1, 0)
                                                        setTargetPage(newPageNumber);
                                                        return newPageNumber
                                                    })
                                                    }
                                                >
                                                    <span aria-hidden="true">&laquo;</span>
                                                    <span className="sr-only"></span>
                                                </a>
                                            </li>
                                            <li className="page-item">
                <span className="input-group">
                  <input
                      type="number"
                      value={targetPage + 1}
                      onChange={(e) => setTargetPage(parseInt(e.target.value, 10) - 1)}
                      className="form-control input-sm"
                      min={1}
                      max={pageCount}
                  />
                  <span className="input-group-text">/{pageCount}</span>
                  <button
                      className="btn btn-primary btn-sm"
                      onClick={() => setPageNumber(Math.max(Math.min(targetPage, pageCount - 1), 0))}>
                    Go
                  </button>
                </span>
                                            </li>
                                            <li className={`page-item ${pageNumber === totalPages - 1 ? "disabled" : ""}`}>
                                                <a
                                                    className="page-link"
                                                    href="#"
                                                    aria-label="Next"
                                                    onClick={() => setPageNumber((prevPage) => {
                                                        const newPageNumber = Math.min(prevPage + 1, totalPages - 1);
                                                        setTargetPage(newPageNumber);
                                                        return newPageNumber;
                                                    })}
                                                >
                                                    <span aria-hidden="true">&raquo;</span>
                                                    <span className="sr-only"></span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>

                        </>
                    }
                </div>
            </div>
            {/*===================Danh Sach Thanh Vien=============*/}

            <h2 className="title" style={{color: "#e9f1e8"}}>Danh sách thành viên nhóm</h2>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <table className="table table-bordered">
                            <thead className="table">
                            <tr className="row-scope">
                                <td style={{backgroundColor: "#b9daa4"}}>Mã sinh viên</td>
                                <td style={{backgroundColor: "#b9daa4"}}>Tên sinh viên</td>
                                <td style={{backgroundColor: "#b9daa4"}}>Ngày sinh</td>
                                <td style={{backgroundColor: "#b9daa4"}}>Chọn</td>
                            </tr>
                            </thead>
                            <tbody className="row-tbody">
                            {listAdd.map(student => (
                                <tr key={student.studentId}>
                                    <td>{student.studentId}</td>
                                    <td>{student.name}</td>
                                    <td>{student.dateOfBirth}</td>
                                    <td>
                                        <button onClick={fn => removeProduct(student)} className='btn btn-danger'>Remove
                                        </button>
                                    </td>

                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <br/>
                {/*============tim kiem========================*/}
                <Formik initialValues={{
                    groupAccount: {
                        id: 1,
                        name: "",
                        students: [],
                    },

                }} onSubmit={values => {
                    values.groupAccount.students = students;
                    console.log(values);
                    save(values.groupAccount)
                    toast('🦄 Resgiter Group successfully!!!!');
                }} validationSchema={Yup.object({
                    groupAccount: Yup.object({
                        name: Yup.string()
                            .required("Tên nhóm không được để trống")
                            .min(5, "Tên phải nhiều hơn 5 ký tự")
                            .max(255, "Tên không vượt quá 255 ký tự")
                            .matches(/^[a-zA-Z\s]+$/, "Tên nhóm không được chứa ký tự đặc biệt")

                })
                })}
                >
                    <Form>
                        <div>
                            <div hidden>
                                <Field name="groupAccount.id" value="1"></Field>
                                <Field name="groupAccount.students" value="[]"></Field>

                            </div>

                                <ErrorMessage name="groupAccount.name" className="text-danger" component="p"/>

                                <Field type="text" className="form-control" placeholder="Nhập vào tên nhóm"
                                       name="groupAccount.name"
                                       aria-label="Username"
                                       aria-describedby="basic-addon1"/>




                        </div>
                        <br/>
                        <button type="submit" className="btn btn-outline-success">Đăng ký nhóm</button>
                    </Form>
                </Formik>

            </div>
            <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
            <script
                src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
            <script
                src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        </>
    )


}

