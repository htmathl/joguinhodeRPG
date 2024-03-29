import Viajante from "./viajante.js";
export default class Calc extends Viajante {
    _margemCritico = 20;
    _critico = false;
    _resistenciaMana = 0;
    _adicionalDef = 0;
    _rolarDados(tipoDados, qntDados) {
        let dados = [], result = 0;
        switch (tipoDados) {
            case 'd3':
                for (let i = 1; i <= qntDados; i++) {
                    result += Math.floor(Math.random() * (4 - 1) + 1);
                }
                console.log(tipoDados + ':' + result);
                return result;
            case 'd6':
                for (let i = 1; i <= qntDados; i++) {
                    result += Math.floor(Math.random() * (7 - 1) + 1);
                }
                console.log(tipoDados + ':' + result);
                return result;
            case 'd8':
                for (let i = 1; i <= qntDados; i++) {
                    result += Math.floor(Math.random() * (9 - 1) + 1);
                }
                console.log(tipoDados + ':' + result);
                return result;
            case 'd10':
                for (let i = 1; i <= qntDados; i++) {
                    result += Math.floor(Math.random() * (11 - 1) + 1);
                }
                console.log(tipoDados + ':' + result);
                return result;
            case 'd12':
                for (let i = 1; i <= qntDados; i++) {
                    result += Math.floor(Math.random() * (13 - 1) + 1);
                }
                console.log(tipoDados + ':' + result);
                return result;
            case 'd20':
                for (let i = 1; i <= qntDados; i++) {
                    dados.push(Math.floor(Math.random() * (21 - 1) + 1));
                }
                result = Math.max.apply(null, dados);
                if (result == this._margemCritico)
                    this._critico = true;
                else
                    this._critico = false;
                console.log(dados);
                console.log(tipoDados + ':' + result);
                return result;
            default:
                console.log('Escolha um dado adequado');
                return 0;
        }
    }
    _calcularMana(mana) {
        return Math.floor((mana * 100) / this._pontosMana - this._resistenciaMana);
    }
    _calcularVida(vida) {
        return Math.floor((vida * 100) / this._pontosVida);
    }
    set _setMargemCritico(margemCritico) {
        this._margemCritico = margemCritico;
    }
    get getMargemCritico() {
        return this._margemCritico;
    }
    set _setResistenciaMana(resistenciaMana) {
        this._resistenciaMana = resistenciaMana;
    }
    get getResistenciaMana() {
        return this._resistenciaMana;
    }
    get getCritico() {
        return this._critico;
    }
    set _setAdicionalDef(adicionalDef) {
        this._adicionalDef = adicionalDef;
    }
    get getAdicionalDef() {
        return this._adicionalDef;
    }
}
