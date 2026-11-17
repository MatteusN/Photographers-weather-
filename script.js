const WEATHER_SYMBOLS = {
  1:  { label: "Selkeää",             icon: "sun" },
  2:  { label: "Enimmäkseen selkeää", icon: "sun" },
  4:  { label: "Puolipilvistä",       icon: "partly-cloudy" },
  6:  { label: "Enimmäkseen pilvistä",icon: "cloudy" },
  7:  { label: "Pilvistä",            icon: "cloudy" },
  8:  { label: "Sadepisara",           icon: "rain" },
  9:  { label: "Sade",                icon: "rain" },
  10: { label: "Lumipisara",          icon: "snow" },
  11: { label: "Lumi",                icon: "snow" },
  12: { label: "Ukkosmyrsky",         icon: "thunder" },
};

const ICONS = {
  sun: `<svg stroke="#fff" fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M512 704a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm0-704a32 32 0 0 1 32 32v64a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 768a32 32 0 0 1 32 32v64a32 32 0 1 1-64 0v-64a32 32 0 0 1 32-32zM195.2 195.2a32 32 0 0 1 45.248 0l45.248 45.248a32 32 0 1 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm543.104 543.104a32 32 0 0 1 45.248 0l45.248 45.248a32 32 0 0 1-45.248 45.248l-45.248-45.248a32 32 0 0 1 0-45.248zM64 512a32 32 0 0 1 32-32h64a32 32 0 0 1 0 64H96a32 32 0 0 1-32-32zm768 0a32 32 0 0 1 32-32h64a32 32 0 1 1 0 64h-64a32 32 0 0 1-32-32zM195.2 828.8a32 32 0 0 1 0-45.248l45.248-45.248a32 32 0 0 1 45.248 45.248L240.448 828.8a32 32 0 0 1-45.248 0zm543.104-543.104a32 32 0 0 1 0-45.248l45.248-45.248a32 32 0 0 1 45.248 45.248l-45.248 45.248a32 32 0 0 1-45.248 0z"/></svg>`,
  "partly-cloudy": `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><path d="M16 18.5L15 21M8 18.5L7 21M12 18.5L11 21M7 15C4.23858 15 2 12.7614 2 10C2 7.23858 4.23858 5 7 5C7.03315 5 7.06622 5.00032 7.09922 5.00097C8.0094 3.2196 9.86227 2 12 2C14.5192 2 16.6429 3.69375 17.2943 6.00462C17.3625 6.00155 17.4311 6 17.5 6C19.9853 6 22 8.01472 22 10.5C22 12.9853 19.9853 15 17.5 15C13.7434 15 11.2352 15 7 15Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  cloudy: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  rain: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><path d="M16 13.5L15 16M8 13.5L7 16M12 13.5L11 16M7 10C4.23858 10 2 7.76142 2 5C2 2.23858 4.23858 0 7 0C7.03315 0 7.06622 0.00032 7.09922 0.00097C8.0094-1.7804 9.86227-3 12-3C14.5192-3 16.6429-1.30625 17.2943 1.00462C17.3625 1.00155 17.4311 1 17.5 1C19.9853 1 22 3.01472 22 5.5C22 7.98528 19.9853 10 17.5 10C13.7434 10 11.2352 10 7 10Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  snow: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><path d="M12 2v20M4.93 5.5l14.14 13M19.07 5.5L4.93 18.5M2 12h20" stroke-width="2" stroke-linecap="round"/></svg>`,
  thunder: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

const DAY_NAMES = ["SUN","MON","TUE","WED","THU","FRI","SAT"];

async function initWeather() {
  // 1) Sijainti
  const { latitude, longitude } = await new Promise((res, rej) =>
    navigator.geolocation.getCurrentPosition(
      p => res({ latitude: p.coords.latitude, longitude: p.coords.longitude }),
      rej,
      { timeout: 10000 }
    )
  );

  // 2) Kaupunkinimi
  const city = await reverseGeocode(latitude, longitude);

  // 3) FMI-ennuste (5 pv, tuntikohtainen)
  const now = new Date();
  const start = now.toISOString().replace(/\.\d{3}Z$/, "Z");
  const end   = new Date(now.getTime() + 5 * 86400000).toISOString().replace(/\.\d{3}Z$/, "Z");

  const url =
    `https://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature` +
    `&storedquery_id=fmi::forecast::harmonie::surface::point::multipointcoverage` +
    `&latlon=${latitude.toFixed(4)},${longitude.toFixed(4)}` +
    `&parameters=air_temperature,weather_symbol_3` +
    `&starttime=${encodeURIComponent(start)}&endtime=${encodeURIComponent(end)}`;

  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`FMI API virhe: ${resp.status}`);
  const doc  = new DOMParser().parseFromString(await resp.text(), "text/xml");

  // 4) Parsi
  const dims = Array.from(doc.querySelectorAll("wfstype:dimension"));
  const getVals = name => {
    const d = dims.find(d => d.querySelector("wfstype:axisName")?.textContent.trim() === name);
    return Array.from(d?.querySelectorAll("wfstype:axisValue") || []).map(v => v.textContent.trim());
  };

  const times   = getVals("time");
  const temps   = getVals("air_temperature").map(Number);
  const symbols = getVals("weather_symbol_3").map(Number);

  // 5) Täytä
  const card = document.querySelector(".card");
  const nowIdx = Math.max(0, times.findIndex(t => new Date(t) >= now));

  const curInfo = WEATHER_SYMBOLS[symbols[nowIdx]] || { label: "—", icon: "cloudy" };
  card.querySelector(".icon-current").innerHTML = ICONS[curInfo.icon];
  card.querySelector(".weather-label").textContent = curInfo.label;
  card.querySelector(".temperature").textContent = `${Math.round(temps[nowIdx])}°`;

  // Min/Max tänään
  const todayStr = now.toISOString().slice(0, 10);
  const tIdxs = times.map((t, i) => t.startsWith(todayStr) ? i : -1).filter(i => i >= 0);
  const tTemps = tIdxs.map(i => temps[i]);
  card.querySelector(".range").textContent =
    `${Math.round(Math.max(...tTemps))}°/${Math.round(Math.min(...tTemps))}°`;

  // Aika / päivämäärä
  card.querySelector(".hour").textContent =
    now.toLocaleTimeString("fi-FI", { hour: "2-digit", minute: "2-digit" });
  card.querySelector(".date").textContent =
    `${DAY_NAMES[now.getDay()]} ${String(now.getDate()).padStart(2,"0")}-${String(now.getMonth()+1).padStart(2,"0")}`;
  card.querySelector(".city").textContent = city;

  // 4 päivää
  const btns = card.querySelectorAll(".days-section button");
  for (let d = 1; d <= 4; d++) {
    const dt   = new Date(now.getTime() + d * 86400000);
    const dStr = dt.toISOString().slice(0, 10);
    const idxs = times.map((t, i) => t.startsWith(dStr) ? i : -1).filter(i => i >= 0);
    const mid  = idxs.length ? idxs[Math.floor(idxs.length / 2)] : -1;
    const info = WEATHER_SYMBOLS[symbols[mid]] || { icon: "cloudy" };

    btns[d - 1].querySelector(".day").textContent = DAY_NAMES[dt.getDay()];
    btns[d - 1].querySelector(".icon-weather-day").innerHTML = ICONS[info.icon];
  }
}

async function reverseGeocode(lat, lon) {
  try {
    const r = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=10`,
      { headers: { "Accept-Language": "fi" } }
    );
    const j = await r.json();
    return j.address?.city || j.address?.town || j.address?.village || "Tuntematon";
  } catch { return "Tuntematon"; }
}

initWeather().catch(console.error);   