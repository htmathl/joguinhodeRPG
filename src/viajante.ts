export default class Viajante {
    protected _nome = '';
    protected _atributos = {
        forca: 0,
        defesa: 0,
        inteligencia: 0,
        vigor: 0,
        agilidade: 0,
        sorte: 0,
    };
    protected _constVigor = 0;
    protected _pontosVida = 20;
    protected _pontosMana = 20;
    protected _vida = 100;
    protected _mana = 100;
    protected _experiencia:any = 0;
    protected _nivel = 0;
    protected _pontos = 0;
    constructor() {
        
    }
}