import { Page } from "@playwright/test";

export class HeaderPage {
    protected page: Page;

    private readonly douglasLogoLink = `a[class*="douglas-logo__link active"]`;
    private readonly tabLocator = (tab: string) => `li[data-uid='${tab}NavNode_DE']`;


    constructor(page: Page) {
        this.page = page;
    }

    // Methods
    async clickNavigationTab (tab: string): Promise<void> {
        await this.page.locator(this.tabLocator(tab)).click()
        await this.page.locator(this.douglasLogoLink).hover()
    }
}
