import { useLayoutEffect, useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);
/**
* @param {string} scrollingContainerSelector - selector to the target horizontal scroll container
* @param {boolean} isCreatedScrollContainer - boolean indicating whether the environment is ready to create scroll logic(default true)
* @param {React.DependencyList} deps - dependencies for the useLayoutEffect hook
* @return {RefObject} containerRef - reference to the wrapper of the scroll container
* */
const useHorizontalScroll = (scrollingContainerSelector: string, isCreatedScrollContainer: boolean = true, deps: React.DependencyList = []) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const containerEl = containerRef.current;
        if ( !containerEl || !isCreatedScrollContainer ) return;

        const context = gsap.context(self => {
            if (!self.selector) return;
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
                    pin: true
                }
            })
        }, containerEl);

        return () => context.revert();
    }, [scrollingContainerSelector, isCreatedScrollContainer, ...deps]);

    return containerRef;
}

export {useHorizontalScroll}
export default useHorizontalScroll;