import {FC, lazy, MouseEvent, Suspense, useCallback, useEffect, useState} from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
// own modules
import { getData } from '../services/service';
import { Spinner } from "../components/spinner/Spinner";
// types
import { TCollectionPhoto } from '../components/types/TCollectionPhoto';
// styles
import "./app.scss";
import "./app_Media.scss";
//pages
const AboutMe = lazy(() => import('../pages/about-me/AboutMe'));
const Contacts = lazy(() => import('../pages/contacts/Contacts'));
const NotFound = lazy(() => import('../pages/not-found/NotFound'));
const PortfolioCollections = lazy(() => import('../pages/portfolio-collections/PortfolioCollections'));
const PortfolioCollection = lazy(() => import( "../pages/portfolio-collection/PortfolioCollection"));

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
				<Suspense fallback={<Spinner textProp="Загружаю контент" />}>
					<Routes>
						<Route path="/" element={<Navigate to="/about-me" />} />
						<Route path="/about-me" element={<AboutMe/>}  />
						<Route path="/contacts" element={<Contacts/>} />
						<Route path="/photo-collections" element={<PortfolioCollections collectionsPhotoProp={collectionsPhoto} />} />
						<Route path="/photo-collections/:nameCollection" element={<PortfolioCollection collectionsPhotoProp={collectionsPhoto}/>} />

						<Route path="*" element={<NotFound/>} ></Route>
					</Routes>
				</Suspense>
			</div>
		</BrowserRouter>
	);
}

export default App;
