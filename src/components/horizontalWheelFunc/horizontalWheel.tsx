function setHorizontalWheel(
    {e, element, sprayingTime = 15}: 
    {e: any, element: HTMLElement, sprayingTime?: number}) 
    {
    e.preventDefault();
    let isBack: boolean = false;
    
    const looping = () => setTimeout(() => {
        
        let delta = e.deltaY || e.detail || e.wheelDelta;
        if(e.deltaY) delta = e.deltaY;
        else if(e.detail) delta = -e.detail;
        else if(e.wheelDelta) delta = -e.wheelDelta;

        element.scrollBy({
            left: delta*0.2,
            });

        // console.log("spraySpeedWheel: ", spraySpeedWheel);

        if(--sprayingTime <= 0) return;

        looping();
    }, sprayingTime)

    looping();
}

function setLoopHorizontalWheel(element: HTMLElement, side: "left" | "right", maxTranslateX: number, startTraslateX: number) {
    let totalTranslate: number = startTraslateX;
    let delta: 1 | -1 = side == "right" ? 1 : -1;

    // console.log("max: ", maxTranslateX, "     start: ", startTraslateX);
    const looping = () => setTimeout(() => {
        if(maxTranslateX >=totalTranslate && side == "left") {
            side = "right";
            maxTranslateX = startTraslateX
            delta = 1;

            maxTranslateX = startTraslateX + maxTranslateX;
            startTraslateX = maxTranslateX - startTraslateX;
            maxTranslateX = maxTranslateX - startTraslateX;
        }
        else if(maxTranslateX <= totalTranslate && side == "right") {
            side = "left";
            delta = -1;
            
            maxTranslateX = startTraslateX + maxTranslateX;
            startTraslateX = maxTranslateX - startTraslateX;
            maxTranslateX = maxTranslateX - startTraslateX;
        }

        totalTranslate += 1 * delta;
        element.style.transform = `translateX(${totalTranslate}px)`;
        looping();
    }, 26)

    looping();
}

export {setHorizontalWheel, setLoopHorizontalWheel};