import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate, useLocation, useParams } from 'react-router-dom';
import { getData } from '../services/service';
import { CSSTransition, TransitionGroup } from "react-transition-group";

//components
import Header from '../components/header/Header';
//pages
import AboutMe from '../components/pages/about-me/AboutMe';
import Contacts from '../components/pages/contacts/Contacts';
import NotFound from '../components/pages/not-found/NotFound';
import PortfolioCollections from '../components/pages/portfolio-collections/PortfolioCollections';
import PortfolioCollection from '../components/pages/portfolio-collection/PortfolioCollection';
import { RedirectToCollection } from '../components/pages/portfolio-collection/PortfolioCollectionClass';

// styles
import "./app.scss";
import "./app_Media.scss";

//types
import { IStateApp} from '../interfaces/interfaces';
import { Spinner2 } from '../components/loading/Spinner2';


const urlJson = "/imagesTest.json";
// const getRoutes = (pathDefaultPage: string, collectionsPhoto: IState["collectionsPhoto"], urlJson: IState["urlJson"]): routes => [
// 	{path: "/", name: "", Component: Navigate, props: {to: pathDefaultPage}},
// 	{path: "/AboutMe", name: "", Component: AboutMe},
// 	{path: "/PhotoCollections", name: "", Component: PortfolioCollections, props: {collectionsPhoto: collectionsPhoto, urlJson: urlJson}},
// 	{path: "/Contacts", name: "", Component: Contacts},
// 	{path: "/PhotoCollections/:nameCollection", name: "", Component: RedirectToCollection, props: {collectionsPhoto: collectionsPhoto, urlJson: urlJson}},
// 	{path: "*", name: "not found", Component: NotFound}
// ]

const App = () => {
	const [isLoading, setIsLoading] = useState<IStateApp["isLoading"]>(false),
		  [visiblePage, setVisiblePage] = useState<IStateApp["visiblePage"]>("aboutMe"),
		  [collectionsPhoto, setCollectionsPhoto] = useState<IStateApp["collectionsPhoto"]>([]);

	// const routes = useMemo(() => getRoutes("/AboutMe", collectionsPhoto, "/imagesTest.json"), [collectionsPhoto]);

	useEffect(() => {
		getData(urlJson)
			.then(result => {
				setCollectionsPhoto(result.collections);
				setIsLoading(true);
			})
	}, [])

	const onCloseMobileMenu = (e: any) => {
        const clickedElement = e.target;
        if( !clickedElement.classList.contains("header__menu-less-1000") &&
            !clickedElement.classList.contains("header__linkPage") &&
			!clickedElement.classList.contains("header__burger") && 
			!clickedElement.classList.contains("header__burger-line")
			||
			clickedElement.getAttribute("data-page") === visiblePage
		)
		{
			const burger : any = document.querySelector(".header__burger");
        	const mobileMenu: any = document.querySelector(".header__menu-less-1000");

			burger.style.right = "10%";
			mobileMenu.style.right = "-100%";
        }
    }

	return (
		<BrowserRouter>
			<div className="App" onClick={onCloseMobileMenu}>
				{isLoading ? (
					<Routes>
						<Route path="/" element={<Navigate to="/AboutMe" />} />
						<Route path="/AboutMe" element={<AboutMe/>}  />
						<Route path="/PhotoCollections" element={<PortfolioCollections collectionsPhoto={collectionsPhoto} urlJson={urlJson} />} />
						<Route path="/Contacts" element={<Contacts/>} />
						
						<Route path="/PhotoCollections/:nameCollection" element={<RedirectToCollection collectionsPhotoProp={collectionsPhoto} urlJson={urlJson} />} />

						<Route path="*" element={<NotFound/>} />
						{/* {routes.map(({path, Component, props}) => 
							<Route key={path} path={path} element={
								<CSSTransition
									timeout={300}
									classNames="page"
									unmountOnExit
								>
									<div className="page">
										<Component {...props} />
									</div>
								</CSSTransition>
							} />
						)} */}
					</Routes>
				): <Spinner2 textProp='Секундочку' />}
			</div>
		</BrowserRouter>
	);
}

// const View: FC = () => {

// 	return 
// }

export default App;
