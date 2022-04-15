// import { CSSProperties } from "react";
import "./collage-photo-plugin-grid.scss";

//types
type responsiveArguments = {
    heightRow?: string,
    widthColumn?: string,
    countColumns?: number,
    countRows?: number,
    rowGap?: number
}

type responsive = {
    [resolution: number]: responsiveArguments;
}

interface Arguments {
    selectorContainer: string, 
    heightRow?: string, 
    widthColumn?: string, 
    countColumns?: string, 
    countRows?: string, 
    columnGap?: number, 
    rowGap?: number, 
    responsive?: responsive
}

// there is no adaptability yet
function createCollage( 
    {selectorContainer, heightRow = "400px", widthColumn = "400px", countColumns = "auto", countRows = "auto", columnGap = 5, rowGap = 0, responsive}: Arguments): boolean
    {
    // main logic
    checkFailures();
    addClassContainer();
    getNeedfulResponsiveProps();

    const containerElement: HTMLElement | null = document.querySelector(selectorContainer),
          childElements: NodeListOf<HTMLElement> = document.querySelectorAll(`${selectorContainer} > *`);
    
    setWidthCollageContainer();
    
    return true; // сигнал: коллаж создан


    // functions
    function addClassContainer() { // for using styles
        const element = document.querySelector(selectorContainer);
        element?.classList.add("collage");
    }
    function setWidthCollageContainer() {
        let countRowsNum: number;  
        if(countRows == "auto") countRowsNum = 2;
        else countRowsNum = +countRows;
        
        let width: string = '';
        
        // if(keysLessWidth.length == 0) { //if there are not responsive property with number(width) less than current viewWidthDevice 
            width = `calc((${widthColumn}*${+(childElements.length / countRowsNum).toFixed()}) + (${+(childElements.length / countRowsNum).toFixed() * columnGap + 3}px))`;
        // }

        containerElement!.style.width = width;
    } 
    function getNeedfulResponsiveProps() {
        let viewWidthDevice: number = window.innerWidth ? window.innerWidth : window.screen.width;
        let propsLessWidth: responsive = {};
        let needfulResponsiveProps: responsiveArguments = {};

        if(responsive) {
            for(let i = 0; i < viewWidthDevice; i++) {
                if(responsive.hasOwnProperty(i)) {
                    propsLessWidth[i] = responsive[i];
                };
            }

            if(Object.keys(propsLessWidth).length > 0) {
                for (const keyOneResponsiveWidth in propsLessWidth) { // enumeration all responsive appropriate properties  
                    const oneWidthResponsiveObj: responsiveArguments = propsLessWidth[keyOneResponsiveWidth];
                    
                    needfulResponsiveProps = {...needfulResponsiveProps, ...oneWidthResponsiveObj};
                }

                assignToParams();
            }
        }
        
        function assignToParams() {
            if(needfulResponsiveProps.countColumns) countColumns = needfulResponsiveProps.countColumns.toString();
            if(needfulResponsiveProps.countRows) countRows = needfulResponsiveProps.countRows.toString();
            if(needfulResponsiveProps.heightRow) heightRow = needfulResponsiveProps.heightRow;
            if(needfulResponsiveProps.rowGap) rowGap = needfulResponsiveProps.rowGap;
            if(needfulResponsiveProps.widthColumn) widthColumn = needfulResponsiveProps.widthColumn;
        }
    }
    function checkFailures() { //
        // add no use tag!!!!!!!!!!!!!!!! add no use ZERO numbers !!!!!!!!!!!!!!!!!!!!!! responsive props должны следовать от меньшего к большему
        if(selectorContainer.length == 0 || selectorContainer === "collage") {
            throw new Error(`The argument 'selectorContainer' could not to be named 'collage' or to be empty string!`);
        }
        else if(document.querySelectorAll(selectorContainer).length > 1) {
            throw "You have to be careful. The 'containerSelector' must be unique!";
        }
        else if(!document.querySelector(selectorContainer)) {
            console.log(`There is no the HTML element with '${selectorContainer}' selector`);
        }
        else if (document.querySelectorAll(`${selectorContainer} > *`).length === 0 ) {
            console.log(`Please note, there are no elements in the containerElement`);
        }
    }
}

export {createCollage as createCollageGrid};