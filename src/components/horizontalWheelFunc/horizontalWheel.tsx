// Desktop
function setHorizontalWheel(
    {e, element, sprayingTime = 15, maxCoefficient = sprayingTime/2}: 
    {e: any, element: HTMLElement, sprayingTime?: number, maxCoefficient?: number}) 
    {
    e.preventDefault();

    let sprayingCoefficient = 0;
    let delta = Math.max(-1, Math.min(1, e.deltaY || e.detail || -e.wheelDelta));

    const looping = () => {
        setTimeout(() => {
            element.scrollBy({
                left: delta * sprayingCoefficient,
                });
            console.log(delta*sprayingCoefficient)
            if(--sprayingTime <= 0) return;
            
            if(maxCoefficient == 0 && sprayingCoefficient > maxCoefficient) {
                --sprayingCoefficient;
                // console.log("here")
            }
            else if(sprayingCoefficient++ > maxCoefficient) maxCoefficient = 0;

            console.log(sprayingCoefficient)
            looping();
        }, sprayingTime)
    }

    looping();
}

const setListenerDesktopHorizontalWheel = (element: any) => {
    const onHorizontalWheel = (e: any) => setHorizontalWheel.call(null, {e: e, element: element, sprayingTime: 12});
    // element.addEventListener("wheel", onHorizontalWheel);
    
    if (element.addEventListener) {
        if ('onwheel' in document) {
            // IE9+, FF17+, Ch31+
            element.addEventListener("wheel", onHorizontalWheel);
        } 
        else if ('onmousewheel' in document) {
            // устаревший вариант события
            element.addEventListener("mousewheel", onHorizontalWheel);
        } 
        else {
            // Firefox < 17
            element.addEventListener("MozMousePixelScroll", onHorizontalWheel);
        }
    } 
    else { // IE8-
        element.attachEvent("onmousewheel", onHorizontalWheel);
    }

    return () => element.removeEventListener("wheel", onHorizontalWheel);
}

// Only mobyle
type coordinates = {x: number, y: number};
interface argumentsTapWheel {
    element: HTMLElement,
    sensetivity?: number, 
    sprayingTime?: number, 
    ratio?: number
}

function setListenerTapHorizontalWheel( {element, sensetivity = 20, sprayingTime = 10, ratio = 5}: argumentsTapWheel ) {
    const startValues = {
        sprayingTime: sprayingTime
    }

    let startPosition: coordinates, touchPosition: coordinates;

    element.addEventListener("pointerdown", beginWheelPointer);
    element.addEventListener("pointerup", stopWheelPointer);

    function updaateParams() {
        sprayingTime = startValues.sprayingTime;
    }

    function beginWheelPointer(e: PointerEvent) {
        updaateParams();

        element.ondragstart = (e) => e.preventDefault();
        startPosition = {
            x: e.clientX,
            y: e.clientY
        }
        touchPosition = {
            x: e.clientX,
            y: e.clientY
        }
        changeScrollX();

        element.addEventListener("pointermove", moveWheelPointer);
        element.setPointerCapture(e.pointerId);
    }
    
    function moveWheelPointer(e: PointerEvent) {
        touchPosition = {
            x: e.clientX,
            y: e.clientY
        }
        changeScrollX();
    }

    function stopWheelPointer(e: PointerEvent) {
        touchPosition = {
            x: e.clientX,
            y: e.clientY
        }
        changeScrollX();

        element.removeEventListener("pointermove", moveWheelPointer)
        element.releasePointerCapture(e.pointerId);
    }

    function checkAction(): -1 | 1 | 0 {
        const d = {
            x: touchPosition.x - startPosition.x,
            y: touchPosition.y - startPosition.y
        }
        let delta: 1 | -1 | 0 = 0;

        if(Math.abs(d.x) > Math.abs(d.y)) {
            if(Math.abs(d.x) > sensetivity) {
                if(d.x > 0) {
                    delta = -1;
                } else {
                    delta = 1;
                }
            }
        }

        return delta;
    }

    function changeScrollX() {
        // let maxCoefficientTemp = maxCoefficient;
        // let sprayingCoefficient = 1;

        let sprayingTimeTemp = sprayingTime;
        let delta = checkAction();

        const looping = () => {
            setTimeout(() => {
                element.scrollBy({
                    left: delta * ratio/* sprayingCoefficient */,
                    });
                if(--sprayingTimeTemp <= 0) return;
                
                // if(maxCoefficientTemp == 0 && sprayingCoefficient > maxCoefficientTemp) --sprayingCoefficient;
                // else if(sprayingCoefficient++ > maxCoefficientTemp) maxCoefficientTemp = 0;
                // console.log(`sprayingCoefficient${iterator}: `, sprayingCoefficient);
                looping();
            }, sprayingTimeTemp)
        }
    
        looping();
    }
}









// universal
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

export {setHorizontalWheel, setLoopHorizontalWheel, setListenerDesktopHorizontalWheel, setListenerTapHorizontalWheel};