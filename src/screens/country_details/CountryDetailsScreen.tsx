import React, { useEffect } from 'react'
import { Country } from '../../network/data/CountryInterface'
import styles from './styles'
import CountryDetailsView from './components/country_details_view/CountryDetailsView'
// @ts-ignore
import Spinner from 'react-native-loading-spinner-overlay'
import { View } from 'react-native'
import { Options } from 'react-native-navigation'
import { waitForRenderOptions } from '../../utils/navigationUtils'
import { colors } from '../../assets/colors'
import { inject, observer } from 'mobx-react'
import CountryDetails from '../../stores/countryDetailsStore'

type Props = OwnProps & PropsFromStore

export interface OwnProps {
    componentId?: string
    country: Country
}

interface PropsFromStore {
    countryDetails: CountryDetails
}

const CountryDetailsScreen = ({ country: { alpha2Code }, countryDetails }: Props) => {
    useEffect(() => {
        countryDetails.getCountryDetails(alpha2Code)
    }, [])

    useEffect(() => {
        return () => {
            countryDetails.clearCountryDetails()
        }
    }, [])

    return (
        <View style={styles.container}>
            <CountryDetailsView country={countryDetails.data} />
            <Spinner visible={countryDetails.loading} color={colors.primary} />
        </View>
    )
}

CountryDetailsScreen.options = ({ country: { name } }: Props): Options => ({
    ...waitForRenderOptions(),
    topBar: {
        title: {
            text: name,
        },
    },
})

export default inject('countryDetails')(observer(CountryDetailsScreen))
