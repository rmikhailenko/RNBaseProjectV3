import React, { ReactElement, useEffect } from 'react'
import { Country } from '../../network/data/CountryInterface'
import { Region } from '../../network/data/RegionType'
import { Text, View } from 'react-native'
import styles from './styles'
import CountriesList from './countries_list/CountriesList'
// @ts-ignore
import Spinner from 'react-native-loading-spinner-overlay'
import i18n from 'i18n-js'
import { Navigation, Options } from 'react-native-navigation'
import { COUNTRY_DETAILS_SCREEN } from '../screens'
import { colors } from '../../assets/colors'
import { waitForRenderOptions } from '../../utils/navigationUtils'
import { inject, observer } from 'mobx-react'
import AllCountriesStore from '../../stores/allCountriesStore'
import CountriesByRegionStore from '../../stores/countriesByRegionStore'
import { toJS } from 'mobx'

type Props = OwnProps & PropsFromStore

export interface OwnProps {
    componentId?: string
    region?: Region
    countriesType: CountriesType
}

interface PropsFromStore {
    allCountries: AllCountriesStore
    countriesByRegion: CountriesByRegionStore
}

export type CountriesType = 'all_countries' | 'countries_by_region'

const CountriesScreen = ({
    countriesType,
    region,
    componentId,
    allCountries,
    countriesByRegion,
}: Props) => {
    const loading = allCountries.loading || countriesByRegion.loading

    useEffect(() => {
        switch (countriesType) {
            case 'all_countries':
                allCountries.getAllCountries()
                break
            case 'countries_by_region':
                countriesByRegion.getCountriesByRegion(region)
                break
        }
    }, [])

    useEffect(() => {
        return () => {
            allCountries.clearAllCountries()
            countriesByRegion.clearCountriesByRegion()
        }
    }, [])

    const getErrorView = (): ReactElement<any> => {
        let error: string = ''

        switch (countriesType) {
            case 'all_countries':
                error = allCountries.error
                break
            case 'countries_by_region':
                error = countriesByRegion.error
                break
        }

        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        )
    }

    const isError = (): boolean => {
        let isError: boolean = false
        switch (countriesType) {
            case 'all_countries':
                isError = !!allCountries.error
                break
            case 'countries_by_region':
                isError = !!countriesByRegion.error
                break
        }
        return isError
    }

    const getCountries = (): Country[] => {
        let countries: Country[] = allCountries.data

        switch (countriesType) {
            case 'all_countries':
                countries = allCountries.data
                break
            case 'countries_by_region':
                countries = countriesByRegion.data
                break
        }
        return countries
    }

    const handleCountryPress = (index: number): Promise<any> =>
        Navigation.push(componentId, {
            component: {
                name: COUNTRY_DETAILS_SCREEN,
                passProps: {
                    country: toJS(getCountries())[index],
                },
            },
        }).catch()
    return (
        <View style={styles.container}>
            {isError() ? (
                getErrorView()
            ) : (
                <CountriesList countries={toJS(getCountries())} onCountryPress={handleCountryPress} />
            )}
            <Spinner visible={loading} color={colors.primary} />
        </View>
    )
}

CountriesScreen.options = ({ countriesType, region }: Props): Options => ({
    ...waitForRenderOptions(),
    topBar: {
        title: {
            text: getTitle(countriesType, region),
        },
    },
})

const getTitle = (countriesType: CountriesType, region: Region): string => {
    let title: string = ''

    switch (countriesType) {
        case 'all_countries':
            title = i18n.t('All')
            return title
        case 'countries_by_region':
            switch (region) {
                case 'africa':
                    title = i18n.t('Africa')
                    return title
                case 'oceania':
                    title = i18n.t('Oceania')
                    return title
                case 'americas':
                    title = i18n.t('Americas')
                    return title
                case 'asia':
                    title = i18n.t('Asia')
                    return title
                case 'europe':
                    title = i18n.t('Europe')
                    return title
            }
            return title
    }
}

export default inject('allCountries', 'countriesByRegion')(observer(CountriesScreen))
