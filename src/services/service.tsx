const getData = async (url: string) => {
    const response = await fetch(url);

    if(!response.ok) {
        throw new Error(`Could not fetch ${url} with status ${response.status}`);
    }

    return response.json();
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