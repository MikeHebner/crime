let xhttp1 = new XMLHttpRequest();

xhttp1.addEventListener("load",success);
xhttp1.addEventListener("error",error);
xhttp1.open("GET", "/shootingsByDistrictCount", true);
xhttp1.send();

function success() {
    let districts = {
        "A1": "Downtown",
        "A15": "Charlestown",
        "A7": "East Boston",
        "B2": "Roxbury",
        "B3": "Mattapan",
        "C11": "Dorchester",
        "C6": "South Boston",
        "D14": "Brighton",
        "D4": "South End",
        "E13": "Jamaica Plain",
        "E18": "Hyde Park",
        "E5": "West Roxbury",
    }
    let data = JSON.parse(xhttp1.response);
    console.log(data)
    

}
function error(){
    console.log(xhttp.readyState);
    console.log(xhttp.status);
}
