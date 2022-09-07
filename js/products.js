const productsList = (product) => fetch(product || "http://localhost:3000/productos").then(response => response.json());
const createProduct = (name, imageUrl, price, section, description, tags, id) => fetch("http://localhost:3000/productos", {
    method: "POST",
    headers: {
        "content-type": "application/json"
    },
    body: JSON.stringify({
        name,
        imageUrl,
        price,
        section,
        description,
        tags,
        id})
});
const deleteProduct = (id) => fetch(`http://localhost:3000/productos/${id}`, {
    method: "DELETE"
});
const updateProduct = (name, imageUrl, price, section, description, tags, id) => fetch(`http://localhost:3000/productos/${id}`, {
    method: "PUT",
    headers: {
        "content-type": "application/json"
    },
    body: JSON.stringify({
        name,
        imageUrl,
        price,
        section,
        description,
        tags,
        id})
});

export const productServices = {
    productsList,
    createProduct,
    deleteProduct,
    updateProduct
}

function loadProducts(data, section, ulElement,tagsFilter) {
    for(let i=0; i<data.length; i++) {

        if( (data[i].section.includes(section) && data[i].tags.includes(tagsFilter)) ||
            (data[i].section.includes(section) && tagsFilter == "")) {
            const liElement = document.createElement("li");
            liElement.classList.add("item");
            ulElement.appendChild(liElement);

            const imgElement = document.createElement("img");
            imgElement.setAttribute("src", data[i].imageUrl);
            console.log(data[i].imageUrl);
            liElement.appendChild(imgElement);

            const divElement = document.createElement("div");
            divElement.classList.add("item__description");
            liElement.appendChild(divElement);

            const pElement = document.createElement("p");
            pElement.classList.add("item__name");
            pElement.textContent = data[i].name;
            divElement.appendChild(pElement);
            
            const idSpanElement = document.createElement("span");
            idSpanElement.classList.add("front__item__id");
            idSpanElement.textContent = data[i].id;
            pElement.appendChild(idSpanElement);

            const h4Element = document.createElement("h4");
            h4Element.classList.add("item__price");
            if(data[i].tags.includes("descuento")) h4Element.classList.add("discount");
            h4Element.textContent = "$"+parseFloat(data[i].price).toFixed(2)+"mxn";
            divElement.appendChild(h4Element);

            const aElement = document.createElement("a");
            aElement.classList.add("item__view");
            aElement.textContent = "Ver producto";
            divElement.appendChild(aElement);

            const spanTagsElement = document.createElement("span");
            spanTagsElement.classList.add("item__tags");
            for(let j=0; j<data[i].tags.length; j++) {
                if(j==data[i].tags.length-1) spanTagsElement.textContent += data[i].tags[j];
                else spanTagsElement.textContent += data[i].tags[j]+"+";
            }
            divElement.appendChild(spanTagsElement);
        }
    }
}

export function loadSections(data, tagsFilter, sectionFilter, isViewSection) {
    const mainSection = document.querySelector("[data-type-main]");
    mainSection.innerHTML = "";

    const sections = [];

    for(let i=0; i<data.length; i++) {        
        for(let j=0; j<data[i].section.length; j++) {
            if(!sections.includes(data[i].section[j])) {
                if(data[i].section[j] == sectionFilter || sectionFilter == "") {
                    if(tagsFilter.length>0) {
                        if(data[i].tags.includes(tagsFilter)) {
                            sections.push(data[i].section[j]);
                        }
                    } else if(sectionFilter.length>0) {
                        if(data[i].section[j]==sectionFilter) {
                            sections.push(data[i].section[j]);
                        }
                    } else sections.push(data[i].section[j]);
                }
            }
        }
    }

    for(let i=0; i<sections.length; i++) {
        const sectionElement = document.createElement("section");
        if(isViewSection) sectionElement.classList.add("section__complete");
        else sectionElement.classList.add("section__front");
        mainSection.appendChild(sectionElement);

        const divElement = document.createElement("div");
        divElement.classList.add("section__top");
        sectionElement.appendChild(divElement);

        const h3Element = document.createElement("h3");
        h3Element.classList.add("section__name");
        h3Element.textContent = sections[i];
        divElement.appendChild(h3Element);

        const aElement = document.createElement("a");
        aElement.setAttribute("href","#header");
        aElement.classList.add("section__view-all");
        if(sectionFilter.length>0) aElement.classList.add("hidden");
        aElement.textContent = "Ver todo";
        divElement.appendChild(aElement);

        const iElement = document.createElement("i");
        iElement.classList.add("view-all__icon", "fa-solid", "fa-arrow-right-long");
        aElement.appendChild(iElement);

        const ulElement = document.createElement("ul");
        ulElement.classList.add("section__list");
        sectionElement.appendChild(ulElement);

        loadProducts(data, sections[i], ulElement, tagsFilter);
        viewProduct(data);
    }
}

export function filterProducts(input) {
    const expresion = new RegExp(input, "i");
    const items = document.querySelectorAll(".item");

    console.log("input: " + input);

    if(input.length>0) {
        for(let i=0; i<items.length; i++) {
            const productName = items[i].querySelector(".item__description").querySelector(".item__name").textContent;
            const productTags = items[i].querySelector(".item__description").querySelector(".item__tags").textContent;

            if(!expresion.test(productName) && !expresion.test(productTags)) {
                items[i].classList.add("invisible");
            } else {
                items[i].classList.remove("invisible");
            }
        }
    } else {
        for(let i=0; i<items.length; i++) {
            items[i].classList.remove("invisible");
        }
    }
}

function hearingInput() {
    const searchInput = document.querySelectorAll(".input__search");

    for(let i=0; i<searchInput.length; i++) {
        searchInput[i].addEventListener("input", () => {
            filterProducts(searchInput[i].value);
        });
    }
}

export function viewProduct(product) {
    const products = document.querySelectorAll(".item");

    for(let i=0; i<products.length; i++) {
        products[i].onclick = () => {
            const productView = document.querySelector(".product__view");
            productView.classList.add("product__view--active");

            const itemID = products[i].querySelector(".front__item__id").textContent;
            
            for(let j=0; j<product.length; j++) {
                if(itemID == product[j].id) {
                    const productView_name = document.querySelector(".product__view__name");
                    const productView_price = document.querySelector(".product__view__price");
                    const productView_description = document.querySelector(".product__view__description");
                    const productView_img = document.querySelector(".product__view__img");

                    productView_name.textContent = product[j].name;
                    productView_price.textContent = "$"+product[j].price+"mxn";
                    productView_description.textContent = product[j].description;
                    productView_img.setAttribute("src", product[j].imageUrl);
                } 
            }

            const productView_backBtn = document.querySelector(".back-btn");
            productView_backBtn.addEventListener("click", ()=>{
                productView.classList.remove("product__view--active");
            });
        }
    }
}

hearingInput();