import Habilidades from "./habilidades1.js";

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