import getData from './api.js'
import { displayCurrentData, displayForecastCards, displayChart} from './ui.js'
import { UNITS_METRIC, UNITS_IMPERIAL } from './units.js'

let metricData, imperialData;

const handleMetric = (metricData) => {
    const forecastType = document.querySelector('.forecast-toggle-buttons').dataset.selected;
    displayCurrentData(metricData, UNITS_METRIC);
    displayForecastCards(metricData, UNITS_METRIC, forecastType);
    displayChart(metricData);
}

const handleImperial = (imperialData) => {
    const forecastType = document.querySelector('.forecast-toggle-buttons').dataset.selected;
    displayCurrentData(imperialData, UNITS_IMPERIAL);
    displayForecastCards(imperialData, UNITS_IMPERIAL, forecastType);
    displayChart(imperialData);
}

const handleUnitToggle = (event, metricData, imperialData) => {
    switch(event.target.classList[0]){
        case "metric-toggle":
            if(event.target.classList.contains('unit-active')) {
                return
            }   
            Array.from(document.querySelector('.unit-toggle-buttons').children).forEach(child => child.classList.toggle('unit-active'));
            handleMetric(metricData);
            event.currentTarget.dataset.selected = "metric";
            break

        case "imperial-toggle":
            if(event.target.classList.contains('unit-active')) {
                return
            }
            Array.from(document.querySelector('.unit-toggle-buttons').children).forEach(child => child.classList.toggle('unit-active'));
            handleImperial(imperialData);
            event.currentTarget.dataset.selected = "imperial";
            break

        default:
            return;
        }
}

const handleForecastToggle = (event, metricData, imperialData) => {
    const unitType = document.querySelector('.unit-toggle-buttons').dataset.selected;
    switch(event.target.classList[0]){
        case "hour-toggle":
            if(event.target.classList.contains('unit-active')) {
                return
            }   
            Array.from(document.querySelector('.forecast-toggle-buttons').children).forEach(child => child.classList.toggle('unit-active'));
            switch (unitType) {
                case 'metric':
                    displayForecastCards(metricData, UNITS_METRIC, 'hour')
                    break
                case 'imperial':
                    displayForecastCards(imperialData, UNITS_IMPERIAL, 'hour');
                    break
                default:
                    break
            }
            event.currentTarget.dataset.selected = "hour";
            break

        case "day-toggle":
            if(event.target.classList.contains('unit-active')) {
                return
            }
            Array.from(document.querySelector('.forecast-toggle-buttons').children).forEach(child => child.classList.toggle('unit-active'));
            switch (unitType) {
                case 'metric':
                    displayForecastCards(metricData, UNITS_METRIC, 'day')
                    break
                case 'imperial':
                    displayForecastCards(imperialData, UNITS_IMPERIAL, 'day');
                    break
                default:
                    break
            }
            event.currentTarget.dataset.selected = "day";
            break

        default:
            return;
        }
}

export const handleSearch = async (event) => {
    event.preventDefault();
    const searchQuery = event.currentTarget.value;
    
    metricData = await getData(searchQuery, "metric");
    imperialData = await getData(searchQuery, "us");

    handleMetric(metricData);

    document.querySelector('.unit-toggle-buttons').addEventListener("click", (event) => {
        handleUnitToggle(event, metricData, imperialData);
    });

    document.querySelector('.forecast-toggle-buttons').addEventListener("click", (event) => {
        handleForecastToggle(event, metricData, imperialData);
    })
}