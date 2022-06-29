import { useEffect, useState } from "react";

import Header from "../../header/Header";
import Social from "../../social/Social";
import {getData} from "../../../services/service";

// styles
import "./portfolio-collections.scss";
import "./portfolio-collections_Media.scss";
import { Link } from "react-router-dom";

// types
import { TCollectionPhoto, IStatePortfolioCollections, IPropsPortfolioCollections } from "../../../interfaces/interfaces";


const PortfolioCollections = ({collectionsPhoto: collectionsPhotoProp, urlJson}: IPropsPortfolioCollections) => {
    const [collectionsPhoto, setCollectionPhoto] = useState<IStatePortfolioCollections["collectionsPhoto"]>(collectionsPhotoProp);
        
    useEffect(() => {
        if(collectionsPhoto.length == 0)
        {
            getData(urlJson)
            .then((result: {collections: TCollectionPhoto[]}) => {
                const collectionsPhotoTemp: TCollectionPhoto[] = result.collections;

                setCollectionPhoto(collectionsPhotoTemp);
            }); 
        }
    }, []) 

    return(
        <>                
            <div className="portfolio-collections">
                <div className="container">
					<Header />
                    
                    <main>
                        <div className="portfolio-collections__wrapper-collections">
                            <div className="portfolio-collections__wrapper-title">
                                <h2 className="portfolio-collections__title">
                                    фотоколлекции
                                </h2>
                            </div>

                            {
                                collectionsPhoto.map((collection, index) => {
                                    return (
                                        <Link 
                                            to={`/PhotoCollections/${collection.nameUrl}`} 
                                            className="portfolio-collections__wrapper-collection"
                                            key={`collection-${index}`}
                                        >
                                            <div className="portfolio-collections__darkening"></div>
                                            <h3 className="portfolio-collections__title-collection">{collection.name}</h3>
                                            <video autoPlay muted loop disablePictureInPicture playsInline className="portfolio-collections__wrapper-video">
                                                <source src={collection.mainImgUrl}/>
                                            </video>
                                        </Link>
                                    )
                                })
                            }
                            {/* <div className="portfolio-collections__decorate-corner"></div> */}
                        </div>
                    </main>

                    <footer>
                        <Social/>
                    </footer>
                </div>
            </div>
        </>
    )
}

export default PortfolioCollections;