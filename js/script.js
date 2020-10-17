// Constants and variables

const { openWeatherAPIKey } = CONFIG;

const API_KEY = openWeatherAPIKey; 

let weatherData;


const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';

// Cached Element References

const $title = $('#title');
const $temp = $('#temp');
const $index = $('#index');
const $desc = $('#desc');
const $form = $('form');
const $input = $('input[type="text"]');

// Event listeners
$form.on('submit', handleGetData);
// Functions


function handleGetData(e) {
    e.preventDefault();
    const input = $input.val()
    
    if(!input) return;

    $.ajax(BASE_URL + 'appid=' + API_KEY + '&q=' + input +'&units=imperial')
    .then(function(data) {
        weatherData = data;
        render();
    }, function(error) {
        console.log('Error: ', error);
    });
}


function render() {
    $title.text(`City: ${weatherData.name}`);
    $temp.html(`Temperature: ${Math.floor(weatherData.main.temp)} &deg;`);
    $index.html(`Feels like: ${Math.floor(weatherData.main.feels_like)} &deg;`);
    $desc.text(`Condition Outside: ${weatherData.weather[0].description}`).css({'text-transform': 'capitalize'});
}