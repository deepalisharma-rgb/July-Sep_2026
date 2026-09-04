import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('admin');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Username' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Username' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Username' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('ad');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByText('Amin sigdel').click();
  await page.getByText('Amin sigdel').click();
  await page.getByRole('listitem').filter({ hasText: 'Amin sigdel' }).locator('i').click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();
});