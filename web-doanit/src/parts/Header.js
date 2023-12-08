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
                        <li className="nav__item">
                            <a href="#login" className="nav__link">Đăng nhập</a>
                        </li>
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