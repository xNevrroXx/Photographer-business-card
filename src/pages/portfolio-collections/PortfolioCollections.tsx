import { FC, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
// own modules
import Header from "../../components/header/Header";
import Social from "../../components/social/Social";
import {getData} from "../../services/service";
// styles
import "./portfolio-collections.scss";
import "./portfolio-collections_Media.scss";
// types
import { TCollectionPhoto } from "../../components/types/types";

interface IProps {
    collectionsPhotoProp: TCollectionPhoto[]
}

const PortfolioCollections: FC<IProps> = ({collectionsPhotoProp}) => {
    const [collectionsPhoto, setCollectionsPhoto] = useState(collectionsPhotoProp);

    useEffect(() => {
        if(collectionsPhoto.length == 0)
        {
            getData(import.meta.env.VITE_JSON_URL)
                .then((result: {collections: TCollectionPhoto[]}) => {
                    const response: TCollectionPhoto[] = result.collections;
                    setCollectionsPhoto(response);
                });
        }
    }, [collectionsPhotoProp])

    const collectionsPhotoElems = useMemo(() =>
        collectionsPhoto.map((collection, index) => {
            return (
                <Link
                    to={`/photo-collections/${collection.nameUrl}`}
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
        }), [collectionsPhoto])
    return(
        <>
            <div className="portfolio-collections">
                <div className="container">
                    <Header/>

                    <main>
                        <div className="portfolio-collections__wrapper-collections">
                            <div className="portfolio-collections__wrapper-title">
                                <h2 className="portfolio-collections__title">
                                    фотоколлекции
                                </h2>
                            </div>

                            {collectionsPhotoElems}
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