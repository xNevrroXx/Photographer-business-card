import {useLayoutEffect, useState} from "react";

const useWindowWidth = (): number => {
    const [width, setWidth] = useState(window.innerWidth);

    useLayoutEffect(() => {
        function updateResize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener("resize", updateResize);
        updateResize();
        return () => window.removeEventListener("resize", updateResize);
    }, [])
    return width;
}

export {useWindowWidth}