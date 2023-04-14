import Calc from './calc.js';

export default class Eventos extends Calc {
    protected _eventos:any;
    protected _ultimoEvento:any;

    constructor() {
        super();
        this._viewer();
    }

    protected _viewer() {
        let progressbarVida = document.getElementById('barraVida');
        let progressbarMana = document.getElementById('barraMana');
        let condicao = document.getElementById('condicao');
        this._eventos = [
            // ---------------- eventos aleatórios ----------------
            {
                id: 0,
                classe: 0,
                descricao: ['Nada, além de um silêncio calmante...', 
                'Uma pedra? Não parece ser nada.',
                'Há um som estranho no ambiente... você olha para a frente e se depara com nada.',
                'Parabéns, viajante, você encontrou nada...',
                'Hmmm, melhor continuar, nada por aqui.',
                ],
            },
            {
                id: 1,
                classe: 0,
                descricao: ['Nada, além de um silêncio calmante...', 
                'Uma pedra? Não parece ser nada.',
                'Há um som estranho no ambiente... você olha para a frente e se depara com nada.',
                'Parabéns, viajante, você encontrou nada...',
                'Hmmm, melhor continuar, nada por aqui.',
                ],
            },
            {
                id: 2,
                classe: 0,
                descricao: ['Nada, além de um silêncio calmante...', 
                'Uma pedra? Não parece ser nada.',
                'Há um som estranho no ambiente... você olha para a frente e se depara com nada.',
                'Parabéns, viajante, você encontrou nada...',
                'Hmmm, melhor continuar, nada por aqui.',
                ],
            },
            {
                id: 3,
                classe: 0,
                descricao: ['Nada, além de um silêncio calmante...', 
                'Uma pedra? Não parece ser nada.',
                'Há um som estranho no ambiente... você olha para a frente e se depara com nada.',
                'Parabéns, viajante, você encontrou nada...',
                'Hmmm, melhor continuar, nada por aqui.',
                ],
            },
            {
                id: 4,
                classe: 0,
                descricao: ['Nada, além de um silêncio calmante...', 
                'Uma pedra? Não parece ser nada.',
                'Há um som estranho no ambiente... você olha para a frente e se depara com nada.',
                'Parabéns, viajante, você encontrou nada...',
                'Hmmm, melhor continuar, nada por aqui.',
                ],
            },
            {
                id: 5,
                classe: 0,
                descricao: ['Nada, além de um silêncio calmante...', 
                'Uma pedra? Não parece ser nada.',
                'Há um som estranho no ambiente... você olha para a frente e se depara com nada.',
                'Parabéns, viajante, você encontrou nada...',
                'Hmmm, melhor continuar, nada por aqui.',
                ],
            },
            {
                id: 6,
                classe: 0,
                descricao: ['Nada, além de um silêncio calmante...', 
                'Uma pedra? Não parece ser nada.',
                'Há um som estranho no ambiente... você olha para a frente e se depara com nada.',
                'Parabéns, viajante, você encontrou nada...',
                'Hmmm, melhor continuar, nada por aqui.',
                ],
            },
            {
                id: 7,
                classe: 0,
                descricao: ['Nada, além de um silêncio calmante...', 
                'Uma pedra? Não parece ser nada.',
                'Há um som estranho no ambiente... você olha para a frente e se depara com nada.',
                'Parabéns, viajante, você encontrou nada...',
                'Hmmm, melhor continuar, nada por aqui.',
                ],
            },
            {
                id: 8,
                classe: 0,
                descricao: ['Nada, além de um silêncio calmante...', 
                'Uma pedra? Não parece ser nada.',
                'Há um som estranho no ambiente... você olha para a frente e se depara com nada.',
                'Parabéns, viajante, você encontrou nada...',
                'Hmmm, melhor continuar, nada por aqui.',
                ],
            },
            {
                id: 9,
                classe: 0,
                descricao: ['Nada, além de um silêncio calmante...', 
                'Uma pedra? Não parece ser nada.',
                'Há um som estranho no ambiente... você olha para a frente e se depara com nada.',
                'Parabéns, viajante, você encontrou nada...',
                'Hmmm, melhor continuar, nada por aqui.',
                ],
            },
    
            //@todo colocar outros eventos que nada ^ (ate o 10)
            
            // ---------------- itens ----------------
            {
                id: 10,
                classe: 1,
                nome: 'Espada enferrujada',
                tipo: 'armaCaC',
                imgArma: '../img/testinho.png',
                descricao: '[Espada enferrujada, 1d6 + 4 de dano]',
                msgMorte: 'Um corte rápido que arranca o braço da criatura faz com que ela morra de hemorragia',
                bonusHab: 0,
                efeito: ():number => {
                    if(!this._eventos[10].bonusHab) window.alert('ERRO TOTAL linha 127 ev');
                    return this._rolarDados('d6', 1) + 4 + (this._eventos[10].bonusHab ? this._eventos[10].bonusHab : 0);
                },
            },
            {
                id: 11,
                classe: 1,
                nome: 'Arco',
                tipo: 'armaDis',
                imgArma: '',
                descricao: '[Arco, 1d6 + 6 de dano]',
                msgMorte: 'Você atira uma flecha que passa direto pelo crânio da criatura a matando',
                bonusHab: 0,
                efeito: ():number => {
                    //@todo ver isso if(!this._eventos[11].bonusHab) window.alert('ERRO TOTAL linha 142 ev');
                    return this._rolarDados('d3', 1) + 2 + (this._eventos[11].bonusHab ? this._eventos[11].bonusHab : 0);
                },
            },
            {
                id: 12,
                classe: 1,
                nome: 'Maçã',
                tipo: 'comida',
                usavel: true,
                imgArma: '',
                descricao: '[Maçã, recupera 5pvs]',
                rec: 5,
                efeito: () => {
                    if(this._eventos[12].rec) this._vida += this._calcularVida(this._eventos[12].rec);
                    progressbarVida?.style.setProperty('--progress', this._vida+'');
                },
            },
            {
                id: 13,
                classe: 1,
                nome: 'Poção',
                tipo: 'pocao',
                usavel: true,
                imgArma: '',
                descricao: '[Poção, recupera 5pms]',
                efeito: () => {
                    this._mana += this._calcularMana(5);
                    progressbarMana?.style.setProperty('--progress', this._mana+'');
                },
            },
            
            {
                id: 14,
                classe: 1,
                nome: 'Armadura',
                tipo: 'armadura',
                imgArma: '',
                descricao: '[Armadura, resistência +5 a atqs armados]',
                efeito: () => {
                    this._setAdicionalDef += 5;
                },
            },
            
            // {
            //     id: 15,
            //     classe: 1,
            //     nome: 'Amuleto',
            //     tipo: 'amuleto',
            //     imgArma: '',
            //     usavel: false,
            //     descricao: '[Amuleto, +2 de atq por nível]',
            //     efeito: () => {
    
            //     },
            // },
            
            // {
            //     id: 16,
            //     classe: 1,
            //     nome: 'Arma 4',
            //     imgArma: './img/miuu.png',
            //     tipo: 'arma',
            //     descricao: '[Espada do chacau, 1d12]',
            //     bonusCrt: 2,
            //     efeito: ():number => {
            //         return this._rolarDados('d12', 1);
            //     },
            // },
            
            // {
            //     id: 17,
            //     classe: 1,
            //     nome: 'Esp. 8',
            //     tipo: '',
            //     descricao: '[Lança gigante, 2d12 de dano]',
            //     dano: (Math.floor(Math.random() * (12 - 1)) + 1) +
            //           (Math.floor(Math.random() * (12 - 1)) + 1),
            // },
            
            // {
            //     id: 18,
            //     classe: 1,
            //     nome: 'Arma 5',
            //     tipo: 'arma',
            //     imgArma: './img/miuu.png',
            //     descricao: '[Machadinha, 1d6 + 2]',
            //     bonusCrt: 1,
            //     efeito: () => {
            //         //ver se essa linha ta funcionando como deve
            //         //this.#ultimoEvento.condicao = 'VULNERAVEL';
            //         return this._rolarDados('d6', 1) + 2;
            //     },
            //},
            
            // {
            //     id: 19,
            //     classe: 1,
            //     nome: 'Esp. 10',
            //     tipo: false,
            //     descricao: '[Foice da morte, 2d12 + 6 de dano]',
            //     dano: (Math.floor(Math.random() * (12 - 1)) + 1) +
            //           (Math.floor(Math.random() * (12 - 1)) + 1) + 6,
            // },
            
            // ---------------- magias ----------------
            
            {
                id: 20,
                classe: 2,
                nome: 'magia',
                tipo: 'atq',
                descricao: 'descrição de uma magia 1',
                efeito: () => {
                    let teste:number = this._rolarDados('d10', 1);
                    let condicao = 'miu';
                    //console.log(this.getUltimoEvento.forca);
                    return { teste, condicao };
                },
                gastoMana: 16,
                bonusCrt: 1,
            },
    
            {
                id: 21,
                classe: 2,
                nome: 'magia 3',
                tipo: 'atq',
                descricao: 'descrição de uma magia 3',
                efeito: () => {
                    let teste = this._rolarDados('d10', 5);
                    let condicao = 'auau';
                    return {teste, condicao};
                },
                gastoMana: 4,
                bonusCrt: 1,
            },
            
            {
                id: 22,
                classe: 2,
                nome: 'magia 2',
                tipo: 'sup',
                descricao: 'recupera 20 pontos de mana',
                gastoMana: 5,
                efeito: () => {
                    this._eventos.forEach((evento:any) => {
                        if(evento.id == 22)
                            this._mana -= this._calcularMana(evento.gastoMana);
                    });
                    this._mana += this._calcularMana(20);
                    progressbarMana?.style.setProperty('--progress', this._mana+'');
                }
            },
            
            // ---------------- bichos ---------------- 
            
            {
                id: 31,
                classe: 3,
                nome: 'um zumbi de gelo',
                descricao: 'uma descrição de um bicho',
                vida: 100,
                defesa: 0,
                forca: 1,
                inteligencia: 1,
                vigor: 0,
                agilidade: 1,
                condicao: 'NORMAL',
                exp: 100, //teste
                dano: () => {
                    return Math.floor(Math.random() * (4 - 1) + 1);
                },
                magias: {
                    0: {
                        id: 0,
                        nome: 'Geada',
                        descricao: 'causará 1d6 de dano e adicionará a condição de congelamento',
                        efeito: () => {
                            //@todo trocar a condição variavel e depois colocar alguma função que troque quando a variavel for trocada
                            condicao&&(condicao.innerText = 'CONGELAMENTO');
                            return Math.floor(Math.random() * (7 - 1) + 1);
                        },
                        usos: 2,
                    },
                    1: {
                        id: 1,
                        nome: 'Fogareu',
                        descricao: 'causará 1d6 de dano e adicionará a condição de em chamas',
                        efeito: () => {
                            //@todo trocar a condição variavel e depois colocar alguma função que troque quando a variavel for trocada
                            condicao&&(condicao.innerText = 'EM CHAMAS');
                            return Math.floor(Math.random() * (8 - 1) + 1);
                        },
                        usos: 6,
                    }
                },
                textoAtaques: [
                    //0-4 erro
                    //5-9 acerto
                    //10-14 acerto muito
                    //15-19 acerto critico
                    'acerta suas garras em sua barriga, fazendo um corte liso.',
                    'te acerta e crava suas garras em seu ombro.',
                    'te acerta '
                ],
                finalizacao: '',
            },
    
            // ----------------- boss -----------------
            {
                id: 41,
                classe: 4,
                descricao: 'um boss',
            },
        ];
    }

    protected set _seUltimoEvento(ultimoEvento:any) {
        this._viewer();
        this._ultimoEvento = ultimoEvento;
        console.log(this._ultimoEvento);
    }

    public get getUltimoEvento() {
        return this._ultimoEvento;
    }

    public get getEventos():[] {
        return this._eventos;
    }
    
}