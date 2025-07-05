import { useNavigate } from "react-router-dom";
import type { TypeQuoteMutation } from "../../helpers/types";
import "./Quote.css";
interface Props {
    quote: TypeQuoteMutation;
    deleteQuote: (id: string) => void;
}

const Quote = ({ quote, deleteQuote }: Props) => {
    const navigate = useNavigate();

    return (
        <div className="card Quote-card bg-body-tertiary">
            <div className="card-body">
                <p className="card-text">“ {quote.text} “</p>
                <h6 className="card-title">-- {quote.author}</h6>
                <div className="Quote__bottom">
                    <button
                        type="button"
                        className="btn btn-primary me-3"
                        onClick={() => {
                            navigate(`/quotes/${quote.id}/edit`);
                        }}
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                            deleteQuote(quote.id);
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Quote;
