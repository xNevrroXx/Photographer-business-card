import {IBreakpointsStyles, IBreakpointStyles} from "../types/IBreakpointsStyles";
import {useWindowWidth} from "./useWindowWidth";
import {useLayoutEffect, useState} from "react";

type TParameter = IBreakpointsStyles;

const useActualBreakpoint = (breakpointsWithStyles: TParameter): IBreakpointStyles | null => {
    const widthWindow = useWindowWidth();
    const [actualBreakpoint, setActualBreakpoint] = useState<number | null>(null);

    useLayoutEffect(() => {
        const breakpoints = Object.keys(breakpointsWithStyles);
        const actualBreakpoint = breakpoints
            .map((key) => +key) // from string to numbers
            .sort((a, b) => +b - +a) // from more to less sorting
            .find(breakpoint => widthWindow >= breakpoint) // find approximate breakpoint

        setActualBreakpoint(actualBreakpoint!);
    }, [widthWindow])

    return actualBreakpoint ? breakpointsWithStyles[actualBreakpoint] : null;
}

export {useActualBreakpoint};
export default useActualBreakpoint;