function setHorizontalWheel(
    {e, speedWheel = 3, element, sprayingTime = 15}: 
    {e: any, speedWheel: number, element: HTMLElement, sprayingTime?: number}) 
    {
    e.preventDefault();
    console.log("true");
    let spraySpeedWheel: number = speedWheel/100*30;
    let isBack: boolean = false;
    
    const looping = (spraySpeedWheel: number) => setTimeout(() => {
        var delta: number = Math.max(-1, Math.min(1, e.wheelDelta));

        element.scrollBy({
            left: -delta * spraySpeedWheel,
            // behavior: 'smooth'
            });

        if(isBack) --spraySpeedWheel
        else if(++spraySpeedWheel >= speedWheel) {
            isBack = true;
        }
        console.log("spraySpeedWheel: ", spraySpeedWheel);

        if(--sprayingTime <= 0) return;

        looping(spraySpeedWheel);
    }, sprayingTime)

    looping(spraySpeedWheel);
}

function setLoopHorizontalWheel(element: HTMLElement, side: "left" | "right", maxTranslateX: number, startTraslateX: number) {
    let totalTranslate: number = startTraslateX;
    let delta: 1 | -1 = side == "right" ? 1 : -1;
    console.log("max: ", maxTranslateX, "     start: ", startTraslateX);
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