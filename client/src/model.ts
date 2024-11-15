export interface SearchProps {
    id: String,
    title: String,
    thumbnail: string,
    duration: number,
    channel: String,   
}

export interface SearchResponse {
    message: String,
    results: SearchProps[]
}

export interface SearchRequest {
    query: String
}