
let labels = [
    'Китайский',
    'Испанский',
    'Английский',
    'Хинди',
    'Арабский',
    'Бенгальский',
    'Португальский',
    'Русский',
    'Японский',
    'Лахнда',
];


let data = {
    labels: labels, //подгружаем массив labels
    datasets: [{
        label: 'Место языка в рейтинге самый популярных языков мира (2019)',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [1311, 460, 379, 341, 319, 228, 221, 154, 128, 119], //точка для графика
    }]
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

const RED = "rgb(220, 53, 69)";
const GREEN = "rgb(25, 135, 84)";
const BLUE = "rgb(13, 110, 253)";


let changeColor = () => {
    console.log("тык")
}

document.querySelector("#graph-color-btn").onclick = () => {
    switch (document.querySelector("#graph-color").value) {
        case "red":
            var color = RED;
            break;
        case "green":
            var color = GREEN;
            break;
        case "blue":
            var color = BLUE;
            break;
    }

    data.datasets[0].backgroundColor = color;
    data.datasets[0].borderColor = color;
    myChart.update();
}