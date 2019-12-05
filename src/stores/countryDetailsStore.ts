import { action, observable } from 'mobx'
import { Country, defaultCountry } from '../network/data/CountryInterface'
import { getCountryByCode as getCountryByCodeAPI } from '../network/CountriesApi'

export default class CountryDetails {
    @observable data: Country = defaultCountry
    @observable loading: boolean = false
    @observable error: string = 'Data is empty'
    @observable code: string = ''

    @action async getCountryDetails(code: string): Promise<any> {
        try {
            this.loading = true
            this.data = await getCountryByCodeAPI(code)
            this.error = ''
        } catch (e) {
            this.error = e.message
        }
        this.loading = false
    }

    @action clearCountryDetails(): void {
        this.data = defaultCountry
        this.loading = false
        this.error = 'Data is empty'
        this.code = ''
    }
}
