function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

function showAlert(message) {
    alert(message);
}

const addCategory = () => {
    const categoryName = document.querySelector('#categoryName').value;
    let categories = JSON.parse(localStorage.getItem('categories')) || [];
    categories.push(categoryName);
    localStorage.setItem('categories', JSON.stringify(categories));
    displayCategories();
    document.querySelector('#categoryName').value = '';
    showAlert('Категория успешно добавлена!');
    updateCategoryOptions();
}

const addManufacturer = () => {
    const manufacturerName = document.querySelector('#manufacturerName').value;
    const manufacturerAddress = document.querySelector('#manufacturerAddress').value;
    const manufacturerPhone = document.querySelector('#manufacturerPhone').value;
    const manufacturer = {
        name: manufacturerName,
        address: manufacturerAddress,
        phone: manufacturerPhone
    };
    let manufacturers = JSON.parse(localStorage.getItem('manufacturers')) || [];
    manufacturers.push(manufacturer);
    localStorage.setItem('manufacturers', JSON.stringify(manufacturers));
    displayManufacturers();
    document.querySelector('#manufacturerName').value = '';
    document.querySelector('#manufacturerAddress').value = '';
    document.querySelector('#manufacturerPhone').value = '';
    showAlert('Производитель успешно добавлен!');
    updateManufacturerOptions();
}

const addItem = () => {
    const itemName = document.querySelector('#itemName').value;
    const itemCode = document.querySelector('#itemCode').value;
    const itemCategory = document.querySelector('#itemCategory').value;
    const itemManufacturer = document.querySelector('#itemManufacturer').value;
    const itemPrice = document.querySelector('#itemPrice').value;
    const itemAvailability = document.querySelector('#itemAvailability').value;
    const itemCondition = document.querySelector('#itemCondition').value;
    const item = {
        name: itemName,
        code: itemCode,
        category: itemCategory,
        manufacturer: itemManufacturer,
        price: itemPrice,
        availability: itemAvailability,
        condition: itemCondition
    };
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
    displayItems();
    document.querySelector('#itemName').value = '';
    document.querySelector('#itemCode').value = '';
    document.querySelector('#itemPrice').value = '';
    showAlert('Товар успешно добавлен!');
}

const displayCategories = () => {
    const categories = JSON.parse(localStorage.getItem('categories')) || [];
    const categoryList = document.querySelector('#categoryList');
    categoryList.innerHTML = '';
    categories.forEach((category, index) => {
        const li = document.createElement('li');
        li.textContent = category;

        const deleteButton = document.createElement('span');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'удалить';
        deleteButton.addEventListener('click', () => deleteCategory(index));
        li.appendChild(deleteButton);

        categoryList.appendChild(li);
    });
    updateCategoryOptions();
}

const displayManufacturers = () => {
    const manufacturers = JSON.parse(localStorage.getItem('manufacturers')) || [];
    const manufacturerList = document.querySelector('#manufacturerList');
    manufacturerList.innerHTML = '';
    manufacturers.forEach((manufacturer, index) => {
        const li = document.createElement('li');
        li.textContent = manufacturer.name;

        const deleteButton = document.createElement('span');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'удалить';
        deleteButton.addEventListener('click', () => deleteManufacturer(index));
        li.appendChild(deleteButton);

        const editButton = document.createElement('button');
        editButton.className = 'edit-button';
        editButton.textContent = 'редактировать';
        editButton.addEventListener('click', () => openEditModal('editManufacturerModal', index));

        li.appendChild(editButton);
        manufacturerList.appendChild(li);
    });
    updateManufacturerOptions();
}

