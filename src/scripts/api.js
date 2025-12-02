// fetches weather data and returns it as JSON
export default async (location, unitGroup) => {
    const locationf = location.split(" ").join("+");
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/${locationf}?unitGroup=${unitGroup}&iconSet=icons2&key=${import.meta.env.VITE_API_KEY}`;
    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return data;
}