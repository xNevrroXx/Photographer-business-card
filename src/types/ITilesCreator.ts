import {IBreakpointStyles} from "./IBreakpointsStyles";
import {listImageNodes} from "../components/listImageNodes/listImageNodes";
import {LegacyRef, MutableRefObject} from "react";

export interface ITilesProps {
    elements: ReturnType<typeof listImageNodes>,
    className?: string,
    styles: IBreakpointStyles
}