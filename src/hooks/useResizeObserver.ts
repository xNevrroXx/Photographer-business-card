import { MutableRefObject, useLayoutEffect, useRef } from "react";

function useResizeObserver<T extends HTMLElement>(callback: (target: T | null, entry: ResizeObserverEntry) => void): MutableRefObject<T | null> {
    const ref = useRef<T | null>(null);

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