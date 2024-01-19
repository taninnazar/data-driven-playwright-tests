import { expect, Locator, Page } from "@playwright/test";

export class ParfumPage {
    protected page: Page;

    readonly breadcrumb: Locator
    readonly productOverviewHeadline: Locator
    readonly allProductNames: Locator
    private readonly filterDropdownButton = () => `div[class="facet__title"]`
    private readonly filterDropdownOption = () => `a[class*="facet-option active"]`


    constructor(page: Page) {
        this.page = page;

        this.breadcrumb = page.locator('div[class="breadcrumb"]')
        this.productOverviewHeadline = page.locator('div[class*="product-overview__headline-wrapper"]')
        this.allProductNames = page.locator('div[class*="product-info"] div[class*="text name"]')
    }

    // Methods
    async selectFilter (filterName: string, filterOption: string): Promise<void> {
        await this.page.locator((this.filterDropdownButton())).filter({hasText: filterName}).waitFor({state: 'visible'})
        await this.page.locator((this.filterDropdownButton())).filter({hasText: filterName}).click()
        await this.page.locator((this.filterDropdownOption())).filter({hasText: filterOption}).waitFor({state: 'visible'})
        await this.page.locator((this.filterDropdownOption())).filter({hasText: filterOption}).click()
        await this.page.locator((this.filterDropdownButton())).filter({hasText: filterName}).click()
    }

    async getAllProductNames (): Promise<String[]> {
        return await this.allProductNames.allTextContents()
    }
}
