export interface AskRequest {
  query: string;
  topk?: number;
}

export interface RagBlock {
  cite_id: string;
  title: string;
  text: string;
  authors_mention?: string;
  authors_raw?: string;
  year?: string;
  doi_raw?: string;
}

export interface AskResponse {
  query: string;
  answer_text: string;
  blocks: RagBlock[];
  used_refs_report: string;
  timing_ms: { search: number; rerank: number; generate: number; total: number };
}
