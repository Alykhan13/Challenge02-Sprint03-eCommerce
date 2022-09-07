import { productServices } from "./products.js";
import { addItem } from "./addItem.js";

const addItemScreenBtn = document.querySelector(".add-item-btn");
const addItemScreen = document.querySelector(".add-item");

function closeAddItemScreen() {
    addItemScreen.classList.remove("add-item--active");
}

function openAddItemScreen(name, imgUrl, price, sections, description, tags, id) {
    const acceptBtn = document.querySelector(".btn__add");

    const inputName = document.querySelector(".add-item__name");
    const inputPrice = document.querySelector(".add-item__price");
    const inputImgUrl = document.querySelector(".add-item__image-url");
    const inputSections = document.querySelector(".add-item__sections");
    const inputTags = document.querySelector(".add-item__tags");
    const inputDescription = document.querySelector(".add-item__description");

    inputName.value = name;
    inputImgUrl.value = imgUrl;
    inputPrice.value = price;
    inputDescription.value = description;
    
    let sectionString = "";

    for(let i=0; i<sections.length; i++) {
        sectionString += sections[i];
        if(i<sections.length-1) sectionString += ",";
    }

    inputSections.value = sectionString;

    let tagString = "";

    for(let i=0; i<tags.length; i++) {
        tagString += tags[i];
        if(i<tags.length-1) tagString += ",";
    }

    inputTags.value = tagString;

    const closeAddItemScreenBtn = document.querySelector(".btn__add-cancel");

    addItemScreen.classList.add("add-item--active");

    closeAddItemScreenBtn.addEventListener("click",closeAddItemScreen);

    acceptBtn.addEventListener("click", ()=> {
        addItem(id);
    });
}

function deleteItem() {
    const deleteItemBtns = document.querySelectorAll(".img__icons__delete");

    for(let i=0; i<deleteItemBtns.length; i++) {
        deleteItemBtns[i].onclick = () => {
            const item = document.querySelectorAll(".item");
            const itemName = item[i].querySelector(".item__name").textContent;

            const itemID = item[i].querySelector(".item__id").textContent;

            if(confirm(`En verdad quieres eliminar el objeto "${itemName}"?`)) {
                console.log("Delete: " + itemID);
                productServices.deleteProduct(itemID);

                productServices.productsList().then((data)=>{
                    loadProductsAdmin(data);
                });
            }
        }
    }
}

function modifyItem() {
    const modifyItemBtns = document.querySelectorAll(".img__icons__modify");

    for(let i=0; i<modifyItemBtns.length; i++) {
        modifyItemBtns[i].onclick = () => {
            const item = document.querySelectorAll(".item");

            const itemID = item[i].querySelector(".item__id").textContent;

            console.log("Modify: " + itemID);
            productServices.productsList(`http://localhost:3000/productos/${itemID}`).then((data)=>{
                console.log(data);
                openAddItemScreen(data.name,data.imageUrl,data.price,data.section,data.description,data.tags,data.id);
            });
        }
    }
}

function loadProductsAdmin(data) {
    for(let i=0; i<data.length; i++) {
        const ulElement = document.querySelector(".section__list");

        const liElement = document.createElement("li");
        liElement.classList.add("item");
        ulElement.appendChild(liElement);

        const imgIconsContainer = document.createElement("span");
        imgIconsContainer.classList.add("img__icons");
        liElement.appendChild(imgIconsContainer);

        const iconDelete = document.createElement("i");
        iconDelete.classList.add("img__icons__delete","fa-solid","fa-trash");
        imgIconsContainer.appendChild(iconDelete);

        const iconModify = document.createElement("i");
        iconModify.classList.add("img__icons__modify","fa-solid","fa-pencil");
        imgIconsContainer.appendChild(iconModify);

        const imgElement = document.createElement("img");
        imgElement.setAttribute("src", data[i].imageUrl);
        liElement.appendChild(imgElement);

        const divElement = document.createElement("div");
        divElement.classList.add("item__description");
        liElement.appendChild(divElement);

        const pElement = document.createElement("p");
        pElement.classList.add("item__name");
        pElement.textContent = data[i].name;
        divElement.appendChild(pElement);
        
        const h4Element = document.createElement("h4");
        h4Element.classList.add("item__price");
        h4Element.textContent = "$"+parseFloat(data[i].price).toFixed(2)+"mxn";
        divElement.appendChild(h4Element);

        const idElement = document.createElement("p");
        idElement.classList.add("id__text");
        divElement.appendChild(idElement);
        idElement.textContent = "id: ";
        const idSpanElement = document.createElement("span");
        idSpanElement.classList.add("item__id");
        idSpanElement.textContent = data[i].id;
        idElement.appendChild(idSpanElement);
    }

    deleteItem();
    modifyItem();
}

addItemScreenBtn.addEventListener("click",()=>{
    openAddItemScreen("","","","","","","");
});

productServices.productsList().then((data)=>{
    loadProductsAdmin(data);
});

/*
const selectBtn = document.getElementById("select__category");

function openList() {
    selectBtn.querySelector(".select__default").onclick = function() {
        selectBtn.querySelector(".options__container").classList.toggle("options__container--active");
        selectBtn.classList.toggle("select__default--active");
    };
}

addEventListener("load",openList);

selectBtn.addEventListener("click", openList);
*/