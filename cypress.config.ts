import { defineConfig } from 'cypress'
import { environment } from 'src/environments/environment'

export default defineConfig({
  
  e2e: {
    baseUrl: environment.clientUrl,
    supportFile: false,
  },
  
  
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  }
  
})