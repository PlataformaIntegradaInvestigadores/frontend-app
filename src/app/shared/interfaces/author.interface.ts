export interface AuthorResult {
  scopusId: number
  names: string[]
  affiliations: string[]
  articles: number
  topics: string[]
}

export interface Topic{
  name: string
}
export interface PaginationAuthorResult {
  data: AuthorResult[]
  total: number
}

export interface Author {
  name: string,
  email: string,
  affiliation: string,
  num_articles:number,
  topics:string [],
  scopus_id: number,
  first_name: string
  last_name: string
  auth_name: string
  initials: string
}

export interface Coauthors {
  links: { source: number, target: number, collabStrength: number }[]
  nodes: AuthorNode[]
  affiliations: { scopusId: number, name: string }[]
}


export interface AuthorNode {
  scopus_id: number
  initials: string
  first_name: string
  last_name: string
  weight: number
  rol?:string
}

export interface RandItem{
  value: string
  size: number
}
