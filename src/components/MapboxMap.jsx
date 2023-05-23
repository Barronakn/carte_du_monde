import { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapboxMap = () => {
  const mapContainerRef = useRef(null);

  const fetchCountries = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    return data;
  };

  const {
    data: countries,
    isLoading,
    isError,
    error,
  } = useQuery("countries", fetchCountries);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYmFycm9uYWtuIiwiYSI6ImNsaHQ4eHhmbjA5NDgzbmw5YnN4YXBqbXcifQ.bs25Hlis-lhjQ5NxUt_6MA";

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/barronakn/clht9ey0q024i01pghj1n42kq",
      center: [0, 0],
      minZoom: 1,
      zoom: 2,
    });

    map.on("load", () => {
      countries.forEach((country) => {
        const [lng, lat] = country.latlng;

        if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
          const flagUrl = `https://flagcdn.com/${country.cca2.toLowerCase()}.svg`;

          const el = document.createElement("div");
          el.style.width = "25px";
          el.style.height = "25px";

          const flagBackground = document.createElement("div");
          flagBackground.style.backgroundImage = `url(${flagUrl})`;
          flagBackground.style.backgroundSize = "contain";
          flagBackground.style.backgroundRepeat = "no-repeat";
          flagBackground.style.width = "100%";
          flagBackground.style.height = "100%";
          el.appendChild(flagBackground);

          const marker = new mapboxgl.Marker(el)
            .setLngLat([lat, lng])
            .addTo(map);

          const popupContent = document.createElement("div");
          popupContent.style.width = "100%";

          const detailsCountry = document.createElement("div");
          detailsCountry;
          detailsCountry.innerHTML = `
            <p> ${country.name.common}</p>
            <p>IDT : ${country.idd.root + country.idd.suffixes}</p>
            <p>Capital : ${country.capital}</p>
            <p>Continents : ${country.continents}</p>
            <p>Timezones : ${country.timezones}</p>
            <p>Code : ${country.cca2}</p>
            <p>Population : ${country.population} habitants</p>
            <p>Surface : ${country.area} km²</p>
            <p>Devises : ${getCurrencies(country)}</p>
            <p>Langues : ${Object.values(country.languages).join(", ")}</p>
          `;
          popupContent.appendChild(detailsCountry);

          const popup = new mapboxgl.Popup({ offset: 25 }).setDOMContent(
            popupContent
          );

          marker.setPopup(popup);
        }
      });
    });

    return () => {
      map.remove();
    };
  }, [countries]);

  const getCurrencies = (country) => {
    const currencies = [];
    for (let currency in country.currencies) {
      currencies.push(country.currencies[currency].name);
    }
    return currencies.join(", ");
  };

  if (isError) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return <p className="load">Veuillez patienter</p>;
  }

  return <div ref={mapContainerRef} style={{ height: "100vh" }}></div>;
};

export default MapboxMap;
