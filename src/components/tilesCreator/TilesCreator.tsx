import {FC, useCallback, useEffect, useState} from "react";
// own modules
import {useResizeObserver} from "../../hooks/useResizeObserver";
// types
import {ITilesProps} from "../../types/ITilesCreator";

const TilesCreator: FC<ITilesProps> = ({ContainerTagName = "div", elements, className, styles}) => {
    const [maxWidthContainer, setMaxWidthContainer] = useState<number>();
    const [widthContainer, setWidthContainer] = useState<number>();
    const [elementsByRows, setElementsByRows] = useState<JSX.Element[] | null>(null);

    useEffect(() => {
        if (!maxWidthContainer) return;

        setWidthContainer(maxWidthContainer / (styles.countRows || 2));
    }, [maxWidthContainer])

    const onResize = useCallback((target: HTMLDivElement) => {
        const children = Array.from(target.querySelectorAll("*")).filter(elem => elem.parentElement === target);
        const childrenImages = Array.from(target.querySelectorAll("img"));
        const isImagesReady = childrenImages.every(imageElem => {
            return imageElem && imageElem.complete && getComputedStyle(imageElem).getPropertyValue("width") !== "0px"
        });

        if (!isImagesReady) return;

        const width = Math.round(+getComputedStyle(target).getPropertyValue("width").slice(0, -2));
        let newWidth = width;
        while (newWidth % (styles.countRows || 2) !== 0) {
            newWidth++;
        }

        if ( !maxWidthContainer || (newWidth > maxWidthContainer) && (maxWidthContainer !== newWidth / (styles.countRows || 2)) ) {
            setMaxWidthContainer(newWidth);
        }
        else if (width === widthContainer && !elementsByRows) {
            const elementsByRows1: JSX.Element[] = [];
            let j = 0;
            for (let i = 0; i < (styles.countRows || 2); i++) {
                let computedWidthRow = 0;
                const row: JSX.Element[] = [];
                for (j; j < children.length && width > computedWidthRow + +getComputedStyle(children[j]).getPropertyValue("width").slice(0, -2); j++) {
                    row.push(elements.elems[j]);
                    computedWidthRow += +getComputedStyle(children[j]).getPropertyValue("width").slice(0, -2);
                }
                elementsByRows1.push(
                    <div
                        key={i + "row-tile-elems"}
                        style={{
                            width: "100%",
                            display: "flex",
                            flexWrap: "nowrap",
                            justifyContent: "space-between",
                            columnGap: styles.columnGap ? styles.columnGap : 0,
                            rowGap: styles.rowGap ? styles.rowGap : 0
                        }}>
                        {row}
                    </div>
                );
            }

            setElementsByRows(elementsByRows1);
        }
    }, [widthContainer, maxWidthContainer, elementsByRows])

    const ref = useResizeObserver(onResize);

    return (
        <ContainerTagName
            ref={ref}
            style={{
                flexWrap: elementsByRows ? "wrap" : "nowrap",
                width: widthContainer ? widthContainer + "px" : "auto",
                display: "flex", flexDirection: "row",
                columnGap: styles.columnGap ? styles.columnGap : 0,
                rowGap: styles.rowGap ? styles.rowGap : 0,
            }}
            className={className + " tiles"}
        >
            { elementsByRows ? elementsByRows : elements.elems}
        </ContainerTagName>
    )
}

export {TilesCreator};
export default TilesCreator;