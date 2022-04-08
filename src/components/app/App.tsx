import React, { Component, FC } from 'react';
import { BrowserRouter, Route, Routes, Navigate, useParams } from 'react-router-dom';
import { getPhotos } from '../../services/service';

//pages
import AboutMe from '../../pages/about-me/AboutMe';
import Contacts from '../../pages/contacts/Contacts';
import NotFound from '../../pages/not-found/NotFound';
import PortfolioCollections from '../../pages/portfolio-collections/PortfolioCollections';

// styles
import "./app.scss";
import "./app_Media.scss";

//types
import { collectionPhoto } from '../types/types';
import PortfolioCollection from '../../pages/portfolio-collection/PortfolioCollection';
export type namePages = "aboutMe" | "portfolio" | "contacts";
interface IState {
    visiblePage: namePages,
	collectionsPhoto: collectionPhoto[],
	isLoading: boolean
}
interface IProps {

}

class App extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.state = {
			isLoading: false,
			collectionsPhoto: [],
			visiblePage: "aboutMe"
		}
	}

	componentDidMount() {
		getPhotos("imagesTest.json")
        .then(result => {
            this.setState({
				collectionsPhoto: result.collections,
				isLoading: true
			});
        })

		// const localNamePages = localStorage.getItem("namePage");
		// if(!localNamePages)
		// 	localStorage.setItem("namePage", "aboutMe");
		// else if(this.isTypeNamePages(localNamePages))
		// 	this.setState({visiblePage: localNamePages})
	}

	// componentDidUpdate(prevProps: IProps, prevState: IState) {
	// 	if(prevState.visiblePage !== this.state.visiblePage) 
	// 		localStorage.setItem("namePage", this.state.visiblePage)
	// }
	
	// isTypeNamePages = (variable: any): variable is namePages => {
	// 	return variable === "aboutMe" || "portfolio" || "contacts" ? true : false;
	// }

	// onChangePage = (namePage: namePages) => {
	// 	this.setState({visiblePage: namePage})
    // }

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
		const {isLoading, collectionsPhoto} = this.state;
		
		return (
			<BrowserRouter>
				<div className="App" onClick={this.onCloseMobileMenu}>
					<Routes>
						<Route path="/" element={<Navigate to="/AboutMe" />} />
						<Route path="/AboutMe" element={<AboutMe/>}  />
						<Route path="/Portfolio" element={<PortfolioCollections/>} />
						<Route path="/Contacts" element={<Contacts/>} />
						
						<Route path="/Portfolio/:collectionName" element={(<PortfolioCollection/>)}/>
						{/* <Route path="/Portfolio/:collectionName" element={(props: any) => (<PortfolioCollection collectionsPhoto={collectionsPhoto} {...props}/>)}/> */}
						<Route path="*" element={<NotFound/>} ></Route>
					</Routes>
				</div>
			</BrowserRouter>
		);
	}
}

// const View: FC = () => {

// 	return 
// }

export default App;
