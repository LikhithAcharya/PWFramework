import { test, expect} from '@playwright/test';
import {ProductPage} from '../pages/ProductPage';
import { HomePage } from '../pages/HomePage';
import {BASE_URL, User_Name, Password} from '../utils/envConfig';
import { productsTocart } from '../test-data/product-data';


test.describe('Product page validation', () => {
    let homePage;
    let productPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        productPage = new ProductPage(page);
        await homePage.gotoLoginPage(BASE_URL);
        await homePage.Login(User_Name, Password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });


    test('Validate Logout Functionality', async ({ page }) => {
        await productPage.Logout();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });


    test('Validate About Us & Navigate Back', async ({ page }) => {
        await productPage.openAboutUsPage();
        const strategicText = await productPage.GetStrategicText();
        await expect(strategicText).toBe('Strategic Outcomes');
        await page.waitForTimeout(5000);
        
        await page.goBack();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    });

    test('Validate All Products displayed', async ({ page }) => {

        const allProductsDisplayed = await productPage.AllProductsDisplayed();
        await expect(allProductsDisplayed).toBe(true);
        await productPage.AddFirstProductToCart();
        await productPage.AddAllProductsToCart();
    })


    test('Validate Adding Specific Products to Cart', async ({ page }) => {
        await productPage.addSpecificProductsToCart(productsTocart);
        await page.waitForTimeout(5000);

    });

    test('Validate Product Filtering by Name (A to Z)', async ({ page }) => {
        await productPage.filterbyNameAtoZ();
        const productNames = await productPage.getProductNames();
        // create arrap and apply mergeoperator and compare with the original array
        const sortedProductNames = [...productNames].sort();
        await expect(productNames).toEqual(sortedProductNames);
    });

    test('Validate Product Filtering by Name (Z to A)', async ({ page }) => {
        await productPage.filterbyNameZtoA();
        const productNames = await productPage.getProductNames();
        const sortedProductNames = [...productNames].sort().reverse();
        await expect(productNames).toEqual(sortedProductNames);
    });

    test('Validate Product Filtering by Price (Low to High)', async ({ page }) => {
        await productPage.filterbyPriceLowToHigh();
        const productPrices = await productPage.getProductPrices();
        const sortedProductPrices = [...productPrices].sort((a, b) => a - b);
        await expect(productPrices).toEqual(sortedProductPrices);
    });

    test('Validate Product Filtering by Price (High to Low)', async ({ page }) => {
       
        await productPage.filterbyPriceHighToLow();
        const productPrices = await productPage.getProductPrices();
        const sortedProductPrices = [...productPrices].sort((a, b) => b - a);
        await expect(productPrices).toEqual(sortedProductPrices);
    });

});
//asd

//get by role uses - ADR based attributes - it will query the accesibility tree by get by role & find the element
// get by label & get by placeholder
//added github actions sss
//added github actions  eefjjjvrv wfdfef
