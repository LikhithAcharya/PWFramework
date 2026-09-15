exports.ProductPage = 

class ProductPage {

    constructor(page) 
    {
        this.page = page;
        this.settingsIcon = '//button[@id="react-burger-menu-btn"]';
        this.AboutUsLink = '//a[@id="about_sidebar_link"]';
        this.LogoutLink = '//a[@id="logout_sidebar_link"]';
        this.StrategicText= "//h2[normalize-space()='Strategic Outcomes']";
        this.productNames = ".inventory_item_name";
        this.productPrices = ".inventory_item_price";
        this.addToCartButtons = ".btn_inventory";
        this.productDescriptions = ".inventory_item_desc";
        this.filterDropdown = ".product_sort_container";
        this.filterNameAtoZ = "option[value='az']";
        this.filterNameZtoA = "option[value='za']";
        this.filterPriceLowToHigh = "option[value='lohi']";
        this.filterPriceHighToLow = "option[value='hilo']";

    }

    async openAboutUsPage()
    {
        await this.page.locator(this.settingsIcon).click();
        await this.page.locator(this.AboutUsLink).click();
    }


    async Logout()
    {
        await this.page.locator(this.settingsIcon).click();
        await this.page.locator(this.LogoutLink).click();
    }

    async GetStrategicText()
    {
        return await this.page.locator(this.StrategicText).textContent();
        
    }

    async AllProductsDisplayed()
    {
        const names = await this.page.locator(this.productNames).allTextContents();
        const price = await this.page.locator(this.productPrices).allTextContents();
        const descriptions = await this.page.locator(this.productDescriptions).allTextContents();
        const buttonCount = await this.page.locator(this.addToCartButtons).count();

        if(names.length === price.length && price.length === descriptions.length && descriptions.length === buttonCount)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    async AddFirstProductToCart()
    {
        await this.page.locator(this.addToCartButtons).first().click();
    }

    async AddAllProductsToCart()
    {
        const buttonCount = await this.page.locator(this.addToCartButtons).count();
        for(let i=0; i<buttonCount; i++)
        {
            await this.page.locator(this.addToCartButtons).nth(i).click();
            await this.page.waitForTimeout(2000);
        }
    }
    async addSpecificProductsToCart(productNames)
    {
        const productNamesOnPage = await this.page.locator(this.productNames);
        const buttonCount = await productNamesOnPage.count();

        for (let i = 0; i < buttonCount; i++) {
            const productName = await productNamesOnPage.nth(i).textContent();
            if (productNames.includes(productName)) {
                await this.page.locator(this.addToCartButtons).nth(i).click();
                await this.page.waitForTimeout(2000);
            }
        }

     /*   for (let pname of productNamesOnPage)
        {
            let value = await pname.textContent();
            if(productNames.includes(value))
            {
                await this.page.locator(this.addToCartButtons).nth(i).click();
                await this.page.waitForTimeout(2000);
            }

        } */

    }

    async filterbyNameAtoZ()
    {
        await this.page.selectOption(this.filterDropdown, {value: 'az'});
    }

      async filterbyNameZtoA()
    {
        await this.page.selectOption(this.filterDropdown, {value: 'za'});
    }

      async filterbyPriceLowToHigh()
    {
        await this.page.selectOption(this.filterDropdown, {value: 'lohi'});
    }

      async filterbyPriceHighToLow()
    {
        await this.page.selectOption(this.filterDropdown, {value: 'hilo'});
    }

    async getProductNames()
    {
        return await this.page.locator(this.productNames).allTextContents();
    }

    async getProductPrices()
    {
        const prices = await this.page.locator(this.productPrices).allTextContents();
        return prices.map(price => parseFloat(price.replace('$', '')));
    }
}