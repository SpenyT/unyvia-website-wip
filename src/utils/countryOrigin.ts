export const fetchUserCountry = async () => {
    try {
        const response = await fetch("https://get.geojs.io/v1/ip/country.json");
        return await response.json();
    } catch (error) {
        //do nothing
    }
};