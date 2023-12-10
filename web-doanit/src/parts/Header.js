import React, {useEffect} from 'react';
import '../assets/js/PageEffect'
import {
    initMenuEffects,
    initScrollActiveEffect,
    initScrollHeaderEffect,
    initScrollUpEffect
} from "../assets/js/PageEffect"
const Header = () => {
    useEffect(() => {
        // Gọi các hàm khởi tạo hiệu ứng từ PageEffects
        initMenuEffects();
        initScrollHeaderEffect();
        initScrollUpEffect();
        initScrollActiveEffect();

    }, []); // useEffect chỉ chạy một lần khi component được tạo
    return (
        <header className="header" id="header">
            <nav className="nav container">
                <a href="#home" className="nav__logo">
                    <img src={`${process.env.PUBLIC_URL}/assets/img/logo.jpg`} alt=""/>
                        <h1>DoanIT</h1>
                </a>

                <div className="nav__menu" id="nav-menu">
                    <ul className="nav__list">
                        <li className="nav__item">
                            <a href="#home" className="nav__link active-link">Trang chủ</a>
                        </li>
                        <li className="nav__item">
                            <a href="#news" className="nav__link">Tin tức</a>
                        </li>
                        <li className="nav__item">
                            <a href="#projects" className="nav__link">Đề tài nổi bật</a>
                        </li>
                        <li className="nav__item">
                            <a href="#contact" className="nav__link">Liên hệ</a>
                        </li>
                        {/*Sau khi đăng nhập sẽ hiện ra các chức năng của giáo viên */}
                        {/*<li className="nav__item"><a href="#" className="nav__link">Giáo viên <i*/}
                        {/*    className="fas fa-caret-down"></i></a>*/}
                        {/*    <div className="dropdown-menu">*/}
                        {/*        <ul>*/}
                        {/*            <li><a href="#">Đăng thông báo</a></li>*/}
                        {/*            <li><a href="#">Danh sách đề tài</a></li>*/}
                        {/*            <li><a href="#">Kiểm duyệt đề tài</a></li>*/}
                        {/*            <li><a href="#">Danh sách sinh viên</a></li>*/}
                        {/*            <li><a href="#">Quản lý tiến độ</a></li>*/}
                        {/*            <li><a href="#">Tài liệu hướng dẫn</a></li>*/}
                        {/*        </ul>*/}
                        {/*    </div>*/}
                        {/*</li>*/}
                        <li className="nav__item">
                            <a href="#login" className="nav__link">Đăng nhập</a>
                        </li>
                        {/*Sau khi đăng nhập sẽ thay thế chữ đăng nhập*/}
                        {/*<li className="nav__item">*/}
                        {/*    <img src="assets/img/gv.jpg" alt="User Avatar" className="user-avatar"/>*/}
                        {/*        <a href="#" className="nav__link">Nguyễn Công <i className="fas fa-caret-down"></i></a>*/}
                        {/*        <div className="dropdown-menu">*/}
                        {/*            <ul>*/}
                        {/*                <li><a href="#"><i className="fas fa-user"></i>Xem thông tin</a></li>*/}
                        {/*                <li><a href="#"><i className="fas fa-sign-out-alt"></i>Đăng xuất</a></li>*/}
                        {/*            </ul>*/}
                        {/*        </div>*/}
                        {/*</li>*/}
                    </ul>

                    <div className="nav__close" id="nav-close">
                        <i className="ri-close-line"></i>
                    </div>
                </div>

                <div className="nav__toggle" id="nav-toggle">
                    <i className="ri-function-line"></i>
                </div>
            </nav>
        </header>
    );
};

export default Header;