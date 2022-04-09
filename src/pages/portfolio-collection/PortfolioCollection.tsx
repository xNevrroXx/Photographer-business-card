import { Component, FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import Social from "../../components/social/Social";
import { getPhotos } from "../../services/service";

//styles
import "./portfolio-collection.scss";

//types
import { collectionPhoto } from "../../components/types/types";
import setHorizontalWheel from "../../components/horizontalWheelFunc/horizontalWheel";
import createCollage from "../../components/collagePhotoPlugin/collagePhotoPlugin";

const PortfolioCollection: FC = () => {
    const [collectionObj, setCollectionObj] = useState<collectionPhoto>(),
          [listSubtitles, setListSubtitles] = useState<string[]>([]),
          [collectionsPhoto, setCollectionsPhoto] = useState<collectionPhoto[]>([]);

    const nameUrl = useParams().collectionName;

    useEffect(() => {
        getPhotos("/imagesTest.json")
        .then((result: {collections: collectionPhoto[]}) => {
            const collectionsPhotoTemp: collectionPhoto[] = result.collections;
            
            setCollectionsPhoto(collectionsPhotoTemp);
        }); 

        const element = document.querySelector("main");
        if(element) {
            const horizontalWheel = (e: any) => setHorizontalWheel.call(null, e, 100, element);

            element.addEventListener("wheel", horizontalWheel);
            return () => element.removeEventListener("wheel", horizontalWheel);
        }
    }, [])

    useEffect(() => {
        if(collectionsPhoto != null) {
            const collectionTemp = collectionsPhoto.find(element => element.nameUrl == nameUrl);    
            const subtitlesTemp: string[] = [];
    
            if(collectionTemp != undefined) {
                for(let i = 0; i < collectionTemp.images.length/2; i++) {
                    subtitlesTemp.push(collectionTemp.name)
                }
                
                setCollectionObj(collectionTemp);
                setListSubtitles(subtitlesTemp);
            }
        }
    }, [collectionsPhoto])

    useEffect(() => {
        if(collectionObj != null) {
            createCollage({selectorContainer: ".portfolio-collection__wrapper-photos"});
        }
    }, [collectionObj])

    let mainStyle;
    if(collectionObj && collectionObj.images) 
        mainStyle = {width: `calc((400px*${collectionObj.images.length / 1.65 }) + (${collectionObj.images.length / 2}*2px))`};
    else mainStyle = {};

    return (
        <div className="portfolio-collection">
            <div className="container">
                <Header/>
            </div>

            <main>
                {
                    listSubtitles.length > 0 ? (
                        <div className="portfolio-collection__list-subtitle">
                            {
                                listSubtitles.map((subtitle, index) => 
                                    <div className="portfolio-collection__subtitle" style={{width: `calc(100% / ${listSubtitles.length})`}} key={`subtitle-${index}`}>{subtitle}</div>
                                )
                            }
                        </div>
                    ) : null
                }

                {
                    collectionObj != undefined ? (
                        <div className="portfolio-collection__wrapper-photos"
                        >
                            {
                                collectionObj.images.map((image, index) => (
                                    <div 
                                        className="portfolio-collection__wrapper-photo"
                                        key={`image-${index}`}
                                        >
                                        <img src={image.url} alt={collectionObj.name} className="portfolio-collection__photo"/>
                                    </div>
                                ))
                            }
                        </div>
                    ) : null
                }

                {
                    listSubtitles.length > 0 ? (
                        <div className="portfolio-collection__list-subtitle">
                            {
                                listSubtitles.map((subtitle, index) => 
                                    <div className="portfolio-collection__subtitle" style={{width: `calc(100% / ${listSubtitles.length})`}} key={`downSubtitle-${index}`}>{subtitle}</div>
                                )}
                        </div>
                    ) : null    
                }
            </main>

            <div className="container">
                <Social/>
            </div>
        </div>
    )
}

export default PortfolioCollection;

function e(element: HTMLElement | null, e: any) {
    throw new Error("Function not implemented.");
}
