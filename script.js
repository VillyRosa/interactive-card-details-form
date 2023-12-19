const cardholderInput = document.querySelector('#cardholder');
const cardnumberInput = document.querySelector('#cardnumber');
const monthInput = document.querySelector('#expdate-month');
const yearInput = document.querySelector('#expdate-year');
const cvcInput = document.querySelector('#cvc');

cardholderInput.addEventListener('input', () => {
    document.querySelector('#cardFrontName').innerHTML = cardholderInput.value;
});

cardnumberInput.addEventListener('input', () => {
    cardnumberMask(cardnumberInput);
    document.querySelector('#cardFrontNumber').innerHTML = cardnumberInput.value;
    const isValid = /^[0-9\s]+$/.test(cardnumberInput.value);
    const errorSpan = document.querySelector('#cardnumberError');
    
    if (cardnumberInput.value.length === 0) return setErrorShow(cardnumberInput, errorSpan, "Can't be blank")
    if (!isValid) return setErrorShow(cardnumberInput, errorSpan, 'Wrong format, numbers only');
    hiddenElement(cardnumberInput, errorSpan);
});

monthInput.addEventListener('input', () => {
    monthMask(monthInput);
    document.querySelector('#cardFrontMonth').innerHTML = monthInput.value;
    const errorSpan = document.querySelector('#dateError');

    if (monthInput.value.length === 0) return setErrorShow(monthInput, errorSpan, "Can't be blank");
    if (monthInput.value == 0 || monthInput.value > 12) return setErrorShow(monthInput, errorSpan, "Invalid month");
    hiddenElement(monthInput, errorSpan);
});

yearInput.addEventListener('input', () => {
    yearMask(yearInput);
    document.querySelector('#cardFrontYear').innerHTML = yearInput.value;
    const date = new Date();
    const errorSpan = document.querySelector('#dateError');
    let year = yearInput.value;
    if (year > 9 && year < 999) year = Number('20'+year);

    if (yearInput.value.length === 0) return setErrorShow(yearInput, errorSpan, "Can't be blank");
    if (year > 9 && year < date.getFullYear()) return setErrorShow(yearInput, errorSpan, "Date expired");
    hiddenElement(yearInput, errorSpan);
});

cvcInput.addEventListener('input', () => {
    cvcMask(cvcInput);
    document.querySelector('#cardBackCvc').innerHTML = cvcInput.value;
    const errorSpan = document.querySelector('#cvcError');

    if (cvcInput.value.length === 0) return setErrorShow(cvcInput, errorSpan, "Can't be blank");
    hiddenElement(cvcInput, errorSpan);
});

function setErrorShow(input, span, text) {
    span.innerHTML = text;
    span.classList.remove('hidden');
    input.classList.add('inputError');
}

function hiddenElement(input, span) {
    span.classList.add('hidden');
    input.classList.remove('inputError');
}

function cardnumberMask(input) {
    const cleanValue = input.value.replace(/\s/g, '');
    const limitedValue = cleanValue.slice(0, 16);
    const maskedValue = limitedValue.replace(/(\d{4})/g, '$1 ');

    input.value = maskedValue.trim();
}

function monthMask(input) {
    const limitedValue = input.value.slice(0, 2);
    const maskedValue = limitedValue.replace(/(\d{4})/g, '$1 ');
    
    input.value = maskedValue.trim();
}

function yearMask(input) {
    const limitedValue = input.value.slice(0, 4);
    const maskedValue = limitedValue.replace(/(\d{4})/g, '$1 ');
    
    input.value = maskedValue.trim();
}

function cvcMask(input) {
    const limitedValue = input.value.slice(0, 3);
    const maskedValue = limitedValue.replace(/(\d{4})/g, '$1 ');
    
    input.value = maskedValue.trim();
}

function submitForm(event) {
    event.preventDefault();

    let haveErrors = false;
    const errors = ['cardholderError', 'cardnumberError', 'dateError', 'cvcError'];
    const inputs = [cardholderInput, cardnumberInput, monthInput, yearInput, cvcInput];
    
    errors.forEach(err => {
        if (!document.querySelector('#'+err).classList.contains('hidden')) haveErrors = true;
    });
    inputs.forEach(input => {
        if (input.value.trim() === '') haveErrors = true;
    });
    if (haveErrors) return alert('Fill out the form correctly!');

    document.querySelector('form').classList.add('hidden');
    document.querySelector('.completed').classList.remove('hidden');
}