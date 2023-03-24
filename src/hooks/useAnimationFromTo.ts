import {useLayoutEffect, useRef} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)
interface IParameters {
    from: gsap.TweenVars,
    to: gsap.TweenVars
}
const useAnimationFromTo = ({from, to}: IParameters) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const animation = gsap.fromTo(ref.current, from, to);

        return () => {
            animation.kill()
        };
    }, [])

    return ref;
}

export {useAnimationFromTo};
export default useAnimationFromTo;