import {getIcon, getBg} from './assetManager.js'
import {Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, scales} from 'chart.js'
Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip);
let weatherChart = null;

const setBg = (datetimeEpoch, sunriseEpoch, sunsetEpoch) => {
    if((datetimeEpoch < sunriseEpoch) || (datetimeEpoch > sunsetEpoch)){
        document.querySelector("body").style.backgroundImage = `url(${getBg("night")})`;
    }
    else {
        document.querySelector("body").style.backgroundImage = `url(${getBg("day")})`;
    }
}

const setLocDate = (location, datetimeEpoch, timezone) => {
    const datetime = new Date(datetimeEpoch * 1000);
    const date = datetime.toLocaleDateString("en-US", {day: 'numeric', month: 'long', year: 'numeric', timezone: timezone});
    const weekday = datetime.toLocaleDateString("en-US", {weekday: 'long', timeZone: timezone});

    document.querySelector('.location-text').innerHTML = location;
    document.querySelector('.date-text').innerHTML = date;
    document.querySelector('.dow-text').innerHTML = weekday;
}

const setGeneralCond = (iconName, temp, conditions, feelsLike, datetimeEpoch, sunriseEpoch, sunsetEpoch, timezone, units) => {
    const sunsetDateTime = new Date(sunsetEpoch*1000);
    const sunriseDateTime = new Date(sunriseEpoch*1000);
    const currentDateTime = new Date(datetimeEpoch*1000);

    document.querySelector('.current-cond-icon').src = getIcon(iconName);
    document.querySelector('.current-temp-value').innerHTML = temp;
    document.querySelector('.current-cond-desc').innerHTML = conditions;
    document.querySelector('.feelslike-value').innerHTML = `${feelsLike} ${units.DEGREE}`;    
    document.querySelector('.current-cond-desc').innerHTML = conditions;
    document.querySelector('.sunrise-tooltip').dataset.tooltip = `Sunrise: ${sunriseDateTime.toLocaleTimeString(undefined, {hour: 'numeric', minute: '2-digit', hour12: 'false', timeZone: timezone})}`;
    document.querySelector('.sunset-tooltip').dataset.tooltip = `Sunset: ${sunsetDateTime.toLocaleTimeString(undefined, {hour: 'numeric', minute: '2-digit', hour12: 'true', timeZone: timezone})}`;
    document.querySelector('.now-tooltip').dataset.tooltip = `Last recorded time: ${currentDateTime.toLocaleTimeString(undefined, {hour: 'numeric', minute: '2-digit', hour12: 'true', timeZone: timezone})}`;
    const dawnDuskBar = document.querySelector('.dawn-dusk-bar');

    if(datetimeEpoch < sunriseEpoch){
        dawnDuskBar.style.width = "0";
    }
    else if (datetimeEpoch > sunsetEpoch){
        dawnDuskBar.style.width = "100%";
    }
    else {
        const barWidth = sunsetEpoch - sunriseEpoch;
        const progressWidth = datetimeEpoch - sunriseEpoch;
        dawnDuskBar.style.width = `${(progressWidth/barWidth)*100}%`;
    }

}

const setExtraCond = (tempMin, tempMax, windSpeed, windDir, humidity, pressure, visibility, uvIndex, units) => {
    document.querySelector('.max-temp-value').innerHTML = `${tempMax} ${units.DEGREE}`;
    document.querySelector('.min-temp-value').innerHTML = `${tempMin} ${units.DEGREE}`;
    document.querySelector('.wind-speed-value').innerHTML = `${windSpeed} ${units.SPEED}`;
    document.querySelector('.wind-dir-value').innerHTML = `${windDir} °`;
    document.querySelector('.humidity-value').innerHTML = `${humidity} %`;
    document.querySelector('.pressure-value').innerHTML = `${pressure} ${units.PRESSURE}`;
    document.querySelector('.visibility-value').innerHTML = `${visibility} ${units.DISTANCE}`;
    document.querySelector('.uv-value').innerHTML = `${uvIndex}`;

}

