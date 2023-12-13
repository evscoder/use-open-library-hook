import api from "./api";

const fetchIsOpenLibrary = async (query: string) => {
    const response = await fetch(`https://openlibrary.org/search.json?q=${query}`, {
        headers: api.CORS_HEADERS
    });
    const result = await response.json();

    return result.docs;
};

export default fetchIsOpenLibrary;
