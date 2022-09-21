function innerVacio() {
    carritoVacio.innerHTML = "";
    ulList.innerHTML = "";
    pTotal.innerText = "";
    pSaludo.innerText = "";
}
class usuario {
    constructor(id, nombre, tipo, precio) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.precio = precio;
    }
}
class Producto {
    constructor(id, nombre, tipo, precio) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.precio = precio;
    }
}
class Compra {
    constructor(cuotas) {
        this.totalCompra = 0;
        this.cuotas = cuotas;
        this.carrito = [];
        this.filtroCarrito = [];
    }
}

const btnAgregar = document.createElement("button");
const btnFinalizar = document.createElement("button");
const btnCancelar = document.createElement("button");
const btnVaciar = document.createElement("button");
const pFooter = document.createElement("p");
const tituloUsuario = document.getElementById("tituloUsuario");
const formUsuario = document.getElementById("formUsuario");
const selectTag = document.getElementById("select-productos");
const carritoVacio = document.getElementById("vacio");
const carritoContainer = document.getElementById("carrito-container");
const ulList = document.getElementById("lista");
const saludo = document.getElementById("saludo");
const footer = document.getElementById("footer");
const disponible = document.getElementById("stock");
const botones = document.getElementById("botones");
const total = document.getElementById("total");
const pTotal = document.createElement("p");
const pSaludo = document.createElement("p");

let productos = [];
let totalCompra = 0;
const date = new Date();
const anio = date.getFullYear();
let compra = new Compra();
let nombreUsuario = "";
let apellidoUsuario = "";
let correo = "";

botones.append(btnAgregar);
botones.append(btnFinalizar);
botones.append(btnCancelar);
botones.append(btnVaciar);
footer.append(pFooter);

const pantalonUrban = new Producto(1, "Pantalón", "Urban", 2500);
const pantalonSport = new Producto(2, "Pantalón", "Sport", 2000);
const remeraUrban = new Producto(3, "Remera", "Urban", 1200);
const remeraSport = new Producto(4, "Remera", "Sport", 1500);
const calzadoUrban = new Producto(5, "Calzado", "Urban", 6000);
const calzadoSport = new Producto(6, "Calzado", "Sport", 8000);

productos.push(pantalonUrban, pantalonSport, remeraUrban, remeraSport, calzadoUrban, calzadoSport);

productos.forEach((producto) => {
    const option = document.createElement("option");
    option.innerText = `${producto.nombre} ${producto.tipo}: $${producto.precio}`;
    option.setAttribute("id", `${producto.id}`);
    option.setAttribute("class", "option");
    selectTag.append(option);
});

btnAgregar.innerText = "Agregar Producto";
btnFinalizar.innerText = "Finalizar Compra";
btnCancelar.innerText = "Cancelar Compra";
btnVaciar.innerText = "Vaciar Carrito";
carritoVacio.innerText = `Carrito vacío :c`;
pFooter.innerText = `Rodrigo Placeres ${anio}`;

formUsuario.onsubmit = (e) => {
    e.preventDefault();
    const infoUserArray = [];
    for (const element of e.target.children) {
        const usuarioObj = {};
        usuarioObj["tipo"] = element.name;
        usuarioObj["valor"] = element.value;
        infoUserArray.push(usuarioObj);
    }
    localStorage.setItem("info", JSON.stringify(infoUserArray));

    window.location.reload();
};

if (localStorage.length > 0) {
    const info = JSON.parse(localStorage.getItem("info"));

    info.forEach((dato) => {
        if (dato.tipo === "name") {
            nombre = dato.valor;
        }
        if (dato.tipo === "lastname") {
            apellido = dato.valor;
        }
        if (dato.tipo === "email") {
            correo = dato.valor;
        }
    });

    if (nombre !== "" && apellido !== "" && correo !== "") {
        tituloUsuario.innerText = `Hola ${nombre} ${apellido}! Bienvenido a CrowShop`;
        formUsuario.innerText = "";
    } else {
        tituloUsuario.innerText = `No ingresó todos los datos`;
    }
}

btnAgregar.onclick = () => {
    const productoIngresado = productos[selectTag.selectedIndex];
    const li = document.createElement("li");

    compra.carrito.push(productoIngresado);
    compra.carrito.forEach((producto) => (li.innerText = `${producto.nombre} ${producto.tipo}`));
    ulList.append(li);
    carritoContainer.append(ulList);
    carritoVacio.innerHTML = "";
    pTotal.innerText = "";
    pSaludo.innerText = "";
};

btnFinalizar.onclick = () => {
    totalCompra = 0;
    compra.carrito.forEach((producto) => (totalCompra = totalCompra + producto.precio));
    innerVacio();

    if (totalCompra === 0) {
        carritoVacio.innerText = `Carrito vacío :c`;
    } else {
        pTotal.innerText = `El total de la compra es de $${totalCompra}`;
        total.append(pTotal);
        compra.carrito = [];
    }
};

btnCancelar.onclick = () => {
    innerVacio();
    carritoVacio.innerText = `Carrito vacío :c`;
    pSaludo.innerText = `Que lastima! Te esperamos la proxima!`;
    saludo.append(pSaludo);
    compra.carrito = [];
};

btnVaciar.onclick = () => {
    innerVacio();
    carritoVacio.innerText = `Carrito vacío :c`;
    compra.carrito = [];
};
