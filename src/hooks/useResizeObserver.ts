import { RefObject, useLayoutEffect, useRef } from "react";

function useResizeObserver<T extends HTMLElement>(callback: (target: T, entry: ResizeObserverEntry) => void): RefObject<T> {
    const ref = useRef<T>(null);

    useLayoutEffect(() => {
        const element = ref.current;

        if (!element) return;

        const observer = new ResizeObserver(entries => {
            callback(element, entries[0]);
        });

        observer.observe(element);
        return () => observer.disconnect();
    }, [callback])

    return ref;
}

export {useResizeObserver};