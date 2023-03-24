import { useLayoutEffect, useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);
const useHorizontalScroll = (scrollingContainerSelector: string, isCreatedScrollContainer: boolean) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const containerEl = containerRef.current;

        const context = gsap.context(self => {
            if (!isCreatedScrollContainer || !self.selector) return;
            const scrollingElement = self.selector(scrollingContainerSelector)[0];
            if (!scrollingElement) return;
            const scrollingValuePx: number = scrollingElement.offsetWidth - window.innerWidth;
            if (scrollingValuePx < 0) return;

            gsap.to(scrollingElement, {
                x: -scrollingValuePx,
                ease: "none",
                scrollTrigger: {
                    trigger: containerEl,
                    start: "top top",
                    end: scrollingValuePx,
                    scrub: 0.7,
                    pin: true,
                    markers: true
                }
            })
        }, containerEl!);

        return () => context.kill()
    }, [scrollingContainerSelector, isCreatedScrollContainer]);

    return containerRef;
}

export {useHorizontalScroll}
export default useHorizontalScroll;