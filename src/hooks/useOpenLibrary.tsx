import {useEffect, useRef, useState} from "react";
import fetchIsOpenLibrary from "../api/fetchIsOpenLibrary";

const useOpenLibrary = (query: string) => {
    const [books, setBooks] = useState([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isError, setError] = useState<boolean>(false);
    const timeoutRef = useRef<any>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(false);

        try {
            const result = await fetchIsOpenLibrary(query);

            setBooks(result);
        } catch (error) {
            setError(true);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!query || query.trim() === '') {
            setBooks([]);

            return;
        } else {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                fetchData();
            }, 500);
        }

        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, [query]);

    return { books, isLoading, isError };
};

export default useOpenLibrary;
