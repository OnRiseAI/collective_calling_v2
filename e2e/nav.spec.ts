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

  test('the section links are visible and Start Your Journey is the CTA', async ({ page }) => {
    await page.goto('/')

    const primaryNav = page.getByRole('navigation', { name: /primary/i })
    // Aug 24 revision: the bar carries the editorial pages' six subjects in
    // the v2 header's own design.
    for (const label of [
      'Home',
      'Who We Are',
      'What We Do',
      'Get Involved',
      'Impact',
      'Contact',
    ]) {
      await expect(primaryNav.getByRole('link', { name: label, exact: true })).toBeVisible()
    }
    // The pre-revision subjects moved into the mobile panel sub-items.
    for (const label of ['Stories', 'Charity Shops', 'About', 'Events']) {
      await expect(primaryNav.getByRole('link', { name: label, exact: true })).toHaveCount(0)
    }

    // The new pages are wired in.
    await expect(primaryNav.getByRole('link', { name: 'Who We Are', exact: true })).toHaveAttribute(
      'href',
      /\/who-we-are$/,
    )
    await expect(primaryNav.getByRole('link', { name: 'What We Do', exact: true })).toHaveAttribute(
      'href',
      /\/what-we-do$/,
    )

    // The design writes the arrow into the CTA's own label, so its accessible
    // name is "Start Your Journey →".
    await expect(
      primaryNav.getByRole('link', { name: /^start your journey/i }),
    ).toHaveAttribute('href', /\/journey$/)
  })
})
