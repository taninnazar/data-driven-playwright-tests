import { test, expect } from '@playwright/test';
import { testCasesFilters } from '../fixtures/testCasesFilters'
import { HeaderPage } from '../pages/header.page'
import { HomePage } from '../pages/home.page'
import { ParfumPage } from '../pages/parfum.page'

test.describe('Data driven tests', () => {
  let homePage: HomePage
  let headerPage: HeaderPage
  let parfumPage: ParfumPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    headerPage = new HeaderPage(page)
    parfumPage = new ParfumPage(page)
  });

  for (const { highlights, secondFilterName, secondFilterData, productCount, productNames } of testCasesFilters) {
    test(`Should list the products filtered by Highlights - ${highlights} and ${secondFilterName} - ${secondFilterData}`, async ({ page }) => {
      await homePage.navigate()
      await headerPage.clickNavigationTab("Fragrances")
      await expect(parfumPage.breadcrumb).toHaveText("HomepageParfum")

      await parfumPage.selectFilter("Highlights", highlights)
      await parfumPage.selectFilter(secondFilterName, secondFilterData)
      await expect(parfumPage.productOverviewHeadline).toContainText(`Parfüm & Düfte(${productCount})`)
      await expect(parfumPage.allProductNames).toHaveText(productNames)
    });
  }
});
