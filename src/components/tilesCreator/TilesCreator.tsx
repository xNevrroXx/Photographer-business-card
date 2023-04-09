import React, {FC, forwardRef, RefObject, useCallback, useEffect, useRef, useState} from "react";
// types
import { ITilesProps } from "../../types/ITilesCreator";
import {useWindowWidth} from "../../hooks/useWindowWidth";
interface IImageInfo {
    path: string,
    width: number,
    height: number
}
const checkImageLoaded = (path: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject();

        img.src = path;
    })
const TilesCreator = forwardRef<RefObject<HTMLDivElement>, ITilesProps> (
    ({targetCollection, styles, onOpenModal, onReady, className}, ref) => {
    const windowWidth = useWindowWidth();
    const [makeUseEffectOnce, setMakeUseEffectOnce] = useState<boolean>(false);
    const [computedImagesSizes, setComputedImagesSizes] = useState<IImageInfo[] | null>(null);
    const [computedWidthContainer, setComputedWidthContainer] = useState<number | null>(null);
    const [imagesByRows, setImagesByRows] = useState<string[][] | null>(null);

    useEffect(() => {
        setMakeUseEffectOnce(false);
        setComputedWidthContainer(null);
        setImagesByRows(null);
    }, [windowWidth])

    useEffect(() => {
        if (makeUseEffectOnce) return;
        setMakeUseEffectOnce(true);
        function onLoadImages (images: HTMLImageElement[]) {
            const computedImagesSizes: IImageInfo[] = [];

            images.forEach((image, index) => {
                const path = image.src;
                const widthImg = image.width;
                const heightImg = image.height;

                const normalizeCoefficient = heightImg / styles.heightRow;
                const computedWidth = widthImg / normalizeCoefficient;
                const computedHeight = heightImg / normalizeCoefficient;

                computedImagesSizes.push({
                    path: path,
                    width: computedWidth,
                    height: computedHeight
                })
            })

            setComputedImagesSizes(computedImagesSizes);
        }

        Promise
            .all(targetCollection.images.map(imageInfo => imageInfo.url).map(checkImageLoaded))
            .then((images) => {
                onLoadImages(images);
            })
    }, [windowWidth])

    useEffect(() => {
        if (!computedImagesSizes) return;
        type TAccTypeElem = {width: number, images: IImageInfo[]};

        let fullWidth: number = 0;
        let averageComputedWidthContainer: Exclude<typeof computedWidthContainer, null>;
        let computedWidthContainerTemp: Exclude<typeof computedWidthContainer, null>;
        let maxWidthRowInfo: TAccTypeElem;
        let imagesByRowsInfo: TAccTypeElem[];
        let imagesByRowsTemp: Exclude<typeof imagesByRows, null>;

        for (const key in computedImagesSizes) {
            const imageInfo = computedImagesSizes[key];
            fullWidth += imageInfo.width;
        }
        averageComputedWidthContainer = fullWidth / styles.countRows;
        imagesByRowsInfo =
            computedImagesSizes
                .reduce((accumulator, imgInfo, currentIndex) => {
                    let currentLengthAcc = accumulator.length - 1;
                    if (averageComputedWidthContainer < (accumulator[currentLengthAcc].width + imgInfo.width - (imgInfo.width * 0.5) )) {
                        const newValueAcc = {width: 0, images: []} as TAccTypeElem;
                        accumulator.push(newValueAcc);
                        currentLengthAcc++;
                    }
                    accumulator[currentLengthAcc] = {
                        width: (accumulator[currentLengthAcc].width || 0) + imgInfo.width,
                        images: accumulator[currentLengthAcc].images ? [...accumulator[currentLengthAcc].images, imgInfo] : [...accumulator[currentLengthAcc].images]
                    }

                    return accumulator;
                }, [{width: 0, images: []}] as TAccTypeElem[]);

        maxWidthRowInfo =
            imagesByRowsInfo
            .sort((rowsInfo, nextRowsInfo) => nextRowsInfo.width - rowsInfo.width)[0];

        imagesByRowsTemp = imagesByRowsInfo.map(rowsInfo => rowsInfo.images.map(rowInfo => rowInfo.path));
        computedWidthContainerTemp = maxWidthRowInfo.width + (styles.columnGap || 0) * maxWidthRowInfo.images.length;

        setImagesByRows(imagesByRowsTemp)
        setComputedWidthContainer(computedWidthContainerTemp);
    }, [computedImagesSizes, windowWidth])

    useEffect(() => {
        if (!computedWidthContainer || !imagesByRows || !onReady) return;

        onReady();
    }, [computedWidthContainer, imagesByRows, windowWidth])

    const onOpenModalWithImage = useCallback((event: React.MouseEvent) => {
        const element = event.currentTarget;
        const url = element.getAttribute("data-url-image");

        if (!url) throw new Error("url is not defined");

        onOpenModal(url);
    }, [targetCollection])

    if (!imagesByRows || !computedWidthContainer) return null;

    return (
        <div
            style={{
                height: (styles.heightRow * (styles.countRows || 2)) + ( (styles.rowGap ? styles.rowGap : 0) * (styles.countRows ? styles.countRows - 1 : 0)),
                flexWrap: "nowrap",
                minWidth: computedWidthContainer + "px",
                width: "max-content",
                display: "flex",
                flexDirection: "column",
                columnGap: styles.columnGap ? styles.columnGap : 0,
                rowGap: styles.rowGap ? styles.rowGap : 0,
            }}
            className={"tiles " + className}
        >
            {
                imagesByRows.map((images, index) => (
                    <div
                        key={"row" + index}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            flexWrap: "nowrap",
                            width: computedWidthContainer,
                            height: styles.heightRow,
                            gap: styles.columnGap
                        }}
                    >
                        {images.map((image, index) => (
                            <div
                                key={`image-${index}`}
                                tabIndex={0}
                                className="portfolio-collection__wrapper-photo"
                                data-url-image={image}
                                onClick={onOpenModalWithImage}
                                style={{
                                    height: styles.heightRow,
                                }}
                            >
                                <img
                                    height={styles.heightRow + "px"}
                                    src={image}
                                    alt={targetCollection.name + " image " + index}
                                    className="portfolio-collection__photo"/>
                            </div>
                        ))}
                    </div>
                ))
            }
        </div>
    )
})

export {TilesCreator};
export default TilesCreator;