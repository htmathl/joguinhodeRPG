import Calc from "./calc.js";
export default class Habilidades extends Calc {
    habilidades;
    addModsHab;
    itensExtras = 0;
    raridadeItem = 0;
    itensPorBau = 0;
    prevencao = 0;
    efeitoAoSeuToque = null;
    resistenciaFisica = 0;
    bonusDefesaPassiva = 0;
    constructor() {
        super();
        this.addModsHab = {
            forca: 0,
            defesa: 0,
            inteligencia: 0,
            vigor: 0,
            agilidade: 0,
            sorte: 0,
        };
        this.habilidades = [
            {
                id: 'hab1',
                nome: 'Treinamento',
                descricao: 'Você ganha +5 pontos em todos os testes de FOR, DEF e VIG',
                efeito: () => {
                    const mod = ['forca', 'defesa', 'vigor'];
                    mod.forEach(key => {
                        this.addModsHab[key] = 5;
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
                        this.addModsHab[key] = 5;
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
                    this._margemCritico = 19;
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
                    this._resistenciaMana = 3;
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
                    this.itensExtras = 1;
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
                    this.prevencao = 40;
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
                    this.efeitoAoSeuToque = 'PARALIZADO';
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
                    chance <= 35 ? this.itensPorBau += 1 : '';
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
                        this.addModsHab[key] = 10;
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
                        this.addModsHab[key] = 10;
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
                    for (let key in this.addModsHab) {
                        if (!this.addModsHab.hasOwnProperty(key))
                            continue;
                        this.addModsHab[key] = 15;
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
    getHabilidades() {
        return this.habilidades;
    }
}
