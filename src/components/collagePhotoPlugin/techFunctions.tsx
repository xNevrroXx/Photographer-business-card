function getNumFromStr(str: string) {
    const regex = /^\d*/;
    let resultRegex: string = regex.exec(str)![0];
    let result: number = 0;

    if(resultRegex.length > 0)
        result = parseInt(resultRegex);
    else
        throw new Error("Pay attention, there are no numbers in your string");
    
    return result;
}

function createRandomString(
    {lengthStr = 10, validCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"}: 
    {lengthStr?: number, validCharacters?: string} ): string
{
    let result = '';
    
    for (let i = 0; i < lengthStr; i++) {
        result += validCharacters.charAt(Math.floor(Math.random() * validCharacters.length));
    }

    return result;
}

export {createRandomString, getNumFromStr};