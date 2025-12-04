class WeatherApp {
    constructor() {
        // Replace with your actual API key
        this.API_KEY = 'YOUR_API_KEY_HERE';
        this.API_URL = 'https://api.openweathermap.org/data/2.5/weather';
        
        // DOM Elements
        this.cityInput = document.getElementById('cityInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.loadingElement = document.getElementById('loading');
        this.errorElement = document.getElementById('error');
        this.errorMessageElement = document.getElementById('errorMessage');
        this.weatherDisplay = document.getElementById('weatherDisplay');
        
        // Weather data display elements
        this.cityNameElement = document.getElementById('cityName');
        this.temperatureElement = document.getElementById('temperature');
        this.weatherDescriptionElement = document.getElementById('weatherDescription');
        this.weatherIconElement = document.getElementById('weatherIcon');
        this.feelsLikeElement = document.getElementById('feelsLike');
        this.humidityElement = document.getElementById('humidity');
        this.windSpeedElement = document.getElementById('windSpeed');
        this.pressureElement = document.getElementById('pressure');
        this.currentDateElement = document.getElementById('currentDate');
        
        this.init();
    }
    
    init() {
        // Set up event listeners
        this.setupEventListeners();
        
        // Set current date
        this.updateCurrentDate();
        
        // Load default city weather
        this.fetchWeather('London');
    }
    
    setupEventListeners() {
        // Search button click
        this.searchBtn.addEventListener('click', () => {
            this.handleSearch();
        });
        
        // Enter key in input field
        this.cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });
        
        // Example city clicks
        document.querySelectorAll('.city-tag').forEach(cityTag => {
            cityTag.addEventListener('click', (e) => {
                const city = e.target.dataset.city;
                this.cityInput.value = city;
                this.fetchWeather(city);
            });
        });
    }
    
    handleSearch() {
        const city = this.cityInput.value.trim();
        if (city) {
            this.fetchWeather(city);
        }
    }
    
    async fetchWeather(city) {
        // Show loading state
        this.showLoading();
        this.hideError();
        this.hideWeatherDisplay();
        
        try {
            // Construct API URL
            const url = `${this.API_URL}?q=${encodeURIComponent(city)}&appid=${this.API_KEY}&units=metric`;
            
            // Make API request
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Process and display the data
            this.displayWeather(data);
            
        } catch (error) {
            console.error('Error fetching weather:', error);
            this.showError(error.message || 'Failed to fetch weather data. Please try again.');
        } finally {
            // Hide loading state
            this.hideLoading();
        }
    }
    
    displayWeather(data) {
        // Extract data from API response
        const cityName = data.name;
        const country = data.sys.country;
        const temperature = Math.round(data.main.temp);
        const feelsLike = Math.round(data.main.feels_like);
        const humidity = data.main.humidity;
        const pressure = data.main.pressure;
        const windSpeed = data.wind.speed;
        const weatherDescription = data.weather[0].description;
        const weatherIconCode = data.weather[0].icon;
        
        // Update DOM elements
        this.cityNameElement.textContent = `${cityName}, ${country}`;
        this.temperatureElement.textContent = temperature;
        this.weatherDescriptionElement.textContent = this.capitalizeFirstLetter(weatherDescription);
        this.feelsLikeElement.textContent = `${feelsLike}°C`;
        this.humidityElement.textContent = `${humidity}%`;
        this.windSpeedElement.textContent = `${windSpeed} m/s`;
        this.pressureElement.textContent = `${pressure} hPa`;
        
        // Update weather icon
        this.setWeatherIcon(weatherIconCode);
        
        // Show weather display
        this.showWeatherDisplay();
    }
    
    setWeatherIcon(iconCode) {
        // Map OpenWeatherMap icon codes to Font Awesome icons
        const iconMap = {
            '01d': 'fa-sun',           // clear sky day
            '01n': 'fa-moon',          // clear sky night
            '02d': 'fa-cloud-sun',     // few clouds day
            '02n': 'fa-cloud-moon',    // few clouds night
            '03d': 'fa-cloud',         // scattered clouds
            '03n': 'fa-cloud',
            '04d': 'fa-cloud',         // broken clouds
            '04n': 'fa-cloud',
            '09d': 'fa-cloud-rain',    // shower rain
            '09n': 'fa-cloud-rain',
            '10d': 'fa-cloud-sun-rain',// rain day
            '10n': 'fa-cloud-moon-rain',// rain night
            '11d': 'fa-bolt',          // thunderstorm
            '11n': 'fa-bolt',
            '13d': 'fa-snowflake',     // snow
            '13n': 'fa-snowflake',
            '50d': 'fa-smog',          // mist
            '50n': 'fa-smog'
        };
        
        const iconClass = iconMap[iconCode] || 'fa-cloud';
        this.weatherIconElement.className = `fas ${iconClass}`;
        
        // Add color based on weather
        if (iconCode.includes('01')) {
            this.weatherIconElement.style.color = '#f39c12'; // sun/moon
        } else if (iconCode.includes('09') || iconCode.includes('10') || iconCode.includes('11')) {
            this.weatherIconElement.style.color = '#3498db'; // rain/storm
        } else if (iconCode.includes('13')) {
            this.weatherIconElement.style.color = '#95a5a6'; // snow
        } else {
            this.weatherIconElement.style.color = '#667eea'; // default
        }
    }
    
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    updateCurrentDate() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        this.currentDateElement.textContent = now.toLocaleDateString('en-US', options);
    }
    
    // UI State Management Methods
    showLoading() {
        this.loadingElement.classList.remove('hidden');
    }
    
    hideLoading() {
        this.loadingElement.classList.add('hidden');
    }
    
    showError(message) {
        this.errorMessageElement.textContent = message;
        this.errorElement.classList.remove('hidden');
    }
    
    hideError() {
        this.errorElement.classList.add('hidden');
    }
    
    showWeatherDisplay() {
        this.weatherDisplay.classList.remove('hidden');
    }
    
    hideWeatherDisplay() {
        this.weatherDisplay.classList.add('hidden');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const weatherApp = new WeatherApp();
    
    // Make app globally accessible for debugging
    window.weatherApp = weatherApp;
});
