export interface Author  {
  name: String,
  email: String,
  affiliation: String,
  numero_articulos:Number,
  topics:Topic[],
}

export interface Topic {
  name: string;
}
