const WEATHER_SYMBOLS = {
  1:  { label: "Selkeää",                  icon: "sun" },
  2:  { label: "Puolipilvistä",            icon: "partly-cloudy" },
  3:  { label: "Pilvistä",                 icon: "cloudy" },
  21: { label: "Heikkoja sadekuuroja",     icon: "rain" },
  22: { label: "Sadekuuroja",              icon: "rain" },
  23: { label: "Voimakkaita sadekuuroja",  icon: "rain" },
  31: { label: "Heikkoa vesisadetta",      icon: "rain" },
  32: { label: "Vesisadetta",              icon: "rain" },
  33: { label: "Voimakasta vesisadetta",   icon: "rain" },
  41: { label: "Heikkoja lumikuuroja",     icon: "snow" },
  42: { label: "Lumikuuroja",              icon: "snow" },
  43: { label: "Tiheitä lumikuuroja",      icon: "snow" },
  51: { label: "Heikkoa lumisadetta",      icon: "snow" },
  52: { label: "Lumisadetta",              icon: "snow" },
  53: { label: "Runsasta lumisadetta",     icon: "snow" },
  61: { label: "Ukkoskuuroja",             icon: "thunder" },
  62: { label: "Voimakkaita ukkoskuuroja", icon: "thunder" },
  63: { label: "Ukkosta",                  icon: "thunder" },
  64: { label: "Voimakasta ukkosta",       icon: "thunder" },
  71: { label: "Heikkoja räntäkuuroja",    icon: "rain" },
  72: { label: "Räntäkuuroja",             icon: "rain" },
  73: { label: "Voimakkaita räntäkuuroja", icon: "rain" },
  81: { label: "Heikkoa räntäsadetta",     icon: "rain" },
  82: { label: "Räntäsadetta",             icon: "rain" },
  83: { label: "Voimakasta räntäsadetta",  icon: "rain" },
  91: { label: "Utua",                     icon: "cloudy" },
  92: { label: "Sumua",                    icon: "cloudy" }
};

const ICONS = {
  sun: `<svg stroke="#fff" fill="#fff" xmlns="http://w3.org" viewBox="0 0 1024 1024"><path d="M512 704a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm0-704a32 32 0 0 1 32 32v64a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 768a32 32 0 0 1 32 32v64a32 32 0 1 1-64 0v-64a32 32 0 0 1 32-32zM195.2 195.2a32 32 0 0 1 45.248 0l45.248 45.248a32 32 0 1 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm543.104 543.104a32 32 0 0 1 45.248 0l45.248 45.248a32 32 0 0 1-45.248 45.248l-45.248-45.248a32 32 0 0 1 0-45.248zM64 512a32 32 0 0 1 32-32h64a32 32 0 0 1 0 64H96a32 32 0 0 1-32-32zm768 0a32 32 0 0 1 32-32h64a32 32 0 1 1 0 64h-64a32 32 0 0 1-32-32zM195.2 828.8a32 32 0 0 1 0-45.248l45.248-45.248a32 32 0 0 1 45.248 45.248L240.448 828.8a32 32 0 0 1-45.248 0zm543.104-543.104a32 32 0 0 1 0-45.248l45.248-45.248a32 32 0 0 1 45.248 45.248l-45.248 45.248a32 32 0 0 1-45.248 0z"/></svg>`,
  "partly-cloudy": `<svg viewBox="0 0 24 24" fill="none" xmlns="http://w3.org" stroke="#fff"><path d="M16 18.5L15 21M8 18.5L7 21M12 18.5L11 21M7 15C4.23858 15 2 12.7614 2 10C2 7.23858 4.23858 5 7 5C7.03315 5 7.06622 5.00032 7.09922 5.00097C8.0094 3.2196 9.86227 2 12 2C14.5192 2 16.6429 3.69375 17.2943 6.00462C17.3625 6.00155 17.4311 6 17.5 6C19.9853 6 22 8.01472 22 10.5C22 12.9853 19.9853 15 17.5 15C13.7434 15 11.2352 15 7 15Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  cloudy: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://w3.org" stroke="#fff"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  rain: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://w3.org" stroke="#fff"><path d="M16 13.5L15 16M8 13.5L7 16M12 13.5L11 16M7 10C4.23858 10 2 7.76142 2 5C2 2.23858 4.23858 0 7 0C7.03315 0 7.06622 0.00032 7.09922 0.00097C8.0094-1.7804 9.86227-3 12-3C14.5192-3 16.6429-1.30625 17.2943 1.00462C17.3625 1.00155 17.4311 1 17.5 1C19.9853 1 22 3.01472 22 5.5C22 7.98528 19.9853 10 17.5 10C13.7434 10 11.2352 10 7 10Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  snow: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://w3.org" stroke="#fff"><path d="M12 2v20M4.93 5.5l14.14 13M19.07 5.5L4.93 18.5M2 12h20" stroke-width="2" stroke-linecap="round"/></svg>`,
  thunder: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://w3.org" stroke="#fff"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

const DAY_NAMES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

async function initWeather() {
  try {
    const coords = await getUserLocation();
    const now = new Date();

    const [city, forecast] = await Promise.all([
      fetchCityName(coords.latitude, coords.longitude),
      fetchFmiForecast(coords.latitude, coords.longitude, now)
    ]);

    renderWeatherCard(forecast, city, now, coords);
  } catch (err) {
    console.error("Säätietojen lataus epäonnistui:", err);
    const label = document.querySelector(".weather-label");
    if (label) label.textContent = "Virhe ladattaessa";
  }
}

function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Selain ei tue paikannusta"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => resolve({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      }),
      err => reject(err),
      { timeout: 10000 }
    );
  });
}

