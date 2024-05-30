export interface Article {
  title: string
  abstract: string
  publicationDate: Date
  authors: { scopusId: string, name: string }[]
  affiliations: string[]
  topics: string[]
  doi: string
}

export interface ArticleResult {
  scopusId: number
  title: string
  authors: string[]
  publicationDate: Date
}

export interface PaginationArticleResult {
  data: ArticleResult[]
  years: number[]
  total: number
}
