document.addEventListener("DOMContentLoaded", function () {
    const dataContainer = document.getElementById("data");
    let editIndex = -1;

    const addBtn = document.getElementById("addBtn");
    const modal = document.getElementById("myModal");
    const saveBtn = document.getElementById("saveBtn");
    const closeBtn = document.querySelector(".close");

    addBtn.addEventListener("click", function () {
        modal.style.display = "block";
    });

    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
        clearForm();
    });

    // Добавляем обработчик события на кнопку "Сохранить"
    saveBtn.addEventListener("click", function () {
        // Получаем значения полей формы
        const senderFirstName = document.getElementById("senderFirstName").value;
        const senderLastName = document.getElementById("senderLastName").value;
        const senderMiddleName = document.getElementById("senderMiddleName").value;
        const otkuda = document.getElementById("otkuda").value;
        const kuda = document.getElementById("kuda").value;
        const recipientFirstName = document.getElementById("recipientFirstName").value;
        const recipientLastName = document.getElementById("recipientLastName").value;
        const recipientMiddleName = document.getElementById("recipientMiddleName").value;
        const letterWeight = document.getElementById("letterWeight").value;
        const shippingType = document.getElementById("shippingType").value;

        // Проверяем, редактируется ли элемент
        if (editIndex !== -1) {
            // Если не редактируется, добавляем новый элемент
            editData(editIndex, {
                senderFirstName,
                senderLastName,
                senderMiddleName,
                otkuda,
                kuda,
                recipientFirstName,
                recipientLastName,
                recipientMiddleName,
                letterWeight,
                shippingType
            });
            editIndex = -1;
            
        } else {
            // Если редактируется, сохраняем измененный элемент
            addData({
                senderFirstName,
                senderLastName,
                senderMiddleName,
                otkuda,
                kuda,
                recipientFirstName,
                recipientLastName,
                recipientMiddleName,
                letterWeight,
                shippingType
            });
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
    }

    function editData(index, newData) {
        let items = JSON.parse(localStorage.getItem("data"));
        items[index] = newData;
        localStorage.setItem("data", JSON.stringify(items));
    }

    function deleteData(index) {
        let items = JSON.parse(localStorage.getItem("data"));
        items.splice(index, 1);
        localStorage.setItem("data", JSON.stringify(items));
        displayData();
    }

    function displayData() {
        let items = JSON.parse(localStorage.getItem("data"));
        if (!items) return;

        dataContainer.innerHTML = "";

        items.forEach((item, index) => {
            const div = document.createElement("div");
    
            // Создаем HTML-разметку для элемента
            div.innerHTML = `
                <p><strong>Имя отправителя:</strong> ${item.senderFirstName}</p>
                <p><strong>Фамилия отправителя:</strong> ${item.senderLastName}</p>
                <p><strong>Отчество отправителя:</strong> ${item.senderMiddleName}</p>
                <p><strong>Откуда:</strong> ${item.otkuda}</p>
                <p><strong>Куда:</strong> ${item.kuda}</p>
                <p><strong>Имя получателя:</strong> ${item.recipientFirstName}</p>
                <p><strong>Фамилия получателя:</strong> ${item.recipientLastName}</p>
                <p><strong>Отчество получателя:</strong> ${item.recipientMiddleName}</p>
                <p><strong>Вес письма (кг):</strong> ${item.letterWeight}</p>
                <p><strong>Тип доставки:</strong> ${item.shippingType}</p>
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
                const index = parseInt(this.getAttribute("data-index"));
                editIndex = index;
                const item = JSON.parse(localStorage.getItem("data"))[index];
                
    
                document.getElementById("senderFirstName").value = item.senderFirstName;
                document.getElementById("senderLastName").value = item.senderLastName;
                document.getElementById("senderMiddleName").value = item.senderMiddleName;
                document.getElementById("otkuda").value = item.otkuda;
                document.getElementById("kuda").value = item.kuda;
                document.getElementById("recipientFirstName").value = item.recipientFirstName;
                document.getElementById("recipientLastName").value = item.recipientLastName;
                document.getElementById("recipientMiddleName").value = item.recipientMiddleName;
                document.getElementById("letterWeight").value = item.letterWeight;
                document.getElementById("shippingType").value = item.shippingType;
    
                modal.style.display = "block";
            });
        });
    
        const deleteBtns = document.querySelectorAll(".delete-btn");
        deleteBtns.forEach(btn => {
            btn.addEventListener("click", function () {
                const index = parseInt(this.getAttribute("data-index"));
                deleteData(index);
            });
        });
    }
    
    // Функция для очистки формы
    function clearForm() {
        document.getElementById("senderFirstName").value = "";
        document.getElementById("senderLastName").value = "";
        document.getElementById("senderMiddleName").value = "";
        document.getElementById("otkuda").value = "";
        document.getElementById("kuda").value = "";
        document.getElementById("recipientFirstName").value = "";
        document.getElementById("recipientLastName").value = "";
        document.getElementById("recipientMiddleName").value = "";
        document.getElementById("letterWeight").value = "";
        document.getElementById("shippingType").value = "обычная";
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
        document.getElementById("senderFirstName").value = "";
        document.getElementById("senderLastName").value = "";
        document.getElementById("senderMiddleName").value = "";
        document.getElementById("otkuda").value = "";
        document.getElementById("kuda").value = "";
        document.getElementById("recipientFirstName").value = "";
        document.getElementById("recipientLastName").value = "";
        document.getElementById("recipientMiddleName").value = "";
        document.getElementById("letterWeight").value = "";
        document.getElementById("shippingType").value = "обычная";
    }
    //При загрузке страницы сразу отображаем данные из localStorage
    displayData();







     // Получаем ссылки на кнопки, модальное окно и контейнер для данных
      // Второе модальное окно
    const addBtn1 = document.getElementById("addBtn1");
    const modal1 = document.getElementById("myModal1");
    const saveBtn1 = document.getElementById("saveBtn1");
    const closeBtn1 = document.querySelector(".close1");

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

    saveBtn1.addEventListener("click", function () {
        // Получаем значения полей формы для второго модального окна
        const senderFirstName1 = document.getElementById("senderFirstName1").value;
        const senderLastName1 = document.getElementById("senderLastName1").value;
        const senderMiddleName1 = document.getElementById("senderMiddleName1").value;
        const otkuda1 = document.getElementById("otkuda1").value;
        const kuda1 = document.getElementById("kuda1").value;
        const recipientFirstName1 = document.getElementById("recipientFirstName1").value;
        const recipientLastName1 = document.getElementById("recipientLastName1").value;
        const recipientMiddleName1 = document.getElementById("recipientMiddleName1").value;
    
        if (editIndex1 !== -1) {
             addData1(editIndex1, { senderFirstName1, senderLastName1, senderMiddleName1, otkuda1, kuda1, recipientFirstName1, recipientLastName1, recipientMiddleName1 });
            editIndex1 = -1;
        } else {
            editData1({ senderFirstName1, senderLastName1, senderMiddleName1, otkuda1, kuda1, recipientFirstName1, recipientLastName1, recipientMiddleName1 });
        }
    
        modal1.style.display = "none";
        clearForm1();
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

    function displayData1() {
        let items1 = JSON.parse(localStorage.getItem("project"));
        if (!items1) return;

        dataContainer.innerHTML = "";

        items1.forEach((item1, index1) => {
            const div = document.createElement("div");
            div.innerHTML = `
                <p><strong>Имя отправителя:</strong> ${item1.senderFirstName1}</p>
                <p><strong>Фамилия отправителя:</strong> ${item1.senderLastName1}</p>
                <p><strong>Отчество отправителя:</strong> ${item1.senderMiddleName1}</p>
                <p><strong>Откуда:</strong> ${item1.otkuda1}</p>
                <p><strong>Куда:</strong> ${item1.kuda1}</p>
                <p><strong>Имя получателя:</strong> ${item1.recipientFirstName1}</p>
                <p><strong>Фамилия получателя:</strong> ${item1.recipientLastName1}</p>
                <p><strong>Отчество получателя:</strong> ${item1.recipientMiddleName1}</p>
                <button class="btn btn-secondary edit-btn1" data-index="${index1}">Редактировать</button>
                <button class="btn btn-danger delete-btn1" data-index="${index1}">Удалить</button>
            `;

            dataContainer.appendChild(div);
        });

        const editBtns1 = document.querySelectorAll(".edit-btn1");
        editBtns1.forEach(btn1 => {
            btn1.addEventListener("click", function () {
                const index1 = parseInt(this.getAttribute("data-index"));
                editIndex1 = index1;
                const item1 = JSON.parse(localStorage.getItem("project"))[index1];

                document.getElementById("senderFirstName1").value = item1.senderFirstName1;
                document.getElementById("senderLastName1").value = item1.senderLastName1;
                document.getElementById("senderMiddleName1").value = item1.senderMiddleName1;
                document.getElementById("otkuda1").value = item1.otkuda1;
                document.getElementById("kuda1").value = item1.kuda1;
                document.getElementById("recipientFirstName1").value = item1.recipientFirstName1;
                document.getElementById("recipientLastName1").value = item1.recipientLastName1;
                document.getElementById("recipientMiddleName1").value = item1.recipientMiddleName1;

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

    function clearForm1() {
        document.getElementById("senderFirstName1").value = "";
        document.getElementById("senderLastName1").value = "";
        document.getElementById("senderMiddleName1").value = "";
        document.getElementById("otkuda1").value = "";
        document.getElementById("kuda1").value = "";
        document.getElementById("recipientFirstName1").value = "";
        document.getElementById("recipientLastName1").value = "";
        document.getElementById("recipientMiddleName1").value = "";
    }
     //При загрузке страницы сразу отображаем данные из localStorage
     displayData1();







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
 
    
});