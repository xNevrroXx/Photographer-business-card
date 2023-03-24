import { MutableRefObject, useLayoutEffect, useRef } from "react";

interface IUseMutationObserver {
    callback: MutationCallback,
    options?: {
        attributes: boolean,
        characterData: boolean,
        childList: boolean,
        subtree: boolean,
    }
}

function useMutationObserver<T extends Element>({callback, options = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
}}: IUseMutationObserver): MutableRefObject<T | null> {
    const ref = useRef<T | null>(null);

    useLayoutEffect(() => {
        const element = ref.current;

        if (!element) return;

        const observer = new MutationObserver(callback);

        observer.observe(element, options);
        return () => observer.disconnect();
    }, [callback, options])

    return ref;
}

export {useMutationObserver};