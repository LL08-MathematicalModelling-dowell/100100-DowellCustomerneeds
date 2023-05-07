import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
    const [quote, setQuote] = useState();

    useEffect(() => {
        const fetchQuote = async () => {
            const res = await axios.get('http://127.0.0.1:8000/api/services/');
            setQuote(res.data);
        };

        fetchQuote();
    }, []);

    console.log(quote)

    return (
        <div>
            <h1>Get quotes using fetch API</h1>

            <div>{quote?.category}</div>
            <div>{quote?.location}</div>
            <div>{quote?.product}</div>
        </div>
    );
}