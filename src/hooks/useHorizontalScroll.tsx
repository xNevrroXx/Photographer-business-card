import { useEffect, useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);
const useHorizontalScroll = (scrollingContainerSelector: string) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const containerEl = containerRef.current;

        const context = gsap.context(self => {
            if (!self.selector) return;
            const scrollingElement = self.selector(scrollingContainerSelector);
            const scrollingValuePx = scrollingElement[0].offsetWidth - window.innerWidth;

            gsap.to(scrollingElement, {
                x: -scrollingValuePx,
                ease: "none",
                scrollTrigger: {
                    trigger: containerEl,
                    start: "top top",
                    end: scrollingElement.offsetWidth,
                    scrub: 0.7,
                    pin: true,
                }
            })
        }, containerEl!);

        return () => context.kill()
    }, []);

    return containerRef;
}

export {useHorizontalScroll}
export default useHorizontalScroll;