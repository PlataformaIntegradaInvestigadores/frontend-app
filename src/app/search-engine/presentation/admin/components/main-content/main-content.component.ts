import { Component, OnInit } from '@angular/core';
import {
  ArticleComparator,
  AuthorComparator,
  Status,
} from 'src/app/search-engine/domain/entities/author.comparator.interface';
import { DashboardAdminService } from 'src/app/search-engine/domain/services/dashboard-admin.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent implements OnInit {
  modelExists: boolean = true;
  authorComparator: AuthorComparator | undefined;
  articleComparator: ArticleComparator | undefined;
  articlePercentage: number = 0;
  authorPercentage: number = 0;
  existsModel: boolean = false;
  existsCorpus: boolean = false;
  corpusStatus: Status | undefined;
  modelStatus: Status | undefined;
  generalStatus: Status | undefined;

  constructor(private dashboardAdminService: DashboardAdminService) {}

  ngOnInit(): void {
    this.getAuthorComparator();
    this.getArticlesComparator();
    this.getModelCorpusObserver();
  }

  getAuthorComparator() {
    this.dashboardAdminService.getAuthorComparator().subscribe({
      next: (data) => {
        this.authorComparator = data;
        this.calculateAuthorPercentage();
      },
      error: (error) => {
        if (error.status === 0) {
          this.generalStatus = {
            success: false,
            message:
              'Unable to connect to the server. Please try again later.',
          };
        } else if (error.status === 400) {
          if (error.error && error.error.message) {
            this.generalStatus = {
              success: false,
              message: error.error.message,
            };
          } else {
            this.generalStatus = {
              success: false,
              message: 'Error getting author comparator',
            };
          }
        } else {
          this.generalStatus = {
            success: false,
            message: 'Error getting author comparator',
          };
        }
      }
    }
  );
  }
  getArticlesComparator() {
    this.dashboardAdminService.getArticlesComparator().subscribe({
      next: (data) => {
        this.articleComparator = data;
        this.calculateArticlePercentage();

      },
      error: (error) => {
        if (error.status === 0) {
          this.generalStatus = {
            success: false,
            message:
              'Unable to connect to the server. Please try again later.',
          };
        } else if (error.status === 400) {
          if (error.error && error.error.message) {
            this.generalStatus = {
              success: false,
              message: error.error.message,
            };
          } else {
            this.generalStatus = {
              success: false,
              message: 'Error getting article comparator',
            };
          }
        } else {
          this.generalStatus = {
            success: false,
            message: 'Error getting article comparator',
          };
        }
      },

    });
  }

  calculateAuthorPercentage() {
    if (this.authorComparator) {
      this.authorPercentage =
        -Math.round(
          (this.authorComparator.authors_no_updated /
            this.authorComparator.total_authors) *
            100
        ) + 100;
    } else {
      this.authorPercentage = 0;
    }
  }
  calculateArticlePercentage() {
    if (this.articleComparator) {
      this.articlePercentage = Math.round(
        (this.articleComparator.total_centinela /
          this.articleComparator.total_scopus) *
          100
      );
    } else {
      this.articlePercentage = 0;
    }
  }

  getModelCorpusObserver() {
    this.dashboardAdminService.getmodelCorpusObserver().subscribe(
      {
        next: (data) => {
          this.existsModel = data.model;
          this.existsCorpus = data.corpus;
        },
        error: (error) => {
          if (error.status === 0) {
            this.generalStatus = {
              success: false,
              message:
                'Unable to connect to the server. Please try again later.',
            };
          } else if (error.status === 400) {
            if (error.error && error.error.message) {
              this.generalStatus = {
                success: false,
                message: error.error.message,
              };
            } else {
              this.generalStatus = {
                success: false,
                message: 'Error getting model corpus observer',
              };
            }
          } else {
            this.generalStatus = {
              success: false,
              message: 'Error getting model corpus observer',
            };
          }
        },
      }
    );
  }
  generateCorpus() {
    this.dashboardAdminService.generateCorpus().subscribe({
      next: (data) => {
        this.corpusStatus = data;
        this.getModelCorpusObserver();
      },
      error: (error) => {
        if (error.status === 0) {
          this.corpusStatus = {
            success: false,
            message:
              'Unable to connect to the server. Please try again later.',
          };
        } else if (error.status === 400) {
          if (error.error && error.error.message) {
            this.generalStatus = {
              success: false,
              message: error.error.message,
            };
          } else {
            this.corpusStatus = {
              success: false,
              message: 'Error generating corpus',
            };
          }
        } else {
          this.corpusStatus = {
            success: false,
            message: 'Error generating corpus',
          };
        }
      },
      complete: () => {
        console.log('Request complete');
      },
    });

  }
}
