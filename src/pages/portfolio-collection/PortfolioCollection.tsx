import {FC, forwardRef, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
// own modules
import {TilesCreator} from "../../components/tilesCreator/TilesCreator";
import Social from "../../components/social/Social";
import Modal from "../../components/modal/Modal";
import {getData} from "../../services/service";
import {Spinner} from "../../components/loading/Spinner";
import Header from "../../components/header/Header";
import {useActualBreakpoint} from "../../hooks/useActualBreakpoint";
import runningLinesCreator from "../../components/runningLinesCreator/runningLinesCreator";
import {listImageNodes} from "../../components/listImageNodes/listImageNodes";
import {useHorizontalScroll} from "../../hooks/useHorizontalScroll";
import useAnimationFromTo from "../../hooks/useAnimationFromTo";
//styles
import "./portfolio-collection.scss";
import "./portfolio-collection_Media.scss";
// types
import {TCollectionPhoto} from "../../components/types/TCollectionPhoto";
import {IBreakpointsStyles, IBreakpointStyles} from "../../types/IBreakpointsStyles";

gsap.registerPlugin(ScrollTrigger);

interface IProps {
    collectionsPhotoProp: TCollectionPhoto[]
}
const responsiveTilesDefaultValue: IBreakpointsStyles = {
    800: {
        heightRow: 150,
        countRows: 2,
        rowGap: 1,
        columnGap: 1
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
    const scrollRef = useHorizontalScroll(".portfolio-collection__scrolling-wrapper");
    const fadeOutAnimationRef = useAnimationFromTo({
        from: {
            opacity: 0
        },
        to: {
            opacity: 1,
            duration: 3
        }
    });
    const {nameCollection} = useParams();
    const [collectionsPhoto, setCollectionsPhoto] = useState<TCollectionPhoto[]>(collectionsPhotoProp);
    const [targetCollection, setTargetCollection] = useState<TCollectionPhoto | null>(null);
    const isFetchedDataRef = useRef<boolean>(false);
    const [isNeedCheckAvailability, setIsNeedCheckAvailability] = useState<boolean>(false); // back to the first page if the collection is not available(if some error occurred)
    const [zoomImage, setZoomImage] = useState<{isOpen: boolean, urlImage: string}>({isOpen: false, urlImage: ""});
    const [isShowSpinner, setIsShowSpinner] = useState<boolean>(false); // todo set true
    const actualBreakpointTiles = useActualBreakpoint(responsiveTilesDefaultValue);

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
    }, []);
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
    }, [collectionsPhoto])

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

    return (
        <div className="portfolio-collection">
            <div className="container">
                <Header/>
            </div>

            { runningLines && <div className="running-line">{runningLines.toRightSide}</div> }
            { zoomImage.isOpen && <Modal url={zoomImage.urlImage} onCloseModal={onCloseModal}/> }

            <div className="portfolio-collection__scrolling-wrapper">
                { isShowSpinner ? <Spinner textProp="ищу фотографии" /> :   (
                    <PhotoView
                        ref={el => {
                            // fadeOutAnimationRef.current = el;
                            scrollRef.current = el;
                        }}
                        targetCollection={targetCollection}
                        actualBreakpointTiles={actualBreakpointTiles}
                        onOpenModal={onOpenModal}
                        />
                    )
                }
            </div>

            {runningLines && <div className="running-line running-line_back">{runningLines.toLeftSide}</div>}

            <div className="container">
                <footer>
                    <Social/>
                </footer>
            </div>
        </div>
    )
}

interface IPhotoViewProps {
    actualBreakpointTiles: IBreakpointStyles | null,
    targetCollection: TCollectionPhoto | null,
    onOpenModal: (url: string) => void
}
const PhotoView = forwardRef<HTMLDivElement | null, IPhotoViewProps>(({actualBreakpointTiles, targetCollection, onOpenModal}, ref) => {
    const onOpenModalWithImage = useCallback((event: React.MouseEvent) => {
        const element = event.currentTarget;
        const url = element.getAttribute("data-url-image");

        if (!url) throw new Error("url is not defined");

        onOpenModal(url);
    }, [targetCollection])

    const listImages = useMemo(() => {
        if (!actualBreakpointTiles && targetCollection) return listImageNodes({ targetCollection, onOpenModalWithImage });
        else if (!targetCollection || !actualBreakpointTiles) return;

        return listImageNodes({ targetCollection, onOpenModalWithImage, height: actualBreakpointTiles.heightRow });
    }, [actualBreakpointTiles, targetCollection])


    if (!actualBreakpointTiles && listImages) {
        return <div className="portfolio-collection__wrapper-photos" ref={ref}>{listImages}</div>
    }
    else if (targetCollection && actualBreakpointTiles && listImages) {
        return (
            <TilesCreator
                ref={ref}
                className="portfolio-collection__wrapper-photos"
                elements={listImages}
                styles={actualBreakpointTiles}
            />)
    }
    return null;
})

export default PortfolioCollection;