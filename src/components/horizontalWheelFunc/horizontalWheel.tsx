function setHorizontalWheel(e: any, speedWheel: number, element: HTMLElement) {
    e.preventDefault();

    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

    element.scrollBy({
        left: e.detail - delta * speedWheel,
        });
}

export default setHorizontalWheel;