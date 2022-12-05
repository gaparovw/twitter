let API = "http://localhost:8000/product";
let add = document.querySelector(".add");
let modall_add = document.querySelector(".modal-add");
let iks = document.querySelector(".iks");
let ava = document.querySelector("#avatar");
let name = document.querySelector("#name");
let email = document.querySelector("#email");
let twet = document.querySelector("#twet");
let img = document.querySelector("#img");
let newadd = document.querySelector(".new-add");
let list = document.querySelector(".right-main");
let ex = document.querySelector(".ex");
let editbtn = document.querySelector(".edit-btn");
let modal_edit = document.querySelector(".modal-edit");
let avaEdit = document.querySelector("#avatar-edit");
let nameEdit = document.querySelector("#name-edit");
let emailEdit = document.querySelector("#email-edit");
let twetEdit = document.querySelector("#twet-edit");
let imgEdit = document.querySelector("#img-edit");
let editSaveBtn = document.querySelector(".edit-btn");
let searchInp = document.querySelector(".sear");

// переменные
let searchValue = "";
let currentPage = 1;
let pageTotalCount = 1;
let paginationList = document.querySelector(".pagination-list");
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");

let comment = parseInt(Math.random() * 99);
let ran1 = parseInt(Math.random() * 99);
let ran2 = parseInt(Math.random() * 99);
let likes = parseInt(Math.random() * 999);
// слушатели событии start
iks.addEventListener("click", closee);
add.addEventListener("click", () => {
    modall_add.style.display = "flex";
});
render();
newadd.addEventListener("click", async function () {
    let obj = {
        ava: ava.value,
        name: name.value,
        email: email.value,
        twet: twet.value,
        img: img.value,
    };
    if (
        !obj.name.trim() ||
        !obj.email.trim() ||
        !obj.twet.trim() ||
        !obj.ava.trim()
    ) {
        return alert("заполните поле");
    }
    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(obj),
    });
    ava.value = "";
    name.value = "";
    email.value = "";
    twet.value = "";
    img.value = "";
    render();
    closee();
});

// слушатели событии end

function closee() {
    modall_add.style.display = "none";
}

function closeedit() {
    modal_edit.style.display = "none";
}

function edits() {
    modal_edit.style.display = "flex";
}

async function render() {
    let products = await fetch(`
    ${API}?q=${searchValue}&_page=${currentPage}&_limit=5`)
        .then((res) => res.json())
        .catch((err) => console.error("\fd"));
    drawPaginationButtons();
    list.innerHTML = "";
    products.forEach((element) => {
        let newElem = document.createElement("div");
        newElem.id = element.id;
        newElem.innerHTML += `<div class="cart">
        <div class="cart-top">
            <img
                src="${element.ava}"
                alt=""
                width="70px"
                height="70px"
            />
            <div class="cart-right">
                <div class="name-email">
                    <h4>${element.name}</h4>
                    <p>${element.email}</p>
                </div>
                <div class="texts">
                    <p>
                        ${element.twet}
                    </p>
                </div>
                
                <img
                    src="${element.img}"
                    alt=""
                    width="100%"
                    class='img-cart'
                />
                <div class="comment">
                    <i class="bi i1 com bi-chat-right-heart"
                        >${comment}</i
                    >
                    <i class="bi com i2 bi-arrow-repeat">${ran2}</i>
                    <i class="bi com i3 bi-heart">${likes}</i>
                    <i class="bi com i4 bi-box-arrow-down">${ran1}</i>
                    <i class="bi btn-edit bi-pencil-square" onclick='edits()' id=${element.id}></i>
                    <i class="bi ex bi-x-lg" onclick='deleteProduct(${element.id})'></i>
                </div>
            </div>
        </div>
    </div>`;
        list.append(newElem);
    });
}
render();

function drawPaginationButtons() {
    fetch(`${API}?q=${searchValue}`)
        .then((res) => res.json())
        .then((data) => {
            pageTotalCount = Math.ceil(data.length / 5);
            // console.log(pageTotalCount);
            paginationList.innerHTML = null;
            for (let i = 1; i <= pageTotalCount; i++) {
                if (currentPage == i) {
                    let page1 = document.createElement("li");
                    page1.innerHTML = `<li class="page-item active"><a class="page-link page_number" href="#">${i}</a></li>`;
                    paginationList.append(page1);
                } else {
                    let page1 = document.createElement("li");
                    page1.innerHTML = `<li class="page-item"><a class="page-link page_number" href="#">${i}</a></li>`;
                    paginationList.append(page1);
                }
            }
        });
    //? красим в серый prev/next
    if (currentPage == 1) {
        prev.classList.add("disabled");
    } else {
        prev.classList.remove("disabled");
    }

    if (currentPage == pageTotalCount) {
        next.classList.add("disabled");
    } else {
        next.classList.remove("disabled");
    }
}
function deleteProduct(id) {
    fetch(`${API}/${id}`, {
        method: "DELETE",
    }).then(() => render());
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("i1")) {
        e.target.innerHTML = comment++;
    }
});
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("i2")) {
        e.target.innerHTML = likes++;
    }
});
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("i3")) {
        e.target.innerHTML = ran2++;
    }
});
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("i4")) {
        e.target.innerHTML = ran1++;
    }
});

document.addEventListener("click", (e) => {
    console.log(e.target.id);
    if (e.target.classList.contains("btn-edit")) {
        let id = e.target.id;
        fetch(`${API}/${id}`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(dat);
                // for (let data of dat) {
                avaEdit.value = data.ava;
                nameEdit.value = data.name;
                emailEdit.value = data.email;
                twetEdit.value = data.twet;
                imgEdit.value = data.img;
                editSaveBtn.setAttribute("id", data.id);
                // }
            });
    }
});

editSaveBtn.addEventListener("click", function () {
    let id = this.id;
    console.log(id);
    let ava = avaEdit.value;
    let name = nameEdit.value;
    let email = emailEdit.value;
    let twet = twetEdit.value;
    let img = imgEdit.value;

    if (!name || !twet || !email || !ava) return;

    let editedProduct = {
        ava: ava,
        name: name,
        email: email,
        twet: twet,
        img: img,
    };

    saveEdit(editedProduct, id);
});

function saveEdit(editedProduct, id) {
    fetch(`${API}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(editedProduct),
    }).then(() => {
        render();
    });
    closeedit();
    // render();
}

searchInp.addEventListener("input", () => {
    searchValue = searchInp.value;
    render();
});

prev.addEventListener("click", () => {
    if (currentPage <= 1) {
        return;
    }
    currentPage--;
    render();
});

next.addEventListener("click", () => {
    if (currentPage >= pageTotalCount) {
        return;
    }
    currentPage++;
    render();
});

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("page_number")) {
        currentPage = e.target.innerText;
        render();
    }
});