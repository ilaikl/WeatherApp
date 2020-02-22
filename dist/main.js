
let renderer = new Renderer()
let logic = new Logic()

const handleSearch = async function () {
    await logic.getCityData($("#city-input").val())
    
    renderer.renderCity(logic.currentCity)
    
}

const loadPage = async function () {
    await logic.getDataFromDB()
    renderer.renderCities(logic.cityData)
}

const saveCity = async function () {
    await logic.saveCurrentCity()
    loadPage()
}

const removeCity = async function () {
    await logic.removeCurrentCity()
    loadPage()    
}




$("#cityList").on("click", ".cityListBox", async function () {

    $(".cityListBox").css("background-color", "white")
    $(this).css("background-color", "#87f257")

    $(".cityListCondition").find("i").remove()
    // $(this).find(".cityListCondition").css("margin-left","50px")
    $(this).find(".cityListCondition").append($("<i class='fa fa-trash' onclick=removeCity() aria-hidden='true'></i>"))
    
    
    logic.currentCity = $(this).find(".cityListName")[0].innerText
    renderer.renderCity(logic.currentCity)

})



loadPage()