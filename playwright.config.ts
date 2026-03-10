import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

export default defineConfig({
  // Directory where tests are located
  testDir: './tests',

  // Run login once before all tests to create storageState
  globalSetup: './utils/auth/global-login.setup.ts',

  // Global timeout per test
  timeout: 4 * 60 * 1000,

  // Number of parallel workers
  workers: 1,
  // Parallel execution of tests
  fullyParallel:true,
  
  
retries:1,

  // Test reporters
  reporter: [
    ['allure-playwright', { outputFolder: 'allure-results' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],

  use: {
    // Base URL for all tests
    baseURL: 'https://one-platform-um-fe.oat.sma2.safaricomet.net',
 
  permissions: ['geolocation'],
  geolocation: { latitude: 8.9806, longitude: 38.7578 }, // example coords
  // ...your existing settings

    // Run browser with UI (not headless)
    headless: false, // Set to false if you want to see the browser during test execution

    // 🔥 VERY IMPORTANT
    // Disable Playwright's fixed viewport
    // Allows browser window to control full width & height
    viewport: null,

    // Browser launch options
    launchOptions: {
      args: [
        '--start-maximized',              // Open browser fully maximized
        '--force-device-scale-factor=0.9' // Your zoom preference
      ],
    },

    // Capture screenshots
    screenshot: "only-on-failure",

    // Record videos for tests
    video: "retain-on-failure",

    // Enable tracing (screenshots + DOM + source)
    trace: 'on',

    // Timeout for actions like click, fill, etc.
    actionTimeout: 30 * 1000,

    // Timeout for page navigation
    navigationTimeout: 60 * 1000,

    // Ignore HTTPS / SSL issues
    ignoreHTTPSErrors: true,

    // Reuse authenticated session created in globalSetup
    storageState: 'storageState.json',

    // add playwright browsers f noly only chrome b;ut for the otthers
    
  },
});
