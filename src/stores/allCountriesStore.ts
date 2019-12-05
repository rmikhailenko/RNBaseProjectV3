import { action, observable } from 'mobx'
import { Country } from '../network/data/CountryInterface'
import { getAllCountries as getAllCountriesAPI } from '../network/CountriesApi'

export default class AllCountriesStore {
    @observable data: Country[] = []
    @observable loading: boolean = false
    @observable error: string = 'Data is empty'

    @action async getAllCountries(): Promise<any> {
        try {
            this.loading = true
            this.data = await getAllCountriesAPI()
            this.error = ''
        } catch (e) {
            this.error = e.message
        }
        this.loading = false
    }

    @action clearAllCountries() : void{
        this.data = []
        this.loading = false
        this.error = 'Data is empty'
    }
}
