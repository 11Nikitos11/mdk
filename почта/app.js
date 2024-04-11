function showParcelWeightInput(type) {
    const parcelWeightInput = document.getElementById('parcelWeightInput');
    if (type === 'parcel') {
        parcelWeightInput.style.display = 'block';
    } else {
        parcelWeightInput.style.display = 'none';
    }
}

function calculateShipping() {
    const senderFirstName = document.getElementById('senderFirstName').value;
    const senderLastName = document.getElementById('senderLastName').value;
    const senderMiddleName = document.getElementById('senderMiddleName').value;
    const otkuda = document.getElementById('otkuda').value;
    const kuda = document.getElementById('kuda').value;

    const recipientFirstName = document.getElementById('recipientFirstName').value;
    const recipientLastName = document.getElementById('recipientLastName').value;
    const recipientMiddleName = document.getElementById('recipientMiddleName').value;

    const parcelWeightInput = document.getElementById('parcelWeight');
    const weight = parcelWeightInput ? parseFloat(parcelWeightInput.value) : 0;

    const parcelPriceInput = document.getElementById('parcelPrice');
    const price = parcelPriceInput ? parseFloat(parcelPriceInput.value) : 0;

    let shippingCost = 0;
    const shippingType = document.getElementById('shippingType').value;

    if (shippingType === "обычная") {
        if (weight < 5) {
            shippingCost = 0;
        } else {
            shippingCost = weight * 10;
        }
    } else if (shippingType === "ускоренная") {
        shippingCost = weight * 10 + 20;
        if (weight > 20) {
            shippingCost = weight * 30 + 20;
        } else if (weight > 100) {
            // Add your logic here
        }
    } else if (shippingType === "курьером") {
        shippingCost = weight * 20 + 20;
        if (weight > 10) {
            shippingCost = weight * 30 + 30;
        }
    }

    const totalCost = shippingCost + price;

    const shippingData = {
        senderFirstName,
        senderLastName,
        senderMiddleName,
        otkuda,
        kuda,
        recipientFirstName,
        recipientLastName,
        recipientMiddleName,
        parcelWeight: `${weight} кг`,
        parcelPrice: `${price} руб.`,
        shippingType,
        weight,
        price,
        shippingCost
    };

    localStorage.setItem('shippingData', JSON.stringify(shippingData));

    const results = `
        <p><strong>Имя отправителя:</strong> ${senderFirstName} ${senderLastName} ${senderMiddleName}</p>
        <p><strong>Имя получателя:</strong> ${recipientFirstName} ${recipientLastName} ${recipientMiddleName}</p>
        <p><strong>Откуда:</strong> ${otkuda}</p>
        <p><strong>Куда:</strong> ${kuda}</p>
        <p><strong>Вес посылки:</strong> ${weight} кг</p>
        <p><strong>Тип доставки:</strong> ${shippingType}</p>
        <p><strong>Стоимость доставки:</strong> ${shippingCost} руб.</p>
        <p><strong>Общая стоимость:</strong> ${totalCost} руб.</p>
    `;

    document.getElementById('results').innerHTML = results;
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}