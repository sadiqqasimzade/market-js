btnaddcontainer = document.getElementById("btnaddcontainer");
btncalcl = document.getElementById("btncalcl");

btnok = document.getElementById("ok");
btncancel = document.getElementById("cancel");
btnadd = document.getElementById("add");
closebtn = document.getElementById("close");

containersdiv = document.getElementById("containers");

modal = document.getElementById("modal");

productname = document.getElementById("productname");
producttype = document.getElementById("producttype");
price = document.getElementById("price");

form = document.getElementById("form");

let currentProduct;

boxes = document.querySelectorAll(".box");
products = document.querySelectorAll(".product");
maincontainer = document.getElementById("maincontainer")

btnaddcontainer.addEventListener('click', () => {
    container = document.createElement('div');
    container.classList.add("box");
    container.appendChild(document.createElement('p'));

    xbtn = container.appendChild(document.createElement('p'));
    xbtn.innerHTML = "&#10006;";
    xbtn.addEventListener('click', function () {
        if (confirm("Sebet ve icindeki her seyi silinsin?"))
            this.parentElement.remove();
    })

    container.setAttribute('data-target', "udentified");
    container.addEventListener("dragover", function (e) {
        e.preventDefault();
    })
    container.addEventListener("drop", function (e) {
        if (this.getAttribute("data-target") == "udentified") {
            this.setAttribute("data-target", currentProduct.getAttribute("data-id"))
            this.firstChild.innerText = `${currentProduct.getAttribute("data-id")}`
        }
        if (this.getAttribute("data-target") == currentProduct.getAttribute("data-id")) {
            this.appendChild(currentProduct);
        }
        currentProduct = "";
    })
    containersdiv.appendChild(container);
})

//modals
btnadd.addEventListener('click', () => {
    modal.style.display = "flex";
})

closebtn.addEventListener('click', () => {
    modal.style.display = "none";
})

//btncalculate
btncalcl.addEventListener('click', () => {
    total = 0;
    document.querySelectorAll(".box").forEach(b => {
        b.querySelectorAll(".product").forEach(item => {
            total += Number(item.getAttribute("price"))
        });
    });
    alert(`price : ${total.toFixed(2)}`)
})

//btn cancel
btncancel.addEventListener('click', () => { clearInputs() })

//btnok
btnok.addEventListener('click', () => {
    if (checkInputs()) {
        product = document.createElement('div')
        product.setAttribute("draggable", "true")
        product.setAttribute("price", price.value)
        product.setAttribute("data-id", producttype.value)
        product.innerText = productname.value;
        product.classList.add("product");
        product.addEventListener("dragstart", function () {
            currentProduct = this;
        })
        product.classList.add("tooltip")

        tooltip = document.createElement('span');
        tooltip.classList.add("tooltiptext")
        tooltip.innerText = `Price: ${price.value}`;

        product.appendChild(tooltip);
        maincontainer.appendChild(product);

        clearInputs()
        modal.style.display = "none";
    }
})


//main container drag
maincontainer.addEventListener("drop", () => {
    maincontainer.appendChild(currentProduct);
    currentProduct = "";
})

maincontainer.addEventListener("dragover", (e) => {
    e.preventDefault();
})

document.getElementById("body").addEventListener("dragover", (e) => {
    e.preventDefault();
})
document.getElementById("body").addEventListener("drop", () => {

    currentProduct.remove();
    currentProduct = "";
})



function checkInputs() {
    for (let i = 0; i < form.elements.length; i++) {
        if (form[i].value == "" && form[i].tagName == "INPUT") {
            alert(`${form[i].id} Cant be empty`);
            return false;
        }
    }
    return true;
}

function clearInputs() {
    for (let i = 0; i < form.elements.length; i++) {
        if (form[i].tagName == "INPUT") {
            form[i].value = "";
        }
    }
    btnok.innerText = "Ok";
}

