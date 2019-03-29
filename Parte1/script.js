/**
 * Code created By Jorge López Gil
*/

/**
 * Metodo Añade funcionalidad del click cuando el DOM ha sido cargado
 */
document.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM Cargado");

    // Añadimos posiblidad de iniciar el juego 
    document.getElementById('b_iniciar').addEventListener("click", IniciarJuego);
});

/**
 * Metodo devuelve un número aleatorio
 * @param {int} numFilas Número de filas
 * @param {int} numColumnas Número de columans
 * @returns {int} Devuelve un número aleatorio
 */
function casillaAventureroAleatoria(numFilas, numColumnas) {
    let numCasillas = numFilas * numColumnas;
    return Math.round(Math.random() * numCasillas);
}

/**
 * Determina aleatoriamente las posiciones de los tesoros
 * @param {int} numFilas Número de filas
 * @param {int} numColumnas Número de columans
 * @param {int} posicionPlayer Posición actual del aventurero
 * @returns {array} Devuelve array con los identificadores donde hay tesoro
 */
function casillasTesorosAleatorias(numFilas, numColumnas, posicionPlayer) {
    let numCasillas = numFilas * numColumnas;
    let posicionesTesoro = [];

    for (let i = 0; i < numCasillas; i++) {
        // Genera número aleatorio
        let numAleatorio = Math.random() * 1;
        console.log("Número generado ==> " + numAleatorio);

        if (numAleatorio < 0.25 && i != posicionPlayer) {
            // Colocaremos un tesoro
            posicionesTesoro.push(i);
        }
    }

    return posicionesTesoro;
}

/**
 * Metodo crea la tabla y la añade al HTML
 * @param {int} numFilas Número de filas
 * @param {int} numColumnas Número de columans
 */
function crearTablero(numFilas, numColumnas) {
    // Creamos tabla y cuerpo
    let tabla = document.createElement("table");
    let tablaBody = document.createElement("tbody");

    // Creamos celdas
    let casillaActual = 0;
    for (let fila = 0; fila < numFilas; fila++) {
        // Creamos la fila actual
        let filaHTML = document.createElement("tr");

        // Creamos la casilla de cada columna
        for (let columna = 0; columna < numColumnas; columna++) {
            let casilla = document.createElement("td");
            casilla.width = "80px";
            casilla.height = "80px";
            casilla.id = "celda-" + casillaActual;
            casilla.style.border = "3px solid black";

            // Añadimos imagen
            let imagen = document.createElement("img");
            imagen.id = "imagen-" + casillaActual;
            casilla.appendChild(imagen);

            casillaActual++;
            filaHTML.appendChild(casilla);
        }

        // Add fila a la tabla
        tablaBody.appendChild(filaHTML);
    }

    // Add Cuerpo Tabla
    tabla.appendChild(tablaBody);
    tabla.addEventListener("click", controladorTabla, true);

    // Añadimos a la Web
    document.getElementsByTagName("body")[0].appendChild(tabla);
}

/**
 * Metodo para dibujar el Aventurero
 * @param {int} casilla Casilla en la que se va a poner el Aventurero
 */
function dibujarAventurero(casilla) {
    document.getElementById("imagen-" + casilla).src = "adventurer.png";
}

/**
 * Metodo para dibujar el Tesoro
 * @param {int} casilla Casilla en la que se va a poner el Tesoro
 */
function dibujarTesoro(casilla) {
    document.getElementById("imagen-" + casilla).src = "gold.png";
}

/**
 * Metodo para quitar el dibujo
 * @param {int} casilla Casilla en la que se va a quitar el dibujo
 */
function limpiarCasilla(casilla) {
    document.getElementById("imagen-" + casilla).src = "";
}

/**
 * Metodo gestiona Inicio del juego
 */
function IniciarJuego() {
    // Obtenemos datos
    let numFilas = document.getElementById("i_filas").value;
    let numColumnas = document.getElementById("i_columnas").value;

    // Generamos tablero
    crearTablero(numFilas, numColumnas);

    // Preparamos valores 
    let posicionPlayer = casillaAventureroAleatoria(numFilas, numColumnas);
    let posicionesTesoro = casillasTesorosAleatorias(numFilas, numColumnas, posicionPlayer);

    console.log(posicionesTesoro);

    // Dibujar Aventurero
    dibujarAventurero(posicionPlayer);

    // Dibujar Tesoros
    for (let tesoro of posicionesTesoro) {
        dibujarTesoro(tesoro);
    }
}

/**
 * Controlador de la tabla que gestiona los eventos
 * @param {EventListener} e 
 */
function controladorTabla(e) {
    // Obtenemos número de la casiila
    let numCasilla = e.target.id;
    numCasilla = numCasilla.replace("imagen-", "");
    numCasilla = numCasilla.replace("celda-", "");

    // Obtenemos ubicación del aventurero
    let elementosTabla = document.getElementsByTagName('img');
    let posicionPlayer;
    for (let elemento of elementosTabla) {
        if ((elemento.src).includes("adventurer.png")) {
            posicionPlayer = elemento.id.replace("imagen-", "");
        }
    }

    // Procedemos a limpiar y colocar aventurero
    limpiarCasilla(posicionPlayer);
    limpiarCasilla(numCasilla);
    dibujarAventurero(numCasilla);

    // Comprobamos que ya no hay más tesoros
    let tesorosEnPista = 0;
    for (let casilla of elementosTabla) {
        if ((casilla.src).includes("gold.png")) {
            tesorosEnPista++;
        }
    }

    // Si ya no queda más tesoros finaliza
    if (tesorosEnPista == 0) {
        alert("Juego finalizado!");
    }
}