const carrito = document.querySelector("#carrito");
const template = document.querySelector("#template");
const comprado = document.querySelector("#comprado");
const templateComprado = document.querySelector("#templateComprado");
const fragment = document.createDocumentFragment();

let carritoArray = [];

// Eventos:

document.addEventListener("click", (e) => {
    if (e.target.matches(".card button")) {
        agregarCarrito(e);
    }

    if (e.target.matches(".list-group-item .btn-success")) {
        btnAumentar(e);
    }

    if (e.target.matches(".list-group-item .btn-danger")) {
        btnDisminuir(e);
    }
  
});

const agregarCarrito = (e) => {
    const producto = {
        titulo: e.target.dataset.fruta,
        id: e.target.dataset.fruta,
        cantidad: 1,
        precio: parseInt(e.target.dataset.precio),
    };

    // busco en el indice
    const index = carritoArray.findIndex((item) => item.id === producto.id);

    if (index === -1) {
        carritoArray.push(producto);
    } else {
        carritoArray[index].cantidad++;
    }
   
    
    pintarCarrito();
    
}

const pintarCarrito = () => {
    localStorage.setItem("carritoArray", JSON.stringify(carritoArray));

    carrito.textContent = "";

    carritoArray.forEach((item) => {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".text-white .lead").textContent = item.titulo;
        clone.querySelector(".rounded-pill").textContent = item.cantidad;
        clone.querySelector("div .lead span").textContent =
            item.precio * item.cantidad;
        clone.querySelector(".btn-success").dataset.id = item.id;
        clone.querySelector(".btn-danger").dataset.id = item.id;
        fragment.appendChild(clone);
    });
    carrito.appendChild(fragment);
      
};


const btnAumentar = (e) => {

    carritoArray = carritoArray.map((item) => {
        if (item.id === e.target.dataset.id) {
            item.cantidad++;
        }
        return item;
    });
    pintarCarrito();
};

const btnDisminuir = (e) => {
    carritoArray = carritoArray.filter((item) => {
        if (item.id === e.target.dataset.id) {
            if (item.cantidad > 0) {
                item.cantidad--;
                if (item.cantidad === 0) return;
                return item;
            }
        } else {
            return item;
        }
    });
    pintarCarrito();
};

document.addEventListener("DOMContentLoaded", (e) => {
  if (localStorage.getItem("carritoArray")) {
      carritoArray = JSON.parse(localStorage.getItem("carritoArray"));
      pintarCarrito();
  }
});


