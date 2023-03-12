import { getNumFromStr } from "./techFunctions";

//types
type TResponsiveParameter = {
    heightRow?: string,
    widthColumn?: string,
    countColumns?: number,
    countRows?: number,
    rowGap?: number,
    columnGap?: number
}

type TResponsiveParameters = {
    [resolution: number]: TResponsiveParameter;
}

interface TParameters {
    selectorContainer: string, 
    heightRow?: string, 
    widthColumn?: string, 
    countColumns?: string, 
    countRows?: string, 
    columnGap?: number, 
    rowGap?: number, 
    responsive?: TResponsiveParameters,
    callback?: Function
}

// there is no adaptability yet
function createCollageFlex(
    {selectorContainer, heightRow = "400px", widthColumn = "auto", countColumns = "auto", countRows = "auto", columnGap = 5, rowGap = 0, responsive, callback}: TParameters): boolean
    {
    // main logic
    checkFailures();
    addClassContainer();
    getNeedfulResponsiveProps();

    const containerElement: HTMLElement | null = document.querySelector(selectorContainer),
          childElements: NodeListOf<HTMLElement> = document.querySelectorAll(`${selectorContainer} > *`);
    let arrComputedWidthElements: string[] = [];

    setStylesChildElements();

    if (callback) callback();

    return true;

    
    // functions
    function addClassContainer() { // for using styles
        const element = document.querySelector(selectorContainer);
        element?.classList.add("collage");
    }
    function setStylesCollageContainer() {
        let countRowsNum: number;  
        if(countRows == "auto") countRowsNum = 2;
        else countRowsNum = +countRows;

        if(containerElement) {
            const averageWidthChild = getAverageFromArr(); 
            const width = +(averageWidthChild * (childElements.length+1) / countRowsNum).toFixed() + +(childElements.length / countRowsNum).toFixed() * columnGap;

            if(countRows != "auto") 
            {
                containerElement.style.cssText = `
                display: flex;
                flex-wrap: wrap;
                width: ${width}px;
                height: calc(${heightRow} * ${countRowsNum} + ${countRowsNum * rowGap - rowGap}px);
                gap: ${rowGap}px ${columnGap}px;
                justify-content: flex-start;
                touch-action: none;
                `;
            }
            else {
                containerElement.style.cssText = `
                display: flex;
                flex-direction: column;
                width: 100vw;
                height: max-content;
                flex: 1 1 ${widthColumn};
                gap: ${rowGap}px ${columnGap}px;
                align-items: center;
                touch-action: none;
                `;
            }

        }
    } 
    function getAverageFromArr(): number {
        let sum: number = 0;
        for (let i = 0; i < arrComputedWidthElements.length; i++) {
            sum += getNumFromStr(arrComputedWidthElements[i]);
        }

        return sum / arrComputedWidthElements.length;
    }

    function setStylesChildElements() {
        if(countRows != "auto" ) {
            for (let i=0; i < childElements.length; i++) {
                const element: HTMLElement = childElements[i];
    
                const transitionEndFunc = () => {
                    const computedWidth: string = window.getComputedStyle(element!).width;
                    arrComputedWidthElements.push(computedWidth);
                    
                    if(i == childElements.length-1) {
                        setStylesCollageContainer();
                    }
    
                    element.removeEventListener("transitionend", transitionEndFunc);
                }
                
                element.addEventListener("transitionend", transitionEndFunc);
    
                setTimeout(() => {
                    element.style.height = heightRow;
                }, 3000);
            }
        }
        else {
            for (let i = 0; i < childElements.length; i++) {
                const element = childElements[i];

                element.style.width = widthColumn;
            }
            setStylesCollageContainer();
        }
    }

    function getNeedfulResponsiveProps() {
        let viewWidthDevice: number = window.innerWidth ? window.innerWidth : window.screen.width;
        let propsLessWidth: TResponsiveParameters = {};
        let needfulResponsiveProps: TResponsiveParameter = {};

        if(responsive) {
            for(let i = 0; i < viewWidthDevice; i++) {
                if(responsive.hasOwnProperty(i)) {
                    propsLessWidth[i] = responsive[i];
                };
            }

            if(Object.keys(propsLessWidth).length > 0) {
                for (const keyOneResponsiveWidth in propsLessWidth) { // enumeration all responsive appropriate properties  
                    const oneWidthResponsiveObj: TResponsiveParameter = propsLessWidth[keyOneResponsiveWidth];
                    
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

export default createCollageFlex;