const displayItems = () => {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    const itemList = document.querySelector('#itemList');
    itemList.innerHTML = '';
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name}, ${item.code}, ${item.category}, ${item.manufacturer}, ${item.price}, ${item.availability}, ${item.condition}`;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'удалить';
        deleteButton.addEventListener('click', () => deleteItem(index));
        li.appendChild(deleteButton);

        const editButton = document.createElement('button');
        editButton.className = 'edit-button';
        editButton.textContent = 'редактировать';
        editButton.addEventListener('click', () => openEditModal(index));

        li.appendChild(editButton);
        itemList.appendChild(li);
    });
}

const updateCategoryOptions = () => {
    const categories = JSON.parse(localStorage.getItem('categories')) || [];
    const categorySelect = document.querySelector('#itemCategory');
    categorySelect.innerHTML = '';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.textContent = category;
        option.value = category;
        categorySelect.appendChild(option);
    });
}

const updateManufacturerOptions = () => {
    const manufacturers = JSON.parse(localStorage.getItem('manufacturers')) || [];
    const manufacturerSelect = document.querySelector('#itemManufacturer');
    manufacturerSelect.innerHTML = '';
    manufacturers.forEach(manufacturer => {
        const option = document.createElement('option');
        option.textContent = manufacturer.name;
        option.value = manufacturer.name;
        manufacturerSelect.appendChild(option);
    });
}

function deleteCategory(index) {
    let categories = JSON.parse(localStorage.getItem('categories')) || [];
    categories.splice(index, 1);
    localStorage.setItem('categories', JSON.stringify(categories));
    displayCategories();
    updateCategoryOptions();
    showAlert('Категория удалена успешно!');
}

function deleteManufacturer(index) {
    let manufacturers = JSON.parse(localStorage.getItem('manufacturers')) || [];
    manufacturers.splice(index, 1);
    localStorage.setItem('manufacturers', JSON.stringify(manufacturers));
    displayManufacturers();
    updateManufacturerOptions();
    showAlert('Производитель удален успешно!');
}

function deleteItem(index) {
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(items));
    displayItems();
    showAlert('Товар удален успешно!');
}

function openEditModal(index) {
    const manufacturers = JSON.parse(localStorage.getItem('manufacturers'));
    const selectedManufacturer = manufacturers[index];

    const editManufacturerNameInput = document.getElementById('editManufacturerName');
    editManufacturerNameInput.value = selectedManufacturer.name;

    const editManufacturerAddressInput = document.getElementById('editManufacturerAddress');
    editManufacturerAddressInput.value = selectedManufacturer.address;

    const editManufacturerPhoneInput = document.getElementById('editManufacturerPhone');
    editManufacturerPhoneInput.value = selectedManufacturer.phone;

    openModal('editManufacturerModal');
}

// Функция для обновления данных производителя
function updateManufacturer() {
    const index = editIndex; // Получаем индекс производителя для редактирования
    const editedName = document.getElementById('editManufacturerName').value;
    const editedAddress = document.getElementById('editManufacturerAddress').value;
    const editedPhone = document.getElementById('editManufacturerPhone').value;

    let manufacturers = JSON.parse(localStorage.getItem('manufacturers'));
    manufacturers[index].name = editedName;
    manufacturers[index].address = editedAddress;
    manufacturers[index].phone = editedPhone;

    localStorage.setItem('manufacturers', JSON.stringify(manufacturers));
    displayManufacturers(); // Обновляем список производителей
    closeModal('editManufacturerModal'); // Закрываем модальное окно
    showAlert('Информация о производителе успешно обновлена!'); // Показываем уведомление
}


function updateItem(index) {
    const items = JSON.parse(localStorage.getItem('items'));
    const updatedItem = {
        name: document.querySelector('#itemName').value,
        code: document.querySelector('#itemCode').value,
        category: document.querySelector('#itemCategory').value,
        manufacturer: document.querySelector('#itemManufacturer').value,
        price: document.querySelector('#itemPrice').value,
        availability: document.querySelector('#itemAvailability').value,
        condition: document.querySelector('#itemCondition').value
    };

    items[index] = updatedItem;

    localStorage.setItem('items', JSON.stringify(items));
    displayItems();
    closeModal('editItemModal');
    showAlert('Товар успешно отредактирован!');
}

displayCategories();
displayManufacturers();
displayItems();