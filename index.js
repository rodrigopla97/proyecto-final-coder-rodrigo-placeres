function agregarAlCarrito(producto) {
    carrito.push({ ...producto, cantidad: 0 });

    const enCarrito = carrito.find(prod => prod.id == producto.id);

    if (!enCarrito) {
        carrito.push({ ...producto, cantidad: 1 });
    }
    else {
        let carritoFiltrado = carrito.filter(prod => prod.id != producto.id);
        carrito = [...carritoFiltrado, { ...enCarrito, cantidad: enCarrito.cantidad + 1 }]
        contador.innerHTML = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    }
    carritoVacio.innerText = "";
}

function verCarrito() {
    carrito.forEach((producto => {
        carritoVacio.innerText = "";
        const li = document.createElement("li");
        li.innerText = `${producto.nombre} ${producto.tipo} x${producto.cantidad}`
        ulList.append(li)
        console.log(ulList)
        carritoContainer.append(li);

        Swal.fire({
            title: "(┬┬﹏┬┬)",
            html: carritoContainer,
            buttonsStyling: false
        });
    }));
}

class Producto {
    constructor(id, nombre, tipo, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.precio = precio;
        this.img = img;
    }
    mostrarProductos() {
        const card = `
            <div class="card">
              <p class="titulo-card">${this.nombre} ${this.tipo}</p>
              <div>
                <img class="img-producto" src="${this.img}" alt="${this.nombre} ${this.tipo} Crow">
              </div>
              <div>
                <p class="precio-card">$${this.precio}</p>
              </div>
              <div class="btn-container">
                <button id="${this.id}" class="btnAgregar">Agregar al carrito</button>
              </div>
            </div>
      `
        const container = document.getElementById('container-card');
        container.innerHTML += card
    }
    agregarEvento() {
        const btnAgregar = document.getElementById(this.id)
        const productoEncontrado = productos.find(p => p.id == this.id)
        btnAgregar.addEventListener('click', () => agregarAlCarrito(productoEncontrado))
        btnCarrito.addEventListener('click', () => verCarrito(productoEncontrado))
    }
}

let productos = [];
let carrito = [];
let totalCompra = 0;

const contador = document.getElementById("cart-counter");
contador.innerHTML = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);

const pantalonUrban = new Producto(1, "Pantalón", "Urban", 2500, 'img/pantalon-urban.jpg');
const pantalonSport = new Producto(2, "Pantalón", "Sport", 2000, 'img/pantalon-sport.jpg');
const remeraUrban = new Producto(3, "Remera", "Urban", 1200, 'img/remera-urban.jpg');
const remeraSport = new Producto(4, "Remera", "Sport", 1500, 'img/remera-sport.jpg');
const calzadoUrban = new Producto(5, "Calzado", "Urban", 6000, 'img/calzado-urban.jpg');
const calzadoSport = new Producto(6, "Calzado", "Sport", 8000, 'img/calzado-sport.jpg');

productos.push(pantalonUrban, pantalonSport, remeraUrban, remeraSport, calzadoUrban, calzadoSport);

productos.forEach(e => e.mostrarProductos());
productos.forEach(e => e.agregarEvento());

btnFinalizar.onclick = () => {

    totalCompra = 0

    carrito.forEach((producto) => (totalCompra += producto.precio * producto.cantidad));

    if (totalCompra !== 0) {
        Swal.fire({
            title: "(⌐■_■)",
            text: `Haz finalizado tu compra con éxito! El precio de su carrito es de $${totalCompra}`,
            icon: "success",
            buttonsStyling: false
        });

    } else {
        Swal.fire({
            title: "¯|_(ツ)_/¯",
            text: `No agregaste ningun producto a tu carrito`,
            icon: "success",
            buttonsStyling: false
        });
    }
    vacio();
};

btnCancelar.onclick = () => {
    vacio();
    Swal.fire({
        title: "(┬┬﹏┬┬)",
        text: "Que lastima! Te esperamos la proxima!",
        buttonsStyling: false
    });
};

btnVaciar.onclick = () => {
    vacio();
    Swal.fire({
        title: "( ﾉ ﾟｰﾟ)ﾉ",
        text: "Carrito vacio :_",
        buttonsStyling: false
    });

};

btnProximos.onclick = () => {
    vacio();
    carritoVacio.innerText = `Proximamente contaremos con los siguientes productos`;
    fetch('https://api.escuelajs.co/api/v1/categories/4/products')
        .then(res => res.json())
        .then(json => {
            const proximos = json;
            proximos.forEach(prod => {
                const list = document.createElement('li');
                list.innerHTML = `<h3>${prod.category.name} - ${prod.title} </h3>
        <img src=${prod.images}>`
                ulList.append(list);
            });
        });
};