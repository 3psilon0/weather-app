import { handleSearch } from './eventHandlers.js';

document.querySelector('.search-bar').addEventListener("keydown", (event) => {
    if(event.key === 'Enter'){
        handleSearch(event);
    }
})

const initKbdEvent = new KeyboardEvent("keydown", {key: "Enter", code: "Enter"});
const searchBar = document.querySelector('.search-bar');
searchBar.value = "karachi pak"
searchBar.dispatchEvent(initKbdEvent);
searchBar.value = '';