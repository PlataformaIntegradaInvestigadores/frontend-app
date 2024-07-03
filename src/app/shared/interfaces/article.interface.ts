export interface Article {
  title: string
  abstract: string
  publication_date: Date
  authors: { scopus_id: string, name: string }[]
  affiliations: string[]
  topics: string[]
  doi: string
  author_count: number
  affiliation_count: number
}

export interface ArticleResult {
  scopus_id: number
  title: string
  authors: string[]
  publication_date: Date
  author_count: number
  affiliation_count: number
}

export interface PaginationArticleResult {
  data: ArticleResult[]
  years: number[]
  total: number
}
