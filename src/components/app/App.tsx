import { Component } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { getData } from '../../services/service';

//pages
import AboutMe from '../../pages/about-me/AboutMe';
import Contacts from '../../pages/contacts/Contacts';
import NotFound from '../../pages/not-found/NotFound';
import PortfolioCollections from '../../pages/portfolio-collections/PortfolioCollections';
import { collectionPhoto } from '../types/types';
import PortfolioCollection from '../../pages/portfolio-collection/PortfolioCollection';
import { RedirectToCollection } from '../../pages/portfolio-collection/PortfolioCollectionClass';

// styles
import "./app.scss";
import "./app_Media.scss";

//types
export type namePages = "aboutMe" | "portfolio" | "contacts";
interface IState {
    visiblePage: namePages,
	collectionsPhoto: collectionPhoto[],
	isLoading: boolean,
	urlJson: string
}
interface IProps {

}

class App extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.state = {
			isLoading: false,
			collectionsPhoto: [],
			visiblePage: "aboutMe",
			urlJson: "/imagesTest.json"
		}
	}

	componentDidMount() {
		getData(this.state.urlJson)
        .then(result => {
            this.setState({
				collectionsPhoto: result.collections,
				isLoading: true
			});
        })
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
		const {isLoading, urlJson, collectionsPhoto} = this.state;
		
		return (
			<BrowserRouter>
				<div className="App" onClick={this.onCloseMobileMenu}>
					<Routes>
						<Route path="/" element={<Navigate to="/AboutMe" />} />
						<Route path="/AboutMe" element={<AboutMe/>}  />
						<Route path="/PhotoCollections" element={<PortfolioCollections collectionsPhoto={collectionsPhoto} urlJson={urlJson} />} />
						<Route path="/Contacts" element={<Contacts/>} />
						
						{/* <Route path="/PhotoCollections/:collectionName" element={<PortfolioCollection collectionsPhotoProp={collectionsPhoto} urlJson={urlJson} />}/> */}
						<Route path="/PhotoCollections/:nameCollection" element={<RedirectToCollection collectionsPhotoProp={collectionsPhoto} urlJson={urlJson} />} /> TEST

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
