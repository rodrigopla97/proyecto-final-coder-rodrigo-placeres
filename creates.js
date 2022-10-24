function vacio() {
    carrito = [];
    carritoFiltrado = [];
    ulList.innerHTML = "";
    pTotal.innerText = "";
    pSaludo.innerText = "";
    carritoVacio.innerText = `Carrito vacío :c`;
    contador.innerHTML = 0;
}

const anio = new Date().getFullYear();
const btnFinalizar = document.createElement("button");
const btnCancelar = document.createElement("button");
const btnVaciar = document.createElement("button");
const btnProximos = document.createElement("button");
const pFooter = document.createElement("p");
const btnAgregar = document.getElementById("btnAgregar");
const btnCarrito = document.getElementById("btnCarrito");
const selectTag = document.getElementById("select-productos");
const carritoVacio = document.getElementById("vacio");
const carritoContainer = document.getElementById("carrito-container");
let ulList = document.getElementById("lista");
const saludo = document.getElementById("saludo");
const footer = document.getElementById("footer");
const disponible = document.getElementById("stock");
const botones = document.getElementById("botones");
const total = document.getElementById("total");
const pTotal = document.createElement("p");
const pSaludo = document.createElement("p");

botones.append(btnFinalizar);
botones.append(btnCancelar);
botones.append(btnVaciar);
botones.append(btnProximos);
footer.append(pFooter);

btnFinalizar.innerText = "Finalizar Compra";
btnCancelar.innerText = "Cancelar Compra";
btnVaciar.innerText = "Vaciar Carrito";
btnProximos.innerText = "Próximamente";
carritoVacio.innerText = `Carrito vacío :c`;
pFooter.innerText = `Rodrigo Placeres ${anio}`;