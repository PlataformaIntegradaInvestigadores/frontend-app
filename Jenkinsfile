pipeline {
  agent any
  parameters {
    string(name: 'SERVICE_REF', defaultValue: 'develop', description: 'Branch/tag/SHA')
  }
  stages {
    stage('Checkout') {
      steps { git branch: params.SERVICE_REF, url: 'https://github.com/PlataformaIntegradaInvestigadores/frontend-app.git' }
    }
    stage('Quality Gate') {
      steps {
        sh 'npm ci'
        sh 'npx ng lint && npx ng build'
        sh 'npx ng test --watch=false --code-coverage'
      }
    }
    stage('Build')       { steps { sh 'docker compose build' } }
    stage('Deploy')      { steps { sh 'docker compose up -d' } }
    stage('Healthcheck') { steps { sh 'curl -f http://localhost:8082/ || exit 1' } }
    stage('Manifest')    { steps { sh 'echo "MANIFEST update: frontend SHA=$GIT_COMMIT"' } }
  }
  post { failure { echo 'Deploy failed. Revisar logs.' } }
}
