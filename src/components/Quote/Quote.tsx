import type { TypeQuoteMutation } from "../../helpers/types";
import "./Quote.css";

interface Props {
    quote: TypeQuoteMutation;
}

const Quote = ({ quote }: Props) => {
    return (
        <div className="card Quote-card bg-body-tertiary">
            <div className="card-body">
                <p className="card-text">`` {quote.text} ``</p>
                <h6 className="card-title">-- {quote.author}</h6>
                <div className="Quote__bottom">
                    <button type="button" className="btn btn-primary me-3">
                        Edit
                    </button>
                    <button type="button" className="btn btn-danger">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Quote;
