import {FC, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
// own modules
import Social from "../../components/social/Social";
import Modal from "../../components/modal/Modal";
import CollectionPhotoTiles from "../../components/collectionPhotoTiles/CollectionPhotoTiles";
import Header from "../../components/header/Header";
import {getData} from "../../services/service";
import {Spinner} from "../../components/loading/Spinner";
import {useActualBreakpoint} from "../../hooks/useActualBreakpoint";
import runningLinesCreator from "../../components/runningLinesCreator/runningLinesCreator";
import {useHorizontalScroll} from "../../hooks/useHorizontalScroll";
import {useMutationObserver} from "../../hooks/useMutationObserver";
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
    const mutationObserverRef = useMutationObserver({callback: onMutationObserver})
    const [isTilesCreated, setIsTilesCreated] = useState<boolean>(false);
    const scrollRef = useHorizontalScroll(".tiles", isTilesCreated);
    const {nameCollection} = useParams();
    const [collectionsPhoto, setCollectionsPhoto] = useState<TCollectionPhoto[]>(collectionsPhotoProp);
    const [targetCollection, setTargetCollection] = useState<TCollectionPhoto | null>(null);
    const isFetchedDataRef = useRef<boolean>(false);
    const [isNeedCheckAvailability, setIsNeedCheckAvailability] = useState<boolean>(false); // back to the first page if the collection is not available(if some error occurred)
    const [zoomImage, setZoomImage] = useState<{isOpen: boolean, urlImage: string}>({isOpen: false, urlImage: ""});
    const [isShowSpinner, setIsShowSpinner] = useState<boolean>(true); // todo set true
    const actualBreakpointTiles = useActualBreakpoint(responsiveTilesDefaultValue);

    useEffect(() => {
        if (!isTilesCreated) return;

        setIsShowSpinner(false);
    }, [isTilesCreated])
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

    function onMutationObserver (mutationRecords: MutationRecord[]) {
        setIsTilesCreated(true);
    }
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
        <div style={{width: "100%", height: "100%"}}>
            <div className="portfolio-collection" ref={el => {
                mutationObserverRef.current = el;
                scrollRef.current = el;
            }}>
                <div className="container">
                    <Header/>
                </div>

                { zoomImage.isOpen && <Modal url={zoomImage.urlImage} onCloseModal={onCloseModal}/> }
                { isShowSpinner && <Spinner textProp="ищу фотографии" /> }

                { runningLines && <div className="running-line">{runningLines.toRightSide}</div> }
                <div className="portfolio-collection__scrolling-wrapper">
                    <CollectionPhotoTiles
                        targetCollection={targetCollection}
                        actualBreakpointTiles={actualBreakpointTiles}
                        onOpenModal={onOpenModal}
                    />
                </div>
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