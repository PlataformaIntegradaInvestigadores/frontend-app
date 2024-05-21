export interface Author  {
  name: String,
  email: String,
  affiliation: String,
  num_articles:Number,
  topics:Topic[],
}

export interface Topic {
  name: string;
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
}
