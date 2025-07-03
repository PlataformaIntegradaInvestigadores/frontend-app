import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface TestUser {
  email: string;
  first_name: string;
  last_name: string;
  type: 'researcher' | 'company';
  investigation_camp?: string;
  company_name?: string;
}

@Component({
  selector: 'app-magic-link',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl w-full space-y-8">
        
        <!-- Header -->
        <div class="text-center">
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            🔗 Magic Link Login
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Quick access for testing - enter email or select a test user
          </p>
        </div>

        <!-- Magic Link Form -->
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 class="text-lg font-medium text-gray-900 mb-4">✨ Generate Magic Link</h3>
          
          <div class="flex space-x-4">
            <input
              type="email"
              [(ngModel)]="email"
              placeholder="Enter email address"
              class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              (keyup.enter)="generateMagicLink()"
            >
            <button
              (click)="generateMagicLink()"
              [disabled]="!email || loading"
              class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ loading ? '⏳ Generating...' : '🚀 Generate Link' }}
            </button>
          </div>

          <!-- Magic Link Display -->
          <div *ngIf="magicLink" class="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <p class="text-sm text-green-800 mb-2">Magic link generated successfully!</p>
            <div class="flex items-center space-x-2">
              <input
                [value]="magicLink"
                readonly
                class="flex-1 px-3 py-2 text-sm bg-white border border-green-300 rounded"
              >
              <button
                (click)="copyToClipboard()"
                class="px-3 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
              >
                📋 Copy
              </button>
              <button
                (click)="loginWithMagicLink()"
                class="px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                🔐 Login Now
              </button>
            </div>
          </div>

          <!-- Error Display -->
          <div *ngIf="error" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p class="text-sm text-red-800">{{ error }}</p>
          </div>
        </div>

        <!-- Test Users Grid -->
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h3 class="text-lg font-medium text-gray-900 mb-6">👥 Quick Access - Test Users</h3>
          
          <!-- Researchers -->
          <div class="mb-8">
            <h4 class="text-md font-medium text-gray-700 mb-4 flex items-center">
              🔬 Researchers (44 users)
              <span class="ml-2 text-sm text-gray-500">researcher01@test.com - researcher44@test.com</span>
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div 
                *ngFor="let user of researchers.slice(0, 12)" 
                class="border border-gray-200 rounded-lg p-3 hover:bg-blue-50 cursor-pointer transition-colors"
                (click)="quickLogin(user.email)"
              >
                <div class="text-sm font-medium text-gray-900">{{ user.first_name }}</div>
                <div class="text-xs text-blue-600">{{ user.investigation_camp }}</div>
                <div class="text-xs text-gray-500">{{ user.email }}</div>
              </div>
              
              <!-- Show more button for researchers -->
              <div 
                *ngIf="!showAllResearchers && researchers.length > 12"
                class="border border-dashed border-gray-300 rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors flex items-center justify-center"
                (click)="showAllResearchers = true"
              >
                <span class="text-sm text-gray-500">+ {{ researchers.length - 12 }} more</span>
              </div>
            </div>
            
            <!-- Additional researchers when expanded -->
            <div *ngIf="showAllResearchers" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
              <div 
                *ngFor="let user of researchers.slice(12)" 
                class="border border-gray-200 rounded-lg p-3 hover:bg-blue-50 cursor-pointer transition-colors"
                (click)="quickLogin(user.email)"
              >
                <div class="text-sm font-medium text-gray-900">{{ user.first_name }}</div>
                <div class="text-xs text-blue-600">{{ user.investigation_camp }}</div>
                <div class="text-xs text-gray-500">{{ user.email }}</div>
              </div>
            </div>
          </div>

          <!-- Companies -->
          <div>
            <h4 class="text-md font-medium text-gray-700 mb-4 flex items-center">
              🏢 Companies (5 companies)
              <span class="ml-2 text-sm text-gray-500">company01@test.com - company05@test.com</span>
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div 
                *ngFor="let user of companies" 
                class="border border-gray-200 rounded-lg p-3 hover:bg-green-50 cursor-pointer transition-colors"
                (click)="quickLogin(user.email)"
              >
                <div class="text-sm font-medium text-gray-900">{{ user.company_name }}</div>
                <div class="text-xs text-green-600">{{ user.type | titlecase }}</div>
                <div class="text-xs text-gray-500">{{ user.email }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Instructions -->
        <div class="bg-blue-50 rounded-lg p-6">
          <h3 class="text-lg font-medium text-blue-900 mb-3">📋 How to use</h3>
          <ul class="text-sm text-blue-800 space-y-2">
            <li><span class="font-medium">1.</span> Click on any test user card for instant login</li>
            <li><span class="font-medium">2.</span> Or enter an email and generate a magic link</li>
            <li><span class="font-medium">3.</span> All test accounts use password: <code class="bg-blue-100 px-2 py-1 rounded">testpass123</code></li>
            <li><span class="font-medium">4.</span> Magic links expire in 30 minutes</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    code {
      font-family: 'Courier New', monospace;
    }
  `]
})
export class MagicLinkComponent implements OnInit {
  email = '';
  magicLink = '';
  loading = false;
  error = '';
  showAllResearchers = false;

  researchers: TestUser[] = [];
  companies: TestUser[] = [];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.generateTestUsers();
  }

  generateTestUsers() {
    // Generate researchers
    for (let i = 1; i <= 44; i++) {
      const researchFields = [
        'Artificial Intelligence', 'Machine Learning', 'Computer Vision', 
        'Natural Language Processing', 'Robotics', 'Data Science',
        'Bioinformatics', 'Quantum Computing', 'Cybersecurity', 'Blockchain'
      ];
      
      this.researchers.push({
        email: `researcher${i.toString().padStart(2, '0')}@test.com`,
        first_name: `Researcher${i.toString().padStart(2, '0')}`,
        last_name: `Test${i.toString().padStart(2, '0')}`,
        type: 'researcher',
        investigation_camp: researchFields[i % researchFields.length]
      });
    }

    // Generate companies
    const companyData = [
      { name: 'TechCorp Innovation', industry: 'Technology' },
      { name: 'DataScience Solutions', industry: 'Analytics' },
      { name: 'BioTech Research Lab', industry: 'Biotechnology' },
      { name: 'FinTech Innovations', industry: 'Finance' },
      { name: 'Green Energy Corp', industry: 'Energy' }
    ];

    for (let i = 1; i <= 5; i++) {
      this.companies.push({
        email: `company${i.toString().padStart(2, '0')}@test.com`,
        first_name: companyData[i-1].name,
        last_name: '',
        type: 'company',
        company_name: companyData[i-1].name
      });
    }
  }

  async generateMagicLink() {
    if (!this.email) return;

    this.loading = true;
    this.error = '';
    this.magicLink = '';

    try {
      const response = await this.http.post<{magic_link: string}>(`${environment.apiUrl}/auth/magic-link/`, {
        email: this.email
      }).toPromise();

      this.magicLink = response!.magic_link;
    } catch (error: any) {
      this.error = error.error?.message || 'Error generating magic link';
    } finally {
      this.loading = false;
    }
  }

  async quickLogin(email: string) {
    this.email = email;
    await this.generateMagicLink();
    
    if (this.magicLink) {
      setTimeout(() => {
        this.loginWithMagicLink();
      }, 500);
    }
  }

  async loginWithMagicLink() {
    if (!this.magicLink) return;

    try {
      // Extract token from magic link
      const url = new URL(this.magicLink);
      const token = url.searchParams.get('token');

      if (!token) {
        this.error = 'Invalid magic link format';
        return;
      }

      // Verify magic link
      const response = await this.http.post<{user: any, token: string}>(`${environment.apiUrl}/auth/magic-link/verify/`, {
        token: token
      }).toPromise();

      // Store authentication token
      localStorage.setItem('auth_token', response!.token);
      localStorage.setItem('user_data', JSON.stringify(response!.user));

      // Redirect to dashboard
      this.router.navigate(['/dashboard']);
      
    } catch (error: any) {
      this.error = error.error?.message || 'Error logging in with magic link';
    }
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.magicLink).then(() => {
      // Show success feedback
      const button = event?.target as HTMLElement;
      const originalText = button.textContent;
      button.textContent = '✅ Copied!';
      setTimeout(() => {
        if (button) button.textContent = originalText;
      }, 2000);
    });
  }
}
