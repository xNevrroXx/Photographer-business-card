export interface IBreakpointStyles {
    /*height of a row in the pixels*/
    heightRow: number,
    /*width tiles container in the vw units*/
    // widthContainer: number
    countRows?: number,
    rowGap?: number
    columnGap?: number,
}
export interface IBreakpointsStyles {
    [breakpoint: number]: IBreakpointStyles
}