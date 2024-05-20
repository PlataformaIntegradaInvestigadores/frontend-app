import { Component } from '@angular/core';

@Component({
  selector: 'app-article-information',
  templateUrl: './article-information.component.html',
  styleUrls: ['./article-information.component.css']
})
export class ArticleInformationComponent {
  items = [{
    title: "A Comprehensive Study on Machine Learning Algorithms",
    authors: [
      {
        name: "Dr. Jane Doe",
        email: "jane.doe@example.com",
        affiliation: "University of Example",
        num_articles: 50,
        topics: [
          { name: "Machine Learning" },
          { name: "Artificial Intelligence" },
          { name: "Data Science" }
        ]
      },
      {
        name: "Dr. John Smith",
        email: "john.smith@example.com",
        affiliation: "Institute of Technology",
        num_articles: 40,
        topics: [
          { name: "Neural Networks" },
          { name: "Deep Learning" },
          { name: "Big Data" }
        ]
      },
      {
        name: "Dr. John Smith",
        email: "john.smith@example.com",
        affiliation: "Institute of Technology",
        num_articles: 40,
        topics: [
          { name: "Neural Networks" },
          { name: "Deep Learning" },
          { name: "Big Data" }
        ]
      }
    ],
    publicationDate: '2023-08-15',
    citationCount: 120,
    affiliation: "Escuela Politecnica Nacional"
  }, {
    title: "A Comprehensive Study on Machine Learning Algorithms",
    authors: [
      {
        name: "Dr. Jane Doe",
        email: "jane.doe@example.com",
        affiliation: "University of Example",
        num_articles: 50,
        topics: [
          { name: "Machine Learning" },
          { name: "Artificial Intelligence" },
          { name: "Data Science" }
        ]
      },
      {
        name: "Dr. John Smith",
        email: "john.smith@example.com",
        affiliation: "Institute of Technology",
        num_articles: 40,
        topics: [
          { name: "Neural Networks" },
          { name: "Deep Learning" },
          { name: "Big Data" }
        ]
      }
    ],
    publicationDate: '2023-08-15',
    citationCount: 120,
    affiliation: "ESPE"
  },{
    title: "A Comprehensive Study on Machine Learning Algorithms",
    authors: [
      {
        name: "Dr. Jane Doe",
        email: "jane.doe@example.com",
        affiliation: "University of Example",
        num_articles: 50,
        topics: [
          { name: "Machine Learning" },
          { name: "Artificial Intelligence" },
          { name: "Data Science" }
        ]
      },
      {
        name: "Dr. John Smith",
        email: "john.smith@example.com",
        affiliation: "Institute of Technology",
        num_articles: 40,
        topics: [
          { name: "Neural Networks" },
          { name: "Deep Learning" },
          { name: "Big Data" }
        ]
      }
    ],
    publicationDate: '2023-08-15',
    citationCount: 120,
    affiliation: "Escuela Politecnica Nacional"
  }, {
    title: "A Comprehensive Study on Machine Learning Algorithms",
    authors: [
      {
        name: "Dr. Jane Doe",
        email: "jane.doe@example.com",
        affiliation: "University of Example",
        num_articles: 50,
        topics: [
          { name: "Machine Learning" },
          { name: "Artificial Intelligence" },
          { name: "Data Science" }
        ]
      },
      {
        name: "Dr. John Smith",
        email: "john.smith@example.com",
        affiliation: "Institute of Technology",
        num_articles: 40,
        topics: [
          { name: "Neural Networks" },
          { name: "Deep Learning" },
          { name: "Big Data" }
        ]
      }
    ],
    publicationDate: '2023-08-15',
    citationCount: 120,
    affiliation: "ESPE"
  }

  ]
}
