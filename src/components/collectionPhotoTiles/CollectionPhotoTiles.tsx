import React, {FC, useCallback, useMemo} from "react";
// own modules
import {listImageNodes} from "../listImageNodes/listImageNodes";
import TilesCreator from "../tilesCreator/TilesCreator";
// types
import {IBreakpointStyles} from "../../types/IBreakpointsStyles";
import {TCollectionPhoto} from "../types/TCollectionPhoto";

interface ICollectionPhotoTiles {
    actualBreakpointTiles: IBreakpointStyles | null,
    targetCollection: TCollectionPhoto | null,
    onOpenModal: (url: string) => void
}
const CollectionPhotoTiles: FC<ICollectionPhotoTiles> = (({actualBreakpointTiles, targetCollection, onOpenModal}) => {
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
        return <div className="portfolio-collection__wrapper-photos">{listImages}</div>
    }
    else if (targetCollection && actualBreakpointTiles && listImages) {
        return (
            <TilesCreator
                className="portfolio-collection__wrapper-photos"
                elements={listImages}
                styles={actualBreakpointTiles}
            />)
    }
    return null;
})

export default CollectionPhotoTiles;