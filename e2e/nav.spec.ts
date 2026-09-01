import { test, expect } from '@playwright/test'

// The flat desktop nav (hidden below 1366px) and the mobile panel (hidden at
// 1366px and up) never show at the same width, so each block sets its own
// viewport.

test.describe('mobile navigation', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('toggle opens and closes the panel and tracks aria-expanded', async ({
    page,
  }) => {
    await page.goto('/')

    const toggle = page.getByRole('button', { name: /open menu/i })
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')

    const panel = page.getByRole('dialog', { name: /site menu/i })
    await expect(panel).toBeVisible()
    await expect(panel.getByRole('link', { name: /who we are/i })).toBeVisible()

    // Escape closes and returns aria-expanded to false.
    await page.keyboard.press('Escape')
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(panel).toBeHidden()
  })
})

test.describe('desktop flat nav', () => {
  // The v4 header carries six links, so the row yields to the drawer below
  // 1366px rather than 1280px. 1440 is the design's own preview width.
  test.use({ viewport: { width: 1440, height: 900 } })

  test('the section links are visible and Start Your Journey is the CTA', async ({ page }) => {
    await page.goto('/')

    const primaryNav = page.getByRole('navigation', { name: /^main$/i })
    for (const label of [
      'WHO WE ARE',
      'MEET THE TEAM',
      'WHAT WE DO',
      'STORIES',
      'CONTACT',
    ]) {
      await expect(primaryNav.getByRole('link', { name: label, exact: true })).toBeVisible()
    }
    await expect(primaryNav.getByRole('link', { name: 'WHO WE ARE', exact: true })).toHaveAttribute(
      'href',
      /\/who-we-are$/,
    )
    await expect(primaryNav.getByRole('link', { name: 'WHAT WE DO', exact: true })).toHaveAttribute(
      'href',
      /\/what-we-do$/,
    )
    await expect(
      primaryNav.getByRole('link', { name: 'MEET THE TEAM', exact: true }),
    ).toHaveAttribute('href', /\/meet-the-team$/)
    await expect(page.getByRole('link', { name: /^give$/i }).first()).toHaveAttribute(
      'href',
      /\/support$/,
    )
    await expect(
      page.getByRole('link', { name: /^start your journey/i }).first(),
    ).toHaveAttribute('href', /\/journey$/)
  })
})
