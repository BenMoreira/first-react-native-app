import { useState, useEffect } from "react";
import axios from "axios";
import {RAPID_API_KEY} from "@env";

const rapidapikey = RAPID_API_KEY;

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: { ...query },
        headers: {
          'X-RapidAPI-Key': rapidapikey,
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const respose = await axios.request(options);

            setData(respose.data.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            alert('There is an error!');
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
      fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(false);
        fetchData();
    }

    return { data, isLoading, error, refetch};    
}