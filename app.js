const path = require("path");
const fs = require("fs");

const express = require("express");
const uuid = require("uuid");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("index");
});

app.get("/restaurants", function (req, res) {
    const filePath = path.join(__dirname, "data", "restaurants.json");
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    res.render("restaurants", {
        numberOfRestaurants: storedRestaurants.length,
        restaurants: storedRestaurants,
    });
});

app.get("/confirm", function (req, res) {
    res.render("confirm");
});

app.get("/restaurants/:rid", function (req, res) {
    const restaurantId = req.params.rid;

    const filePath = path.join(__dirname, "data", "restaurants.json");
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    for (const restaurant of storedRestaurants) {
        if (restaurant.id === restaurantId) {
            return res.render("restaurant-detail", { restaurant: restaurant });
        }
    }

    res.render("404");
});

app.get("/recommend", function (req, res) {
    res.render("recommend");
});

app.post("/recommend", function (req, res) {
    const restaurant = req.body;
    restaurant.id = uuid.v4();
    const filePath = path.join(__dirname, "data", "restaurants.json");
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    storedRestaurants.push(restaurant);

    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

    res.redirect("/confirm");
});

app.get("/about", function (req, res) {
    res.render("about");
});

app.use(function (req, res) {
    res.render("404");
});

app.use(function (error, req, res, next) {
    res.render("500");
});

app.listen(3000);
