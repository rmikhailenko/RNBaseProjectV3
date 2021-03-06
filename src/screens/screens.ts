import { SCREENS_PACKAGE } from '../appConstants'
import { Navigation } from 'react-native-navigation'
import { getStorybookUI } from '@storybook/react-native'
import SplashScreen from './splash/SplashScreen'
import MenuScreen from './menu/MenuScreen'
import CountriesScreen from './countries/CountriesScreen'
import SelectRegionScreen from './select_region/SelectRegionScreen'
import CountryDetailsScreen from './country_details/CountryDetailsScreen'
import AppProvider from '../App'

const STORYBOOK = `${SCREENS_PACKAGE}.STORYBOOK`
const SPLASH_SCREEN = `${SCREENS_PACKAGE}.SPLASH_SCREEN`
const MENU_SCREEN = `${SCREENS_PACKAGE}.MENU_SCREEN`
const COUNTRIES_SCREEN = `${SCREENS_PACKAGE}.COUNTRIES_SCREEN`
const SELECT_REGION_SCREEN = `${SCREENS_PACKAGE}.SELECT_REGION_SCREEN`
const COUNTRY_DETAILS_SCREEN = `${SCREENS_PACKAGE}.COUNTRY_DETAILS_SCREEN`

const registerScreens = (): void => {
    Navigation.registerComponent(
        STORYBOOK,
        () => AppProvider(getStorybookUI()),
        () => getStorybookUI(),
    )
    Navigation.registerComponent(SPLASH_SCREEN, () => AppProvider(SplashScreen), () => SplashScreen)
    Navigation.registerComponent(MENU_SCREEN, () => AppProvider(MenuScreen), () => MenuScreen)
    Navigation.registerComponent(
        COUNTRIES_SCREEN,
        () => AppProvider(CountriesScreen),
        () => CountriesScreen,
    )
    Navigation.registerComponent(
        SELECT_REGION_SCREEN,
        () => AppProvider(SelectRegionScreen),
        () => SelectRegionScreen,
    )
    Navigation.registerComponent(
        COUNTRY_DETAILS_SCREEN,
        () => AppProvider(CountryDetailsScreen),
        () => CountryDetailsScreen,
    )
}

export {
    registerScreens,
    STORYBOOK,
    SPLASH_SCREEN,
    MENU_SCREEN,
    COUNTRIES_SCREEN,
    SELECT_REGION_SCREEN,
    COUNTRY_DETAILS_SCREEN,
}
