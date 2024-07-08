export interface Count {
  count: number;
}

export interface DashboardCounts {
  author: number;
  article: number;
  affiliation: number;
  topic: number;
}
export interface DashboardCountsYear{
  year: number;
  author: number;
  article: number;
  affiliation: number;
  topic: number;
}
export interface Word{
  text: string;
  size: number;
}
export interface LineChartInfo{
  name: string;
  series: NameValue[]
}

export interface NameValue{
  name: string;
  value: number;
}

export interface LineResponse{
  per_year: LineChartInfo;
  acumulative: LineChartInfo;
}

export interface BarTreeResponse{
  name: string;
  per_year: NameValue[];
  acumulative: NameValue;
}

export interface YearsResponse{
  year: number,
  author: number;
  article: number;
  affiliation: number;
  topic: number;
}

export interface Year {
  year: number;
}
