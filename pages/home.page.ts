import { Locator, Page } from "@playwright/test";
import config from '../playwright.config'

export class HomePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Methods
    async navigate (): Promise<void> {
        await this.page.goto(config.use.baseURL);
    }
}
