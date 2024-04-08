function openModal(modalId) {
    document.querySelector(`#${modalId}`).style.display = "block";
}

function closeModal(modalId) {
    document.querySelector(`#${modalId}`).style.display = "none";
}

function showAlert(message) {
    alert(message);
}

function addCategory() {
    const categoryName = document.querySelector('#categoryName').value;
    let categories = JSON.parse(localStorage.getItem('categories')) || [];
    categories.push(categoryName);
    localStorage.setItem('categories', JSON.stringify(categories));
    displayCategories();
    document.querySelector('#categoryName').value = '';
    showAlert('Category added successfully!');
    updateCategoryOptions();
}

function addManufacturer() {
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
    showAlert('Manufacturer added successfully!');
    updateManufacturerOptions();
}

function addItem() {
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
    showAlert('Item added successfully!');
}

function displayCategories() {
    const categories = JSON.parse(localStorage.getItem('categories')) || [];
    const categoryList = document.querySelector('#categoryList');
    categoryList.innerHTML = '';
    categories.forEach(category => {
        const li = document.createElement('li');
        li.textContent = category;
        categoryList.appendChild(li);
    });
    updateCategoryOptions();
}

function displayManufacturers() {
    const manufacturers = JSON.parse(localStorage.getItem('manufacturers')) || [];
    const manufacturerList = document.querySelector('#manufacturerList');
    manufacturerList.innerHTML = '';
    manufacturers.forEach(manufacturer => {
        const li = document.createElement('li');
        li.textContent = manufacturer.name;
        manufacturerList.appendChild(li);
    });
    updateManufacturerOptions();
}

function displayItems() {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    const itemList = document.querySelector('#itemList');
    itemList.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name}, ${item.code}, ${item.category}, ${item.manufacturer}, ${item.price}, ${item.availability}, ${item.condition}`;
        itemList.appendChild(li);
    });
}

function updateCategoryOptions() {
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

function updateManufacturerOptions() {
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

displayCategories();
displayManufacturers();
displayItems();