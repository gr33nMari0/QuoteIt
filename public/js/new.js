const quotePreview = document.querySelector('#quotePreview');
const lookLike = document.querySelector('#lookLike')

// Inputs
const quoteTextInput = document.querySelector('#quote');

// this is used because #author is used for the select tag
const quoteAuthorInput = document.querySelector('#author');



quoteTextInput.addEventListener('input', () => {
    quotePreview.innerText = `${quoteTextInput.value} - ${quoteAuthorInput.value}`;



    if (quoteTextInput.value !== "") {
        lookLike.style.display = "block";
    } else {
        lookLike.style.display = "none";
    }
})