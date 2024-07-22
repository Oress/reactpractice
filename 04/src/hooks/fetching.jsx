import { useEffect, useState } from "react";

export default function useHttpRequest(requestfn) {
    const [isFetching, setIsFetching] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        requestfn().then(async (response) => {
            const json = await response.json();
            setIsFetching(false);
            setData(json);
        }).catch((error) => {
            setIsFetching(false);
            setError(error);
        })
    }, [requestfn]);
    return { isFetching, data, error };
}