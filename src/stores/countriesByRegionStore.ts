import { action, observable } from 'mobx'
import { Country } from '../network/data/CountryInterface'
import { Region } from '../network/data/RegionType'
import { getCountriesByRegion as getCountriesByRegionAPI } from '../network/CountriesApi'

export default class CountriesByRegionStore {
    @observable data: Country[] = []
    @observable loading: boolean = false
    @observable error: string = 'Data is empty'
    @observable region: Region = 'africa'

    @action async getCountriesByRegion(region: Region): Promise<any> {
        try {
            this.loading = true
            this.data = await getCountriesByRegionAPI(region)
            this.error = ''
        } catch (e) {
            this.error = e.message
        }
        this.loading = false
    }

    @action clearCountriesByRegion(): void {
        this.data = []
        this.loading = false
        this.error = 'Data is empty'
        this.region = 'africa'
    }
}
