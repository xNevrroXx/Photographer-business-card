import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

//pages
import AboutMe from '../pages/about-me/AboutMe';
import Contacts from '../pages/contacts/Contacts';
import NotFound from '../pages/not-found/NotFound';
import Portfolio from '../pages/portfolio/Portfolio';

// styles
import "./app.scss";
import "./app_Media.scss";

export type namePages = "aboutMe" | "portfolio" | "contacts";

interface IState {
    visiblePage: namePages
}
interface IProps {

}

class App extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.state = {
			visiblePage: "aboutMe"
		}
	}

	componentDidMount() {
		const localNamePages = localStorage.getItem("namePage");

		if(!localNamePages)
			localStorage.setItem("namePage", "aboutMe");
		else if(this.isTypeNamePages(localNamePages))
			this.setState({visiblePage: localNamePages})
	}

	componentDidUpdate(prevProps: IProps, prevState: IState) {
		if(prevState.visiblePage !== this.state.visiblePage) 
			localStorage.setItem("namePage", this.state.visiblePage)
	}
	
	isTypeNamePages = (variable: any): variable is namePages => {
		return variable === "aboutMe" || "portfolio" || "contacts" ? true : false;
	}

	onChangePage = (namePage: namePages) => {
		this.setState({visiblePage: namePage})
    }

	onCloseMobileMenu = (e: any) => {
        const clickedElement = e.target;
        if( !clickedElement.classList.contains("header__menu-less-1000") &&
            !clickedElement.classList.contains("header__linkPage") &&
			!clickedElement.classList.contains("header__burger") && 
			!clickedElement.classList.contains("header__burger-line")
			|| 
			clickedElement.getAttribute("data-page") === this.state.visiblePage
		)
		{
			const burger : any = document.querySelector(".header__burger");
        	const mobileMenu: any = document.querySelector(".header__menu-less-1000");

			burger.style.right = "10%";
			mobileMenu.style.right = "-100%";
        } 

    }

	render() {
		// const {visiblePage} = this.state;
		// const aboutMe = visiblePage === "aboutMe" ? <AboutMe onChangePage={this.onChangePage}/> : null,
		// 	  contacts = visiblePage === "contacts" ? <Contacts onChangePage={this.onChangePage}/> : null,
		// 	  portfolio = visiblePage === "portfolio" ? <Portfolio onChangePage={this.onChangePage}/> : null;
		
		return (
			<BrowserRouter>
				<div className="App" onClick={this.onCloseMobileMenu}>
					{/* {aboutMe}
					{contacts}
					{portfolio} */}
					<Routes>
						<Route path="/" element={<Navigate to="/AboutMe" />}></Route>

						<Route path="/AboutMe" element={<AboutMe/>} >
							{/* <AboutMe onChangePage={this.onChangePage}/> */}
						</Route>
						<Route path="/Portfolio" element={<Portfolio/>} >
							{/* <Contacts onChangePage={this.onChangePage}/> */}
						</Route>
						<Route path="/Contacts" element={<Contacts/>} >
							{/* <Portfolio onChangePage={this.onChangePage}/> */}
						</Route>

						<Route path="*" element={<NotFound/>} >
							{/* <NotFound/>	 */}
						</Route>
					</Routes>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
