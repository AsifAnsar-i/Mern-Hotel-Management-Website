import {test, expect} from '@playwright/test';
import path from 'path';

const UI_URL = 'http://localhost:5173/';

test.beforeEach(async ({page}) => {
    await page.goto(UI_URL);

    //get the sign in button
    await page.getByRole("link",{name: "Sign In"}).click();
 
    await expect(page.getByRole("heading",{name: "Sign In"})).toBeVisible();
 
    await page.locator("[name=email]").fill("post@gmail.com");
     await page.locator("[name=password]").fill("asif#123");
 
     await page.getByRole("button",{name: "Login"}).click();
 
     await expect(page.getByText("Login successfully")).toBeVisible();
  
});

test('should allow the user to add a hotel', async ({ page }) => {
    await page.goto(`${UI_URL}add-hotel`);

    await page.locator('[name="name"]').fill("Test Hotel");
    await page.locator('[name="city"]').fill("Test City");
    await page.locator('[name="country"]').fill("Test Country");
    await page.locator('[name="description"]').fill("Test Description");
    await page.locator('[name="pricePerNight"]').fill("100");
    await page.selectOption('select[name="starRating"]',"4");
    await page.getByText("Budget").click();
    await page.getByLabel("Free Wifi").click();
    await page.getByLabel("Parking").click();

    await page.locator('[name="adultCount"]').fill("2");
    await page.locator('[name="childCount"]').fill("1");

    await page.setInputFiles('[name="imageFiles"]',[
        path.join(__dirname, 'files', '1.png'),
        path.join(__dirname, 'files', '2.png'),
    ])

    await page.getByRole("button",{name: "Save"}).click();

    await expect(page.getByText("Hotel Saved!")).toBeVisible();
});