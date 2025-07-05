import { useCallback, useEffect, useState } from "react";
import type { TypeQuoteMutation, TypeQuotesList } from "../../helpers/types";
import axiosApi from "../../axiosApi";
import Spinner from "../Spinner/Spinner";
import Quote from "../Quote/Quote";
import "./Home.css";
import { CATEGORIES } from "../../helpers/consts";
import { useParams } from "react-router-dom";
import HomeCategoriesBlock from "./HomeCategoriesBlock/HomeCategoriesBlock";

const Home = () => {
    const params = useParams();
    const [quotes, setQuotes] = useState<TypeQuotesList>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            let data: TypeQuotesList | undefined;
            setLoading(true);
            if (params.category) {
                const response = await axiosApi.get(
                    `/quotes.json?orderBy="category"&equalTo="${params.category}"`
                );
                data = response.data;
            } else {
                const response = await axiosApi.get("/quotes.json");
                data = response.data;
            }
            if (data) {
                setQuotes(data);
            } else {
                setError(true);
            }
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    }, [params.category]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const deleteQuote = async (id: string) => {
        try {
            setLoading(true);
            await axiosApi.delete(`/quotes/${id}.json`);
            await fetchData();
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const quotesArr: TypeQuoteMutation[] = [];
    for (const quote in quotes) {
        const newQuote = { ...quotes[quote], id: quote };
        quotesArr.push(newQuote);
    }

    const currentCategory = CATEGORIES.find(
        (category) => category.id === params.category
    );
    const categoryTitle = currentCategory ? currentCategory.title : "All";

    let quotesBlock = (
        <>
            {quotesArr.map((quote, index) => {
                return (
                    <Quote
                        key={`${quote.id}-${index}`}
                        quote={quote}
                        deleteQuote={deleteQuote}
                    />
                );
            })}
        </>
    );

    if (loading) {
        quotesBlock = <Spinner />;
    } else if (error) {
        quotesBlock = (
            <div className="alert alert-danger">Произошла ошибка.</div>
        );
    } else if (quotesArr.length === 0) {
        quotesBlock = <div className="alert alert-primary">Цитат нет.</div>;
    }

    return (
        <div className="Home__main-block">
            <HomeCategoriesBlock />
            <div className="Home__quotes-list">
                <h2>{categoryTitle}</h2>
                {quotesBlock}
            </div>
        </div>
    );
};

export default Home;