async function fetchCityName(lat, lon) {
  try {
   const url = new URL("https://nominatim.openstreetmap.org/reverse");
    url.searchParams.set("lat", lat);
    url.searchParams.set("lon", lon);
    url.searchParams.set("format", "json");
    url.searchParams.set("zoom", "10");

    const res = await fetch(url.toString(), {
      headers: { "Accept-Language": "fi" }
    });
    const data = await res.json();
    return data.address?.city || data.address?.town || data.address?.village || "Tuntematon";
  } catch {
    return "Tuntematon";
  }
}
async function fetchFmiForecast(lat, lon, now) {
  const start = now.toISOString().replace(/\.\d{3}Z$/, "Z");
  const end = new Date(now.getTime() + 5 * 86400000).toISOString().replace(/\.\d{3}Z$/, "Z");

  const fmiUrl = new URL("https://" + ["opendata", "fmi", "fi"].join(".") + "/wfs");
  fmiUrl.searchParams.set("service", "WFS");
  fmiUrl.searchParams.set("version", "2.0.0");
  fmiUrl.searchParams.set("request", "getFeature");
  fmiUrl.searchParams.set("storedquery_id", "fmi::forecast::edited::weather::scandinavia::point::multipointcoverage");
  fmiUrl.searchParams.set("latlon", `${lat.toFixed(4)},${lon.toFixed(4)}`);
  fmiUrl.searchParams.set("parameters", "Temperature,WeatherSymbol3,Precipitation1h,PoP,TotalCloudCover");
  fmiUrl.searchParams.set("starttime", start);
  fmiUrl.searchParams.set("endtime", end);

  const res = await fetch(fmiUrl.toString());
  if (!res.ok) throw new Error(`FMI API virhe: ${res.status}`);

  const xmlText = await res.text();
  const doc = new DOMParser().parseFromString(xmlText, "text/xml");

  const posNode = doc.getElementsByTagName("gmlcov:positions").item(0);
  const valNode = doc.getElementsByTagName("gml:doubleOrNilReasonTupleList").item(0);

  if (!posNode || !valNode) {
    throw new Error("FMI XML-vastauksesta puuttuu data");
  }

  const posLines = posNode.textContent.trim().split(/\n+/);
  const valLines = valNode.textContent.trim().split(/\n+/);

  return posLines.map((line, index) => {
    const posParts = line.trim().split(/\s+/);
    const unixSec = Number(posParts.at(2));
    const date = new Date(unixSec * 1000);

    const valParts = (valLines.at(index) || "").trim().split(/\s+/).map(Number);

    return {
      date: date,
      isoDate: date.toISOString().slice(0, 10),
      temp: valParts.at(0) ?? 0,
      symbol: Math.round(valParts.at(1) ?? 3),
      precip: valParts.at(2) || 0,
      pop: Math.round(valParts.at(3) || 0),
      clouds: Math.round(valParts.at(4) ?? 100)
    };
  });
}


