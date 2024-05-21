import {Component} from '@angular/core';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css']
})
export class ArticlePageComponent {
  article = {
    title: "A Comprehensive Study on Machine Learning Algorithms",
    authors: [
      {
        name: "Dr. Jane Doe",
        email: "jane.doe@example.com",
        affiliation: "University of Example",
        num_articles: 50,
        topics: [
          {name: "Machine Learning"},
          {name: "Artificial Intelligence"},
          {name: "Data Science"}
        ]
      },
      {
        name: "Dr. John Smith",
        email: "john.smith@example.com",
        affiliation: "Institute of Technology",
        num_articles: 40,
        topics: [
          {name: "Neural Networks"},
          {name: "Deep Learning"},
          {name: "Big Data"}
        ]
      },
      {
        name: "Dr. John Smith",
        email: "john.smith@example.com",
        affiliation: "Institute of Technology",
        num_articles: 40,
        topics: [
          {name: "Neural Networks"},
          {name: "Deep Learning"},
          {name: "Big Data"}
        ]
      }
    ],publicationDate: '2023-08-15',
    citationCount: 120,
    affiliation: "Escuela Politecnica Nacional",
    abstract: "Introduction and objectives: The prevalence of mixed dementia (MixD), defined as the coexistence of Alzheimer's disease (AD) and vascular dementia (VaD), is likely to increase as the population ages. The five-word test (5WT) is a neuropsychological test that differentiates between major and mild neurocognitive disorder (NCD). The objective of the study is to validate 5WT for the detection of MixD. Methods: 230 participants were evaluated: cognitively healthy (CH) (n = 70), mild NCD (n = 70), and major NCD (n = 90): AD (n = 30), VaD (n = 30), and MixD (n = 30). The Spearman's coefficient, d Sommer and ROC curves were used to determine the construct validity of the 5WT. The linear regression model was performed to determine the association between age and education with 5WT performance. Results: The mean age was 79 ± 7.7 years (P≤.001), 58% were female (P = .252), and the mean education was 9 ± 5.3 years (P≤.001). Construct validity when comparing 5WT and MMSE was: Spearman's correlation ρ=.830 (P< .001) and d Sommer = .41 (P< .001). The area under the curve in the total weighted score (TWS) for MixD was .985, with 98% sensitivity (95%CI, 0.96-1.00) and 99% specificity (95%CI, 0.94-1.00), PPV of 88% (95%CI, 0.82-0.89), NPV of 100% (95%CI, 0.96-1.00), and cut-off point ≤16/20 (P< .001). Conclusions: 5WT is a rapid test with neuropsychological validation for the exploration of cognitive characteristics in major NCD type MixD, regardless of age and education. © 2021 Asociación Colombiana de Psiquiatría",
    relatedTopics: [
      { name: "Neural Networks" },
      { name: "Deep Learning" },
      { name: "Big Data" },
      { name: "Machine Learning" },
      { name: "Artificial Intelligence" },
      { name: "Data Science" },
      { name: "Machine Learning" },
      { name: "OpenAi" },
      { name: "Data analytics" }
    ]
  }
}
