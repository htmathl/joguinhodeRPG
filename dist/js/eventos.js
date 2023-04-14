import Calc from './calc.js';
export default class Eventos extends Calc {
    _eventos;
    _ultimoEvento;
    constructor() {
        super();
        this._viewer();
    }
    _viewer() {
        let progressbarVida = document.getElementById('barraVida');
        let progressbarMana = document.getElementById('barraMana');
        let condicao = document.getElementById('condicao');
        this._eventos = [
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
            {
                id: 10,
                classe: 1,
                nome: 'Espada enferrujada',
                tipo: 'armaCaC',
                imgArma: '../img/testinho.png',
                descricao: '[Espada enferrujada, 1d6 + 4 de dano]',
                msgMorte: 'Um corte rápido que arranca o braço da criatura faz com que ela morra de hemorragia',
                bonusHab: 0,
                efeito: () => {
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
                efeito: () => {
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
                    if (this._eventos[12].rec)
                        this._vida += this._calcularVida(this._eventos[12].rec);
                    progressbarVida?.style.setProperty('--progress', this._vida + '');
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
                    progressbarMana?.style.setProperty('--progress', this._mana + '');
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
            {
                id: 20,
                classe: 2,
                nome: 'magia',
                tipo: 'atq',
                descricao: 'descrição de uma magia 1',
                efeito: () => {
                    let teste = this._rolarDados('d10', 1);
                    let condicao = 'miu';
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
                    return { teste, condicao };
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
                    this._eventos.forEach((evento) => {
                        if (evento.id == 22)
                            this._mana -= this._calcularMana(evento.gastoMana);
                    });
                    this._mana += this._calcularMana(20);
                    progressbarMana?.style.setProperty('--progress', this._mana + '');
                }
            },
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
                exp: 100,
                dano: () => {
                    return Math.floor(Math.random() * (4 - 1) + 1);
                },
                magias: {
                    0: {
                        id: 0,
                        nome: 'Geada',
                        descricao: 'causará 1d6 de dano e adicionará a condição de congelamento',
                        efeito: () => {
                            condicao && (condicao.innerText = 'CONGELAMENTO');
                            return Math.floor(Math.random() * (7 - 1) + 1);
                        },
                        usos: 2,
                    },
                    1: {
                        id: 1,
                        nome: 'Fogareu',
                        descricao: 'causará 1d6 de dano e adicionará a condição de em chamas',
                        efeito: () => {
                            condicao && (condicao.innerText = 'EM CHAMAS');
                            return Math.floor(Math.random() * (8 - 1) + 1);
                        },
                        usos: 6,
                    }
                },
                textoAtaques: [
                    'acerta suas garras em sua barriga, fazendo um corte liso.',
                    'te acerta e crava suas garras em seu ombro.',
                    'te acerta '
                ],
                finalizacao: '',
            },
            {
                id: 41,
                classe: 4,
                descricao: 'um boss',
            },
        ];
    }
    set _seUltimoEvento(ultimoEvento) {
        this._viewer();
        this._ultimoEvento = ultimoEvento;
        console.log(this._ultimoEvento);
    }
    get getUltimoEvento() {
        return this._ultimoEvento;
    }
    get getEventos() {
        return this._eventos;
    }
}
