let labels = []; //ось Ох

let data = {
    labels: labels, // ось Ох, подписи к точкам
    datasets: [] //данные для графика, ось Оу
};

let config = {
    type: 'line', //тип графика
    data: data, //данные
    options: {}
};

function Company(){ //загрузка компаний
    let company_form = document.getElementById('company'); //получение формы для выбора компании
    $.ajax({ //формирование запроса
        url: 'https://sedelkin.ru/api/security_list', //запрос
        method: 'get', //метод передачи данных
        dataType: 'json', //тип передаваемых данных
        data: {}, //ответ от сервера
        success: function(data){ //функция при успешном получении данных
            let companies = [];
            while(company_form.firstChild){ //предварительное очищение оставшейся формы
                company_form.removeChild(company_form.firstChild);
            }
            let data_companies = data.data; //получение secid и title компаний в один блок данных
            data_companies.forEach(function(temp){ //разделение одного блока данных на компании в массив
                companies.push(option_create(temp.title, temp.secid));
            });  
            companies.forEach(function(temp){ //добавление элементов в форму
               company_form.append(temp);  
            });
        }
    });
}


function Interval(){ //загрузка интервалов
    let interval_form = document.getElementById('interval'); //получение формы для выбора интервалов
    $.ajax({ //формирование запроса
        url: 'https://sedelkin.ru/api/interval', //запрос
        method: 'get', //метод передачи данных
        dataType: 'json', //тип передаваемых данных
        data: {}, //ответ от сервера
        success: function(data){ //функция при успешном получении данных
            let intervals = [];
            while(interval_form.firstChild){ //предварительное очищение оставшейся формы
                interval_form.removeChild(interval_form.firstChild);
            }
            let data_intervals = data.data; //получение value и title компаний в один блок данных
            data_intervals.forEach(function(temp){ //разделение одного блока данных на интервалы в массив
                intervals.push(option_create(temp.title, temp.value));
            });  
            intervals.forEach(function(temp){ //добавление элементов в форму
               interval_form.append(temp);  
            });
        }
    });
}

function get_data(event){
    event.preventDefault(); //отключение передачи формы для обработки по умолчанию
    let company_title = document.getElementById('company').options.selectedIndex; //выбранный номер компании
    let interval_title = document.getElementById('interval').options.selectedIndex; //выбранный номер интервала
    let company_value = document.getElementById("company").options[company_title].value; // выбранная компания
    let interval_value = document.getElementById("interval").options[interval_title].value; //выбранный интервал
    let number = document.getElementById('number'); //количество значений в ответе
    let date = document.getElementById('date1'); //дата
    $.ajax({ //формирование запроса
        url: 'https://sedelkin.ru/api/history/get_data', //запрос
        method: 'post', //метод передачи данных
        dataType: 'json', //тип передаваемых данных
        data:{
            app_key: 'lpDRhW4f%5Bj|i8mB~BjlCD#Ve6wAi', //ключ api
            interval: interval_value, //значение интервала
            secid: company_value, //компания
            start: date.value, //дата
            limits: number.value //количество значений в ответе
        },
        success: function(data){ //если запрос прошел успешно
            if(data.status == "OK" && data.data.length == number.value){ //если данные получены
                clear();
                chart_update(data.secid, data.data);
            } else {
                alert("Ошибка!");
            }
        }
    });
}

function option_create(title, value){ //создание полей в форме
    let option = new Option(title, value);
    return option;
}

function chart_update(secid, data_charts){ //обновление графика
    let data_graphic = []; //данные графика
    data_charts.forEach(function(temp){ //сортировка полученных данных на массивы для графика
        data_graphic.push(parseFloat(temp.close)); //Оу
        labels.push(temp.datetime); //Ох
    });
    data.labels = labels;
    data.datasets.push({
        borderColor: '#5e15f3',
        data: data_graphic,
        label: secid
    });
    APIChart.update();
}

function clear(){ //очищение графика
    data.labels = [];
    labels = [];
    data.datasets = [];
}


Company(); //обновление формы с запросом компаний
Interval(); //обновление формы с запросом интервалов

const APIChart = new Chart(
  document.getElementById('APIChart'),
  config
); //создание объекта графика