const createForecastCard = (datetimeEpoch, timezone, iconName, temp, windSpeed, windDir, humidity, units, type) => {
    const datetime = new Date(datetimeEpoch*1000);
    const forecastCardContainer = document.querySelector('.forecast-card-container');

    const displayData = {
        hour: datetime.toLocaleTimeString("en-US", {hour: "numeric", timeZone: timezone}),
        day: datetime.toLocaleDateString("en-US", {month: "short", day: "numeric", timeZone: timezone})
    }

    if(!displayData.hasOwnProperty(type)){
        throw new Error("Forecast type must be 'hour' or 'day'");
    }

    const forecastCard = document.createElement("div");
    forecastCard.className = 'forecast-card';
    forecastCard.innerHTML = `
        <div class="forecast-card">
          <div class="card-inner">

            <div class="card-front">
              <p class="card-title">${displayData[type]}</p>
              <div class="card-icon-container">
                <img src=${getIcon(iconName)} alt="Card Icon" class="card-cond-icon">
              </div>
              <div class="card-stat">
                <img src=${getIcon('thermometer')} alt="Temp" class="card-val-icon">
                <p class="card-value">${temp} ${units.DEGREE}</p>
              </div>
            </div>
            <div class="card-back">
              <div class="card-stat">
                <img src=${getIcon('windsock')} alt="Wind Speed" class="card-val-icon">
                <p class="card-value">${windSpeed} ${units.DISTANCE}</p>
              </div>
              <div class="card-stat">
                <img src=${getIcon('compass')} alt="Wind Direction" class="card-val-icon">
                <p class="card-value">${windDir} °</p>
              </div>
              <div class="card-stat">
                <img src=${getIcon('humidity')} alt="Humidity" class="card-val-icon">
                <p class="card-value">${humidity} %</p>
              </div>
              
            </div>
          </div>
        </div> 
    `;

    forecastCardContainer.append(forecastCard);
}

export const displayChart = (data) => {
    const ctx = document.querySelector('#weather-chart').getContext('2d');

    if(weatherChart instanceof Chart) {
        weatherChart.destroy()
    }

    const chartData = [];

    Object.values(data.days).reduce((acc, day) => {
        const datetime = new Date(day.datetimeEpoch*1000);

        const dataElem = {
            label: datetime.toLocaleDateString("en-US", {month: "short", day: "numeric", timeZone: data.timezone}),
            minTemp: day.tempmin,
            maxTemp: day.tempmax
        };

        acc.push(dataElem);
        return acc;

    }, chartData);

    const config = {
        type: 'line',
        data: {
            labels: chartData.map((elem) => elem.label),
            datasets: [
                {
                    label: 'Min Temp',
                    data: chartData.map((elem) => elem.minTemp),
                    backgroundColor: 'rgba(40, 133, 199, 1)',
                    borderColor: 'rgba(40, 133, 199, 1)'
                },
                {
                    label: 'Max Temp',
                    data: chartData.map((elem) => elem.maxTemp),
                    backgroundColor: 'rgba(239, 68, 68, 1)',
                    borderColor: 'rgba(239, 68, 68, 1)'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)',
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.5)'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)',
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.5)'
                    }
                }
            }
        }
    }

    weatherChart = new Chart(ctx, config);

}

export const displayForecastCards = (data, units, type = "hour") => {
    const timezone = data.timezone;
    const selectionTypes = {
        hour: data.days[0].hours,
        day: data.days
    }
    if(!selectionTypes.hasOwnProperty(type)) {
        throw new Error("Forecast type must be 'hour' or 'day'");
    }
    const selectedType = selectionTypes[type];

    document.querySelector('.forecast-card-container').innerHTML = '';
    Object.values(selectedType).forEach((timePeriod) => {
        createForecastCard(
            timePeriod.datetimeEpoch,
            timezone,
            timePeriod.icon,
            timePeriod.temp,
            timePeriod.windspeed,
            timePeriod.winddir,
            timePeriod.humidity,
            units,
            type
        );
    });
}

export const displayCurrentData = (data, units) => {
    setBg(data.currentConditions.datetimeEpoch,
        data.currentConditions.sunriseEpoch,
        data.currentConditions.sunsetEpoch
    );

    setLocDate(
        data.resolvedAddress,
        data.currentConditions.datetimeEpoch,
        data.timezone
    );

    setGeneralCond(
        data.currentConditions.icon,
        data.currentConditions.temp,
        data.currentConditions.conditions,
        data.currentConditions.feelslike,
        data.currentConditions.datetimeEpoch,
        data.currentConditions.sunriseEpoch,
        data.currentConditions.sunsetEpoch,
        data.timezone,
        units
    );

    setExtraCond(
        data.days[0].tempmin,
        data.days[0].tempmax,
        data.days[0].windspeed,
        data.days[0].winddir,
        data.days[0].humidity,
        data.days[0].pressure,
        data.days[0].visibility,
        data.days[0].uvindex,
        units
    );
}