const saveData = () => {
    // Получаем данные из всех полей
    let lastName = document.querySelector('#lastName').value;
    let firstName = document.querySelector('#firstName').value;
    let middleName = document.querySelector('#middleName').value;
    // let phone = document.querySelector('#phone').value;
    let status = document.querySelector('#status').value;

    if (status === "книга") {
         // Запрос на проверку данных
    let storeBook = JSON.parse(localStorage.getItem("Book")) || [];
    // Объект с хранением переменных 
    let Book = {
        lastName: lastName,
        firstName: firstName,
        middleName: middleName,
        // phone: phone,
        status: status
    }
    // Добавление в локальное хранилище
    storeBook.push(Book);
    // Сохранение данных в локальном хранилище
    localStorage.setItem("Book", JSON.stringify(storeBook));

    } else if (status === "путешествие") {
        let storeTravel = JSON.parse(localStorage.getItem("Travel")) || [];
        let Travel = {
            lastName: lastName,
            firstName: firstName,
            middleName: middleName,
            status: status
        }
        storeTravel.push(Travel);
        localStorage.setItem("Travel", JSON.stringify(storeTravel));
    }
    
    // Вызываем функцию, которая будет отображать добавленные записи
    getData();

}
const getData = () => {
    let storeBook = JSON.parse(localStorage.getItem("Book"));
    let storeTravel = JSON.parse(localStorage.getItem("Travel"));

    let dataList = document.querySelector('#dataList');
    dataList.innerHTML = "";

    if ( storeBook && storeBook.length > 0 ) {
        storeBook.forEach(function(Book, index) {
            dataList.innerHTML += "<li>книга: " + Book.lastName + "</li>"
            dataList.innerHTML += "<li>дата: " + Book.firstName + "</li>"
            dataList.innerHTML += "<li>описание: " + Book.middleName + "</li>"

            // dataList.innerHTML += "<li>Номер телефона: " + Book.phone + "</li>"

            dataList.innerHTML += "<li>тип: " + Book.status + "</li>"
            dataList.innerHTML += `<button onclick="deleteData(${index})">Удалить</button>`;
            dataList.innerHTML += "<hr>";
            dataList.innerHTML += "<br><br>";
        });
    }  
    if ( storeTravel && storeTravel.length > 0 ) {
            storeTravel.forEach(function(Travel, index) {
                dataList.innerHTML += "<li>путь: " + Travel.lastName + "</li>"
                dataList.innerHTML += "<li>дата: " + Travel.firstName + "</li>"
                dataList.innerHTML += "<li>описание: " + Travel.middleName + "</li>"

                // dataList.innerHTML += "<li>Номер телефона: " + userData.phone + "</li>"

                dataList.innerHTML += "<li>тип: " + Travel.status + "</li>"
                dataList.innerHTML += `<button onclick="deleteData(${index})">Удалить</button>`;
                dataList.innerHTML += "<hr>";
                dataList.innerHTML += "<br><br>";
            });
    }else {
        dataList.innerHTML += "<li>Данные не найдены</li>";
    }
}

// вызов функции getData() по загрузке страницы
window.onload = function() {
    getData();
}
// функция удаления
const deleteData = (index) => {
    // подключаемся к локальному хранилищу
    let storeBook = JSON.parse(localStorage.getItem("Book"));
    let storeTravel = JSON.parse(localStorage.getItem("Travel"));
    // удалили запись
    storeBook.splice(index, 1);
    storeTravel.splice(index, 1);
    // сохранили удаление
    localStorage.setItem("Book", JSON.stringify(storeBook));
    localStorage.setItem("Travel", JSON.stringify(storeTravel));

    getData();
}