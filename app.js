    // Alustetaan kartta
    const map = L.map('map').setView([60.1699, 24.9384], 6); // Suomen keskikohta

    // Lisätään OpenStreetMapin laatat
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    let suomiGeoJSON = null;

    // Lataa Suomen rajat GeoJSON:sta
    fetch('https://raw.githubusercontent.com/SeYksTyyppiSielJossakin/sijainti-generaattori/main/fi.json')
      .then(response => response.json())
      .then(data => {
        suomiGeoJSON = data;

        // Lisää Suomen rajat kartalle
        L.geoJSON(suomiGeoJSON).addTo(map);
        
        // Varmistetaan, että GeoJSON on ladattu oikein
        console.log("GeoJSON ladattu oikein:", suomiGeoJSON);
      })
      .catch(error => {
        console.log('Virhe ladattaessa GeoJSON-tiedostoa:', error);
      });

    // Lisää toiminnallisuus satunnaisille sijainneille
    document.getElementById("satunnainenSijainti").addEventListener("click", () => {
      if (suomiGeoJSON === null) {
        console.error('Suomen rajat eivät ole vielä ladattuna!');
        return;
      }

      let lat, lng, randomLocation;

      // Luodaan satunnainen sijainti niin, että se on Suomen alueella
      do {
        lat = 59.5 + Math.random() * (70 - 59.5); // Suomen leveysasteet
        lng = 20.5 + Math.random() * (31.5 - 20.5); // Suomen pituusasteet
        randomLocation = [lat, lng];
      } while (!turf.booleanPointInPolygon(randomLocation, suomiGeoJSON)); // Tarkistetaan, onko sijainti Suomen rajojen sisällä

      // Varmistetaan, että satunnainen sijainti on oikein
      console.log('Satunnainen sijainti:', randomLocation);

      // Keskitetään kartta ja lisätään markkeri
      map.setView(randomLocation, 10);
      
      // Lisätään markkeri satunnaiseen sijaintiin
      L.marker(randomLocation).addTo(map)
        .bindPopup(`Satunnainen sijainti: ${lat.toFixed(4)}, ${lng.toFixed(4)}`)
        .openPopup();

      // Varmistetaan, että markkeri lisätään
      console.log('Lisätään markkeri sijaintiin:', randomLocation);
    });
