const filePath = path.join(__dirname, "data", "restaurants.json");

function getStoredRestaurant(params) {
    const filePath = path.join(__dirname, "data", "restaurants.json");
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    return storedRestaurants;
}

function storeRestaurants(storeableRestaurants) {
    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
}
