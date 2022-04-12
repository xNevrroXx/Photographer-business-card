// import { CSSProperties } from "react";
import "./collage-photo-plugin.scss";

//types
type responsive = {
    [resolution: number]: {
        heightRow?: string,
        widthColumn?: string,
        countColumns?: number,
        countRows?: number,
        rowGap?: number
    }
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

    const containerElement: HTMLElement | null = document.querySelector(selectorContainer),
          childElements: NodeListOf<HTMLElement> = document.querySelectorAll(`${selectorContainer} > *`);
    
    setResponsiveWidthCollageContainer();
    
    return true; // сигнал: коллаж создан

    // functions
    function addClassContainer() { // for using styles
        const element = document.querySelector(selectorContainer);
        element?.classList.add("collage");
    }
    function setResponsiveWidthCollageContainer() {
        let countRowsNum: number;  
        if(countRows == "auto") countRowsNum = 2;
        else countRowsNum = +countRows;
        
        let width: string = '';
        let viewWidthDevice = window.innerWidth ? window.innerWidth : window.screen.width;

        let keysLessWidth: number[] = [];
        let propsLessWidth: responsive = {};
        // if(responsive) {
        //     //test
        //     viewWidthDevice = 1500;
        //     responsive = {
        //         500: {
        //             countColumns: 500,
        //             countRows: 2
        //         },
        //         800: {
        //             countRows: 50,
        //             heightRow: "500px"
        //         }
        //     }
        //     for(let i = 0; i < viewWidthDevice; i++) {
        //         if(responsive.hasOwnProperty(i)) {
        //             keysLessWidth.push(i);
        //             propsLessWidth[i] = responsive[i];
        //         };
        //     }
        //     console.log("objLessWidth: ", propsLessWidth);
        //     console.log("lessWidthKeys: ", keysLessWidth);

        //     if(keysLessWidth.length > 0) {
        //         let needfulResponsiveProps: responsive;

        //         // Object.keys(/* someObj */).length;
        //     }
        // }
        
        if(keysLessWidth.length == 0) { //if there are not responsive property with number(width) less than current viewWidthDevice 
            width = `calc((${widthColumn}*${+(childElements.length / countRowsNum).toFixed()}) + (${+(childElements.length / countRowsNum).toFixed() * columnGap + 3}px))`;
        }

        containerElement!.style.width = width;
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

export default createCollage;