/**
 * Реализация API, не изменяйте ее
 * @param {string} url
 * @param {function} callback
 */
function getData(url, callback) {
    var RESPONSES = {
        '/countries': [
            {name: 'Cameroon', continent: 'Africa'},
            {name :'Fiji Islands', continent: 'Oceania'},
            {name: 'Guatemala', continent: 'North America'},
            {name: 'Japan', continent: 'Asia'},
            {name: 'Yugoslavia', continent: 'Europe'},
            {name: 'Tanzania', continent: 'Africa'}
        ],
        '/cities': [
            {name: 'Bamenda', country: 'Cameroon'},
            {name: 'Suva', country: 'Fiji Islands'},
            {name: 'Quetzaltenango', country: 'Guatemala'},
            {name: 'Osaka', country: 'Japan'},
            {name: 'Subotica', country: 'Yugoslavia'},
            {name: 'Zanzibar', country: 'Tanzania'}
        ],
        '/populations': [
            {count: 138000, name: 'Bamenda'},
            {count: 77366, name: 'Suva'},
            {count: 90801, name: 'Quetzaltenango'},
            {count: 2595674, name: 'Osaka'},
            {count: 100386, name: 'Subotica'},
            {count: 157634, name: 'Zanzibar'}
        ]
    };

    setTimeout(function () {
        var result = RESPONSES[url];
        if (!result) {
            return callback('Unknown url');
        }

        callback(null, result);
    }, Math.round(Math.random * 1000));
}

/**
 * Ваши изменения ниже
 */
var countries = '/countries';
var cities = '/cities';
var populations = '/populations';
var requests = [countries, cities, populations];
var responses = {};

function cityPopulation(city) {
    var p = responses[populations];
    for (var i = 0; i != p.length; ++i) {
        if (p[i].name === city) {
            return p[i].count;
        }
    }
    return undefined;
}

function countryPopulation(country) {
    var c = responses[cities];
    var population = 0;
    for (var i = 0; i != c.length; ++i) {
        if (c[i].country === country) {
            var cp = cityPopulation(c[i].name);
            if (cp !== undefined) {
                population += cp;
            }
        }
    }
    return population === 0 ? undefined : population;
}

function showCountryOrCityPopulation(countryOrCity) {
    var city = cityPopulation(countryOrCity);
    var country = countryPopulation(countryOrCity);
    if (city !== undefined) {
        alert('Популяция города ' + countryOrCity + ': ' + city);
    } else if (country !== undefined) {
        alert('Популяция страны ' + countryOrCity + ': ' + country);
    } else {
        alert('В приложении отсутствует информация о введённом городе или стране: ' + countryOrCity);
    }
}

/**
 * Собственно подсчёт вынесен в отдельную функцию для удобства
 */
function summarizeAndContinue() {
    var c = [], cc = [], p = 0;
    for (i = 0; i < responses[countries].length; i++) {
        if (responses[countries][i].continent === 'Africa') {
            c.push(responses[countries][i].name);
        }
    }

    for (i = 0; i < responses[cities].length; i++) {
        for (j = 0; j < c.length; j++) {
            if (responses[cities][i].country === c[j]) {
                cc.push(responses[cities][i].name);
            }
        }
    }

    for (i = 0; i < responses[populations].length; i++) {
        for (j = 0; j < cc.length; j++) {
            if (responses[populations][i].name === cc[j]) {
                p += responses[populations][i].count;
            }
        }
    }

    console.log('Total population in African cities: ' + p);

    showCountryOrCityPopulation(window.prompt("Введите название страны или города"));
}

/**
 * При таком способе мы создаём объекты с разными request, а не три объекта,
 * ссылающиеся на один и тот же request
 * @param request запрос, для которого нужно создать callback
 * @returns {Function} callback
 */
function createCallback(request) {
    return function (error, result) {
        responses[request] = result;

        var l = [];
        for (K in responses)
            l.push(K);

        if (l.length == 3) {
            summarizeAndContinue();
        }
    };
}

/**
 * Ошибка могла возникнуть в случае, когда автор кода не учитывает асинхронность запуска callback
 * Чтобы избежать подобного, нужно создавать отличающиеся параметром callback при помощи функции-фабрики
 */
for (i = 0; i < 3; i++) {
    var request = requests[i];
    getData(request, createCallback(request));
}
