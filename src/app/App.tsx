import { FC, MouseEvent, useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
// own modules
import { getData } from '../services/service';
//pages
import AboutMe from '../pages/about-me/AboutMe';
import Contacts from '../pages/contacts/Contacts';
import NotFound from '../pages/not-found/NotFound';
import PortfolioCollections from '../pages/portfolio-collections/PortfolioCollections';
import PortfolioCollection from "../pages/portfolio-collection/PortfolioCollection";
// types
import { TCollectionPhoto } from '../components/types/TCollectionPhoto';
// styles
import "./app.scss";
import "./app_Media.scss";

const App: FC = () => {
	// const location = useLocation();
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [collectionsPhoto, setCollectionsPhoto] = useState<TCollectionPhoto[]>([]);

	useEffect(() => {
		getData(import.meta.env.VITE_JSON_URL)
			.then(result => {
				setCollectionsPhoto(result.collections);
				setIsLoaded(true);
			})
	}, [])

	const onCloseMobileMenu = useCallback((event: MouseEvent<HTMLDivElement>) => {
		const clickedElement = event.target;
		if (!clickedElement) throw new Error("No element was clicked");

		if (clickedElement instanceof HTMLElement)
			if( !clickedElement.classList.contains("header__menu-less-1000") &&
				!clickedElement.classList.contains("header__linkPage") &&
				!clickedElement.classList.contains("header__burger") &&
				!clickedElement.classList.contains("header__burger-line")
			)
			{
				const burger: HTMLElement | null = document.querySelector(".header__burger");
				const mobileMenu: HTMLElement | null = document.querySelector(".header__menu-less-1000");
				if (!burger || !mobileMenu) throw new Error("Could not find burger or mobile menu");

				burger.style.right = "10%";
				mobileMenu.style.right = "-100%";
			}
	}, [])

	return (
		<BrowserRouter>
			<div className="app" onClick={onCloseMobileMenu}>
				<div className="app__background-fixed-image"/>
				<Routes>
					<Route path="/" element={<Navigate to="/about-me" />} />
					<Route path="/about-me" element={<AboutMe/>}  />
					<Route path="/contacts" element={<Contacts/>} />
					<Route path="/photo-collections" element={<PortfolioCollections collectionsPhotoProp={collectionsPhoto} />} />
					<Route path="/photo-collections/:nameCollection" element={<PortfolioCollection collectionsPhotoProp={collectionsPhoto}/>} />

					<Route path="*" element={<NotFound/>} ></Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
