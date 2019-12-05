import AllCountriesStore from './allCountriesStore'
import CountriesByRegionStore from './countriesByRegionStore'
import CountryDetails from './countryDetailsStore'

class StoreRoot {
    allCountries = new AllCountriesStore()
    countriesByRegion = new CountriesByRegionStore()
    countryDetails = new CountryDetails()
}

const storeRoot = new StoreRoot()

export default storeRoot