import { CSSProperties, FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../../components/header/Header";
import Social from "../../components/social/Social";
import { getPhotos } from "../../services/service";
import { getNumFromStr } from "../../components/collagePhotoPlugin/techFunctions";

//styles
import "./portfolio-collection.scss";

//types
import { collectionPhoto } from "../../components/types/types";
import { setHorizontalWheel, setLoopHorizontalWheel} from "../../components/horizontalWheelFunc/horizontalWheel";
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
    let collageContainer: HTMLElement | null;

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
            });
            setStyleCollageContainer({
                width: window.getComputedStyle(document.querySelector(".collage")!).width,
            });
        }
    }, [collectionObj])

    useEffect(() => {
        collageContainer = document.querySelector(".collage");

        if(collageContainer && styleCollageContainer.width) {
            const coumputedWidthCollageContainer: any = styleCollageContainer.width;

            setStyleSubtitles({
                display: "flex",
                width: `${getNumFromStr(coumputedWidthCollageContainer) / listSubtitles.length + "px"}`
            });


            
            (function() {
                const element: any = document.querySelector(".portfolio-collection__wrapper-collage");
                if(element) {
                    const onHorizontalWheel = (e: any) => setHorizontalWheel.call(null, {e: e, element: element, sprayingTime: 9});
                    element.addEventListener("wheel", onHorizontalWheel);
                    
                    if (element.addEventListener) {
                        if ('onwheel' in document) {
                          // IE9+, FF17+, Ch31+
                          element.addEventListener("wheel", onHorizontalWheel);
                        } else if ('onmousewheel' in document) {
                          // устаревший вариант события
                          element.addEventListener("mousewheel", onHorizontalWheel);
                        } else {
                          // Firefox < 17
                          element.addEventListener("MozMousePixelScroll", onHorizontalWheel);
                        }
                      } else { // IE8-
                        element.attachEvent("onmousewheel", onHorizontalWheel);
                      }

                    return () => element.removeEventListener("wheel", onHorizontalWheel);
                }
            }());

            (function(){
                const elements: NodeListOf<HTMLElement> | null = document.querySelectorAll(".portfolio-collection__list-subtitles");
                
                elements.forEach((element, index) => {
                    if(window.innerWidth > getNumFromStr(styleCollageContainer.width)) return;
                    if(index == 0) setLoopHorizontalWheel(element, "left", -(getNumFromStr(styleCollageContainer.width) - window.innerWidth), 0);
                    else setLoopHorizontalWheel(element, "right", 0, -(getNumFromStr(styleCollageContainer.width) - window.innerWidth));
                })
            }())
        }
    }, [styleCollageContainer])
    
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

function e(element: HTMLElement | null, e: any) {
    throw new Error("Function not implemented.");
}
