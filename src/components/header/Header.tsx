import { Component } from "react";
import { Link } from "react-router-dom";

// styles
import "./header.scss";
import "./header_Media.scss";

// types
import {namePages} from "../app/App";
interface IProps {
    // onChangePage: (namePage: namePages) => void,
    // mb: string //margin-bottom
}
interface IState {
    visiblePage: namePages
}

class Header extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            visiblePage: "aboutMe"
        }
    }
    // static defaultProps = {
    //     mb: "90px"
    // }

    componentDidMount() {
        
    }

    burgerHandler = (e: any) => {
        const burger = e.currentTarget;
        const mobileMenu: any = document.querySelector(".header__menu-less-1000");

        burger.style.right = "-100%";
        mobileMenu.style.right = "0%";
    }

/*     onChangePage = (e: any) => {
        const namePage: namePages = e.target.getAttribute("data-page");

        this.setState({visiblePage: namePage});
        this.props.onChangePage(namePage);
    } */

    render() {
        // const {mb} = this.props;
        
        return (
            <header className="header" /* style={{marginBottom: mb}} */>
                <div className="header__title">Фатеев</div>

                <nav className="header__menu header__menu-desktop">
                    <ul>
                        <li><Link to="/AboutMe" className="header__linkPage">обо мне</Link></li>   
                        <li><Link to="/PhotoCollections" className="header__linkPage">фотоколлекции</Link></li>         
                        <li><Link to="/Contacts" className="header__linkPage">контакты</Link></li>
                        {/* <li><a className="header__linkPage" href="#" onClick={(e) => this.onChangePage(e)} data-page="aboutMe">обо мне</a></li>
                        <li><a className="header__linkPage" href="#" onClick={(e) => this.onChangePage(e)} data-page="portfolio">портфолио</a></li>
                        <li><a className="header__linkPage" href="#" onClick={(e) => this.onChangePage(e)} data-page="contacts">контакты</a></li> */}
                    </ul>
                </nav>

                <button className="header__burger" onClick={this.burgerHandler} >
                    <div className="header__burger-line"></div>
                    <div className="header__burger-line"></div>
                    <div className="header__burger-line"></div>    
                </button>
                <nav className="header__menu header__menu-less-1000">
                    <ul>      
                        <li><Link to="/AboutMe" className="header__linkPage">обо мне</Link></li>   
                        <li><Link to="/PhotoCollections" className="header__linkPage">фотоколлекции</Link></li>         
                        <li><Link to="/Contacts" className="header__linkPage">контакты</Link></li>                                  
                        {/* <li><a className="header__linkPage" href="#" onClick={(e) => this.onChangePage(e)} data-page="aboutMe">обо мне</a></li>
                        <li><a className="header__linkPage" href="#" onClick={(e) => this.onChangePage(e)} data-page="portfolio">портфолио</a></li>
                        <li><a className="header__linkPage" href="#" onClick={(e) => this.onChangePage(e)} data-page="contacts">контакты</a></li> */}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default Header;