import { CSSProperties } from "react";
import "./collage-photo-plugin.scss";

// there is no adaptability yet
function createCollage( 
    {selectorContainer, heightRow = "400px", widthColumn = "400px", countColumns = "auto", countRows = "auto", columnGap = 5, rowGap = 0}:
    {selectorContainer: string, heightRow?: string, widthColumn?: string, countColumns?: string, countRows?: string, columnGap?: number, rowGap?: number}): boolean
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
        
        let styles: string = '';
        // console.log( 550*(+(childElements.length / countRowsNum).toFixed()+0.5) + (+(childElements.length / countRowsNum).toFixed() * columnGap + 3)+"px" )
        // console.log(+(childElements.length / countRowsNum).toFixed() * columnGap + 3);
        styles = `calc((550px*${+(childElements.length / countRowsNum).toFixed()}) + (${+(childElements.length / countRowsNum).toFixed() * columnGap + 3}px))`;
        let viewWidthDevice = window.innerWidth ? window.innerWidth : window.screen.width;

        containerElement!.style.width = styles
    } 
    function checkFailures() { //
        // add no use tag!!!!!!!!!!!!!!!! add no use ZERO numbers !!!!!!!!!!!!!!!!!!!!!!
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