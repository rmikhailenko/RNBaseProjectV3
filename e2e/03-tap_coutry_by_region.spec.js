import { byId, byText, pressBack } from '../e2e/utils'
import testIDs from './testIDs/testID'
const { expect, waitFor } = require('detox')

describe('Tap menu items', () => {
    it('should have menu screen', async () => {
        await waitFor(byId(testIDs.splash.container))
            .toBeNotVisible()
            .withTimeout(10000)
    })

    it('Tap country by region menu item', async () => {
        await byId(testIDs.menuScreen.item.container('countries_by_region')).tap()
    })

    it('should have region list container', async () => {
        await expect(byId(testIDs.menuScreen.selectedRegion.container)).toBeVisible()
    })

    it('should have africa item in list', async () => {
        await expect(byId(testIDs.menuScreen.selectedRegion.item('africa'))).toBeVisible()
    })

    it('should tap on item Africa', async () => {
        await byId(testIDs.menuScreen.selectedRegion.item('africa')).tap()
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