function renderWeatherCard(forecast, city, now, coords) {
  const card = document.querySelector(".card");
  if (!card || !forecast.length) return;

  // 1. Nykyhetkeä lähin ennustetunti
  const nowIdx = Math.max(0, forecast.findIndex(item => item.date >= now));
  const current = forecast.at(nowIdx);
  const curInfo = WEATHER_SYMBOLS[current.symbol] || { label: "—", icon: "cloudy" };

  card.querySelector(".icon-current").innerHTML = ICONS[curInfo.icon];
  card.querySelector(".weather-label").textContent = curInfo.label;
  card.querySelector(".temperature").textContent = `${Math.round(current.temp)}°`;

  // 2. Tämän päivän ylin ja alin lämpötila
  const todayStr = now.toISOString().slice(0, 10);
  const todayTemps = forecast
    .filter(item => item.isoDate === todayStr)
    .map(item => item.temp);

  const maxTemp = todayTemps.length ? Math.max(...todayTemps) : current.temp;
  const minTemp = todayTemps.length ? Math.min(...todayTemps) : current.temp;
  card.querySelector(".range").textContent = `${Math.round(maxTemp)}°/${Math.round(minTemp)}°`;

  // 3. Kellonaika, päivämäärä ja kaupunki
  card.querySelector(".hour").textContent =
    now.toLocaleTimeString("fi-FI", { hour: "2-digit", minute: "2-digit" });
  card.querySelector(".date").textContent =
    `${DAY_NAMES.at(now.getDay())} ${String(now.getDate()).padStart(2, "0")}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  card.querySelector(".city").textContent = city;

  // 4. Seuraavat 4 päivää (alareunan painikkeet)
  const btns = card.querySelectorAll(".days-section button");
  for (let d = 1; d <= 4; d++) {
    const targetDate = new Date(now.getTime() + d * 86400000);
    const targetStr = targetDate.toISOString().slice(0, 10);
    const dayItems = forecast.filter(item => item.isoDate === targetStr);

    const midItem = dayItems.length ? dayItems.at(Math.floor(dayItems.length / 2)) : current;
    const info = WEATHER_SYMBOLS[midItem.symbol] || { icon: "cloudy" };

    const btn = btns.item(d - 1);
    if (btn) {
      btn.querySelector(".day").textContent = DAY_NAMES.at(targetDate.getDay());
      btn.querySelector(".icon-weather-day").innerHTML = ICONS[info.icon];
    }
  }

  // 5. Lisätiedot: Seuraava sade
  const nextRainEl = card.querySelector(".next-rain");
  if (nextRainEl) {
    const nextRain = forecast.slice(nowIdx).find(item => item.precip > 0);
    if (nextRain) {
      const dayName = DAY_NAMES.at(nextRain.date.getDay());
      const timeStr = nextRain.date.toLocaleTimeString("fi-FI", { hour: "2-digit", minute: "2-digit" });
      nextRainEl.textContent = `${dayName} klo ${timeStr} (${nextRain.pop} %)`;
    } else {
      nextRainEl.textContent = "Ei sadetta 5 vrk sisällä";
    }
  }

  // 6. Lisätiedot: Päivänvalo ja auringonlasku
  const daylightEl = card.querySelector(".daylight-info");
  if (daylightEl) {
    daylightEl.textContent = calculateDaylight(now, coords.latitude, coords.longitude);
  }

    // 7. Lisätiedot: Auringonnousu ja Kuu (SunCalc-kirjasto)
  const sunriseEl = card.querySelector(".sunrise-info");
  const moonEl = card.querySelector(".moon-info");

  if (window.SunCalc) {
    const sunTimes = SunCalc.getTimes(now, coords.latitude, coords.longitude);
    let nextSunrise = sunTimes.sunrise;
    if (now > nextSunrise) {
      const tomorrow = new Date(now.getTime() + 86400000);
      nextSunrise = SunCalc.getTimes(tomorrow, coords.latitude, coords.longitude).sunrise;
    }
    if (sunriseEl) {
      sunriseEl.textContent = `klo ${nextSunrise.toLocaleTimeString("fi-FI", { hour: "2-digit", minute: "2-digit" })}`;
    }

    const moonTimes = SunCalc.getMoonTimes(now, coords.latitude, coords.longitude);
    const moonIllum = SunCalc.getMoonIllumination(now);
    const moonPct = Math.round(moonIllum.fraction * 100);

    let moonText = "";
    if (moonTimes.alwaysUp) {
      moonText = "ylhäällä koko päivän";
    } else if (moonTimes.alwaysDown) {
      moonText = "ei nouse tänään";
    } else if (moonTimes.rise && now < moonTimes.rise) {
      const riseStr = moonTimes.rise.toLocaleTimeString("fi-FI", { hour: "2-digit", minute: "2-digit" });
      moonText = `nousee klo ${riseStr}`;
    } else {
      let nextSet = moonTimes.set;
      if (!nextSet || now > nextSet) {
        const tomorrow = new Date(now.getTime() + 86400000);
        nextSet = SunCalc.getMoonTimes(tomorrow, coords.latitude, coords.longitude).set;
      }
      const setStr = nextSet
        ? nextSet.toLocaleTimeString("fi-FI", { hour: "2-digit", minute: "2-digit" })
        : "—";
      moonText = `ylhäällä, laskee klo ${setStr}`;
    }

    if (moonEl) {
      moonEl.textContent = `${moonText} (${moonPct} %)`;
    }
  } else {
    if (sunriseEl) sunriseEl.textContent = "SunCalc puuttuu";
    if (moonEl) moonEl.textContent = "SunCalc puuttuu";
  }


  // 8. Lisätiedot: Tähtitaivaan näkyvyys yöllä (klo 21–05 pilvisyyden keskiarvo)
  const starEl = card.querySelector(".stargazing-info");
  if (starEl) {
    const nightHours = forecast.slice(nowIdx, nowIdx + 18).filter(item => {
      const h = item.date.getHours();
      return h >= 21 || h <= 5;
    });

    if (nightHours.length) {
      const avgClouds = Math.round(
        nightHours.reduce((sum, item) => sum + item.clouds, 0) / nightHours.length
      );
      let skyText = "Pilvistä, ei näy";
      if (avgClouds <= 20) skyText = "Kirkas, loistava näkyvyys";
      else if (avgClouds <= 50) skyText = "Melko selkeää, näkyy hyvin";
      else if (avgClouds <= 75) skyText = "Puolipilvistä, näkyy ajoittain";

      starEl.textContent = `${skyText} (pilvisyys ${avgClouds} %)`;
    } else {
      starEl.textContent = "Tieto ei saatavilla";
    }
  }
}


function calculateDaylight(date, lat, lon) {
  const rad = Math.PI / 180;
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((date - startOfYear) / 86400000);

  const decl = 23.44 * Math.sin(rad * (360 / 365) * (dayOfYear - 81));
  const cosH = (Math.cos(rad * 90.833) - Math.sin(rad * lat) * Math.sin(rad * decl)) /
               (Math.cos(rad * lat) * Math.cos(rad * decl));

  if (cosH > 1) return "Kaamos (ei nouse tänään)";
  if (cosH < -1) return "Yötön yö (ei laske tänään)";

  const H = Math.acos(cosH) / rad;
  const eqTime = 9.87 * Math.sin(2 * rad * (360 / 365) * (dayOfYear - 81)) -
                 7.53 * Math.cos(rad * (360 / 365) * (dayOfYear - 81)) -
                 1.5 * Math.sin(rad * (360 / 365) * (dayOfYear - 81));

  const solarNoonUTC = 12 - (lon / 15) - (eqTime / 60);
  const sunriseUTC = solarNoonUTC - (H / 15);
  const sunsetUTC  = solarNoonUTC + (H / 15);

  const sunrise = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, sunriseUTC * 60));
  const sunset  = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, sunsetUTC * 60));

  const sunsetStr = sunset.toLocaleTimeString("fi-FI", { hour: "2-digit", minute: "2-digit" });

  if (date < sunrise) {
    const mins = Math.round((sunrise - date) / 60000);
    return `Pimeää (nousee ${Math.floor(mins / 60)}h ${mins % 60}min päästä)`;
  }

  if (date < sunset) {
    const mins = Math.round((sunset - date) / 60000);
    return `${Math.floor(mins / 60)}h ${mins % 60}min jäljellä (laskee ${sunsetStr})`;
  }

  return `Aurinko laskenut (laski ${sunsetStr})`;
}

initWeather();
