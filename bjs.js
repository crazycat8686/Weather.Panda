// Your API key (replace this with your actual key)
const API_KEY = "28e70c00fd7c4646a1995924242111";

// Base URL for the API call
const BASE_URL = "https://api.weatherapi.com/v1";

// Function to fetch weather data
async function getWeather(city) {
  const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&aqi=no&days=10`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data); // Log the entire data for debugging

    // Check if forecast data exists
    if (data.forecast && data.forecast.forecastday) {
      displayWeather(data);
    } else {
      throw new Error("Forecast data is missing in the response.");
    }
  } catch (error) {
    console.error("Error fetching the weather data:", error);
    document.getElementById("weather").innerHTML =
      "Error fetching data! Please check the console for details.";
  }
}

function formatForecast(forecast) {
  let html = "";

  forecast.forecastday.forEach((day) => {
    html += `<h1>Forecast for ${day.date}</h1>`;
    html += `<p>Condition: <img id="hourlyimg" src="${day.day.condition.icon}" alt="${day.day.condition.text}"> <h2 id="foreicon">${day.day.condition.text}</h2></p>`;
    html += `<p>Max Temp: <span>${day.day.maxtemp_c}°C</span></p>`;
    html += `<p>Min Temp: <span>${day.day.mintemp_c}°C</span></p>`;
    html += `<p>Avg Temp: <span>${day.day.avgtemp_c}°C</span></p>`;
    html += `<p>UV Index: <span>${day.day.uv}</span></p>`;
  });

  return html;
}

function formatHourly(hourly, period) {
  let html = `<h3>Hourly Forecast (${period.toUpperCase()})</h3>`;
  html += "<ul>";

  hourly.forEach((hour) => {
    const hourTime = parseInt(hour.time.split(" ")[1].split(":")[0]);
    if (period === "am" && hourTime < 12) {
      html += `<li>${hour.time} - Temp: ${hour.temp_c}°C, Condition: <img src="${hour.condition.icon}" alt="${hour.condition.text}"> ${hour.condition.text}, Humidity: ${hour.humidity}%, Wind: ${hour.wind_mph} mph</li>`;
    } else if (period === "pm" && hourTime >= 12) {
      html += `<li>${hour.time} - Temp: ${hour.temp_c}°C, Condition: <img src="${hour.condition.icon}" alt="${hour.condition.text}"> ${hour.condition.text}, Humidity: ${hour.humidity}%, Wind: ${hour.wind_mph} mph</li>`;
    }
  });

  html += "</ul>";
  return html;
}

// Function to display weather data
function displayWeather(data) {
  const mad = document.getElementsByClassName("main0");
  const weatherElement = document.getElementById("weather");
  const maan = document.getElementById("main1");
  const hourlyElement = document.getElementById("hourly");
  const weatherIcon = document.getElementById("weather-icon");
  const pan = document.getElementById("pandaimg");
  const forecast10 = document.getElementById("forecast10");
  const { location, current, forecast } = data;
  const condition = current.condition.text.toLowerCase();
  // Convert to lowercase for easier comparison

  weatherElement.innerHTML = `
    <h1 id="loca" style="font-size: 40px">${location.name}</h1>
    <h1 id="h11">${current.temp_c}°C</h1>
    <div>
      <p>Pressure: <span>${current.pressure_mb} hPa</span></p>
      <p>Humidity: <span>${current.humidity}%</span></p>
      <p>Condition: <span>${current.condition.text}</span></p>
      <p>UV Index: <span>${current.uv}</span></p>
    </div>
  `;

  weatherIcon.src = `https:${current.condition.icon}`; // Correct URL for the icon

  // Check weather condition and set video background or fallback image
  if (condition.includes("rain")) {
    // Set the background video if the weather condition is clear
    // maan.style.background = "url('Kung fu Panda-Walk Cycle (1).mp4')";
    maan.style.backgroundSize = "cover"; // Ensure the video covers the div
    maan.style.backgroundRepeat = "no-repeat"; // Prevent repeating
    pan.style.display = "block"; // Hide the panda image
    pan.src = "7ynk5l9j-removebg-preview.png"


  } else {
    // Fallback: show the panda image and remove the video background
    pan.src ="pandabeach"
    pan.style.display = "block"; // Show the panda image
    maan.style.background = "none"; // Remove the video background
    maan.style.backgroundColor = "#7a777459"; // Fallback background color

  }

  forecast10.innerHTML = formatForecast(forecast);
  const timerValue = document.getElementById("timer").value;
  hourlyElement.innerHTML = formatHourly(
    forecast.forecastday[0].hour,
    timerValue
  ); // Use the hourly data of the first day
}

// Function to search for weather when button is clicked
function searchWeather() {
  const city = document.getElementById("search").value;

  if (city) {
    localStorage.setItem("searchLocation", city); // Save the search location in local storage
    getWeather(city);
    document.getElementById(
      "hourly"
    ).innerText = `Searching for weather in ${city}`; // Displaying a message
  }
}

// Add event listener to the search input field to allow enter key search
document
  .getElementById("search")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      searchWeather();
    }
  });

function scrollToSection() {
  const skipto = document.getElementById("prediction");
  skipto.scrollIntoView({ behavior: "smooth" });
}

function scrollToSection1() {
  const skipto1 = document.getElementById("weather");
  skipto1.scrollIntoView({ behavior: "smooth" });
}

function scrollToSection2() {
  const skipto2 = document.getElementById("hourlyf");
  skipto2.scrollIntoView({ behavior: "smooth" });
}

// Add event listener to the timer select dropdown to update hourly forecast
document.getElementById("timer").addEventListener("change", function () {
  const city = localStorage.getItem("searchLocation"); // Retrieve the search location from local storage
  if (city) {
    getWeather(city);
  }
});

// Fetch weather for a default city on page load
const savedLocation = localStorage.getItem("searchLocation"); // Use saved location or default
getWeather(savedLocation);
const namer = localStorage.getItem("name");
// document.querySelector(".main2").innerHTML =
//   `<h1 id="wuser">Hey, ${namer}</h1>` +
//   document.querySelector(".main2").innerHTML;
// if(namer){
//   document.querySelector(".main0").innerHTML +=
//   `<h1 id="wuser">Hey, ${namer}</h1>`;
// }