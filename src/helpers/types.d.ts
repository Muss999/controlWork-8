export interface TypeQuote {
    author: string;
    category: string;
    text: string;
}
export interface TypeQuoteMutation {
    author: string;
    category: string;
    text: string;
    id: string;
}
export interface TypeQuotesList {
    [id: string]: TypeQuote;
}
