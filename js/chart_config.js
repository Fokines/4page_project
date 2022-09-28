let labels = [];

let data = {
    labels: labels, //подгружаем массив labels
    datasets: []
};

let config = {
    type: 'line', //тип
    data: data, //данные
    options: {} //опции
};

let myChart = new Chart(
    document.getElementById('myChart'),
    config
    );

function initSecidSelect(){
    let secid = document.getElementById('secid_select');
    $.ajax({
        url: 'https://sedelkin.ru/api/security_list', /* куда зпрос? */
        method: 'get', /* метод передачи (пост или гет) */
        dataType: 'json', /* тип данных в ответе (xml, json, script, html), у нас всегда json */
        data: {}, /* параметры передаваемые в запросе */
        success: function(data) { /* функция, которая будет выполнена после успешного запроса */
            /* в переменной data содержится ответ от сервера */
        let optionArray = [];
        while(secid.firstChild){
            secid.removeChild(secid.firstChild);
        }
        let arr = data.data;
        arr.forEach(function(item) {
            optionArray.push(createOptionElen(item.title, item.secid));
        });
        optionArray.forEach(function(item){
            secid.append(item);
        });
    }
 });
}

function initIntervalSelect(){
    let interval = document.getElementById('intervel_select');
    $.ajax({
        url: 'https://sedelkin.ru/api/interval',
        method: 'get',
        dataType: 'json',
        data: {},
        success: function(data){
            let optionArray = [];
            while (interval.firstChild){
                interval.removeChild(interval.firstChild);
            }
            let arr = data.data;
            arr.forEach(function(item){
                optionArray.push(createOptionElen(item.title, item.value));
            });
            optionArray.forEach(function(item){
                interval.append(item);
            });
        }
    });
}

function createOptionElen(title, value){
    let option = new Option(title, value);
    return option;
}

function updateChart(chartName, dataObject){
    let dataCharts = [];
    dataObject.forEach(function(item){
        labels.push(item.datetime);
        console.info("Добавил в labels: "+item.datetime);
        dataCharts.push(parseFloat(item.close));
    });
    data.labels = labels;
    data.datasets.push({
        label: chartName,
        data: dataCharts,
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    });

    myChart.update();
}

function clearChartData(){
    data.datasets = [];
    labels = [];
    data.labels = [];
}

function getData(event){
    event.preventDefault();
    let secid_index = document.getElementById('secid_select').options.selectedIndex;
    let interval_index = document.getElementById('intervel_select').options.selectedIndex;
    let secidValue = document.getElementById("secid_select").options[secid_index].value;
    let intervalValue = document.getElementById("intervel_select").options[interval_index].value;
    let limits = document.getElementById('limit_value');
    $.ajax({
        url: 'https://sedelkin.ru/api/history/get_data',
        method: 'post', 
        dataType: 'json', 
        data: {
            app_key: 'lpDRhW4f%5Bj|i8mB~BjlCD#Ve6wAi',
            interval: intervalValue,
            limits: limits.value,
            secid: secidValue,
            start: "2021-12-07" //заменить эту дату на дату, которая получается из формы
        },
        success: function(data){
            if(data.status == "OK"){
                clearChartData();
                updateChart(data.secid,data.data);
            }
            else if(data.status == "Error"){
                showError(data.data);
            }
        }
    });
}

function showError(errorObject){
    let message = "";
    for(propertyName in errorObject){
        if(errorObject[propertyName].status == "Error")
            message+=errorObject[propertyName].message+"\n";
    }
    alert(message);
}

initSecidSelect();
initIntervalSelect();
