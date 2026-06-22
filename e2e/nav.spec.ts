import { test, expect } from '@playwright/test'

// The desktop mega-menu (hidden below lg) and the mobile panel (hidden at lg
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
    await expect(
      panel.getByRole('link', { name: /sponsor a child/i }),
    ).toBeVisible()

    // Escape closes and returns aria-expanded to false.
    await page.keyboard.press('Escape')
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(panel).toBeHidden()
  })
})

test.describe('desktop mega-menu', () => {
  test.use({ viewport: { width: 1280, height: 900 } })

  test('a section opens its dropdown and an item is reachable', async ({
    page,
  }) => {
    await page.goto('/')

    const aboutTrigger = page.getByRole('link', { name: /^about us$/i })
    await expect(aboutTrigger).toHaveAttribute('aria-expanded', 'false')

    // Hover opens the panel (Tearfund pattern).
    await aboutTrigger.hover()
    await expect(aboutTrigger).toHaveAttribute('aria-expanded', 'true')

    const item = page.getByRole('link', {
      name: 'Financial accountability',
      exact: true,
    })
    await expect(item).toBeVisible()
  })
})
