import {useState, useEffect } from 'react';

function useSearch(query) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        // fetch data
    }, [query]);

    return {data, loading};

}

function searchUI() {
    const [query, setQuery] = useState("");

    const {data, loading} = useSearch(query);

    // render UI
}