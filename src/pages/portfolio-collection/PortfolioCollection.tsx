import { CSSProperties, FC, PointerEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../../components/header/Header";
import Social from "../../components/social/Social";
import { getPhotos } from "../../services/service";
import { getNumFromStr } from "../../components/collagePhotoPlugin/techFunctions";

//styles
import "./portfolio-collection.scss";

//types
import { collectionPhoto } from "../../components/types/types";
import { setHorizontalWheel, setLoopHorizontalWheel, setListenerDesktopHorizontalWheel, setHorizontalTapWheelListener } from "../../components/horizontalWheelFunc/horizontalWheel";
import createCollage from "../../components/collagePhotoPlugin/collagePhotoPlugin";

interface IProps {
    urlJson: string
}

const PortfolioCollection: FC<IProps> = ({urlJson}) => {
    const [collectionObj, setCollectionObj] = useState<collectionPhoto>(),
          [listSubtitles, setListSubtitles] = useState<string[]>([]),
          [collectionsPhoto, setCollectionsPhoto] = useState<collectionPhoto[]>([]),
          [styleSubtitles, setStyleSubtitles] = useState<CSSProperties>({display: "none"}),
          [styleCollageContainer, setStyleCollageContainer] = useState<any>({});

    const nameUrl = useParams().collectionName;

    useEffect(() => {
        getPhotos(urlJson)
        .then((result: {collections: collectionPhoto[]}) => {
            const collectionsPhotoTemp: collectionPhoto[] = result.collections;
            
            setCollectionsPhoto(collectionsPhotoTemp);
        }); 
    }, [])

    useEffect(() => {
        if(collectionsPhoto != null) {
            const collectionTemp = collectionsPhoto.find(element => element.nameUrl == nameUrl);    
            const subtitlesTemp: string[] = [];
    
            if(collectionTemp != undefined) {
                for(let i = 0; i < collectionTemp.images.length; i++) {
                    subtitlesTemp.push(collectionTemp.name)
                }
                
                setCollectionObj(collectionTemp);
                setListSubtitles(subtitlesTemp);
            }
        }
    }, [collectionsPhoto])  
 
    useEffect(() => {
        if(collectionObj != null) {
            createCollage({
                selectorContainer: ".portfolio-collection__wrapper-photos",
                widthColumn: "550px"
            });
            setStyleCollageContainer({
                width: window.getComputedStyle(document.querySelector(".collage")!).width,
            });
        }
    }, [collectionObj])

    useEffect(() => {
        const collageContainer: HTMLElement | null = document.querySelector(".collage"),
              wrapperCollage: HTMLElement | null = document.querySelector(".portfolio-collection__wrapper-collage");

        if(collageContainer && styleCollageContainer.width && wrapperCollage) {
            const coumputedWidthCollageContainer: any = styleCollageContainer.width;

            setStyleSubtitles({
                display: "flex",
                width: `${getNumFromStr(coumputedWidthCollageContainer) / listSubtitles.length + "px"}`
            });

            setListenerDesktopHorizontalWheel(wrapperCollage);
            setHorizontalTapWheelListener({element: wrapperCollage, sensetivity: 20, sprayingTime: 5, ratio: 5});
            setLoopWheelSubtitles();
        }
    }, [styleCollageContainer])

    const setLoopWheelSubtitles = () => {
        const elements: NodeListOf<HTMLElement> | null = document.querySelectorAll(".portfolio-collection__list-subtitles");
                
        elements.forEach((element, index) => {
            if(window.innerWidth > getNumFromStr(styleCollageContainer.width)) return;
            if(index == 0) setLoopHorizontalWheel(element, "left", -(getNumFromStr(styleCollageContainer.width) - window.innerWidth), 0);
            else setLoopHorizontalWheel(element, "right", 0, -(getNumFromStr(styleCollageContainer.width) - window.innerWidth));
        })
    }

    return (
        <div className="portfolio-collection">
            <div className="container">
                <Header/>
            </div>


            <main className="portfolio-collection__wrapper-list-subtitles">
                {
                    listSubtitles.length > 0 ? (
                        <div className="portfolio-collection__list-subtitles" style={{width: styleCollageContainer.width}}>
                            {
                                listSubtitles.map((subtitle, index) => 
                                    <div
                                        className="portfolio-collection__wrapper-subtitle" 
                                        style={styleSubtitles}
                                        key={`upSubtitle-${index}`}
                                    >
                                        <div className="portfolio-collection__subtitle">
                                            {subtitle}
                                        </div>
                                    </div>
                                )}
                        </div>
                    ) : null
                }
            </main>          

            <main className="portfolio-collection__wrapper-collage">
                {
                    collectionObj != undefined ? (
                        <div className="portfolio-collection__wrapper-photos"
                            style={styleCollageContainer}
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
            </main>
            <main className="portfolio-collection__wrapper-list-subtitles portfolio-collection__wrapper-list-subtitles_left">
            {
                listSubtitles.length > 0 ? (
                    <div className="portfolio-collection__list-subtitles" style={{width: styleCollageContainer.width}}>
                        {
                            listSubtitles.map((subtitle, index) => 
                            <div 
                            className="portfolio-collection__wrapper-subtitle" 
                            style={styleSubtitles}
                            key={`downSubtitle-${index}`}
                            >
                                    <div className="portfolio-collection__subtitle">
                                        {subtitle}
                                    </div>
                                </div>
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