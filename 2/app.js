document.addEventListener("DOMContentLoaded", function () {
    // Получаем ссылки на кнопки, модальное окно и контейнер для данных
    const addBtn = document.getElementById("addBtn");
    const modal = document.getElementById("myModal");
    const saveBtn = document.getElementById("saveBtn");
    const closeBtn = document.querySelector(".close");
    const dataContainer = document.getElementById("data");
    // Переменная для хранения индекса элемента, который редактируется
    let editIndex = -1;
    // Добавляем обработчик события на кнопку "Добавить"
    addBtn.addEventListener("click", function () {
        // Показываем модальное окно при клике на кнопку
        modal.style.display = "block";
    });
    // Добавляем обработчик события на кнопку закрытия модального окна
    closeBtn.addEventListener("click", function () {
        // Закрываем модальное окно при клике на кнопку закрытия
        modal.style.display = "none";
        // Очищаем форму в модальном окне
        clearForm();
    });
    // Добавляем обработчик события на кнопку "Сохранить"
    saveBtn.addEventListener("click", function () {
        // Получаем значения полей формы
        const name = document.getElementById("name").value;
        const artikul = document.getElementById("artikul").value;
        const kategore = document.getElementById("kategore").value;
        const price = document.getElementById("price").value;
        const imeetsa = document.getElementById("imeetsa").value;
        const potrepano = document.getElementById("potrepano").value;
        // Проверяем, редактируется ли элемент
        if (editIndex - 1) {
            // Если не редактируется, добавляем новый элемент
            addData({ name, artikul, kategore, price, imeetsa, potrepano});
        } else {
            // Если редактируется, сохраняем измененный элемент
            editData(editIndex, { name, artikul, kategore, price, imeetsa, potrepano});
            editIndex = -1;
        }
        // Закрываем модальное окно и очищаем форму
        modal.style.display = "none";
        clearForm();
        // Обновляем отображение данных
        displayData();
    });
    // Функция для добавления элемента в localStorage
    function addData(item) {
        let items = localStorage.getItem("data");
        items = items ? JSON.parse(items) : [];
        items.push(item);
        localStorage.setItem("data", JSON.stringify(items));
    };
    // Функция для редактирования элемента в localStorage
    function editData(index, newData) {
        let items = JSON.parse(localStorage.getItem("data"));
        items[index] = newData;
        localStorage.setItem("data", JSON.stringify(items));
    }

    // Функция для удаления элемента из localStorage
    function deleteData(index) {
        let items = JSON.parse(localStorage.getItem("data"));
        items.splice(index, 1);
        localStorage.setItem("data", JSON.stringify(items));

        // Обновляем отображение данных после удаления
        displayData();
    }
    // Функция для отображения данных из localStorage
    function displayData() {
        let items = JSON.parse(localStorage.getItem("data"));
        if (!items) return;
        // Очищаем контейнер перед отображением данных
        dataContainer.innerHTML = "";
        // Проходим по каждому элементу и добавляем его в контейнер
        items.forEach((item, index) => {
            const div = document.createElement("div");
            // Создаем HTML-разметку для элемента
            div.innerHTML = `
    <p><strong>ФИО:</strong> ${item.name}</p>
    <p><strong>Номер телефона:</strong> ${item.artikul}</p>
    <p><strong>Адрес эл.почты:</strong> ${item.kategore}</p>
    <p><strong>Статус:</strong> ${item.price}</p>
    <p><strong>Статус:</strong> ${item.imeetsa}</p>
    <p><strong>Статус:</strong> ${item.potrepano}</p>
    <button class="btn btn-secondary edit-btn" data-index="${index}">Редактировать</button>
    <button class="btn btn-danger delete-btn" data-index="${index}">Удалить</button>
    `;
            // Добавляем созданный элемент в контейнер
            dataContainer.appendChild(div);
        });
        // Добавляем обработчики событий для кнопок "Редактировать" и "Удалить"
        const editBtns = document.querySelectorAll(".edit-btn");
        editBtns.forEach(btn => {
            btn.addEventListener("click", function () {
                // Получаем индекс редактируемого элемента и отображаем его в модальном окне
                const index = this.getAttribute("data-index");
                editIndex = index;
                const item = JSON.parse(localStorage.getItem("data"))[index];
                document.getElementById("name").value = item.name;
                document.getElementById("artikul").value = item.artikul;
                document.getElementById("kategore").value = item.kategore;
                document.getElementById("price").value = item.price;
                document.getElementById("imeetsa").value = item.imeetsa;
                document.getElementById("potrepano").value = item.potrepano;
                modal.style.display = "block";
            });
        });
        const deleteBtns = document.querySelectorAll(".delete-btn");
        deleteBtns.forEach(btn => {
            btn.addEventListener("click", function () {
                // Получаем индекс удаляемого элемента и удаляем его
                const index = this.getAttribute("data-index");
                deleteData(index);
            });
        });
    }
    // Функция для очистки формы
    function clearForm() {
        document.getElementById("name").value = "";
        document.getElementById("artikul").value = "";
        document.getElementById("kategore").value = "";
        document.getElementById("price").value = "";
        document.getElementById("imeetsa").value = "";
        document.getElementById("potrepano").value = "Состояние";
    }
    //При загрузке страницы сразу отображаем данные из localStorage
    displayData();
      
    // Функция для отображения выбранного раздела и скрытия остальных
    function showSection(sectionNum) {
        const sections = document.querySelectorAll('section'); // Получаем все разделы
        sections.forEach(section => {
            section.style.display = 'none'; // Скрываем все разделы
        });
        document.getElementById(`section${sectionNum}`).style.display = 'block'; // Показываем выбранный раздел
    }
     // Функция для очистки формы
     function clearForm() {
        document.getElementById("name").value = "";
        document.getElementById("artikul").value = "";
        document.getElementById("kategore").value = "";
        document.getElementById("price").value = "";
        document.getElementById("imeetsa").value = "";
        document.getElementById("potrepano").value = "Состояние";
       
    }
    //При загрузке страницы сразу отображаем данные из localStorage
    displayData();







     // Получаем ссылки на кнопки, модальное окно и контейнер для данных
     const addBtn1 = document.getElementById("addBtn1");
     const modal1 = document.getElementById("myModal1");
     const saveBtn1 = document.getElementById("saveBtn1");
     const closeBtn1 = document.querySelector(".close1");
     const kategoreSelect1 = document.getElementById("proizvod");
     // Переменная для хранения индекса элемента, который редактируется
     let editIndex1 = -1;
     // Добавляем обработчик события на кнопку "Добавить"
     addBtn1.addEventListener("click", function () {
         // Показываем модальное окно при клике на кнопку
         modal1.style.display = "block";
     });
     // Добавляем обработчик события на кнопку закрытия модального окна
     closeBtn1.addEventListener("click", function () {
         // Закрываем модальное окно при клике на кнопку закрытия
         modal1.style.display = "none";
         // Очищаем форму в модальном окне
         clearForm1();
     });
     // Добавляем обработчик события на кнопку "Сохранить"
     saveBtn1.addEventListener("click", function () {
         // Получаем значения полей формы
         const name1 = document.getElementById("name1").value;
         const phone1 = document.getElementById("phone1").value;
         const email1 = document.getElementById("Adres1").value;
         // Проверяем, редактируется ли элемент
         if (editIndex1 - 1) {
             // Если не редактируется, добавляем новый элемент
             addData1({ name1, phone1, email1  });
         } else {
             // Если редактируется, сохраняем измененный элемент
             editData1(editIndex1, { name1, phone1, email1  });
             editIndex1 = -1;
         }

         const option = document.createElement("option");
         option.value = name1;
         option.textContent = name1;
         kategoreSelect1.appendChild(option);
    
         // Закрываем модальное окно и очищаем форму
         modal1.style.display = "none";
         clearForm1();
         // Обновляем отображение данных
         displayData1();
     });
     // Функция для добавления элемента в localStorage
     function addData1(item1) {
         let items1 = localStorage.getItem("project");
         items1 = items1 ? JSON.parse(items1) : [];
         items1.push(item1);
         localStorage.setItem("project", JSON.stringify(items1));
     };
     // Функция для редактирования элемента в localStorage
     function editData1(index1, newData1) {
         let items1 = JSON.parse(localStorage.getItem("project"));
         items1[index1] = newData1;
         localStorage.setItem("project", JSON.stringify(items1));
     }
 
     // Функция для удаления элемента из localStorage
     function deleteData1(index1) {
         let items1 = JSON.parse(localStorage.getItem("project"));
         items1.splice(index1, 1);
         localStorage.setItem("project", JSON.stringify(items1));
 
         // Обновляем отображение данных после удаления
         displayData1();
     }
     // Функция для отображения данных из localStorage
     function displayData1() {
         let items1 = JSON.parse(localStorage.getItem("project"));
         if (!items1) return;
         // Очищаем контейнер перед отображением данных
         dataContainer.innerHTML = "";
     items1.forEach(item1 => {
        const option = document.createElement("option");
        option.value = item1.name1;
        option.textContent = item1.name1;
        kategoreSelect1.appendChild(option);
    });
         // Проходим по каждому элементу и добавляем его в контейнер
         items1.forEach((item1, index1) => {
             const div = document.createElement("div");
             // Создаем HTML-разметку для элемента
             div.innerHTML = `
     <p><strong>ФИО:</strong> ${item1.name1}</p>
     <p><strong>Номер телефона:</strong> ${item1.phone1}</p>
    <p><strong>Адрес эл.почты:</strong> ${item1.Adres1}</p>
     <button class="btn btn-secondary edit-btn1" data-index="${index1}">Редактировать</button>
     <button class="btn btn-danger delete-btn1" data-index="${index1}">Удалить</button>
     `;
             // Добавляем созданный элемент в контейнер
             dataContainer.appendChild(div);
         });
         // Добавляем обработчики событий для кнопок "Редактировать" и "Удалить"
         const editBtns1 = document.querySelectorAll(".edit-btn1");
         editBtns1.forEach(btn1 => {
             btn1.addEventListener("click", function () {
                 // Получаем индекс редактируемого элемента и отображаем его в модальном окне
                 const index1 = this.getAttribute("data-index1");
                 editIndex1 = index1;
                 const item1 = JSON.parse(localStorage.getItem("data"))[index1];
                document.getElementById("name1").value = item1.name1;
                document.getElementById("phone1").value = item1.phone1;
                document.getElementById("Adres1").value = item1.Adres1;
                modal1.style.display = "block";
             });
         });
         const deleteBtns1 = document.querySelectorAll(".delete-btn1");
         deleteBtns1.forEach(btn1 => {
             btn1.addEventListener("click", function () {
                 // Получаем индекс удаляемого элемента и удаляем его
                 const index1 = this.getAttribute("data-index1");
                 deleteData1(index1);
             });
         });
     }
     // Функция для очистки формы
     function clearForm1() {
        document.getElementById("name1").value = "";
        document.getElementById("phone1").value = "";
        document.getElementById("Adres1").value = "";
        
     }
     //При загрузке страницы сразу отображаем данные из localStorage
     displayData1();






 // Получаем ссылки на кнопки, модальное окно и контейнер для данных
 const addBtn2 = document.getElementById("addBtn2");
 const modal2 = document.getElementById("myModal2");
 const saveBtn2 = document.getElementById("saveBtn2");
 const closeBtn2 = document.querySelector(".close2");
 const kategoreSelect = document.getElementById("kategore");

 // Переменная для хранения индекса элемента, который редактируется
 let editIndex2 = -1;

 
 // Добавляем обработчик события на кнопку "Добавить"
 addBtn2.addEventListener("click", function () {
     // Показываем модальное окно при клике на кнопку
     modal2.style.display = "block";
 });
 // Добавляем обработчик события на кнопку закрытия модального окна
 closeBtn2.addEventListener("click", function () {
     // Закрываем модальное окно при клике на кнопку закрытия
     modal2.style.display = "none";
     // Очищаем форму в модальном окне
     clearForm2();
 });
 // Добавляем обработчик события на кнопку "Сохранить"
 saveBtn2.addEventListener("click", function () {
     // Получаем значения полей формы
     const name2 = document.getElementById("name2").value;
     const status2 = document.getElementById("status2").value;
     // Добавляем категорию в localStorage
     addData2({ name2, status2 });
        
     // Добавляем категорию в селект "Категория товара"
     const option = document.createElement("option");
     option.value = name2;
     option.textContent = name2;
     kategoreSelect.appendChild(option);

     modal2.style.display = "none";
     clearForm2();
     displayData2();
 });
 // Функция для добавления элемента в localStorage
 function addData2(item2) {
     let items2 = localStorage.getItem("kategor");
     items2 = items2 ? JSON.parse(items2) : [];
     items2.push(item2);
     localStorage.setItem("kategor", JSON.stringify(items2));
 };
 // Функция для редактирования элемента в localStorage
 function editData2(index2, newData2) {
     let items2 = JSON.parse(localStorage.getItem("kategor"));
     items2[index2] = newData2;
     localStorage.setItem("kategor", JSON.stringify(items2));
 }

 // Функция для удаления элемента из localStorage
 function deleteData2(index2) {
     let items2 = JSON.parse(localStorage.getItem("kategor"));
     items2.splice(index2, 1);
     localStorage.setItem("kategor", JSON.stringify(items2));

     // Обновляем отображение данных после удаления
     displayData2();
 }
 // Функция для отображения данных из localStorage
 function displayData2() {
     let items2 = JSON.parse(localStorage.getItem("kategor"));
     if (!items2) return;
     // Очищаем контейнер перед отображением данных
     dataContainer.innerHTML = "";
     items2.forEach(item2 => {
        const option = document.createElement("option");
        option.value = item2.name2;
        option.textContent = item2.name2;
        kategoreSelect.appendChild(option);
    });
     // Проходим по каждому элементу и добавляем его в контейнер
     items2.forEach((item2, index2) => {
         const div = document.createElement("div");
         // Создаем HTML-разметку для элемента
         div.innerHTML = `
 <p><strong>ФИО:</strong> ${item2.name2}</p>
<p><strong>Статус:</strong> ${item2.status2}</p>
 <button class="btn btn-secondary edit-btn2" data-index="${index2}">Редактировать</button>
 <button class="btn btn-danger delete-btn2" data-index="${index2}">Удалить</button>
 `;
         // Добавляем созданный элемент в контейнер
         dataContainer.appendChild(div);
     });
     // Добавляем обработчики событий для кнопок "Редактировать" и "Удалить"
     const editBtns2 = document.querySelectorAll(".edit-btn2");
     editBtns2.forEach(btn2 => {
         btn2.addEventListener("click", function () {
             // Получаем индекс редактируемого элемента и отображаем его в модальном окне
             const index2 = this.getAttribute("data-index2");
             editIndex2 = index2;
             const item2 = JSON.parse(localStorage.getItem("data"))[index2];
            document.getElementById("name2").value = item2.name2;
            document.getElementById("status2").value = item2.status2;
            modal2.style.display = "block";
         });
     });
     const deleteBtns2 = document.querySelectorAll(".delete-btn2");
     deleteBtns2.forEach(btn2 => {
         btn2.addEventListener("click", function () {
             // Получаем индекс удаляемого элемента и удаляем его
             const index2 = this.getAttribute("data-index2");
             deleteData2(index2);
         });
     });
 }
 // Функция для очистки формы
 function clearForm2() {
    document.getElementById("name2").value = "";
    document.getElementById("status2").value = "активна";
    
 }
 //При загрузке страницы сразу отображаем данные из localStorage
 displayData2();







     const productBtn = document.getElementById("addBtn");
     const manufacturerBtn = document.getElementById("addBtn1");
     const categoriesBtn = document.getElementById("addBtn2");
 
     productBtn.addEventListener("click", function () {
         currentDataType = "data";
         displayData();
     });
 
     manufacturerBtn.addEventListener("click", function () {
         currentDataType = "project";
         displayData1();
     });
 
     categoriesBtn.addEventListener("click", function () {
        currentDataType = "kategor";
         displayData2();
         //alert("This functionality is under development. Stay tuned!");
     });
 
     
     // Функция для добавления элемента в localStorage
    // Функция для добавления элемента в localStorage
function addData3(item3) {
    let items3 = localStorage.getItem("katego");
    items3 = items3 ? JSON.parse(items3) : [];
    items3.push(item3);
    localStorage.setItem("katego", JSON.stringify(items3));

    let inputValue = document.getElementById('name2').value;
    localStorage.setItem('katego', inputValue);

    let option = document.createElement("option");
    option.value = inputValue; // Присваиваем значение ввода значению опции
    option.textContent = inputValue; // Присваиваем значение ввода как текст опции
    let selectkat = document.getElementById("kategore"); // Выбираем элемент select по его ID
    selectkat.appendChild(option); // Добавляем созданную опцию к элементу select
};


});
