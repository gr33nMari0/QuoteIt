function popup() {
    document.getElementById("popup").classList.toggle("popupActive");
}

const search = document.getElementById("searchIcon");
const searchForm = document.querySelector(".search");

search.addEventListener("click", () => {
    searchExpand();
})

function searchExpand() {
    searchForm.classList.toggle("searchExpand");
    search.classList.toggle("searchMoved");
}

function openNav() {
    const open = document.querySelector(".open");
    open.classList.toggle("active")
    const branding = document.querySelector("#branding");
    branding.classList.toggle("unHide")
    const searchBar = document.querySelector("#searchBar");
    searchBar.classList.toggle("unHide")
    const nav = document.querySelector("#nav");
    nav.classList.toggle("unHide")
}

// popup();