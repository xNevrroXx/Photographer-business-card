import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
// own modules
import Social from "../../components/social/Social";
import Modal from "../../components/modal/Modal";
import TilesCreator from "../../components/tilesCreator/TilesCreator";
import Header from "../../components/header/Header";
import {getData} from "../../services/service";
import {Spinner} from "../../components/spinner/Spinner";
import {useActualBreakpoint} from "../../hooks/useActualBreakpoint";
import runningLinesCreator from "../../components/runningLinesCreator/runningLinesCreator";
import {useHorizontalScroll} from "../../hooks/useHorizontalScroll";
import {useWindowWidth} from "../../hooks/useWindowWidth";
// types
import {TCollectionPhoto} from "../../components/types/TCollectionPhoto";
import {IBreakpointsStyles} from "../../types/IBreakpointsStyles";
//styles
import "./portfolio-collection.scss";
import "./portfolio-collection_Media.scss";

gsap.registerPlugin(ScrollTrigger);

interface IProps {
    collectionsPhotoProp: TCollectionPhoto[]
}
const responsiveTilesDefaultValue: IBreakpointsStyles = {
    800: {
        heightRow: 150,
        countRows: 2,
        rowGap: 1,
        columnGap: 3
    },
    1000: {
        heightRow: 250,
        countRows: 2,
        rowGap: 5,
        columnGap: 5
    },
}
const PortfolioCollection: FC<IProps> = ({collectionsPhotoProp}) => {
    const navigate = useNavigate();
    const {nameCollection} = useParams();
    const isFetchedDataRef = useRef<boolean>(false);
    const actualBreakpointTiles = useActualBreakpoint(responsiveTilesDefaultValue);
    const windowWidth = useWindowWidth();
    const [isTargetCollectionFound, setIsTargetCollectionFound] = useState<boolean>(false);
    const [isTilesCreated, setIsTilesCreated] = useState<boolean>(false);
    const scrollRef = useHorizontalScroll(".tiles", isTilesCreated, [actualBreakpointTiles, windowWidth]);
    const [collectionsPhoto, setCollectionsPhoto] = useState<TCollectionPhoto[]>(collectionsPhotoProp);
    const [targetCollection, setTargetCollection] = useState<TCollectionPhoto | null>(null);
    const [isNeedCheckAvailability, setIsNeedCheckAvailability] = useState<boolean>(false); // back to the first page if the collection is not available(if some error occurred)
    const [zoomImage, setZoomImage] = useState<{isOpen: boolean, urlImage: string}>({isOpen: false, urlImage: ""});

    useEffect(() => {
        if (isFetchedDataRef.current) return;
        isFetchedDataRef.current = true;

        if (!collectionsPhotoProp || collectionsPhotoProp.length === 0) {
            getData(import.meta.env.VITE_JSON_URL)
                .then((result: { collections: TCollectionPhoto[] }) => {
                    const collectionsPhotoTemp: TCollectionPhoto[] = result.collections;

                    setCollectionsPhoto(collectionsPhotoTemp);
                });
        }

        setTimeout(() => {
            setIsNeedCheckAvailability(true);
        }, 8000)
    }, [collectionsPhotoProp]);

    useEffect(() => {
        setIsTilesCreated(false);
    }, [windowWidth])

    useEffect(() => {
        if (isNeedCheckAvailability && !targetCollection) {
            const answer = confirm("Что-то пошло не так. Перейти на главную страницу?");

            if (answer) {
                navigate("/about-me");
            }
        }
    }, [isNeedCheckAvailability])

    useEffect(() => {
        const targetCollection = collectionsPhoto.find(collection => collection.nameUrl === nameCollection);
        if (!targetCollection) return;

        setTargetCollection(targetCollection);
        setIsTargetCollectionFound(true);
    }, [collectionsPhoto])

    const onTilesCreated = useCallback(() => {
        setIsTilesCreated(true);
    }, [targetCollection])

    const onCloseModal = useCallback(() => {
        setZoomImage({
            urlImage: "",
            isOpen: false
        })
    }, [])
    const onOpenModal = useCallback((url: string) => {
        setZoomImage({
            urlImage: url,
            isOpen: true
        })
    }, [])
    const runningLines: {toRightSide: ReturnType<typeof runningLinesCreator>, toLeftSide: ReturnType<typeof runningLinesCreator>} | null = useMemo(() => {
        if (!targetCollection) return null;

        return {
            toRightSide: runningLinesCreator(5, "toRight", targetCollection!.name),
            toLeftSide: runningLinesCreator(5, "toLeft", targetCollection!.name)
        }
    }, [targetCollection])
    const onOpenModalWithImage = useCallback((event: React.MouseEvent) => {
        const element = event.currentTarget;
        const url = element.getAttribute("data-url-image");

        if (!url) throw new Error("url is not defined");

        onOpenModal(url);
    }, [targetCollection])

    return (
        <div style={{width: "100%", height: "100%"}}>
            <div className="portfolio-collection" ref={el => {
                scrollRef.current = el;
            }}>
                <div className="container">
                    <Header/>
                </div>

                { zoomImage.isOpen && <Modal url={zoomImage.urlImage} onCloseModal={onCloseModal}/> }
                { !isTargetCollectionFound && actualBreakpointTiles && <Spinner textProp="ищу фотографии" /> }
                { isTargetCollectionFound && !isTilesCreated && <Spinner textProp="создаю разметку" /> }

                { runningLines && <div className="running-line">{runningLines.toRightSide}</div> }
                { targetCollection &&
                    (actualBreakpointTiles ?
                            <div className="portfolio-collection__scrolling-wrapper">
                                <TilesCreator
                                    className="portfolio-collection__wrapper-photos"
                                    targetCollection={targetCollection}
                                    onOpenModalWithImage={onOpenModalWithImage}
                                    styles={actualBreakpointTiles}
                                    onReady={onTilesCreated}
                                />
                            </div> :
                            <div className="portfolio-collection__wrapper-photos">
                                {targetCollection.images.map((image, index) => (
                                    <div
                                        key={`image-${index}`}
                                        tabIndex={0}
                                        className="portfolio-collection__wrapper-photo"
                                        data-url-image={image.url}
                                        onClick={onOpenModalWithImage}
                                    >
                                        <img
                                            src={image.url}
                                            alt={targetCollection.name + " image " + index}
                                            className="portfolio-collection__photo"/>
                                    </div>
                                ))}
                            </div>
                    )
                }
                {runningLines && <div className="running-line running-line_back">{runningLines.toLeftSide}</div>}

                <div className="container">
                    <footer>
                        <Social/>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default PortfolioCollection;