
// Alustetaan karttaconst
map = L.map('map').setView([60.1699, 24.9384], 6); // Suomen keskikohta
// Lisätään OpenStreetMapin
laatatL.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {    maxZoom: 19,
attribution: '© OpenStreetMap contributors'}).addTo(map);

// Lisää toiminnallisuus satunnaisille
sijainneilledocument.getElementById("satunnainenSijainti").addEventListener("click", () => {
const lat = 60 + Math.random() * (70 - 60);
// Suomen leveysasteet
const lng = 20 + Math.random() * (30 - 20); // Suomen pituusasteet
const randomLocation = [lat, lng];    // Keskitetään kartta ja lisätään markkeri
map.setView(randomLocation, 10);
L.marker(randomLocation).addTo(map)
.bindPopup(`Satunnainen sijainti: ${lat.toFixed(4)}, ${lng.toFixed(4)}`)
.openPopup();
});
