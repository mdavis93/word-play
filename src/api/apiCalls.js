export const loadDictionary = async () => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://app.linkedin-reach.io/words";
    const response = await fetch(proxyurl + url);

    let words = await response.text();
    return words.split('\n');
};