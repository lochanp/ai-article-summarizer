import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const rapidapiKey = import.meta.env.VITE_RAPIDAPI_KEY;

if (!rapidapiKey) {
    throw new Error("VITE_RAPIDAPI_KEY is not defined. Make sure it's correctly set in your project's configuration.");
}

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', rapidapiKey);
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
            query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
        }),
    }),
});

export const { useLazyGetSummaryQuery } = articleApi;
