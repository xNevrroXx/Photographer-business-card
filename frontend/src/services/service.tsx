const getData = async (url: string) => {
    const result = await fetch(url);

    if(!result.ok) {
        console.log(`Could not fetch ${url} with status ${result.status}`);
    }

    return result.json();
}

const cacheImages = async (arrayUrls: {url: string}[]) => {
    const promises = await arrayUrls.map(({url}) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = url;
        })
    })

    return Promise.all(promises);
}


export {getData};
export {cacheImages};