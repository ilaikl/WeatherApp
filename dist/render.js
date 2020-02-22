class Renderer {
    constructor() {
    }

    renderCities (cities) {
        $("#cityList").empty()
        for (let city of cities) {
            
            let cityBox = $("<div class='cityListBox'><p class='cityListName'>" + city.name +"</p> <p class='cityListTemp'>" +city.temperature+ "°C</p><p class='cityListCondition'>" +city.condition+ "</p></div>")
 
            // let cityBox = $("<div class='cityListBox'><p>" + city.name +"  " +city.temperature+ "°C  " +city.condition+ "</p></div>")

            $("#cityList").append(cityBox)
        }
    }

    renderCity (city) {
        
        $("#cityData").empty()
        
        
            let cityBox = $("<div class='selectedCity'><p class='cityName'>" + city.name +"</p> <div class='cityTemp'><img src='http://openweathermap.org/img/wn/"+city.conditionPic+"@2x.png'>" +city.temperature+ "<span class='celsius'>°C </span></div> </div>")

        
       
        $("#cityData").append(cityBox)
    }

}