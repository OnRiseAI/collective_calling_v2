import { test, expect } from '@playwright/test'

// The flat desktop nav (hidden below lg) and the mobile panel (hidden at lg
// and up) never show at the same width, so each block sets its own viewport.

test.describe('mobile navigation', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('toggle opens and closes the panel and tracks aria-expanded', async ({
    page,
  }) => {
    await page.goto('/')

    const toggle = page.getByRole('button', { name: /^menu$/i })
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')

    const panel = page.getByRole('dialog', { name: /site menu/i })
    await expect(panel).toBeVisible()
    // A destination inside the panel is reachable.
    await expect(panel.getByRole('link', { name: /who we are/i })).toBeVisible()

    // Escape closes and returns aria-expanded to false.
    await page.keyboard.press('Escape')
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(panel).toBeHidden()
  })
})

test.describe('desktop flat nav', () => {
  test.use({ viewport: { width: 1280, height: 900 } })

  test('every top-level section link is visible and Get Involved is the CTA', async ({
    page,
  }) => {
    await page.goto('/')

    const primaryNav = page.getByRole('navigation', { name: /primary/i })
    for (const label of [
      'Impact',
      'Values in Action',
      'Stories',
      'Events',
      'Charity Shops',
      'About',
      'Contact',
    ]) {
      await expect(primaryNav.getByRole('link', { name: label, exact: true })).toBeVisible()
    }

    await expect(page.getByRole('link', { name: /^get involved$/i })).toHaveAttribute(
      'href',
      /\/get-involved$/,
    )
  })
})
