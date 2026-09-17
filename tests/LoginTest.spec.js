import { test , expect} from '@playwright/test';
import {HomePage} from '../pages/HomePage';
import {BASE_URL, User_Name, Password} from '../utils/envConfig';

test ('Login Test', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.gotoLoginPage(BASE_URL);
    await homePage.Login(User_Name, Password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');   
    //rtrthrththtthtrhtrhthrrrhrh
})