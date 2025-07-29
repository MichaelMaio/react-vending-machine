import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Navigate to the Vending Machine application.
  await page.goto('http://localhost:5173/');
});

test('initial page load verification', async ({ page }) => {
  // Verify the page title and heading.
  await expect(page).toHaveTitle(/Vending Machine/);
  await expect(page.getByRole('heading')).toContainText('Vending Machine');

  // Verify the money display starts at $0.00 and the quarter image is visible.
  await expect(page.getByTestId('money-display')).toContainText('$0.00');
  await expect(page.getByTestId('quarter-image')).toBeVisible();

  // Verify the product table header.
  await expect(page.getByTestId('product-header')).toContainText('Product');
  await expect(page.getByTestId('price-header')).toContainText('Price');
  await expect(page.getByTestId('remaining-header')).toContainText('Remaining');

  // Verify the product table rows include the expected names, prices, and remaining counts, and that the product imges are visible.
  await expect(page.getByTestId('product-row-0').getByTestId('product-name')).toContainText('Coke');
  await expect(page.getByTestId('product-row-0').getByTestId('product-price')).toContainText('$1.25');
  await expect(page.getByTestId('product-row-0').getByTestId('product-remaining')).toContainText('5');
  await expect(page.getByTestId('product-row-0').getByTestId('product-image')).toBeVisible();
  await expect(page.getByTestId('product-row-1').getByTestId('product-name')).toContainText('Pepsi');
  await expect(page.getByTestId('product-row-1').getByTestId('product-price')).toContainText('$0.75');
  await expect(page.getByTestId('product-row-1').getByTestId('product-remaining')).toContainText('10');
  await expect(page.getByTestId('product-row-1').getByTestId('product-image')).toBeVisible();
});

test('failed purchase due to insufficient funds', async ({ page }) => {
  // Attempt to purchase a product even though there is no money in the machine.
  await page.getByTestId('product-row-0').getByTestId('product-image').click();

  // Verify the error message for insufficient funds.
  await expect(page.getByTestId('error-content')).toContainText('Insufficient funds. Coke costs $1.25.');
});

test('insert money and purchase products', async ({ page }) => {
  // Click on the quarter image enough times to buy 6 Cokes.
  for (let i = 0; i < 30; i++) {
    await page.getByTestId('quarter-image').click();
  }

  // Verify the money display updates to the price of 6 Cokes.
  await expect(page.getByTestId('money-display')).toContainText('$7.50');

  let moneyRemaining : number = 7.50;
  let cokesRemaining : number = 5;

  // Purchase 5 Cokes.
  for (let i = 0; i < 5; i++) {
    // Purchae 1 Coke.
    await page.getByTestId('product-row-0').getByTestId('product-image').click();

    // Verify the money display goes down by the price of a Coke.
    moneyRemaining -= 1.25;
    await expect(page.getByTestId('money-display')).toContainText(moneyRemaining.toFixed(2));

    // Verify the number of Cokes remaining goes down by 1.
    cokesRemaining -= 1;
    await expect(page.getByTestId('product-row-0').getByTestId('product-remaining')).toContainText(cokesRemaining.toString());
  }

  // Purchase the Coke product even though there are none remaining in the machine.
  await page.getByTestId('product-row-0').getByTestId('product-image').click();
  
  // Verify the number of Cokes remaining is still 0.
  await expect(page.getByTestId('product-row-0').getByTestId('product-remaining')).toContainText('0');

  // Verify the money remaining hasn't changed.
  await expect(page.getByTestId('money-display')).toContainText(moneyRemaining.toFixed(2));

  // Verify the error message for insufficient funds.
  await expect(page.getByTestId('error-content')).toContainText('Sorry, Coke is out of stock');
});