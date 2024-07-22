import { useEffect, useState } from "react";

export default function useHttpRequest(requestfn, payload) {
    const [isFetching, setIsFetching] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        requestfn(payload).then(async (response) => {
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