export interface Article {
  scopus_id: string;
  title: string;
  abstract: string;
  publication_date?: string;
  author_count?: number;
  affiliation_count?: number;
  authors?: any[];
  affiliations?: any[];
  topics?: string[];
  relevance?: number;  // Added for LLM search
  citations: number
}

export interface ArticleResult {
  title: string;
  abstract: string;
  scopus_id: string;
  author_count?: number;
  affiliation_count?: number;
  publication_date?: string;
  relevance?: number;  // Added for LLM search
}

export interface PaginationArticleResult {
  data: ArticleResult[];
  total: number;
  years?: number[];
  timing?: {    // Added for LLM search timing info
    translation_time?: number;
    keybert_time?: number;
    bm25_time?: number;
    dense_time?: number;
    total_time?: number;
  };
  query_info?: {  // Added for LLM search metadata
    original_query?: string;
    enhanced_query?: string;
    extracted_keywords?: string[];
  };
}

export interface ArticlesResponse {
  title: string;
  publication_date: string;
  scopus_id: string;
}