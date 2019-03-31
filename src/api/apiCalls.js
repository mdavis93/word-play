export const loadDictionary = async (difficulty) => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://app.linkedin-reach.io/words?difficulty=" + difficulty;
    const response = await fetch(proxyurl + url);

    let words = await response.text();
    return words.split('\n');
};
