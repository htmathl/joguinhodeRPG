import Calc from "./calc.js";

export default class Habilidades extends Calc {
    protected _habilidades:any;
    protected _addModsHab:any;
    protected _itensExtras = 0;
    //@todo implementar isso para aumentar a cada 2 niveis upados
    protected _raridadeItem = 0;
    protected _itensPorBau = 0;
    protected _prevencao = 0;
    protected _efeitoAoSeuToque: null | string = null;
    protected _resistenciaFisica = 0;
    protected _bonusDefesaPassiva = 0;

    constructor() {
        super();
        this._viwer();
    }

    protected _viwer() {
        let mdh = this._addModsHab;
        this._addModsHab = {
            forca: 0,
            defesa: 0,
            inteligencia: 0,
            vigor:  0,
            agilidade: 0,
            sorte: 0,
        };
        
        this._habilidades = [
            {
                id: 'hab1',
                nome: 'Treinamento',
                descricao: 'Você ganha +5 pontos em todos os testes de FOR, DEF e VIG',
                efeito: () => {
                    const mod = ['forca', 'defesa', 'vigor'];
                    mod.forEach(key => {
                        this._addModsHab[key as keyof typeof mdh] = 5;
                    });
                },
                toggle: false,
                adiquirida: false,
                unico: 0,
                contexto: 0,
                nivel: 1,
            },
            {
                id: 'hab2',
                nome: 'Meditação',
                descricao: 'Você ganha +5 pontos em todos os testes de INT, AGI e SOR',
                efeito: () => {
                    const mod = ['agilidade', 'inteligencia', 'sorte'];
                    mod.forEach(key => {
                        this._addModsHab[key as keyof typeof mdh] = 5;
                    });
                },
                toggle: false,
                adiquirida: false,
                unico: 0,
                contexto: 0,
                nivel: 1,
            },
            {
                id: 'hab3',
                nome: 'Sortudo',
                descricao: 'Sua margem de crítico dobra',
                efeito: () => {
                    this._setMargemCritico = 19;
                },
                toggle: false,
                adiquirida: false,
                unico: 0,
                contexto: 0,
                nivel: 1,
            },
            {
                id: 'hab4',
                nome: 'Catalisador',
                descricao: 'Você desenvolve resistência de +3 em gastos de mana',
                efeito: () => {
                    this._setResistenciaMana = 3;
                },
                toggle: false,
                adiquirida: false,
                unico: 0,
                contexto: 0,
                nivel: 1,
            },
            {
                id: 'hab5',
                nome: 'Investigador',
                descricao: 'Com está habilidade você podera encontrar itens extra raros',
                efeito: () => {
                    this._itensExtras = 1;
                 },
                toggle: false,
                adiquirida: false,
                unico: 0,
                contexto: 0,
                nivel: 2,
            },
            {
                id: 'hab6',
                nome: 'Vidente',
                descricao: 'Você terá 40% de chance em prever armadilhas',
                efeito: () => {
                    this._prevencao = 40;
                },
                toggle: false,
                adiquirida: false,
                unico: 0,
                contexto: 0,
                nivel: 2,
            },
            {
                id: 'hab7',
                nome: 'Embaralhar',
                descricao: '1. Ao chegar a 20% ou menos de vida você ganhará 2 clones que aumentarão sua defesa em 10 pontos cada \n 2. Quando você for atacado perderá um clone',
                efeito: () => {
                    // if(this.#vida <= 20) this.#bonusDefesaPassiva += 20;
                },
                toggle: false,
                adiquirida: false,
                unico: 1,
                contexto: 1,
                nivel: 2,
            },
            {
                id: 'hab8',
                nome: 'Estática',
                descricao: 'Ao sofrer qualquer ataque corpo-a-corpo, seu oponente ficará paralizado',
                efeito: () => {
                    this._efeitoAoSeuToque = 'PARALIZADO';
                },
                toggle: false,
                adiquirida: false,
                unico: 0,
                contexto: 0,
                nivel: 2,
            },
            {
                id: 'hab9',
                nome: 'Tudo em dobro',
                descricao: 'Você terá 35% de chance de achar um ítem a mais por baú',
                efeito: () => {
                    const chance = Math.floor(Math.random() * 100);
                    chance <= 35 ? this._itensPorBau += 1 : '';
                },
                toggle: false,
                adiquirida: false,
                unico: 1,
                contexto: 2,
                nivel: 2,
            },
            {
                id: 'hab10',
                nome: 'Nutricionista',
                descricao: 'Suas comidas com menos de 7 pontos de restauração terão o dobro de eficiência',
                efeito: () => {
                    // if(this.#inventario['slot4'].tipo == 'Comida' && this.#inventario['slot4'].rec < 7 )
                    //     this.#inventario['slot4'].rec *= 2;
                },
                toggle: false,
                adiquirida: false,
                unico: 1,
                contexto: 0,
                nivel: 2,
            },
            {
                id: 'hab11',
                nome: 'Veterano',
                descricao: '1. Esta substitui a habilidade (Treinamento) \n 2. Você ganhará +10 em todos os testes de FOR, DEF e VIG',
                efeito: () => {
                    const mod = ['forca', 'defesa', 'vigor'];
                    mod.forEach(key => {
                        this._addModsHab[key as keyof typeof mdh] = 10;
                    });
                },
                toggle: false,
                adiquirida: false,
                unico: 0,
                contexto: 0,
                nivel: 3,
            },
            {
                id: 'hab12',
                nome: 'Namastê',
                descricao: '1. Esta substitui a habilidade (Meditação) \n 2. Você ganhará +10 em todos os testes de INT, AGI e SOR',
                efeito: () => {
                    const mod = ['inteligencia', 'agilidade', 'sorte'];
                    mod.forEach(key => {
                        this._addModsHab[key as keyof typeof mdh] = 10;
                    });
                },
                toggle: false,
                adiquirida: false,
                unico: 0,
                contexto: 0,
                nivel: 3,
            },
            {
                id: 'hab13',
                nome: 'Melancólico',
                descricao: 'Você não será mais afetado por condições mentais mas não poderá fazer ataques furtivos e terá 5% de errar golpes que usem FOR',
                efeito: () => {
                    return 10;
                },
                toggle: false,
                adiquirida: false,
                unico: 0,
                contexto: 0,
                nivel: 3,
            },
            {
                id: 'hab14',
                nome: 'Tanque de guerra',
                descricao: 'Você ganhará 5 + (nivel) pontos a sua resistência a golpes físicos',
                efeito: () => {
                    // this.resistenciaFisica = (this.#nivel+5);
                },
                toggle: false,
                adiquirida: false,
                unico: 0,
                contexto: 0,
                nivel: 3,
            },
            {
                id: 'hab15',
                nome: 'Engenhosidade',
                descricao: 'Para cada ponto de inteligência suas armas atuais ganharão +(nivel) pontos',
                efeito: () => {
                    // const lista = [this.#inventario['slot1'], this.#inventario['slot2']];
                    // lista.forEach(key => {
                    //     if(key != '[vazio]') {
                    //         key.bonusHab = this.#atributos['inteligencia'] + this.#nivel;
                    //     }
                    // });
                },
                toggle: false,
                adiquirida: false,
                unico: 0,
                contexto: 0,
                nivel: 4,
            },
            {
                id: 'hab16',
                nome: 'Desarmar',
                descricao: 'Caso seu oponente possua uma arma, ao conseguir contra-atacar você poderá desarmar seu oponente',
                efeito: () => {
                    return 10;
                },
                toggle: false,
                adiquirida: false,
                unico: 0,
                contexto: 3,
                nivel: 4,
            },
            {
                id: 'hab17',
                nome: 'Mutação',
                descricao: 'Suas magias te darão uma condição aleatória por batalha, mas causarão +15 pontos de dano',
                efeito: () => {
                    return 10;
                },
                toggle: false,
                adiquirida: false,
                unico: 0,
                nivel: 4,
            },
            {
                id: 'hab18',
                nome: 'Inspiração resoluta',
                descricao: 'Quando sua mana estiver abaixo de 10%, você ganhará 10 pontos de mana temporários',
                efeito: () => {
                    return 10;
                },
                toggle: false,
                adiquirida: false,
                nivel: 4,
            },
            {
                id: 'hab19',
                nome: 'Última chance',
                descricao: 'Ao morrer, você reviverá com 1 ponto de vida',
                efeito: () => {
                    return 10;
                },
                toggle: false,
                adiquirida: false,
                unico: 0,
                nivel: 5,
            },
            {
                id: 'hab20',
                nome: 'Venda sua alma',
                descricao: '1. Ao ficar com a vida abaixo de 15% você invocará 2 demônios \n 2. Esses demônios tem como vida igual aos seus pontos de inteligência + 5 \n 3. O dano que esses demônios darão será igual a seus pontos de sorte \n 4. Seu o ponente não poderá te atacar em quanto não matar os demônios.',
                efeito: () => {
                    return 10;
                },
                toggle: false,
                adiquirida: false,
                nivel: 5,
            },
            {
                id: 'hab21',
                nome: 'Proficiência',
                descricao: '1. Esta substitui as habilidades (Veterano) (Namastê) e seus anteriores \n 2. Você ganhará +15 pontos para todos seus atributos',
                efeito: () => {
                    for( let key in this._addModsHab ) {
                        if(!this._addModsHab.hasOwnProperty(key)) continue;
                        this._addModsHab[key as keyof typeof mdh] = 15;
                    }
                },
                toggle: false,
                adiquirida: false,
                unico: 0,
                contexto: 0,
                nivel: 5,
            },
            {
                id: 'hab22',
                nome: 'Um por um',
                descricao: 'Ao acertar um golpe que tire 50% da vida ou mais você poderá atacar novamente em seguida',
                efeito: () => {
                    return 10;
                },
                toggle: false,
                adiquirida: false,
                nivel: 5,
            },
            {
                id: 'hab23',
                nome: 'Doce veneno',
                descricao: 'Toda vez que você estiver envenenado ao invés de perder vida você recuperará (Isto não anula outros efeitos negativos do envenenamento)',
                efeito: () => {
                    return 10;
                },
                toggle: false,
                adiquirida: false,
                nivel: 5,
            },
            {
                id: 'hab24',
                nome: 'Espirito de ódio',
                descricao: 'Ao chegar em 40% de vida você causará cade vez mais dano para cada 5% de vida perdidos',
                efeito: () => {
                    return 10;
                },
                toggle: false,
                adiquirida: false,
                nivel: 5,
            },
        ];
    }

    public get getHabilidades():any[] {
        return this._habilidades;
    }

    public get getAddModsHab():{} {
        return this._addModsHab;
    }

    public get getBonusDefesaPassiva():number {
        return this._bonusDefesaPassiva;
    }

}