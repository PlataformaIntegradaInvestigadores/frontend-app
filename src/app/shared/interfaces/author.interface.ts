export interface AuthorResult {
  scopusId: number
  names: string[]
  affiliations: string[]
  articles: number
  topics: string[]
  current_affiliation: string
  citation_count: number
  updated:boolean
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
  articles:number,
  topics:string [],
  scopus_id: number,
  first_name: string
  last_name: string
  auth_name: string
  initials: string
  current_affiliation: string
  citation_count: number
}

export interface CoauthorInfo {
  data: Data;
}

export interface Data {
  nodes: AuthorNode[];
  links: Link[];
}

export interface Link {
  source:         number;
  target:         number;
  collabStrength: number;
}

export interface Coauthors {
  links: Link[]
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
