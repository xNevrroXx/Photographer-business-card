import {FC, PointerEvent, ReactNode, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
// own modules
import Social from "../../components/social/Social";
import Modal from "../../components/modal/Modal";
import {getData} from "../../services/service";
import {Spinner} from "../../components/loading/Spinner";
//styles
import "./portfolio-collection.scss";
import "./portfolio-collection_Media.scss";
import "./running-line.scss";
// types
import {TCollectionPhoto} from "../../components/types/types";
import Header from "../../components/header/Header";
import createCollageFlex from "../../components/collagePhotoPlugin/collagePhotoPluginFlex";

interface IProps {
    collectionsPhotoProp: TCollectionPhoto[]
}

const PortfolioCollection: FC<IProps> = ({collectionsPhotoProp}) => {
    const navigate = useNavigate();
    const {nameCollection} = useParams();
    const isFetchedDataRef = useRef<boolean>(false);
    const [isNeedCheckAvailability, setIsNeedCheckAvailability] = useState<boolean>(false);
    const [collectionsPhoto, setCollectionsPhoto] = useState<TCollectionPhoto[]>(collectionsPhotoProp);
    const [targetCollection, setTargetCollection] = useState<TCollectionPhoto | null>(null);
    const [zoomImage, setZoomImage] = useState<{isOpen: boolean, urlImage: string}>({isOpen: false, urlImage: ""});
    const [isShowSpinner, setIsShowSpinner] = useState<boolean>(true);


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
        }, 5000)
    }, []);

    useEffect(() => {
        if (isNeedCheckAvailability && !targetCollection) {
            const answer = confirm("Извините, что-то пошло не так в данном разделе. Можете попробовать еще раз позже, спасибо за понимание. Перейти на главную страницу?");

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

    useEffect(() => {
        if (!targetCollection) return;

        createCollageFlex({
            selectorContainer: ".portfolio-collection__wrapper-photos",
            responsive: {
                300: {
                    heightRow: "150px",
                    rowGap: 5,
                    columnGap: 0,
                    widthColumn: "80vw"
                },
                500: {
                    heightRow: "220px",
                    rowGap: 0,
                    columnGap: 0,
                    widthColumn: "80vw"
                },
                800: {
                    heightRow: "220px",
                    rowGap: 0,
                    columnGap: 0,
                    countRows: 2
                },
                1000: {
                    heightRow: "250px",
                    rowGap: 5,
                    columnGap: 8,
                    // countColumns: "auto-fit",
                    countRows: 2
                },
                1500: {
                    heightRow: "300px",
                    rowGap: 5,
                    columnGap: 2,
                    // countColumns: "auto-fit",
                    countRows: 2
                }
            },
            callback: () => setIsShowSpinner(false)
        });
    }, [targetCollection])

    useEffect(() => {
        console.log("isShowSpinner: ", isShowSpinner);
    }, [isShowSpinner])

    const onCloseModal = useCallback(() => {
        setZoomImage({
            urlImage: "",
            isOpen: false
        })
    }, [])

    const onOpenModal = (url: string) => {
        setZoomImage({
            urlImage: url,
            isOpen: true
        })
    }

    const onOpenModalWithImage = (event: PointerEvent) => {
        const element = event.currentTarget as HTMLElement;
        const url = element.getAttribute("data-url-image");
        const pointDown = {x: event.clientX, y: event.clientY};

        element.setPointerCapture(event.pointerId);
        element.addEventListener("pointerup", checkCoincidence);

        // rejection to open modal window with image when mouse is moved during clicking
        function checkCoincidence(e: any) {
            const pointUp = {x: e.clientX, y: e.clientY};

            if(pointUp.x == pointDown.x && pointUp.y == pointDown.y && url) {
                onOpenModal(url);
            }

            element.releasePointerCapture(e.pointerId);
            element.removeEventListener("pointerup", checkCoincidence);
        }
    }

    const runningLines: {rightSide: ReactNode[], leftSide: ReactNode[]} | null = useMemo(() => {
        if (!targetCollection) return null;

        function createRunningLine(countWords: number, direction: "toRight" | "toLeft"): ReactNode[] {
            const partsLine: ReactNode[] = [];

            for (let i = 1; i <= 3; i++) {
                const repeatWords: ReactNode[] = [];

                for (let j = 0; j < countWords; j++) {
                    repeatWords.push(<span key={j + direction + "word"}>{targetCollection!.name}</span>);
                }

                partsLine.push(<div key={i + direction + "container"} className={`running-line__${i}`}>{repeatWords}</div>)
            }

            return partsLine;
        }

        return {
            rightSide: createRunningLine(5, "toRight"),
            leftSide: createRunningLine(5, "toLeft")
        }
    }, [targetCollection])


    return (
        <div className="portfolio-collection">
            <div className="container">
                <Header/>
            </div>

            { isShowSpinner && <Spinner textProp="ищу фотографии" /> }
            { runningLines && <div className="running-line">{runningLines.rightSide}</div> }
            <div className="container">
                { zoomImage.isOpen && <Modal url={zoomImage.urlImage} onCloseModal={onCloseModal}/> }

                <main className="portfolio-collection__wrapper-photos">
                    { targetCollection && targetCollection.images.map((image, index) => (
                        <div
                            className="portfolio-collection__wrapper-photo"
                            key={`image-${index}`}
                            data-url-image={image.url}
                            onPointerDown={onOpenModalWithImage}
                            style={{opacity: isShowSpinner ? 0 : 1}}
                        >
                            <img src={image.url} alt={targetCollection.name + " image " + index} className="portfolio-collection__photo" />
                        </div>
                    ))}
                </main>

            </div>
            {runningLines && <div className="running-line running-line_back">{runningLines.leftSide}</div>}

            <div className="container">
                <footer>
                    <Social/>
                </footer>
            </div>
        </div>
    )
}

export default PortfolioCollection;