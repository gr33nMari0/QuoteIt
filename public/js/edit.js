const selectAuthor = document.querySelector("#author");
const newAuthorInputs = document.querySelectorAll(".newAuthorInput");

selectAuthor.addEventListener("change", () => {
    if (selectAuthor.value === "New Author") {
        for (let newAuthorInput of newAuthorInputs) {
            newAuthorInput.classList.remove("hidden");
        }
    } else {
        for (let newAuthorInput of newAuthorInputs) {
            newAuthorInput.classList.add("hidden");
        }
    }
})