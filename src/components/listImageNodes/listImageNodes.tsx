import { TCollectionPhoto } from "../types/TCollectionPhoto";
import {MutableRefObject, useEffect, useRef, useState} from "react";
import useAnimationFromTo from "../../hooks/useAnimationFromTo";

interface IListImageElementsProps {
    targetCollection: TCollectionPhoto,
    onOpenModalWithImage: (event: React.MouseEvent) => void,
    /*height of a row in the pixels*/
    height?: number | string
}

const listImageNodes = ({targetCollection, onOpenModalWithImage, height = "auto"}: IListImageElementsProps): JSX.Element[] => {
    return targetCollection && targetCollection.images.map((image, index) => (
        <div
            key={`image-${index}`}
            tabIndex={0}
            className="portfolio-collection__wrapper-photo"
            data-url-image={image.url}
            onClick={onOpenModalWithImage}
            style={{height: height}}
        >
            <img
                // ref={el => imageRefs.current[index] = el}
                src={image.url}
                alt={targetCollection.name + " image " + index}
                className="portfolio-collection__photo"/>
        </div>
    ))
}

export {listImageNodes}