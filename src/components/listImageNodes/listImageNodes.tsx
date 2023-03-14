import { TCollectionPhoto } from "../types/TCollectionPhoto";
import {MutableRefObject, useEffect, useRef, useState} from "react";

interface IListImageElementsProps {
    targetCollection: TCollectionPhoto,
    onOpenModalWithImage: (event: React.MouseEvent) => void,
    /*height of a row in the pixels*/
    height?: number
}

const listImageNodes = ({targetCollection, onOpenModalWithImage, height}: IListImageElementsProps): {elems: JSX.Element[]/*, imageRefs: MutableRefObject<(HTMLImageElement | null)[]>*/} => {
    // const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

    return {
        // imageRefs: imageRefs,
        elems: targetCollection && targetCollection.images.map((image, index) => (
            <div
                key={`image-${index}`}
                tabIndex={0}
                className="portfolio-collection__wrapper-photo"
                data-url-image={image.url}
                onClick={onOpenModalWithImage}
                style={{height: height || 'auto'}}
            >
                <img
                    // ref={el => imageRefs.current[index] = el}
                    src={image.url}
                    alt={targetCollection.name + " image " + index}
                    className="portfolio-collection__photo"/>
            </div>
        ))
    }
}

export {listImageNodes}