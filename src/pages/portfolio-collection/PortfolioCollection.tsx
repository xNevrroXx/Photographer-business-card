import {FC, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
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
//styles
import "./portfolio-collection.scss";
import "./portfolio-collection_Media.scss";
// types
import {TCollectionPhoto} from "../../components/types/TCollectionPhoto";
import {IBreakpointsStyles} from "../../types/IBreakpointsStyles";

interface IProps {
    collectionsPhotoProp: TCollectionPhoto[]
}
const responsiveTilesDefaultValue: IBreakpointsStyles = {

    800: {
        heightRow: 220,
        countRows: 2,
    },
    1000: {
        heightRow: 250,
        countRows: 2,
        rowGap: 5,
        columnGap: 8
    },
}
const PortfolioCollection: FC<IProps> = ({collectionsPhotoProp}) => {
    const navigate = useNavigate();
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

    const onOpenModalWithImage = useCallback((event: React.MouseEvent) => {
        const element = event.currentTarget;
        const url = element.getAttribute("data-url-image");

        if (!url) throw new Error("url is not defined");

        onOpenModal(url);
    }, [targetCollection])

    const runningLines: {toRightSide: ReturnType<typeof runningLinesCreator>, toLeftSide: ReturnType<typeof runningLinesCreator>} | null = useMemo(() => {
        if (!targetCollection) return null;

        return {
            toRightSide: runningLinesCreator(5, "toRight", targetCollection!.name),
            toLeftSide: runningLinesCreator(5, "toLeft", targetCollection!.name)
        }
    }, [targetCollection])

    const listImages = useMemo(() => {
        if (!actualBreakpointTiles && targetCollection) return listImageNodes({ targetCollection, onOpenModalWithImage });
        else if (!targetCollection || !actualBreakpointTiles) return;

        return listImageNodes({ targetCollection, onOpenModalWithImage, height: actualBreakpointTiles.heightRow });
    }, [actualBreakpointTiles, targetCollection])

    return (
        <div className="portfolio-collection">
            <div className="container">
                <Header/>
            </div>

            { isShowSpinner && <Spinner textProp="ищу фотографии" /> }
            { runningLines && <div className="running-line">{runningLines.toRightSide}</div> }
            { zoomImage.isOpen && <Modal url={zoomImage.urlImage} onCloseModal={onCloseModal}/> }

            {
                !actualBreakpointTiles && listImages ? <div className="portfolio-collection__wrapper-photos">{listImages.elems}</div> :
                targetCollection && actualBreakpointTiles && listImages &&
                <TilesCreator
                    ContainerTagName="main"
                    className="portfolio-collection__wrapper-photos"
                    elements={listImages}
                    styles={actualBreakpointTiles}
                />
            }

            {runningLines && <div className="running-line running-line_back">{runningLines.toLeftSide}</div>}

            <div className="container">
                <footer>
                    <Social/>
                </footer>
            </div>
        </div>
    )
}

export default PortfolioCollection;