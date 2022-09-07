import { productServices } from "./products.js";

export function addItem(id) {
    const inputName = document.querySelector(".add-item__name");
    const inputPrice = document.querySelector(".add-item__price");
    const inputImgUrl = document.querySelector(".add-item__image-url");
    const inputSections = document.querySelector(".add-item__sections");
    const inputTags = document.querySelector(".add-item__tags");
    const inputDescription = document.querySelector(".add-item__description");

    const makingArraySections = (inputSections) => {
        const sections = inputSections.split(",");

        const newSections = [];

        for(let i=0; i<sections.length; i++) {
            let ind = 0;
            let aux = "";
            for(let j=0;j<sections[i].length;j++) {
                if(sections[i].charAt(j)!=" ") {
                    ind = j;
                    break;
                }
            }
            aux = sections[i].slice(ind,sections[i].length);
            aux = aux.charAt(0).toUpperCase()+aux.slice(1,aux.length);
            newSections.push(aux);
        }

        return newSections;
    }

    const makingArrayTags = (inputTags) => {
        const tags = inputTags.split(",");
        const newTags = [];

        for(let i=0; i<tags.length; i++) {
            let ind = 0;
            let aux = "";
            for(let j=0;j<tags[i].length;j++) {
                if(tags[i].charAt(j)!=" ") {
                    ind = j;
                    break;
                }
            }
            aux = tags[i].slice(ind,tags[i].length).toLowerCase();
            newTags.push(aux);
        }

        return newTags;
    }

    if(id == "") {
        productServices.createProduct(
            inputName.value,
            inputImgUrl.value,
            inputPrice.value,
            makingArraySections(inputSections.value),
            inputDescription.value,
            makingArrayTags(inputTags.value),
            id = uuid.v4()
        ).then(resp => {
            console.log(resp);
        }).catch(err => console.log(err));
    } else {
        productServices.updateProduct(
            inputName.value,
            inputImgUrl.value,
            inputPrice.value,
            makingArraySections(inputSections.value),
            inputDescription.value,
            makingArrayTags(inputTags.value),
            id
        ).then(resp => {
            console.log(resp);
        }).catch(err => console.log(err));
    }
}