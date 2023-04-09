import {IBreakpointStyles} from "./IBreakpointsStyles";
import {TCollectionPhoto} from "../components/types/TCollectionPhoto";

export interface ITilesProps {
    onOpenModal: (url: string) => void,
    targetCollection: TCollectionPhoto,
    styles: IBreakpointStyles,
    className?: string,
    onReady?: () => void
}