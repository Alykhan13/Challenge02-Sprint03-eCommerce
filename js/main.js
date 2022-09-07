import { productServices } from "./products.js";
import { loadSections } from "./products.js";
import { createBtn } from "./createBtn.js";

const headerBtn = document.getElementById("header__btn");

let isViewSection = false;

function viewSection(tagFilter) {
    const sectionsLinks = document.querySelectorAll(".section__view-all");
    isViewSection = true;

    for(let i=0; i<sectionsLinks.length; i++) {
        sectionsLinks[i].onclick = (e)=> {
            const sectionTops = document.querySelectorAll(".section__top");
            const sectionChosen = sectionTops[i].querySelector(".section__name").textContent;
            
            
            productServices.productsList().then((data) => {
                loadSections(data, tagFilter, sectionChosen, isViewSection);
            }).then(() => {
                createBtn("[data-type-main]", "Menú principal", "btnBack");
                
                const btnBackMenu = document.querySelector(".btnBack");
        
                btnBackMenu.addEventListener("click", ()=>{
                    redirectPage("index.html");
                });
            });
        }
    }
}

function redirectPage(dest) {
    location.href = dest;
}

headerBtn.addEventListener("click", ()=> {
    const header = document.querySelector(".header");

    header.classList.add('hidden');

    productServices.productsList().then((data) => {
        loadSections(data, "descuento", "", isViewSection);
    }).then(() => {
        viewSection("descuento");

        createBtn("[data-type-main]", "Menú principal", "btnBack");
        
        const btnBackMenu = document.querySelector(".btnBack");

        btnBackMenu.addEventListener("click", ()=>{
            redirectPage("index.html");
        });
    });
});


productServices.productsList().then((data) => {
    loadSections(data, "", "", isViewSection);
}).then(() => {
    viewSection("");
});