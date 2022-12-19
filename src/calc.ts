import Viajante from "./viajante.js";

export default class Calc extends Viajante {
    protected _margemCritico = 20;
    protected _critico = false;
    protected _resistenciaMana = 0;
    protected _adicionalDef = 0;

    protected _rolarDados(tipoDados:string, qntDados:number):number {
        let dados:any = [], result = 0;
        switch (tipoDados) {
            case 'd3':
                //dano (verificar se é preciso colocar um tipo de rolada, ex: dano, teste aleatório, teste...).
                for(var i = 1; i <= qntDados; i++) {
                    result += Math.floor(Math.random() * (4 - 1) + 1);
                }
    
                console.log(tipoDados + ':' + result);
    
                return result;
            case 'd6':
                for(var i = 1; i <= qntDados; i++) {
                    result += Math.floor(Math.random() * (7 - 1) + 1);
                }
    
                console.log(tipoDados + ':' + result);
    
                return result;
            case 'd8':
                for(var i = 1; i <= qntDados; i++) {
                    result += Math.floor(Math.random() * (9 - 1) + 1);
                }
    
                console.log(tipoDados + ':' + result);
    
                return result;
            case 'd10':
                for(var i = 1; i <= qntDados; i++) {
                    result += Math.floor(Math.random() * (11 - 1) + 1);
                }
    
                console.log(tipoDados + ':' + result);
    
                return result;
            case 'd12':
                for(var i = 1; i <= qntDados; i++) {
                    result += Math.floor(Math.random() * (13 - 1) + 1);
                }
    
                console.log(tipoDados + ':' + result);
    
                return result;
            case 'd20':
                for(var i = 1; i <= qntDados; i++) {
                    dados.push(Math.floor(Math.random() * (21 - 1) + 1));
                }
    
                result = Math.max.apply(null, dados);
                result = 20;
                if(result == this._margemCritico)
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

    protected _calcularMana(mana:number):number {
        return Math.floor((mana * 100) / this._pontosMana - this._resistenciaMana);
    }

    protected _calcularVida(vida:number):number {
        return Math.floor((vida * 100) / this._pontosVida);
    }

    protected _setResistencia(resis:number) {
        this._resistenciaMana = resis;
    }
}