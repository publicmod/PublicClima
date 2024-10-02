// Tu clave API de WeatherAPI
const apiKey = 'c817942e1fe6422d9dd04421240210'; // Reemplaza con tu clave API

// Función para traducir la descripción del clima
function translateWeatherCondition(condition) {
    switch (condition.toLowerCase()) {
        case 'clear':
            return 'Despejado';
        case 'sunny':
            return 'Soleado';
        case 'partly cloudy':
            return 'Parcialmente nublado';
        case 'cloudy':
            return 'Nublado';
        case 'overcast':
            return 'Cubierto';
        case 'mist':
            return 'Niebla';
        case 'fog':
            return 'Niebla';
        case 'rain':
            return 'Lluvia';
        case 'thunderstorm':
            return 'Tormenta eléctrica';
        case 'snow':
            return 'Nieve';
        case 'sleet':
            return 'Aguacero';
        case 'haze':
            return 'Bruma';
        case 'dust':
            return 'Polvo';
        case 'sand':
            return 'Arena';
        case 'tornado':
            return 'Tornado';
        case 'tropical storm':
            return 'Tormenta tropical';
        case 'hurricane':
            return 'Huracán';
        case 'cold':
            return 'Frío';
        case 'hot':
            return 'Caliente';
        case 'windy':
            return 'Ventoso';
        case 'chilly':
            return 'Frío';
        case 'drizzle':
            return 'Llovizna';
        case 'blizzard':
            return 'Tormenta de nieve';
        case 'freezing rain':
            return 'Lluvia helada';
        case 'showers':
            return 'Chubascos';
        case 'isolated thunderstorms':
            return 'Tormentas aisladas';
        case 'scattered thunderstorms':
            return 'Tormentas dispersas';
        default:
            return condition; // Si no hay traducción, devolver el texto original
    }
}

function getWeather(latitude, longitude) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=no`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                // Aquí puedes personalizar el mensaje de error basado en el estado de la respuesta
                if (response.status === 403) {
                    throw new Error('Acceso prohibido. Verifica tu clave API.');
                } else if (response.status === 404) {
                    throw new Error('No se encontró la ubicación.');
                } else {
                    throw new Error('Error en la respuesta de la API: ' + response.status);
                }
            }
            return response.json();
        })
        .then(data => {
            // Mostrar la ubicación
            document.getElementById('location').textContent = `${data.location.name}, ${data.location.country}`;
            // Mostrar la temperatura
            document.getElementById('temperature').textContent = `Temperatura: ${data.current.temp_c} °C`;
            // Mostrar la descripción del clima traducida
            const translatedCondition = translateWeatherCondition(data.current.condition.text);
            document.getElementById('description').textContent = translatedCondition;
            // Mostrar el ícono del clima
            document.getElementById('icon').src = data.current.condition.icon;

            // Ocultar mensaje de error si todo está bien
            document.getElementById('error-message').classList.add('hidden');
            document.getElementById('weather').classList.remove('hidden');
        })
        .catch(error => {
            console.error(error);
            document.getElementById('error-message').textContent = error.message;
            document.getElementById('error-message').classList.remove('hidden');
            // Ocultar información del clima si hay un error
            document.getElementById('weather').classList.add('hidden');
        });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            getWeather(latitude, longitude);
        }, () => {
            document.getElementById('error-message').textContent = 'No se pudo obtener tu ubicación.';
            document.getElementById('error-message').classList.remove('hidden');
        });
    } else {
        document.getElementById('error-message').textContent = 'La geolocalización no es compatible con este navegador.';
        document.getElementById('error-message').classList.remove('hidden');
    }
}

window.onload = getLocation;
