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
