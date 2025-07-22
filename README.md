#PlayWright
End to End Playwright tutorials on JavaScript & TypeScript.

Project Structure
This repository contains utilities and page object classes to facilitate robust end-to-end testing using Playwright.

Utils
Utils/APIUtils.ts
Utility functions for API interactions, including authentication and order creation.

Utils/envHelper.ts
Loads environment variables and provides helpers for environment-specific base URLs.

Page Objects
LoginPage (PageObjects/LoginPage.js / .ts)
Automates login page actions (navigation, input, submission).

CartPage (PageObjects/CartPage.js / .ts)
Methods for interacting with the shopping cart, verifying products, and checkout.

DashboardPage (PageObjects/DashboardPage.js / .ts)
Dashboard automation and navigation.

OrdersReviewPage (PageObjects/OrdersReviewPage.js / .ts)
Handles order reviews—country selection, email verification, and submitting orders.

OrdersHistoryPage (PageObjects/OrdersHistoryPage.js / .ts)
Automates order history searching and selection by order ID.

POManager (PageObjects/POManager.ts)
Page Object Manager—centralizes access to all page objects for streamlined test management.

How to Use
Import and use the page object classes within your Playwright test scripts to automate E2E scenarios for login, cart management, order placement, and more.

For the full file list and the latest updates, visit the repo directly: PlayWright on GitHub

