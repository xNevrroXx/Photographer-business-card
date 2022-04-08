function setHorizontalWheel(selectorContainer: string) {
    const element: any = document.querySelector(selectorContainer);
    if(element) {
        if (element.addEventListener) {
            // IE9, Chrome, Safari, Opera
            element.addEventListener('mousewheel', scrollHorizontally, false);
            // Firefox
            element.addEventListener('DOMMouseScroll', scrollHorizontally, false);
        }
    }
    else {
        console.log("Could not to find the element at page")
    }


    // main logic
    function scrollHorizontally(e: any) {
        if(element)
        {
            e = window.event || e;
            var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
            element.scrollLeft -= (delta * 40); // Multiplied by 40
            e.preventDefault();

            console.log(window.getComputedStyle(element));
        } 
        else {
            throw new Error(`Could not to find the element ${selectorContainer} at the page}`)
        }
    }
};

export default setHorizontalWheel;