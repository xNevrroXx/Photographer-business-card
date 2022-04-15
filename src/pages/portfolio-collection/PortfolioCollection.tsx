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
import { setHorizontalWheel, setLoopHorizontalWheel, setListenerDesktopHorizontalWheel, setListenerTapHorizontalWheel } from "../../components/horizontalWheelFunc/horizontalWheel";
import {createCollageGrid} from "../../components/collagePhotoPlugin/collagePhotoPluginGrid";
import Modal from "../../components/modal/Modal";

interface IProps {
    collectionsPhotoProp: collectionPhoto[];
    urlJson: string;
}

const PortfolioCollection: FC<IProps> = ({collectionsPhotoProp, urlJson}) => {
    const [collectionsPhoto, setCollectionsPhoto] = useState<collectionPhoto[]>([]),
          [collectionObj, setCollectionObj] = useState<collectionPhoto>(),
          [listSubtitles, setListSubtitles] = useState<string[]>([]),
          [styleSubtitles, setStyleSubtitles] = useState<CSSProperties>({display: "none"}),
          [styleCollageContainer, setStyleCollageContainer] = useState<any>({}),
          [zoomImage, setZoomImage] = useState<{isOpen: boolean, urlImage: string}>({isOpen: false, urlImage: ""});

    const nameUrl = useParams().collectionName;

    useEffect(() => {
        if(collectionsPhotoProp.length == 0) 
        {
            getPhotos(urlJson)
            .then((result: {collections: collectionPhoto[]}) => {
                const collectionsPhotoTemp: collectionPhoto[] = result.collections;

                setCollectionsPhoto(collectionsPhotoTemp);
            }); 
        }
        else 
        {
            setCollectionsPhoto(collectionsPhotoProp);
        }
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
            createCollageGrid({
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
            setListenerTapHorizontalWheel({element: wrapperCollage, sensetivity: 20, sprayingTime: 5, ratio: 5});
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

    const onCloseModal = () => {
        setZoomImage({
            ...zoomImage,
            isOpen: false
        })
    }
    const onOpenModal = (url: string) => {
        setZoomImage({
            urlImage: url,
            isOpen: true
        })
    }
    const setListenerPointerUpZoomImage = (e: PointerEvent) => {
        const element = e.currentTarget as HTMLElement;
        const url = element.getAttribute("data-url-image");
        const pointDown = {x: e.clientX, y: e.clientY};
        
        element.setPointerCapture(e.pointerId);
        element.addEventListener("pointerup", checkCoincidence);
        
        function checkCoincidence(e: any) {
            const pointUp = {x: e.clientX, y: e.clientY};

            console.log("url: ", url)
            console.log("pointDown: ", pointDown)
            console.log("pointUp: ", pointUp)
            if(pointUp.x == pointDown.x && pointUp.y == pointDown.y && url) {
                console.log(true)
                onOpenModal(url);
            }

            element.releasePointerCapture(e.pointerId);
            element.removeEventListener("pointerup", checkCoincidence);
        }
    }

    return (
        <>
            {zoomImage.isOpen ? <Modal url={zoomImage.urlImage} onCloseModal={onCloseModal} /> : null}

            <div className="portfolio-collection">
                <div className="container">
                    <Header/>
                </div>


                <main className="portfolio-collection__wrapper-list-subtitles" >
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

                <main className="portfolio-collection__wrapper-collage" >
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
                                            data-url-image={image.url}
                                            onPointerDown={setListenerPointerUpZoomImage}    
                                            >
                                            <img src={image.url} alt={collectionObj.name} className="portfolio-collection__photo" />
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
        </>
    )
}

export default PortfolioCollection;