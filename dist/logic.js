class Logic {
    constructor() {
        this._cityData = []
        this._currentCity = {}
    }

    get cityData() {
        return this._cityData
    }

    get currentCity() {
        return this._currentCity
    }

    set currentCity(name){
       this._currentCity = this._cityData.find(e =>  e.name==name)
    }

    async getAndSaveCity(cityName) { //Unused Function
        await $.get(`/city/${cityName}`)
            .then(async dataUnparsed=> {
                let data = JSON.parse(dataUnparsed)
                let newCity={ name: data.name, temperature: data.main.temp, condition: data.weather[0].main, conditionPic: data.weather[0].icon }
                await $.post('/city', newCity )
            })
    }

    async getCityData(cityName) {
        await $.get(`/city/${cityName}`)
            .then(dataUnparsed => {
                let data = JSON.parse(dataUnparsed)
                this._currentCity = { name: data.name, temperature: data.main.temp, condition: data.weather[0].main, conditionPic: data.weather[0].icon }
            })
    }

    async saveCurrentCity() {        
        await $.post('/city', this._currentCity)
    }

    async getDataFromDB() {
        await $.get(`/cities`)
            .then(async response => {
                this._cityData = [...response]
            })
    }

    async removeCurrentCity() {
        await $.ajax({
            url: `/city/${this._currentCity.name}`,
            type: 'DELETE',
            success: function (params) {
                console.log(params);
            }
          })
    }
}