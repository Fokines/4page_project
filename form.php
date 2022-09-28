<!DOCTYPE html>
<html lang="ru">
    <head>
        <meta charset="UTF-8">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/form.css">
        <title>part 3</title>
    </head>

 <body>        
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">lab 1</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="index.html">Статья</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="graph.html">График</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="notes.html">Заметки</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="form.html">Анкета</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="api.html">Внешнее API</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container mx-auto">
    <br><b>
    <h2 class="textMy">Анкета</h2>
      <h2 class="textDown">Если вы видите свой аватар - значит все успешно :)!</h2>
    <br>
    <?php
     if(isset($_REQUEST["name"]) && isset($_REQUEST["lastName"]) && isset($_REQUEST["patronym"]) && isset($_REQUEST["gender"]) && isset($_REQUEST["age"]) && isset($_REQUEST["language"]) && isset($_REQUEST["story"]) && $_FILES && isset($_REQUEST["email"]) && isset($_REQUEST["password"])  && isset($_REQUEST["phone"]) && isset($_REQUEST["date1"])){ //проверка, что все данные получены корректно
        $array = []; 
        foreach($_REQUEST as $key => $value){ //заполнение массива ключей - значений из полученных данных
            $array[$key] = $value;
        }
        $filename = "C:/OpenServer/domains/prLast/file.txt"; //имя файла
        $f = fopen($filename, "w") or die ("Не получилось открыть файл"); //открытие или создание файла
        foreach($array as $key => $value){ //запись в файл
            fwrite($f,"$key : $value\n");
        }
        fclose($f); //закрытие файла
        $image = $_FILES["file1"]["name"]; //получение изображения
        move_uploaded_file($_FILES["file1"]["tmp_name"], $image); //загрузка файла на сервер
        echo "Аватар:";
        echo "<br>";
        echo "<img src='http://prLast/$image'"; //вывод изображения
        echo "<br>";
        echo "<br>";
        echo "<br>";
    } else{
         echo "Введите данные заново";
     }
     ?>
     <a class="textMy" href="https://prLast/file.txt" download="">Скачать файл</a>
  </div>
     <br><br><br>
    </body>
</html>