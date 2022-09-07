/*
    <div class="btnBackMenu">
        <button class="btn btn__1">Menú principal</button>
    </div>
*/

export function createBtn(locationBtn,textBtn,btnClass) {
    const locationSection = document.querySelector(locationBtn);

    const divElement = document.createElement("div");
    divElement.classList.add("btnBackMenu");
    locationSection.appendChild(divElement);

    const buttonElement = document.createElement("button");
    buttonElement.classList.add("btn","btn__1",btnClass);
    buttonElement.textContent = textBtn;
    divElement.appendChild(buttonElement);
}