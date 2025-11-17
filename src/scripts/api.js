export default async (location, unitGroup) => {
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/${location}?unitGroup=${unitGroup}&iconSet=icons2&key=${import.meta.env.VITE_API_KEY}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
}