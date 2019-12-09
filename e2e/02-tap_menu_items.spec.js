import { byId, byText, pressBack } from '../e2e/utils'
import testIDs from './testIDs/testID'
const { expect, waitFor } = require('detox')

describe('Tap menu items', () => {
    it('should have menu screen', async () => {
        await waitFor(byId(testIDs.splash.container))
            .toBeNotVisible()
            .withTimeout(10000)
    })

    it('Tap all countries menu item', async () => {
        await byId(testIDs.menuScreen.item.container('all_countries')).tap()
    })

    it('should have all countries list', async () => {
        await expect(byId(testIDs.menuScreen.all_countries.container)).toBeVisible()
    })

    it('should scroll down', async () => {
        await byId(testIDs.menuScreen.all_countries.container).scroll(50, 'down', NaN, NaN)
    })

    it('should item Angola in list', async () => {
        await waitFor(byId(testIDs.menuScreen.all_countries.item('All countries list item Angola')))
            .toBeNotVisible()
            .withTimeout(10000)
    })

    it('should tap on item Angola', async () => {
        await byText('Angola').tap()
    })

    it('should back to countries list', async () => {
        await pressBack()
    })

    it('should back to main menu', async () => {
        await pressBack()
    })
})
