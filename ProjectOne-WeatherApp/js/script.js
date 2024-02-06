const container = document.querySelector(".container");
const weatheBox = document.querySelector(".weatherBox");
const weatherDetails = document.querySelector(".weatherDetails");
const error404 = document.querySelector(".notFound");


function getWeather() {

    const APIKey = '65660c1957b95da1149ecbbd5158ef65';
    const city = document.getElementById('city').value;

    if(!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`;

    fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
        displayWeather(data);
    })
    .catch(error => {
        console.log('Error fetching currect weather data:', error);
        alert('Error fetching current weather data. Please try again.');
    });

    fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
        displayHourlyForecast(data);
    })
    .catch(error => {
        console.log('Error fetching currect weather data:', error);
        alert('Error fetching current weather data. Please try again.');
    });
}


function displayWeather(data) {

    const img = document.querySelector('.weatherBox img ');
    const temp = document.querySelector('.weatherBox .temp');
    const description = document.querySelector('.weatherBox .description');
    const humidity = document.querySelector('.weatherDetails .humidity span')
    const wind = document.querySelector('.weatherDetails .wind span')
    const cityDisplay = document.getElementById('cityDisplay');
    const iconCode = data.weather[0].icon;

    if(data.cod === '404') {
        container.style.height = '400px';
        weatheBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
    }else {
        cityDisplay.innerHTML = `${data.name}`;
        img.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        temp.innerHTML = `${parseInt(data.main.temp-272.15)}<span>C</span>`;
        description.innerHTML = `${data.weather[0].description}`;
        humidity.innerHTML = `${data.main.humidity}%`;
        wind.innerHTML = `${parseInt(data.wind.speed)}km/h`;

        weatheBox.style.display = '';
        weatherDetails.style.display = '';
        weatheBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '750px';
    }
}

function displayHourlyForecast(hourlyData) {

    const hourlyForecastDiv = document.getElementById('hourlyForecast');
    const next24Hours = hourlyData.list.slice(0, 4);
    console.log(next24Hours)
    console.log(typeof hourlyData)

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourlyItem">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    })


}