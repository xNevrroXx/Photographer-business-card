import { FC } from "react";
import { Link } from "react-router-dom";
// styles
import "./header.scss";
import "./header_Media.scss";


const Header: FC = () => {

    const onOpen = (event: any) => {
        const burger = event.currentTarget;
        const mobileMenu: HTMLElement | null = document.querySelector(".header__menu-less-1000");

        if (!burger || !mobileMenu) throw new Error("burger and mobileMenu are required");
        burger.style.right = "-100%";
        mobileMenu.style.right = "0%";
    }

    return (
        <header className="header" /* styles={{marginBottom: mb}} */>
            <div className="header__title">Фатеев</div>

            <nav className="header__menu header__menu-desktop">
                <ul>
                    <li><Link to="/about-me" className="header__link-page">обо мне</Link></li>
                    <li><Link to="/photo-collections" className="header__link-page">фотоколлекции</Link></li>
                    <li><Link to="/contacts" className="header__link-page">контакты</Link></li>
                </ul>
            </nav>

            <button className="header__burger" onClick={onOpen} >
                <div className="header__burger-line"></div>
                <div className="header__burger-line"></div>
                <div className="header__burger-line"></div>
            </button>
            <nav className="header__menu header__menu-less-1000">
                <ul>
                    <li><Link to="/about-me" className="header__link-page">обо мне</Link></li>
                    <li><Link to="/photo-collections" className="header__link-page">фотоколлекции</Link></li>
                    <li><Link to="/contacts" className="header__link-page">контакты</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;