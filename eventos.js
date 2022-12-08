import Habilidades from "./habilidades.js";

export default class Eventos extends Habilidades {
    #miau;
    constructor() {
        super();
        this.#miau = 5;
    }
    getMiau() {
        return this.#miau;
    }
}