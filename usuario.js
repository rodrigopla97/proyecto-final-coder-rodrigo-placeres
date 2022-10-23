class Usuario {
    constructor(id, nombre, tipo, precio) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
    }
}

let nombreUsuario = "";
let apellidoUsuario = "";
let correo = "";

const tituloUsuario = document.getElementById("tituloUsuario");
const formUsuario = document.getElementById("formUsuario");

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
        dato.tipo === "name" ? nombre = dato.valor : '';
        dato.tipo === "lastname" ? apellido = dato.valor : '';
        dato.tipo === "email" ? correo = dato.valor : '';
    });

    if (nombre !== "" && apellido !== "" && correo !== "") {
        tituloUsuario.innerText = `Hola ${nombre} ${apellido}! Bienvenido a CrowShop`;
        formUsuario.innerText = "";
    } else {
        tituloUsuario.innerText = `No ingresó todos los datos`;
    }
}
