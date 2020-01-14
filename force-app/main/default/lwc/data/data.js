export const bikes = [
    {
        "dt": 1578992400,
        "main": {
            "temp": 280.94,
            "feels_like": 275.96,
            "temp_min": 280.94,
            "temp_max": 281.56,
            "pressure": 999,
            "sea_level": 999,
            "grnd_level": 995,
            "humidity": 73,
            "temp_kf": -0.62
        },
        "weather": [
            {
                "id": 803,
                "main": "Clouds",
                "description": "broken clouds",
                "icon": "04d"
            }
        ],
        "clouds": {
            "all": 66
        },
        "wind": {
            "speed": 5.04,
            "deg": 213
        },
        "sys": {
            "pod": "d"
        },
        "dt_txt": "2020-01-14 09:00:00"
    },
    {
        "dt": 1579003200,
        "main": {
            "temp": 283.58,
            "feels_like": 277.76,
            "temp_min": 283.58,
            "temp_max": 284.05,
            "pressure": 997,
            "sea_level": 997,
            "grnd_level": 993,
            "humidity": 75,
            "temp_kf": -0.47
        },
        "weather": [
            {
                "id": 803,
                "main": "Clouds",
                "description": "broken clouds",
                "icon": "04d"
            }
        ],
        "clouds": {
            "all": 66
        },
        "wind": {
            "speed": 7.06,
            "deg": 188
        },
        "sys": {
            "pod": "d"
        },
        "dt_txt": "2020-01-14 12:00:00"
    },
    {
        "dt": 1579014000,
        "main": {
            "temp": 286.15,
            "feels_like": 278.24,
            "temp_min": 286.15,
            "temp_max": 286.46,
            "pressure": 992,
            "sea_level": 992,
            "grnd_level": 988,
            "humidity": 83,
            "temp_kf": -0.31
        },
        "weather": [
            {
                "id": 500,
                "main": "Rain",
                "description": "light rain",
                "icon": "10d"
            }
        ],
        "clouds": {
            "all": 100
        },
        "wind": {
            "speed": 11.43,
            "deg": 216
        },
        "rain": {
            "3h": 2
        },
        "sys": {
            "pod": "d"
        },
        "dt_txt": "2020-01-14 15:00:00"
    },
    {
        "dt": 1579024800,
        "main": {
            "temp": 286.45,
            "feels_like": 278.03,
            "temp_min": 286.45,
            "temp_max": 286.61,
            "pressure": 994,
            "sea_level": 994,
            "grnd_level": 990,
            "humidity": 79,
            "temp_kf": -0.16
        },
        "weather": [
            {
                "id": 500,
                "main": "Rain",
                "description": "light rain",
                "icon": "10n"
            }
        ],
        "clouds": {
            "all": 100
        },
        "wind": {
            "speed": 11.99,
            "deg": 218
        },
        "rain": {
            "3h": 1.44
        },
        "sys": {
            "pod": "n"
        },
        "dt_txt": "2020-01-14 18:00:00"
    },
    {
        "dt": 1579035600,
        "main": {
            "temp": 286.17,
            "feels_like": 278.22,
            "temp_min": 286.17,
            "temp_max": 286.17,
            "pressure": 995,
            "sea_level": 995,
            "grnd_level": 992,
            "humidity": 79,
            "temp_kf": 0
        },
        "weather": [
            {
                "id": 500,
                "main": "Rain",
                "description": "light rain",
                "icon": "10n"
            }
        ],
        "clouds": {
            "all": 100
        },
        "wind": {
            "speed": 11.22,
            "deg": 214
        },
        "rain": {
            "3h": 2.31
        },
        "sys": {
            "pod": "n"
        },
        "dt_txt": "2020-01-14 21:00:00"
    }
]
// import { LightningElement } from 'lwc';

// export default class Data extends LightningElement {

//     getForecast() {
//         console.log('entering a function');
//         let request = new XMLHttpRequest();
//         // let city = this.template.querySelector('lightning-input').value;
//         let requestAPI = 'https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=be44a17b8f33f7adf056ca9ad4501437&units=metric';
//         let data;
//         request.open('GET', requestAPI, true);
//         request.onload = function asd() {
//           // Begin accessing JSON data here
//           data = JSON.parse(this.response);
//           console.log(data);
//         }
//         request.send();

//         const event = new CustomEvent('weatherclick', {
//         });
//         // Fire the event from c-tile
//         this.dispatchEvent(event);

//         console.log('data ok');
//     }
// }
// export const bikes = this.getForecast();

