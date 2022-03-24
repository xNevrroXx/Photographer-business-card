const getPhotos = async (url: string) => {
    const result = await fetch(url);

    if(!result.ok) {
        console.log(`Could not fetch ${url} with status ${result.status}`);
    }

    return result.json();
}

export {getPhotos};