import {IBreakpointStyles} from "./IBreakpointsStyles";
import {TCollectionPhoto} from "../components/types/TCollectionPhoto";

export interface ITilesProps {
    onOpenModalWithImage: (event: React.MouseEvent) => void,
    targetCollection: TCollectionPhoto,
    styles: IBreakpointStyles,
    className?: string,
    onReady?: () => void
}