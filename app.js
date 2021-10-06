const form = document.querySelector(".search form");
const input = document.querySelector(".search input");

const apiKey = "5d48fc99cdd998f3731abdef0a9b0b2e";

// Function to display data
function display(data) {
    document.getElementById('error-msg').innerHTML = (``);

    var city = data.name;
    var temp = Math.round(data.main.temp);
    var highTemp = Math.round(data.main.temp_max);
    var lowTemp = Math.round(data.main.temp_min);
    var tempFeels = Math.round(data.main.feels_like);

    // getting sunrise and sunset in Unix form
    var sunriseUnix = new Date(data.sys.sunrise * 1000);
    var sunsetUnix = new Date(data.sys.sunset * 1000);

    // calculating the time - converting from unix to human readable
    var sunriseHours = sunriseUnix.getHours();
    var sunriseMinutes = sunriseUnix.getMinutes();
    var sunsetHours = sunsetUnix.getHours();
    var sunsetMinutes = sunsetUnix.getMinutes();

    // getting data for the weather icon and description
    var icon = data.weather[0].icon;
    var mainDescription = data.weather[0].main;
    var description = data.weather[0].description;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    // displaying the output
    document.getElementById('city-name').innerHTML = `&#128205 ${city}`;
    document.getElementById('temp').innerHTML = `${temp} °C`;
    document.getElementById('temp-feels').innerHTML = `	&#127777 It feels like ${tempFeels} °C with a high of ${highTemp} °C and a low of ${lowTemp} °C.`;
    document.getElementById('twilight-time').innerHTML = `&#127749 The sunrise is at ${sunriseHours}:${sunriseMinutes} and sunset is at ${sunsetHours}:${sunsetMinutes}.`;
    document.getElementById('icon').innerHTML = ` 
        <figure>
            <img class="city-icon" src=${iconUrl} alt=${mainDescription}>
            <figcaption>${description}</figcaption>
        </figure>
    `;

}

//submitting the form
form.addEventListener("submit", e => {
    e.preventDefault()
    var inputCity = input.value;

    //setting up the api
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}&units=metric`;

    //fetching the data
    fetch(url)
        .then(response => {
            return response.json();
        })

        .then(data => {
            console.log(data);

            if (data.cod != 404) {
                display(data);
            } else {
                document.getElementById('error-msg').innerHTML = (`Please try searching again for a valid city`);
            }
        });

    //reset the form and input
    form.reset();
    input.focus();
});
