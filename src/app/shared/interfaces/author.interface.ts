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
  scopusId: number,
  firstName: string
  lastName: string
  authName: string
  initials: string
}

export interface Coauthors {
  links: { source: number, target: number, collabStrength: number }[]
  nodes: AuthorNode[]
  affiliations: { scopusId: number, name: string }[]
}


export interface AuthorNode {
  scopusId: number
  initials: string
  firstName: string
  lastName: string
  weight: number
  rol?:string
}

export interface RandItem{
  value: string
  size: number
}
