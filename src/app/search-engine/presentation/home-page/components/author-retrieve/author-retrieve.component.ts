import { Component } from '@angular/core';

@Component({
  selector: 'app-author-retrieve',
  templateUrl: './author-retrieve.component.html',
  styleUrls: ['./author-retrieve.component.css'],
})
export class AuthorRetrieveComponent {



  items: any;
  ngOnInit(): void {
    this.items = [
      {
        name: 'John Doe',
        articles: 21,
        citations: 43,
        topics: 5,
        lastArticle: 'Data Science',
        current_affiliation: 'Escuela Politecnica Nacional',
        scopusProfile: 'Link to scopus profile',
        moreInformation: 'More information',
        photo:
          'https://www.perfocal.com/blog/content/images/size/w1140/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg',
      },
      {
        name: 'Jane Smith',
        articles: 15,
        citations: 30,
        topics: 7,
        lastArticle: 'Machine Learning',
        current_affiliation: 'Escuela Politecnica Nacional',
        scopusProfile: 'Link to scopus profile',
        moreInformation: 'More information',
        photo:
          'https://www.perfocal.com/blog/content/images/size/w1140/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg',
      },
      {
        name: 'Alice Johnson',
        subtitle: 'Current Affiliation',
        articles: 30,
        citations: 50,
        topics: 8,
        lastArticle: 'Artificial Intelligence',
        current_affiliation: 'Escuela Politecnica Nacional',
        scopusProfile: 'Link to scopus profile',
        moreInformation: 'More information',
        photo:
          'https://www.perfocal.com/blog/content/images/size/w1140/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg',
      },
      {
        name: 'Alice Johnson',
        subtitle: 'Current Affiliation',
        articles: 30,
        citations: 50,
        topics: 9,
        lastArticle: 'Artificial Intelligence',
        current_affiliation: 'EPN',
        scopusProfile: 'Link to scopus profile',
        moreInformation: 'More information',
        photo:
          'https://www.perfocal.com/blog/content/images/size/w1140/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg',
      },
      {
        name: 'Alice Johnson',
        subtitle: 'Current Affiliation',
        articles: 30,
        citations: 50,
        topics: 10,
        lastArticle: 'Artificial Intelligence',
        current_affiliation: 'EPN',
        scopusProfile: 'Link to scopus profile',
        moreInformation: 'More information',
        photo:
          'https://www.perfocal.com/blog/content/images/size/w1140/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg',
      },
      {
        name: 'Alice Johnson',
        subtitle: 'Current Affiliation',
        articles: 30,
        citations: 50,
        topics: 13,
        lastArticle: 'Artificial Intelligence',
        current_affiliation: 'EPN',
        scopusProfile: 'Link to scopus profile',
        moreInformation: 'More information',
        photo: '',
      },
      {
        name: 'Alice Johnson',
        subtitle: 'Current Affiliation',
        articles: 30,
        citations: 50,
        topics: 11,
        lastArticle: 'Artificiat Intelligence',
        current_affiliation: 'EPN',
        scopusProfile: 'Link to scopus profile',
        moreInformation: 'More information',
        photo:
          'https://www.perfocal.com/blog/content/images/size/w1140/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg',
      },
      {
        name: 'Alice Johnson',
        subtitle: 'Current Affiliation',
        articles: 30,
        citations: 50,
        topics: 12,
        lastArticle: 'Artificial Intelligence',
        current_affiliation: 'EPN',
        scopusProfile: 'Link to scopus profile',
        moreInformation: 'More information',
        photo:
          'https://www.perfocal.com/blog/content/images/size/w1140/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg',
      },
    ];
  }
}
