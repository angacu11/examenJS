import { Component } from '@angular/core';
import { pokedex } from './db/pokedex'
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    pokedex: any[] = pokedex;
    linkSeleccionado: String = "";

    constructor() {

    }

    controlador(elemento) {
        this.linkSeleccionado = elemento.url;
    }
}
