import getData from './api.js'
import {displayCurrentData, displayForecastCards} from './ui.js'
import {UNITS_METRIC, UNITS_IMPERIAL } from './units.js';
import { handleSearch } from './eventHandlers.js';

document.querySelector('.search-bar').addEventListener("keydown", (event) => {
    if(event.code === "Enter"){
        handleSearch(event);
    }
})

const initKbdEvent = new KeyboardEvent("keydown", {key: "Enter", code: "Enter"});
const searchBar = document.querySelector('.search-bar');
searchBar.value = "karachi pak"
searchBar.dispatchEvent(initKbdEvent);
searchBar.value = '';