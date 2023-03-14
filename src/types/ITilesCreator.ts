import {IBreakpointStyles} from "./IBreakpointsStyles";
import {listImageNodes} from "../components/listImageNodes/listImageNodes";

export interface ITilesProps {
    elements: ReturnType<typeof listImageNodes>,
    ContainerTagName?: "div" | "main" | "section" | "article" | "aside" | "header" | "footer"
    className?: string,
    styles: IBreakpointStyles
}