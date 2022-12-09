"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Jogin_instances, _Jogin_eventos, _Jogin_mudarVisibilidadeBotoes, _Jogin_definirIntro, _Jogin_semManaOver, _Jogin_semManaOut, _Jogin_definirExp, _Jogin_definirCondicao, _Jogin_aleatorizar, _Jogin_rolarDados, _Jogin_rolarAcertoOponente, _Jogin_rolarAcerto, _Jogin_recAtr, _Jogin_calcularMana, _Jogin_calcularVida, _Jogin_dano, _Jogin_eventoUpar, _Jogin_upgradeAtributos, _Jogin_mouseOverUpar, _Jogin_mouseOutUpar, _Jogin_clickUpar, _Jogin_clickHabilidades, _Jogin_clickBtnMais, _Jogin_clickBtnMenos, _Jogin_clickPronto, _Jogin_magicasAtq, _Jogin_magicasSup, _Jogin_nenhuma, _Jogin_iniciarBatalha, _Jogin_iniciarTurnoOp, _Jogin_rolarAtaqueFurtivo, _Jogin_definirDefesaPassiva, _Jogin_acoes, _Jogin_itensMagia, _Jogin_ataquePoderoso, _Jogin_AddDadosAtqP, _Jogin_ataqueOponente, _Jogin_ataqueViajante, _Jogin_adicionaisAtq, _Jogin_atacarMagia, _Jogin_atacarArma, _Jogin_cancelar, _Jogin_morteOponente, _Jogin_eventoAndar, _Jogin_opcaoCaminhar, _Jogin_escolherMapa, _Jogin_btnSN, _Jogin_adicionar;
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mixer_1 = require("ts-mixer");
let dialogo = document.getElementById("dialogo");
let btnContinuar = document.getElementById('continuar');
let btnsAndar = document.querySelectorAll('.botoes');
let btnsSN = document.querySelectorAll('.botoesSN');
let btnsAcao = document.querySelectorAll('.botoesAcao');
let btnsAtq = document.querySelectorAll('.botoesAtq');
let btnNenhum = document.getElementById('btnNenhuma');
let btnPoderoso = document.getElementById('btnPoderoso');
let respostas = document.querySelectorAll('.resposta');
let infos = document.querySelectorAll('.infos');
let contexto = document.getElementById('iContexto');
let hud = document.querySelectorAll('.hud');
let mag = document.querySelectorAll('.mag');
let magAtq = document.querySelectorAll('.mag-atq');
let magSup = document.querySelectorAll('.mag-sup');
let inv = document.querySelectorAll('.inv');
let inv4 = document.getElementById('inv4');
let inv5 = document.getElementById('inv5');
let invSup = [inv4, inv5];
let hover = document.querySelectorAll('.hover');
let pontinhos = document.querySelectorAll('.pontinho');
let turnoBicho = document.getElementById('turnoBicho');
let imgContent1 = document.getElementById('img-content1');
let divContent1 = document.getElementById('div-content1');
let imgContent2 = document.getElementById('img-content2');
let divContent2 = document.getElementById('div-content2');
let imgContent3 = document.getElementById('img-content3');
let divContent3 = document.getElementById('div-content3');
let imgContent4 = document.getElementById('img-content4');
let divContent4 = document.getElementById('div-content4');
let imgContent5 = document.getElementById('img-content5');
let divContent5 = document.getElementById('div-content5');
let buttonsAtqPod = [];
let progressbarVida = document.getElementById('barraVida');
let progressbarMana = document.getElementById('barraMana');
let progressbarXP = document.getElementById('barraXP');
let lvl = document.getElementById('nivel');
let pnts = document.getElementById('pontos');
let btnUpar = document.getElementById('btnUpar');
let turno = document.getElementById('turno');
let condicao = document.getElementById('condicao');
let dlg, btnMais, btnMenos, elDivChecks, blurr;
inv.forEach(inv => {
    inv.setAttribute('title', 'Você está se sentindo leve, mas desprotegido, é melhor pegar alguns itens... Alías, inventário, viajante, viajante, inventário.');
});
mag.forEach(mag => {
    mag.setAttribute('title', 'Aqui é onde você escreve ou guarda suas magias, eu chamo de Alfredo, mas você pode escolher algo como grimório, não sei.');
});
window.setInterval(() => {
    for (var i = mag.length - 1; i >= 0; i--) {
        if (window.getComputedStyle(mag[i]).borderColor == 'rgb(18, 1, 105)') {
            mag[i].style.setProperty('border-color', 'rgb(1, 13, 115)');
        }
        else if (window.getComputedStyle(mag[i]).borderColor == 'rgb(1, 13, 115)') {
            mag[i].style.setProperty('border-color', 'rgb(4, 36, 91)');
        }
        else if (window.getComputedStyle(mag[i]).borderColor == 'rgb(4, 36, 91)') {
            mag[i].style.setProperty('border-color', 'rgb(1, 73, 115)');
        }
        else if (window.getComputedStyle(mag[i]).borderColor == 'rgb(1, 73, 115)') {
            mag[i].style.setProperty('border-color', 'rgb(18, 1, 105)');
        }
    }
}, 300);
window.setInterval(() => {
    if (pontinhos[0].style.display == 'inline') {
        if (pontinhos[1].style.display == 'inline') {
            if (pontinhos[2].style.display == 'inline') {
                pontinhos[0].style.display = 'none';
                pontinhos[1].style.display = 'none';
                pontinhos[2].style.display = 'none';
            }
            else
                pontinhos[2].style.display = 'inline';
        }
        else
            pontinhos[1].style.display = 'inline';
    }
    else
        pontinhos[0].style.display = 'inline';
}, 500);
function definirVida() {
    progressbarVida === null || progressbarVida === void 0 ? void 0 : progressbarVida.style.setProperty('--progress', '100');
}
function definirMana() {
    progressbarMana === null || progressbarMana === void 0 ? void 0 : progressbarMana.style.setProperty('--progress', '100');
}
function limparInvGri() {
    inv.forEach((inv) => {
        inv.innerText = '[vazio]';
    });
    mag.forEach((mag) => {
        mag.innerText = '[vazio]';
    });
}
const eventos_1 = __importDefault(require("./eventos"));
const habilidades_1 = __importDefault(require("./habilidades"));
const viajante_1 = __importDefault(require("./viajante"));
class Jogin extends (0, ts_mixer_1.Mixin)(viajante_1.default, eventos_1.default, habilidades_1.default) {
    constructor() {
        super();
        _Jogin_instances.add(this);
        _Jogin_eventos.set(this, [
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
                imgArma: './img/testinho.png',
                descricao: '[Espada enferrujada, 1d6 + 4 de dano]',
                msgMorte: 'Um corte rápido que arranca o braço da criatura faz com que ela morra de hemorragia',
                bonusHab: 0,
                efeito: () => {
                    return __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_rolarDados).call(this, 'd6', 1) + 4 + __classPrivateFieldGet(this, _Jogin_eventos, "f")[10].bonusHab ? __classPrivateFieldGet(this, _Jogin_eventos, "f")[10].bonusHab : undefined;
                },
            },
            {
                id: 11,
                classe: 1,
                nome: 'Arco Tenebroso',
                tipo: 'armaDis',
                imgArma: '',
                descricao: '[Arco Tenebroso, 1d6 + 6 de dano]',
                msgMorte: 'Você atira uma flecha que passa direto pelo crânio da criatura a matando',
                bonusHab: 0,
                efeito: () => {
                    return __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_rolarDados).call(this, 'd3', 1) + 2 + __classPrivateFieldGet(this, _Jogin_eventos, "f")[11].bonusHab ? __classPrivateFieldGet(this, _Jogin_eventos, "f")[11].bonusHab : undefined;
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
                    this. += __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_calcularVida).call(this, __classPrivateFieldGet(this, _Jogin_eventos, "f")[12].rec);
                    progressbarVida.style.setProperty('--progress', this.);
                },
            },
            {
                id: 13,
                classe: 1,
                nome: 'Amianto',
                tipo: 'pocao',
                usavel: true,
                imgArma: '',
                descricao: '[Amianto, recupera 5pms]',
                efeito: () => {
                    this. += __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_calcularMana).call(this, 5);
                    progressbarMana.style.setProperty('--progress', this.);
                },
            },
            {
                id: 14,
                classe: 1,
                nome: 'Armadura feia',
                tipo: 'armadura',
                imgArma: '',
                descricao: '[Armadura feia, resistência +5 a atqs armados]',
                efeito: () => {
                    this. += 5;
                },
            },
            {
                id: 15,
                classe: 1,
                nome: 'Amuleto desgraçado',
                tipo: 'amuleto',
                imgArma: '',
                usavel: false,
                descricao: '[Amuleto desgraçado, +2 de atq por nível]',
                efeito: () => {
                },
            },
            {
                id: 16,
                classe: 1,
                nome: 'Arma 4',
                imgArma: './img/miuu.png',
                tipo: 'arma',
                descricao: '[Espada do chacau, 1d12]',
                bonusCrt: 2,
                efeito: () => {
                    return rolarDados('d12', 1);
                },
            },
            {
                id: 17,
                classe: 1,
                nome: 'Esp. 8',
                tipo: '',
                descricao: '[Lança gigante, 2d12 de dano]',
                dano: (Math.floor(Math.random() * (12 - 1)) + 1) +
                    (Math.floor(Math.random() * (12 - 1)) + 1),
            },
            {
                id: 18,
                classe: 1,
                nome: 'Arma 5',
                tipo: 'arma',
                imgArma: './img/miuu.png',
                descricao: '[Machadinha, 1d6 + 2]',
                bonusCrt: 1,
                efeito: () => {
                    ultimoEvento.condicao = 'VULNERAVEL';
                    return rolarDados('d6', 1) + 2;
                },
            },
            {
                id: 19,
                classe: 1,
                nome: 'Esp. 10',
                tipo: false,
                descricao: '[Foice da morte, 2d12 + 6 de dano]',
                dano: (Math.floor(Math.random() * (12 - 1)) + 1) +
                    (Math.floor(Math.random() * (12 - 1)) + 1) + 6,
            },
            {
                id: 20,
                classe: 2,
                nome: 'magia',
                tipo: 'atq',
                descricao: 'descrição de uma magia 1',
                efeito: () => {
                    this..condicao = 'AMALDICOADO';
                    return __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_rolarDados).call(this, 'd10', 1);
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
                    this..condicao = 'AMALDICOADO';
                    return __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_rolarDados).call(this, 'd10', 5);
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
                    __classPrivateFieldGet(this, _Jogin_eventos, "f").forEach(evento => {
                        if (evento.id == 22)
                            this. -= __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_calcularMana).call(this, evento.gastoMana);
                    });
                    this. += __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_calcularMana).call(this, 20);
                    progressbarMana.style.setProperty('--progress', this.);
                }
            },
            {
                id: 31,
                classe: 3,
                nome: 'um zumbi de gelo',
                descricao: 'uma descrição de um bicho',
                vida: 1,
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
                        nome: 'Geada',
                        descricao: 'causará 1d6 de dano e adicionará a condição de congelamento',
                        efeito: () => {
                            condicao.innerText = 'CONGELAMENTO';
                            return Math.floor(Math.random() * (7 - 1) + 1);
                        },
                        usos: 2,
                    }
                },
                textoAtaques: [
                    'te acerta suas garras em sua barriga, fazendo um corte liso.',
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
        ]);
        _Jogin_semManaOver.set(this, () => {
            dlg = dialogo === null || dialogo === void 0 ? void 0 : dialogo.innerText;
            dialogo && (dialogo.style.color = '#DB4B55');
            dialogo && (dialogo.innerText = 'Mana insuficiente');
            this._intervaloProMana = setInterval(() => {
                if ((progressbarMana === null || progressbarMana === void 0 ? void 0 : progressbarMana.style.backgroundColor) == '') {
                    progressbarMana.style.backgroundColor = 'rgba(219, 75, 85, 0.25)';
                    return;
                }
                progressbarMana && (progressbarMana.style.backgroundColor = '');
            }, 500);
            magAtq.forEach(e => {
                e.removeEventListener('mouseout', __classPrivateFieldGet(this, _Jogin_semManaOut, "f"));
            });
            magAtq.forEach(e => {
                e.addEventListener('mouseout', __classPrivateFieldGet(this, _Jogin_semManaOut, "f"));
            });
        });
        _Jogin_semManaOut.set(this, () => {
            dialogo.style.color = 'white';
            dialogo.innerText = dlg;
            progressbarMana.style.backgroundColor = '';
            clearInterval(this.);
        });
        _Jogin_mouseOverUpar.set(this, () => {
            btnUpar.removeEventListener('click', __classPrivateFieldGet(this, _Jogin_clickUpar, "f"));
            btnUpar.style.color = 'white';
            if (this.) {
                btnUpar.innerText = 'Você pode subir de nível';
                btnUpar.style.padding = '2px 10px 2px 5px';
                if (this. != 3 && this. != 4) {
                    btnUpar.addEventListener('click', __classPrivateFieldGet(this, _Jogin_clickUpar, "f"));
                }
                else
                    btnUpar.innerText = 'Não da para upar agora';
            }
            else {
                btnUpar.innerText = 'Sem níveis para subir';
                btnUpar.style.padding = '2px 10px 2px 5px';
            }
        });
        _Jogin_mouseOutUpar.set(this, () => {
            btnUpar.innerText = '+';
            btnUpar.style.padding = '2px 2px 2px 5px';
        });
        _Jogin_clickUpar.set(this, () => {
            btnUpar.removeEventListener('click', __classPrivateFieldGet(this, _Jogin_clickUpar, "f"));
            __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_upgradeAtributos).call(this);
        });
        _Jogin_clickHabilidades.set(this, e => {
            const key = e.currentTarget;
            for (let i = 0; i < this..length; i++) {
                if (key.innerText == this.[i].nome) {
                    if (this. > 0 && !this.[i].toggle) {
                        key.style.color = 'red';
                        this.[i].toggle = true;
                        this.--;
                        return;
                    }
                    if (this. > 0 && this.[i].toggle) {
                        key.style.color = 'white';
                        this.[i].toggle = false;
                        this.++;
                        return;
                    }
                    if (this. == 0 && this.[i].toggle) {
                        key.style.color = 'white';
                        this.[i].toggle = false;
                        this.++;
                        return;
                    }
                    if (this. == 0 && !this.[i].toggle) {
                        for (let j = 0; j < elDivChecks.length; j++) {
                            this.[j].toggle = false;
                            elDivChecks[j].style.color = 'white';
                        }
                        if (this. > 1) {
                            this. = this. - 1;
                        }
                        key.style.color = 'red';
                        this.[i].toggle = true;
                        return;
                    }
                }
            }
        });
        _Jogin_clickBtnMais.set(this, mais => {
            let obKeys = Object.keys(this.);
            const ptns = document.getElementById('ptns');
            const divAtrs = document.querySelectorAll('#divAtrs');
            for (let m = 0; m < obKeys.length; m++) {
                const key = mais.currentTarget.id;
                if (key == obKeys[m] && this. > 0) {
                    this.[key]++;
                    this.--;
                    divAtrs[m].innerText = divAtrs[m].innerText.split(':')[0] + ': ' + this.[key];
                    ptns.innerText = 'Pontos: ' + this.;
                    console.log(this.);
                }
            }
        });
        _Jogin_clickBtnMenos.set(this, menos => {
            let obKeys = Object.keys(this.);
            const ptns = document.getElementById('ptns');
            const divAtrs = document.querySelectorAll('#divAtrs');
            for (let m = 0; m < obKeys.length; m++) {
                const key = menos.currentTarget.id;
                if (key == obKeys[m] && this.[key] > 0 && this. <= this.) {
                    this.[key]--;
                    this.++;
                    divAtrs[m].innerText = divAtrs[m].innerText.split(':')[0] + ': ' + this.[key];
                    ptns.innerText = 'Pontos: ' + this.;
                }
            }
        });
        _Jogin_clickPronto.set(this, () => {
            const atri = document.querySelectorAll('.atributos');
            const obValues = Object.values(this.);
            const habilidades = document.getElementById('habilidades');
            for (let i = 0; i < atri.length; i++)
                atri[i].innerText = atri[i].innerText.split(':')[0] + ': ' + obValues[i];
            pnts.innerText = 'Pontos: ' + this.;
            this. += this. * 5;
            if (this.['vigor'] - this._constVigor > 0) {
                this. += __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_calcularVida).call(this, (this.['vigor'] - this._constVigor) * this. + 10);
                this. > 100 ? this. = 100 : '';
            }
            progressbarVida.style.setProperty('--progress', this.);
            const divHab = document.getElementById('divHab');
            this..forEach(habilidade => {
                if (habilidade.toggle) {
                    habilidade.adiquirida = true;
                    const span = document.createElement('span');
                    span.innerText = habilidade.nome;
                    span.setAttribute('title', habilidade.descricao);
                    divHab.append(span);
                    this..push(habilidade);
                }
            });
            habilidades.append(divHab);
            this..forEach(habilidade => {
                habilidade.toggle = false;
            });
            this..forEach(habilidade => {
                habilidade.efeito();
            });
            document.body.removeChild(blurr);
            this. = false;
        });
        _Jogin_magicasAtq.set(this, (e) => {
            e.currentTarget.innerText = this..nome;
            this._mudarVazio();
            e.currentTarget.setAttribute('title', this..descricao);
            for (let i = 0; i < 2; i++)
                if (magAtq[i].innerText == this..nome)
                    this.['mag' + (i + 1)] = this.;
            mag.forEach((mag) => {
                mag.removeEventListener('click', __classPrivateFieldGet(this, _Jogin_magicasAtq, "f"));
            });
            dialogo.innerText = 'Pra onde você quer ir?';
            __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_opcaoCaminhar).call(this);
        });
        _Jogin_magicasSup.set(this, (e) => {
            e.currentTarget.innerText = this..nome;
            this._mudarVazio();
            e.currentTarget.setAttribute('title', this..descricao);
            for (let i = 0; i < 2; i++)
                if (magSup[i].innerText == this..nome)
                    this.['mag' + (i + 3)] = this.;
            mag.forEach((mag) => {
                mag.removeEventListener('click', __classPrivateFieldGet(this, _Jogin_magicasSup, "f"));
            });
            dialogo.innerText = 'Pra onde você quer ir?';
            __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_opcaoCaminhar).call(this);
        });
        _Jogin_nenhuma.set(this, () => {
            dialogo.innerText = `Pra onde você quer ir?`;
            mag.forEach((mag) => {
                mag.removeEventListener('click', __classPrivateFieldGet(this, _Jogin_magicasAtq, "f"));
                mag.removeEventListener('click', __classPrivateFieldGet(this, _Jogin_magicasSup, "f"));
            });
            btnNenhum.removeEventListener('click', __classPrivateFieldGet(this, _Jogin_nenhuma, "f"));
            __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_opcaoCaminhar).call(this);
        });
        _Jogin_acoes.set(this, (e) => {
            btnsAcao.forEach((btnsAcao) => {
                btnsAcao.style.display = 'none';
            });
            this. = 0;
            switch (e.currentTarget.innerText) {
                case 'Atacar':
                    if (Object.keys(this.['slot1']) != 0 || Object.keys(this.['slot2']) != 0) {
                        btnsAtq[1].disabled = false;
                        btnsAtq[1].innerText = 'Atq. armado';
                        if (this.) {
                            btnsAtq[1].style.setProperty('color', '#575CFA');
                            btnsAtq[1].style.setProperty('--bcBotoes', '#575CFA');
                        }
                    }
                    else {
                        btnsAtq[1].disabled = true;
                        btnsAtq[1].setAttribute('title', 'Você não possui uma arma, tente dar um soquinho :)');
                    }
                    function toggleMag(toggle) {
                        btnsAtq[2].disabled = !toggle;
                        !toggle ?
                            btnsAtq[2].setAttribute('title', 'Você não consegue usar magias agora, tente dar um soquinho :)') :
                            btnsAtq[2].removeAttribute('title');
                    }
                    toggleMag(false);
                    if (this. != 0)
                        btnsAtq[2].setAttribute('title', 'Não da pra usar o ataque poderoso com ataques mágicos :(');
                    else {
                        let i = 0, magiasSemMana = [];
                        for (let key in this.) {
                            var magia = this.[key];
                            if (Object.keys(magia) != 0 && i < 2)
                                if (this. < __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_calcularMana).call(this, magia.gastoMana))
                                    magiasSemMana.push(magia);
                                else
                                    toggleMag(true);
                            i++;
                        }
                        if (magiasSemMana.length >= 2 || this.)
                            toggleMag(false);
                    }
                    btnsAtq.forEach((btnsAtq) => {
                        btnsAtq.removeEventListener('click', __classPrivateFieldGet(this, _Jogin_ataqueViajante, "f"));
                    });
                    btnsAtq.forEach((btnsAtq) => {
                        btnsAtq.addEventListener('click', __classPrivateFieldGet(this, _Jogin_ataqueViajante, "f"));
                        btnsAtq.style.display = 'inline';
                    });
                    break;
                case 'Defender':
                    this. = __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_rolarAcerto).call(this, 'defesa');
                    this. = false;
                    __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_mudarVisibilidadeBotoes).call(this, 5);
                    setTimeout(() => {
                        __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_ataqueOponente).call(this);
                    }, 2000);
                    break;
                case 'Itens/magia':
                    this. = false;
                    __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_mudarVisibilidadeBotoes).call(this, 4);
                    this. = true;
                    btnNenhum.removeEventListener('click', __classPrivateFieldGet(this, _Jogin_nenhuma, "f"));
                    btnNenhum.addEventListener('click', __classPrivateFieldGet(this, _Jogin_cancelar, "f"));
                    for (let i = 0; i < 2; i++) {
                        let item = this.['slot' + (i + 4)];
                        let magia = this.['mag' + (i + 3)];
                        if (Object.keys(item) != 0 && item.usavel)
                            invSup[i].addEventListener('click', __classPrivateFieldGet(this, _Jogin_itensMagia, "f"));
                        if (Object.keys(magia) != 0)
                            magSup[i].addEventListener('click', __classPrivateFieldGet(this, _Jogin_itensMagia, "f"));
                    }
                    break;
                case 'Fugir':
                    let testeSorte = __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_rolarAcerto).call(this, 'sorte');
                    let dt = this..inteligencia * 5 + 5;
                    console.log('dt: ' + dt);
                    this. = false;
                    if (testeSorte >= dt) {
                        this._escreverContexto('Você Fugiu!');
                        turno.innerText = '';
                        this. = 0;
                        this. = 0;
                        __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_opcaoCaminhar).call(this);
                    }
                    else {
                        this._escreverContexto('Em um momento de desespero, você tenta fugir, mas a criatura te ataca.');
                        __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_mudarVisibilidadeBotoes).call(this, 5);
                        setTimeout(() => {
                            __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_ataqueOponente).call(this);
                        }, 3000);
                    }
                    break;
                default:
                    break;
            }
        });
        _Jogin_itensMagia.set(this, (e) => {
            invSup.forEach(invSup => {
                invSup.removeEventListener('click', __classPrivateFieldGet(this, _Jogin_itensMagia, "f"));
            });
            magSup.forEach(magSup => {
                magSup.removeEventListener('click', __classPrivateFieldGet(this, _Jogin_itensMagia, "f"));
            });
            for (let key in this.) {
                if (!this..hasOwnProperty(key))
                    continue;
                let item = this.[key];
                if (item.usavel)
                    if (item.nome == e.currentTarget.innerHTML.split('<span>')[1].split('</span>')[0]) {
                        item.efeito();
                    }
            }
            for (let key in this.) {
                if (!this..hasOwnProperty(key))
                    continue;
                let magia = this.[key];
                if (magia.nome == e.currentTarget.innerText) {
                    magia.efeito();
                }
            }
            __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_mudarVisibilidadeBotoes).call(this, 5);
            setTimeout(() => {
                __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_ataqueOponente).call(this);
            }, 2000);
        });
        _Jogin_ataquePoderoso.set(this, () => {
            btnPoderoso.removeEventListener('click', __classPrivateFieldGet(this, _Jogin_ataquePoderoso, "f"));
            this. = 0;
            const respAtqPoderoso = document.getElementById('respAtqPoderoso');
            for (let i = 0; i < 3; i++) {
                buttonsAtqPod[i] = document.createElement('button');
                respAtqPoderoso.appendChild(buttonsAtqPod[i]);
            }
            buttonsAtqPod[0].innerHTML = `<span>+${(parseInt(this.) + 3)}d12</span>`;
            buttonsAtqPod[1].innerHTML = `<span>+${(parseInt(this.) + 4)}d12</span>`;
            buttonsAtqPod[2].innerHTML = `<span>+${(parseInt(this.) + 5)}d12</span>`;
            buttonsAtqPod.forEach(button => {
                button.removeEventListener('click', __classPrivateFieldGet(this, _Jogin_AddDadosAtqP, "f"));
                button.disabled = true;
            });
            for (let m = 0; m < this..length; m++) {
                if (__classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_calcularMana).call(this, (this.[m] * 2 + 5)) <= this.) {
                    buttonsAtqPod[m].disabled = false;
                    buttonsAtqPod[m].addEventListener('click', __classPrivateFieldGet(this, _Jogin_AddDadosAtqP, "f"));
                }
            }
        });
        _Jogin_AddDadosAtqP.set(this, (e) => {
            this..forEach(dado => {
                if (e.currentTarget.innerText == ('+' + dado + 'd12')) {
                    this. = __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_rolarDados).call(this, 'd12', dado);
                    this. -= __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_calcularMana).call(this, (dado * 2 + 5));
                    progressbarMana.style.setProperty('--progress', this.);
                    buttonsAtqPod.forEach(btn => {
                        btn.style.display = 'none';
                    });
                    btnsAtq.forEach(btn => {
                        if (btn.innerText == 'Atq. mágico')
                            btn.disabled = true;
                    });
                    btnsAcao.forEach(btn => {
                        if (btn.innerText == 'Atacar')
                            btn.click();
                    });
                }
            });
        });
        _Jogin_ataqueViajante.set(this, (e) => {
            let vidaTirada = 0, testeForca = __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_rolarAcerto).call(this, 'forca');
            let ultimoEvento = this.;
            switch (e.currentTarget.innerText) {
                case 'Soquinho':
                    dialogo.innerText = 'Você deu um soquinho';
                    if (__classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_definirDefesaPassiva).call(this, null) <= testeForca) {
                        vidaTirada = __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_rolarDados).call(this, 'd3', 1);
                        vidaTirada += __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_adicionaisAtq).call(this);
                        if (this.) {
                            let resto = __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_recAtr).call(this, 'sorte') % 5;
                            if (__classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_recAtr).call(this, 'sorte') <= 0)
                                vidaTirada *= 2;
                            else if (resto == 0) {
                                let i = __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_recAtr).call(this, 'sorte') / 5;
                                vidaTirada *= (i + 2);
                            }
                        }
                        ultimoEvento.vida -= vidaTirada;
                        console.log('vida tirada: ' + ultimoEvento.vida);
                        console.log('defesa bicho: ' + __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_definirDefesaPassiva).call(this, null));
                        this. += vidaTirada;
                        this._escreverContexto(`Você da um soco, e acerta com ${testeForca}, tirando ${vidaTirada} de vida.`);
                    }
                    else {
                        this._escreverContexto('Em um momento de desespero, você tenta dar um soco nesta criatura, que desvia com facilidade.');
                        __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_mudarVisibilidadeBotoes).call(this, 5);
                        setTimeout(() => {
                            __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_ataqueOponente).call(this);
                        }, 2000);
                    }
                    this. = 0;
                    this. = false;
                    if (ultimoEvento.vida <= 0) {
                        __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_morteOponente).call(this, 'Com um golpe fatal, você arranca a cabeça desta criatura.');
                    }
                    else {
                        __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_mudarVisibilidadeBotoes).call(this, 5);
                        setTimeout(() => {
                            __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_ataqueOponente).call(this);
                        }, 2000);
                    }
                    break;
                case 'Atq. mágico':
                    __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_mudarVisibilidadeBotoes).call(this, 4);
                    for (let i = 0; i < magAtq.length; i++) {
                        const magia = this.['mag' + (i + 1)];
                        if (Object.keys(magia) != 0) {
                            if (this. < __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_calcularMana).call(this, magia.gastoMana)) {
                                magAtq[i].removeEventListener('mouseover', __classPrivateFieldGet(this, _Jogin_semManaOver, "f"));
                                magAtq[i].addEventListener('mouseover', __classPrivateFieldGet(this, _Jogin_semManaOver, "f"));
                            }
                            else {
                                magAtq[i].addEventListener('click', __classPrivateFieldGet(this, _Jogin_atacarMagia, "f"));
                                this.[i] = setInterval(() => {
                                    magAtq[i].style.color = mag[0].style.borderColor;
                                }, 300);
                            }
                        }
                    }
                    this. = false;
                    btnNenhum.removeEventListener('click', __classPrivateFieldGet(this, _Jogin_nenhuma, "f"));
                    btnNenhum.addEventListener('click', __classPrivateFieldGet(this, _Jogin_cancelar, "f"));
                    break;
                case 'Atq. armado':
                    console.log(this.);
                    for (let i = 0; i < 2; i++) {
                        const arma = this.['slot' + (i + 1)];
                        if (Object.keys(arma) != 0)
                            inv[i].addEventListener('click', __classPrivateFieldGet(this, _Jogin_atacarArma, "f"));
                    }
                    __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_mudarVisibilidadeBotoes).call(this, 4);
                    this. = false;
                    btnNenhum.removeEventListener('click', __classPrivateFieldGet(this, _Jogin_nenhuma, "f"));
                    btnNenhum.addEventListener('click', __classPrivateFieldGet(this, _Jogin_cancelar, "f"));
                    break;
                default:
                    break;
            }
        });
        _Jogin_atacarMagia.set(this, (e) => {
            mag.forEach(mag => {
                mag.removeEventListener('click', __classPrivateFieldGet(this, _Jogin_atacarMagia, "f"));
            });
            magAtq.forEach(e => {
                e.removeEventListener('mouseover', __classPrivateFieldGet(this, _Jogin_semManaOver, "f"));
                e.removeEventListener('mouseout', __classPrivateFieldGet(this, _Jogin_semManaOut, "f"));
            });
            let i = 0;
            while (i < this..length) {
                clearInterval(this.[i]);
                magAtq[i].style.color = 'white';
                i++;
            }
            let vidaTirada = 0, testeInt = __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_rolarAcerto).call(this, 'inteligencia');
            let ultimoEvento = this.;
            for (var key in this.) {
                if (!this..hasOwnProperty(key))
                    continue;
                let magia = this.[key];
                if (magia.nome == e.currentTarget.innerText) {
                    vidaTirada += __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_rolarDados).call(this, 'd3', (__classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_recAtr).call(this, 'inteligencia') + 1));
                    if (this.) {
                        let resto = __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_recAtr).call(this, 'sorte') % 5;
                        if (__classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_recAtr).call(this, 'sorte') <= 0)
                            vidaTirada *= 2;
                        else if (resto == 0) {
                            let i = __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_recAtr).call(this, 'sorte') / 5;
                            vidaTirada *= (i + 2);
                        }
                    }
                    if (__classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_rolarAcertoOponente).call(this, 'vigor') <= testeInt) {
                        vidaTirada += magia.efeito();
                        ultimoEvento.vida -= vidaTirada;
                    }
                    else {
                        vidaTirada += magia.efeito();
                        vidaTirada = Math.floor(vidaTirada / 2);
                        ultimoEvento.vida -= vidaTirada;
                    }
                    this. -= __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_calcularMana).call(this, magia.gastoMana);
                    progressbarMana.style.setProperty('--progress', this.);
                    this._escreverContexto(`Você acerta sua magia com ${testeInt}, tirando ${vidaTirada} de vida.`);
                    console.log('vida tirada: ' + ultimoEvento.vida);
                    if (ultimoEvento.vida <= 0) {
                        __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_morteOponente).call(this, 'Em uma explosão de mana, você oblitera esta criatura.');
                    }
                    else {
                        __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_mudarVisibilidadeBotoes).call(this, 5);
                        this. += vidaTirada;
                        setTimeout(() => {
                            __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_ataqueOponente).call(this);
                        }, 2000);
                    }
                    break;
                }
            }
        });
        _Jogin_atacarArma.set(this, (e) => {
            inv.forEach(k => {
                k.removeEventListener('click', __classPrivateFieldGet(this, _Jogin_atacarArma, "f"));
            });
            let ultimoEvento = this., vidaTirada = 0;
            let testeForca = __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_rolarAcerto).call(this, 'forca');
            for (let key in this.) {
                if (!this..hasOwnProperty(key))
                    continue;
                let armaAtual = this.[key];
                if (armaAtual.nome == e.currentTarget.innerHTML.split('<span>')[1].split('</span>')[0]) {
                    if (__classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_definirDefesaPassiva).call(this, null) <= testeForca) {
                        vidaTirada = armaAtual.efeito();
                        vidaTirada += __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_adicionaisAtq).call(this);
                        if (this.) {
                            let resto = __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_recAtr).call(this, 'sorte') % 5;
                            if (__classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_recAtr).call(this, 'sorte') <= 0)
                                vidaTirada *= 2;
                            else if (resto == 0) {
                                let i = __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_recAtr).call(this, 'sorte') / 5;
                                vidaTirada *= (i + 2);
                            }
                        }
                        ultimoEvento.vida = ultimoEvento.vida - vidaTirada;
                        this._escreverContexto(`Você acerta com ${testeForca} em seu teste, tirando ${vidaTirada} de vida. `);
                        console.log('vida tirada: ' + ultimoEvento.vida);
                        console.log('defesa bicho: ' + __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_definirDefesaPassiva).call(this));
                        this. = 0;
                        this. = false;
                        if (ultimoEvento.vida <= 0) {
                            __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_morteOponente).call(this, armaAtual.msgMorte);
                        }
                        else {
                            __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_mudarVisibilidadeBotoes).call(this, 5);
                            this. += vidaTirada;
                            setTimeout(() => {
                                __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_ataqueOponente).call(this);
                            }, 2500);
                        }
                    }
                }
            }
        });
        _Jogin_cancelar.set(this, () => {
            invSup.forEach(invSup => {
                invSup.removeEventListener('click', __classPrivateFieldGet(this, _Jogin_itensMagia, "f"));
            });
            magSup.forEach(magSup => {
                magSup.removeEventListener('click', __classPrivateFieldGet(this, _Jogin_itensMagia, "f"));
            });
            magAtq.forEach(e => {
                e.removeEventListener('mouseover', __classPrivateFieldGet(this, _Jogin_semManaOver, "f"));
                e.removeEventListener('mouseout', __classPrivateFieldGet(this, _Jogin_semManaOut, "f"));
            });
            let i = 0;
            while (i < this..length) {
                clearInterval(this.[i]);
                this._mudarVazio();
                i++;
            }
            mag.forEach(mag => {
                mag.removeEventListener('click', __classPrivateFieldGet(this, _Jogin_atacarMagia, "f"));
            });
            inv.forEach(inv => {
                inv.removeEventListener('click', __classPrivateFieldGet(this, _Jogin_atacarArma, "f"));
            });
            __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_mudarVisibilidadeBotoes).call(this, this. ? 1 : 3);
            btnNenhum.removeEventListener('click', __classPrivateFieldGet(this, _Jogin_cancelar, "f"));
        });
        _Jogin_eventoAndar.set(this, (e) => {
            this. = e.currentTarget.innerText.toLowerCase();
            __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_escolherMapa).call(this);
        });
        _Jogin_btnSN.set(this, (e) => {
            const valor = e.currentTarget.innerHTML;
            let contentSpanAC = document.createElement('span');
            let contentSpanAD = document.createElement('span');
            let contentSpanCo = document.createElement('span');
            let contentSpanPo = document.createElement('span');
            let contentSpanAm = document.createElement('span');
            let contentSpanAr = document.createElement('span');
            this._mudarVazio();
            switch (valor) {
                case "Sim":
                    switch (this..tipo) {
                        case 'armaCaC':
                            __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_adicionar).call(this, contentSpanAC, inv[0], divContent1, imgContent1, hover[0], 'slot1');
                            break;
                        case 'armaDis':
                            __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_adicionar).call(this, contentSpanAD, inv[1], divContent2, imgContent2, hover[1], 'slot2');
                            break;
                        case 'armadura':
                            __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_adicionar).call(this, contentSpanAr, inv[2], divContent3, imgContent3, hover[2], 'slot3');
                            break;
                        case 'pocao':
                            __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_adicionar).call(this, contentSpanPo, inv[3], divContent4, imgContent4, hover[3], 'slot4');
                            break;
                        case 'comida':
                            __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_adicionar).call(this, contentSpanCo, inv[3], divContent4, imgContent4, hover[3], 'slot4');
                            break;
                        case 'amuleto':
                            __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_adicionar).call(this, contentSpanAm, inv[4], divContent5, imgContent5, hover[4], 'slot5');
                            break;
                        default:
                            break;
                    }
                    this._mudarVazio();
                    break;
                case "Não":
                    dialogo.innerText = 'Pra onde você quer ir?';
                    __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_opcaoCaminhar).call(this);
                    break;
                default:
                    break;
            }
        });
        this._mapaEscolhido = 0;
        this._ultimoMapa = 0;
        this._ultimoLugar = '';
        this._ultimoEvento = {};
        this._ultimoEventoVida = {};
        this._usos = [];
        this._nome = '';
        this._atributos = {
            forca: 0,
            defesa: 0,
            inteligencia: 0,
            vigor: 0,
            agilidade: 0,
            sorte: 0,
        },
            this._constVigor = 0;
        this._pontosVida = 20;
        this._pontosMana = 20;
        this._vida = 100;
        this._mana = 100;
        this._experiencia = 0;
        this._nivel = 0;
        this._pontos = 0;
        this._todosPontos = 0;
        this._validarUpar = false;
        this._inventario = {
            slot1: {},
            slot2: {},
            slot3: {},
            slot4: {},
            slot5: {}
        };
        this._magiasAtuais = {
            mag1: {},
            mag2: {},
            mag3: {},
            mag4: {},
        };
        this._condicao = 'NORMAL';
        this._habilidadesAtuais = [];
        this._critico = false;
        this._furtivo = false;
        this._validarPoderoso = false;
        this._dadosAtqPod = [];
        this._testeDefesa = 0;
        this._contadorDano = 0;
        this._somaDano = 0;
        this._acumuloAtqPod = 0;
        this._contagemTurno = 0;
        this._intervaloProMana = 0;
        this._intervaloValMag0 = 0;
        this._intervaloValMag1 = 0;
        this._intervaloValMags = [this._intervaloValMag0, this._intervaloValMag1];
        this._cancelarToggle = false;
        this._numHabilidades = 0;
        this._constNumHab = 0;
        btnUpar === null || btnUpar === void 0 ? void 0 : btnUpar.addEventListener('mouseover', __classPrivateFieldGet(this, _Jogin_mouseOverUpar, "f"));
        btnUpar === null || btnUpar === void 0 ? void 0 : btnUpar.addEventListener('mouseout', __classPrivateFieldGet(this, _Jogin_mouseOutUpar, "f"));
        this._mudarVazio();
        __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_definirIntro).call(this);
        __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_definirCondicao).call(this);
    }
    _mudarVazio() {
        inv.forEach(e => {
            if (e.innerText != '[vazio]')
                e.style.color = 'white';
            else
                e.style.color = 'rgba(255, 255, 255, 0.499)';
        });
        mag.forEach(e => {
            if (e.innerText != '[vazio]')
                e.style.color = 'white';
            else
                e.style.color = 'rgba(255, 255, 255, 0.499)';
        });
    }
    _escreverContexto(texto) {
        contexto === null || contexto === void 0 ? void 0 : contexto.append(texto + '\n\n');
        contexto && (contexto.scrollTop = contexto.scrollHeight);
    }
    _inserirHtmlContexto(elemento, texto, prop, value) {
        const elementoCriado = document.createElement(elemento);
        elementoCriado.innerText = `${texto} \n\n`;
        elementoCriado.style.setProperty(prop, value);
        contexto === null || contexto === void 0 ? void 0 : contexto.appendChild(elementoCriado);
        contexto && (contexto.scrollTop = contexto.scrollHeight);
    }
}
_Jogin_eventos = new WeakMap(), _Jogin_semManaOver = new WeakMap(), _Jogin_semManaOut = new WeakMap(), _Jogin_mouseOverUpar = new WeakMap(), _Jogin_mouseOutUpar = new WeakMap(), _Jogin_clickUpar = new WeakMap(), _Jogin_clickHabilidades = new WeakMap(), _Jogin_clickBtnMais = new WeakMap(), _Jogin_clickBtnMenos = new WeakMap(), _Jogin_clickPronto = new WeakMap(), _Jogin_magicasAtq = new WeakMap(), _Jogin_magicasSup = new WeakMap(), _Jogin_nenhuma = new WeakMap(), _Jogin_acoes = new WeakMap(), _Jogin_itensMagia = new WeakMap(), _Jogin_ataquePoderoso = new WeakMap(), _Jogin_AddDadosAtqP = new WeakMap(), _Jogin_ataqueViajante = new WeakMap(), _Jogin_atacarMagia = new WeakMap(), _Jogin_atacarArma = new WeakMap(), _Jogin_cancelar = new WeakMap(), _Jogin_eventoAndar = new WeakMap(), _Jogin_btnSN = new WeakMap(), _Jogin_instances = new WeakSet(), _Jogin_mudarVisibilidadeBotoes = function _Jogin_mudarVisibilidadeBotoes(ctx) {
    let botoes = [btnsAndar, btnsAcao, btnsSN, btnsAtq];
    botoes.forEach(e => {
        e.forEach(e => { e.style.display = 'none'; });
    });
    if (ctx <= 3)
        botoes[ctx].forEach(e => { e.style.display = 'inline'; });
    ctx == 4 ? btnNenhum && (btnNenhum.style.display = 'inline') :
        btnNenhum && (btnNenhum.style.display = 'none');
    ctx == 5 ? turnoBicho && (turnoBicho.style.display = 'block') :
        turnoBicho && (turnoBicho.style.display = 'none');
}, _Jogin_definirIntro = function _Jogin_definirIntro() {
    for (var i = btnsAndar.length - 1; i >= 0; i--) {
        btnsAndar[i].style.display = 'none';
        btnsAcao[i].style.display = 'none';
    }
    for (var i = btnsSN.length - 1; i >= 0; i--) {
        btnsSN[i].style.display = 'none';
    }
    for (var i = btnsAtq.length - 1; i >= 0; i--) {
        btnsAtq[i].style.display = 'none';
    }
    btnNenhum && (btnNenhum.style.display = 'none');
    respostas[0].style.display = 'none';
    infos[0].style.display = 'none';
    hud[0].style.display = 'none';
    dialogo && (dialogo.innerText = "Que bom que você esteja aqui!");
    let n = 3;
    if (n == 3) {
        dialogo && (dialogo.innerText = "Vamos começar com seu nome:");
        btnContinuar && (btnContinuar.style.display = 'none');
        respostas[0].style.display = 'block';
        infos[0].style.display = 'flex';
        hud[0].style.display = 'flex';
        definirVida();
        definirMana();
        contexto && (contexto.append('A luz da lua irradia pela a fresta sobre sua cabeça, o ambiente está gelado, você consegue ver algo escrito na parede a sua frente. \n\n'));
        const resposta = document.querySelector('#inputResposta');
        resposta === null || resposta === void 0 ? void 0 : resposta.focus();
        resposta === null || resposta === void 0 ? void 0 : resposta.addEventListener('keyup', (e) => {
            var key = e.which || e.keyCode;
            if (key == 13) {
                if (resposta && (resposta.value != "")) {
                    this._nome = resposta.value;
                    dialogo && (dialogo.innerText = "Olá " + this._nome + ", para onde você quer ir?");
                    resposta.style.display = "none";
                    __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_opcaoCaminhar).call(this);
                }
                else {
                    resposta.placeholder = 'Não entendi o seu nome';
                }
            }
        });
    }
}, _Jogin_definirExp = function _Jogin_definirExp(xp) {
    progressbarXP.style.setProperty('--progress', parseFloat(xp));
}, _Jogin_definirCondicao = function _Jogin_definirCondicao() {
    switch (condicao.innerText) {
        case 'NORMAL':
            condicao.setAttribute('title', 'Nada está acontecendo, pelo menos, eu acho.');
            break;
        case 'CONGELAMENTO':
            condicao.style.setProperty('color', '#78B6E6');
            condicao.removeAttribute('title');
            condicao.setAttribute('title', '1.A cada rodada, você rolará um teste de vigor, se falhar, perderá seu turno. \n2.Você terá -10 em qualquer teste com agilidade.');
            break;
        case 'EM CHAMAS':
            condicao.style.setProperty('color', '#C71639');
            condicao.removeAttribute('title');
            condicao.setAttribute('title', '1.A cada rodada, você rolará um teste de vigor, se falhar, perderá 1d8 de vida. \n2.A cada rodada, você terá -1 a cada rodada em quaisquer teste de força, sendo o máximo de -10 pontos.');
            break;
        case 'ENVENENAMENTO':
            condicao.style.setProperty('color', '#8CF201');
            condicao.removeAttribute('title');
            condicao.setAttribute('title', 'A cada rodada, você rolará um teste de vigor, inversamente proporcional ao valor você perderá entre 1d3 e 1d6+3 de vida.');
            break;
        case 'EM MALDIÇÃO':
            condicao.style.setProperty('color', '#5A1846');
            condicao.removeAttribute('title');
            condicao.setAttribute('title', 'A cada rodada, você rolará um teste de vigor, se falhar, você perderá entre 1d3 e 1d6+3% de mana.');
            break;
        case 'FRAQUEZA':
            condicao.style.setProperty('color', '#FF5733');
            condicao.removeAttribute('title');
            condicao.setAttribute('title', 'A cada rodada, você rolará um teste de vigor, se falhar, você perderá 1 dado de força.');
            break;
        case 'EM PARALISIA':
            condicao.style.setProperty('color', '#FFC300');
            condicao.removeAttribute('title');
            condicao.setAttribute('title', '1.A cada rodada, você rolará um teste de vigor, se falhar, você perderá seu turno. \n2.Você não pode fazer ataques furtivos. \n3.Sua ação sempre será a última.');
            break;
        case 'VULNERÁVEL':
            condicao.style.setProperty('color', '#000');
            condicao.removeAttribute('title');
            condicao.setAttribute('title', '1.A cada rodada, você rolará um teste de vigor, se falhar, você tomará o dobro de dano fisíco e ganhará 1 dado de defesa, fica a dica ;)');
            break;
        case 'CONFUSÃO':
            condicao.style.setProperty('color', '');
            condicao.removeAttribute('title');
            condicao.setAttribute('title', 'A cada rodada você terá 50% de chance de errar ataques mágicos');
            break;
        case 'CANSAÇO':
            condicao.style.setProperty('color', '');
            condicao.removeAttribute('title');
            condicao.setAttribute('title', '1.Você não pode fazer testes de vigor e terá -5 em testes de agilidade. \n2.Esta condição tem prioridade e se encerrará quando você tentar se defender.');
            break;
        default:
            break;
    }
}, _Jogin_aleatorizar = function _Jogin_aleatorizar() {
    const chance = Math.floor(Math.random() * 500);
    if (chance <= 180)
        this. = 0;
    if (chance > 180 && chance <= 275)
        this. = 1;
    if (chance > 275 && chance <= 370)
        this. = 2;
    if (chance > 370 && chance <= 450)
        this. = 3;
    if (chance > 450)
        this. = 4;
}, _Jogin_rolarDados = function _Jogin_rolarDados(tipoDados, qntDados) {
    let dados = [], result = 0;
    switch (tipoDados) {
        case 'd3':
            for (var i = 1; i <= qntDados; i++) {
                result += Math.floor(Math.random() * (4 - 1) + 1);
            }
            console.log(tipoDados + ':' + result);
            return result;
        case 'd6':
            for (var i = 1; i <= qntDados; i++) {
                result += Math.floor(Math.random() * (7 - 1) + 1);
            }
            console.log(tipoDados + ':' + result);
            return result;
        case 'd8':
            for (var i = 1; i <= qntDados; i++) {
                result += Math.floor(Math.random() * (9 - 1) + 1);
            }
            console.log(tipoDados + ':' + result);
            return result;
        case 'd10':
            for (var i = 1; i <= qntDados; i++) {
                result += Math.floor(Math.random() * (11 - 1) + 1);
            }
            console.log(tipoDados + ':' + result);
            return result;
        case 'd12':
            for (var i = 1; i <= qntDados; i++) {
                result += Math.floor(Math.random() * (13 - 1) + 1);
            }
            console.log(tipoDados + ':' + result);
            return result;
        case 'd20':
            for (var i = 1; i <= qntDados; i++) {
                dados.push(Math.floor(Math.random() * (21 - 1) + 1));
            }
            result = Math.max.apply(null, dados);
            result = 20;
            if (result == this.)
                this. = true;
            else
                this. = false;
            console.log(dados);
            console.log(tipoDados + ':' + result);
            return result;
        default:
            console.log('Escolha um dado adequado');
            break;
    }
}, _Jogin_rolarAcertoOponente = function _Jogin_rolarAcertoOponente(atributo) {
    console.log('teste oponente: ' + atributo);
    return __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_rolarDados).call(this, 'd20', (this.[atributo] + 1));
}, _Jogin_rolarAcerto = function _Jogin_rolarAcerto(atributo) {
    console.log('teste viajante: ' + atributo);
    let teste = __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_rolarDados).call(this, 'd20', (__classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_recAtr).call(this, atributo) + 1)) + this.[atributo];
    console.log(teste);
    return teste;
}, _Jogin_recAtr = function _Jogin_recAtr(atributo) {
    return this.[atributo];
}, _Jogin_calcularMana = function _Jogin_calcularMana(mana) {
    return Math.floor((mana * 100) / this. - this.);
}, _Jogin_calcularVida = function _Jogin_calcularVida(vida) {
    return Math.floor((vida * 100) / this.);
}, _Jogin_dano = function _Jogin_dano() {
    this. -= __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_calcularVida).call(this, this..dano());
    progressbarVida.style.setProperty('--progress', this.);
    this._escreverContexto(this..nome + ', ' + this..textoAtaques[Math.floor(Math.random() * (this..textoAtaques.length))]);
}, _Jogin_eventoUpar = function _Jogin_eventoUpar() {
    let dtNivel;
    this. == 0 ? dtNivel = 200 : dtNivel = 100 * this. * 3;
    let xp = this. / (dtNivel / 100);
    __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_definirExp).call(this, xp);
    if (this. >= dtNivel) {
        this.++;
        lvl.innerText = 'Nível: ' + this.;
        this. += this. + 5;
        pnts.innerText = 'Pontos: ' + this.;
        this._constVigor = __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_recAtr).call(this, 'vigor');
        this. = this.;
        let obValues = Object.values(this.);
        obValues.forEach(obValue => {
            this. += obValue;
        });
        this. == 1 ? this. = 2 : this. = this. + 2;
        this. = this.;
        this. = 0;
        __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_definirExp).call(this, this.);
        btnUpar.innerText = 'Você pode subir de nível';
        btnUpar.style.color = 'green';
        btnUpar.style.padding = '2px 10px 2px 5px';
        setTimeout(() => {
            btnUpar.innerText = '+';
            btnUpar.style.color = 'white';
            btnUpar.style.padding = '2px 2px 2px 5px';
        }, 2000);
        return true;
    }
    return false;
}, _Jogin_upgradeAtributos = function _Jogin_upgradeAtributos() {
    blurr = document.createElement('div');
    blurr.setAttribute('id', 'blur');
    document.body.appendChild(blurr);
    let tituloUp = document.createElement('h1');
    tituloUp.setAttribute('id', 'tituloNiv');
    tituloUp.innerText = 'Subiu de nível !';
    blurr.appendChild(tituloUp);
    setTimeout(() => {
        tituloUp.style.opacity = '1';
    }, 200);
    setTimeout(() => {
        tituloUp.style.margin = '10px';
        tituloUp.style.width = '100%';
    }, 1200);
    let telaUps = document.createElement('div');
    telaUps.setAttribute('id', 'telaUps');
    let upHabilidades = document.createElement('div');
    upHabilidades.setAttribute('id', 'upHabilidades');
    let tituloHb = document.createElement('h3');
    tituloHb.setAttribute('id', 'tituloHb');
    tituloHb.innerText = 'Habilidades:';
    upHabilidades.appendChild(tituloHb);
    let divListaHB = document.createElement('div');
    divListaHB.setAttribute('id', 'listaHB');
    this..forEach(k => {
        if (k.nivel <= this. && !k.adiquirida) {
            let divChecks = document.createElement('div');
            divChecks.setAttribute('class', 'divChecks');
            divChecks.setAttribute('id', k.id);
            divChecks.setAttribute('title', k.descricao);
            divChecks.innerText = k.nome;
            divListaHB.appendChild(divChecks);
        }
    });
    upHabilidades.appendChild(divListaHB);
    let divQntsHab = document.createElement('div');
    divQntsHab.setAttribute('id', 'divQntsHab');
    divQntsHab.innerText = 'Você pode escolher até ' + this. + ' habilidades';
    upHabilidades.appendChild(divQntsHab);
    let linha = document.createElement('div');
    linha.setAttribute('id', 'linha');
    let upAtributos = document.createElement('div');
    upAtributos.setAttribute('id', 'upAtributos');
    let tituloAt = document.createElement('h3');
    tituloAt.setAttribute('id', 'tituloAt');
    tituloAt.innerText = 'Atributos:';
    upAtributos.appendChild(tituloAt);
    let listaAt = document.createElement('div');
    listaAt.setAttribute('id', 'listaAt');
    let ptns = document.createElement('div');
    ptns.setAttribute('id', 'ptns');
    ptns.innerText = 'Pontos: ' + this.;
    let obKeys = Object.keys(this.);
    let atriIndex = 0;
    const atri = document.querySelectorAll('.atributos');
    atri.forEach(e => {
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.width = '100%';
        div.style.justifyContent = 'space-between';
        const divBtns = document.createElement('div');
        let btnMais = document.createElement('button');
        btnMais.setAttribute('id', `${obKeys[atriIndex]}`);
        btnMais.setAttribute('class', 'btnsMais');
        btnMais.innerText = '+';
        let btnMenos = document.createElement('button');
        btnMenos.setAttribute('id', `${obKeys[atriIndex]}`);
        btnMenos.setAttribute('class', 'btnsMenos');
        btnMenos.innerText = '-';
        divBtns.appendChild(btnMais);
        divBtns.appendChild(btnMenos);
        const divAtrs = document.createElement('span');
        divAtrs.setAttribute('id', 'divAtrs');
        divAtrs.innerText = e.innerText.split(':')[0] + ': ' + this.[obKeys[atriIndex]];
        div.appendChild(divAtrs);
        div.appendChild(divBtns);
        listaAt.appendChild(div);
        atriIndex++;
    });
    upAtributos.appendChild(listaAt);
    upAtributos.appendChild(ptns);
    telaUps.appendChild(upHabilidades);
    telaUps.appendChild(linha);
    telaUps.appendChild(upAtributos);
    let btnPronto = document.createElement('button');
    btnPronto.setAttribute('id', 'btnPronto');
    btnPronto.innerText = 'Pronto';
    setTimeout(() => {
        blurr.appendChild(telaUps);
        blurr.appendChild(btnPronto);
        elDivChecks = document.querySelectorAll('.divChecks');
        elDivChecks.forEach(div => {
            div.addEventListener('click', __classPrivateFieldGet(this, _Jogin_clickHabilidades, "f"));
        });
        btnMais = document.querySelectorAll('.btnsMais');
        btnMenos = document.querySelectorAll('.btnsMenos');
        btnMais.forEach(btn => {
            btn.addEventListener('click', __classPrivateFieldGet(this, _Jogin_clickBtnMais, "f"));
        });
        btnMenos.forEach(btn => {
            btn.addEventListener('click', __classPrivateFieldGet(this, _Jogin_clickBtnMenos, "f"));
        });
        btnPronto.addEventListener('click', __classPrivateFieldGet(this, _Jogin_clickPronto, "f"));
        setTimeout(() => {
            telaUps.style.position = 'static';
            telaUps.style.opacity = '1';
            btnPronto.style.opacity = '1';
            blurr.style.alignContent = 'space-around';
        }, 200);
    }, 2000);
}, _Jogin_iniciarBatalha = function _Jogin_iniciarBatalha() {
    this.++;
    turno.innerText = `Turno: ${this.}`;
    console.log('somadano: ' + this.);
    btnPoderoso.setAttribute('title', 'Atq.Poderoso precisa ser carregado');
    this. = false;
    this. = [];
    if (this. > 0) {
        this. = 50 * (this.);
        console.log('contador dano: ' + this.);
        if (this. <= 45 && this. >= this.) {
            for (let i = 0; i < 3; i++)
                this..push(parseInt(this.) + (i + 3));
            let contar = 0;
            this..forEach(dado => {
                if (__classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_calcularMana).call(this, dado * 2 + 5) > this.)
                    contar++;
            });
            if (contar < 3) {
                btnPoderoso.removeAttribute('title');
                btnPoderoso.addEventListener('click', __classPrivateFieldGet(this, _Jogin_ataquePoderoso, "f"));
                this. = true;
            }
        }
    }
    btnPoderoso.disabled = !this.;
    if (!this.) {
        btnsAcao.forEach(btnAcao => {
            btnAcao.style.setProperty('color', 'white');
            btnAcao.style.setProperty('--bcBotoes', 'white');
        });
        btnsAtq.forEach(btnAtq => {
            btnAtq.style.setProperty('--bcBotoes', 'white');
            if (!btnAtq.disabled)
                btnAtq.style.setProperty('color', 'white');
        });
    }
    __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_mudarVisibilidadeBotoes).call(this, 1);
    btnsAcao.forEach((btnsAcao) => {
        btnsAcao.removeEventListener('click', __classPrivateFieldGet(this, _Jogin_acoes, "f"));
    });
    btnsAcao.forEach((btnsAcao) => {
        btnsAcao.addEventListener('click', __classPrivateFieldGet(this, _Jogin_acoes, "f"));
    });
}, _Jogin_iniciarTurnoOp = function _Jogin_iniciarTurnoOp() {
    this. = -1;
    this.++;
    __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_mudarVisibilidadeBotoes).call(this, 5);
    setTimeout(() => {
        __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_ataqueOponente).call(this);
    }, 3000);
}, _Jogin_rolarAtaqueFurtivo = function _Jogin_rolarAtaqueFurtivo() {
    let testeAgi = __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_rolarAcerto).call(this, 'agilidade'), testeIntOp = __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_rolarAcertoOponente).call(this, 'inteligencia');
    testeAgi > testeIntOp ? this. = true :
        this. = false;
    console.log(this.);
    btnsAcao[1].innerText = 'Fugir';
    btnsAcao[0].style.setProperty('color', '#575CFA');
    btnsAcao[0].style.setProperty('--bcBotoes', '#575CFA');
    btnsAtq[0].style.setProperty('color', '#575CFA');
    btnsAtq[0].style.setProperty('--bcBotoes', '#575CFA');
    this._inserirHtmlContexto('span', 'Possibilidade de ataque furtivo!', 'color', '#575CFA');
    __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_iniciarBatalha).call(this);
}, _Jogin_definirDefesaPassiva = function _Jogin_definirDefesaPassiva(ctx) {
    let defesaPassiva = 5 + this.;
    if (ctx == 'vig') {
        defesaPassiva += this.;
        if (__classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_recAtr).call(this, 'defesa') != 0)
            defesaPassiva = ((this..defesa + 1) * defesaPassiva) + 5;
    }
    else {
        if (this..defesa != 0)
            defesaPassiva = ((this..defesa + 1) * defesaPassiva) + 5;
    }
    return defesaPassiva;
}, _Jogin_ataqueOponente = function _Jogin_ataqueOponente() {
    btnsAcao[1].innerText = 'Defender';
    let usarMagias = false;
    let ultimoEvento = this.;
    Object.keys(ultimoEvento).forEach(key => {
        if (key == 'magias')
            usarMagias = (Math.floor(Math.random() * 100) < 50) ? true : false;
    });
    while (usarMagias || !usarMagias) {
        console.log('usou magia? ' + usarMagias);
        switch (usarMagias) {
            case true:
                let numMagia = Math.floor(Math.random() * Object.keys(ultimoEvento.magias).length);
                if (this..length <= 0)
                    this..push(ultimoEvento.magias[numMagia].usos);
                else
                    this..push(this.[this..length - 1] - 1);
                if (this..length > ultimoEvento.magias[numMagia].usos + 1)
                    this..pop();
                console.log('usos: ' + this.);
                if (this.[this..length - 1] > 0) {
                    if (this. != 0) {
                        this._inserirHtmlContexto('span', 'Não há como defender ataques mágicos', 'text-decoration', 'underline');
                    }
                    if (__classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_rolarAcerto).call(this, 'vigor') <= __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_rolarAcertoOponente).call(this, 'inteligencia'))
                        this. -= __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_calcularVida).call(this, ultimoEvento.magias[numMagia].efeito());
                    else {
                        this. -= (__classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_calcularVida).call(this, ultimoEvento.magias[numMagia].efeito()) / 2);
                        console.log("metade do dano");
                    }
                    __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_definirCondicao).call(this);
                    progressbarVida.style.setProperty('--progress', this.);
                }
                else {
                    usarMagias = false;
                    continue;
                }
                break;
            case false:
                if (this. != 0) {
                    if (__classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_rolarAcertoOponente).call(this, 'forca') >= this.)
                        __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_dano).call(this);
                }
                else {
                    if (__classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_definirDefesaPassiva).call(this, 'vig') <= __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_rolarAcertoOponente).call(this, 'forca'))
                        __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_dano).call(this);
                }
                break;
            default:
                console.log('Erro no ataque do oponente.');
                break;
        }
        break;
    }
    console.log('vida: ' + this.);
    turnoBicho.style.display = 'none';
    __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_iniciarBatalha).call(this);
}, _Jogin_adicionaisAtq = function _Jogin_adicionaisAtq() {
    let vidaTirada = 0;
    let forca = __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_recAtr).call(this, 'forca');
    forca > 0 ? vidaTirada += __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_rolarDados).call(this, 'd3', forca) : '';
    console.log(this.);
    vidaTirada += this.;
    if (this.)
        vidaTirada += __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_rolarDados).call(this, 'd6', (__classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_recAtr).call(this, 'agilidade') + 2));
    return vidaTirada;
}, _Jogin_morteOponente = function _Jogin_morteOponente(msg) {
    this._escreverContexto(msg);
    this..vida = this.;
    this. = [];
    turno.innerText = '';
    this. = 0;
    this. = 0;
    this. = 0;
    this. += this..exp;
    if (__classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_eventoUpar).call(this))
        this. = true;
    __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_opcaoCaminhar).call(this);
}, _Jogin_opcaoCaminhar = function _Jogin_opcaoCaminhar() {
    __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_mudarVisibilidadeBotoes).call(this, 0);
    btnsAndar.forEach((btnsAndar) => {
        btnsAndar.removeEventListener('click', __classPrivateFieldGet(this, _Jogin_eventoAndar, "f"));
    });
    btnsAndar.forEach((btnsAndar) => {
        btnsAndar.addEventListener('click', __classPrivateFieldGet(this, _Jogin_eventoAndar, "f"));
    });
}, _Jogin_escolherMapa = function _Jogin_escolherMapa() {
    let ultimaAndada = this.;
    let eventos = [];
    this. = maaaaaaaaaaaaaa[Math.floor(Math.random() * maaaaaaaaaaaaaa.length)];
    if (this. < 5 && this. == 4)
        this. = 0;
    __classPrivateFieldGet(this, _Jogin_eventos, "f").forEach(e => {
        if (e.classe == this.)
            eventos.push(e);
    });
    dialogo.innerText = `Você andou para ${ultimaAndada} e encontrou...`;
    if (this. == 0) {
        const escolha = Math.floor(Math.random() * 10);
        this._escreverContexto(eventos[escolha].descricao[Math.floor(Math.random() * 5)] + '');
        this. = eventos[escolha];
    }
    else if (this. == 1) {
        const escolha = Math.floor(Math.random() * 7);
        this._escreverContexto(eventos[escolha].descricao);
        this. = eventos[escolha];
        if (this..tipo == 'pocao') {
            dialogo.innerHTML = `<b style="color: yellow" > &#9888 Poções podem substituir comidas</b>`;
            invSup[0].style.color = 'yellow';
        }
        if (this..tipo == 'comida') {
            dialogo.innerHTML = `<b style="color: yellow" > &#9888 Comidas podem substituir poções</b>`;
            invSup[0].style.color = 'yellow';
        }
        __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_mudarVisibilidadeBotoes).call(this, 2);
        btnsSN.forEach(e => {
            e.removeEventListener("click", __classPrivateFieldGet(this, _Jogin_btnSN, "f"));
        });
        btnsSN.forEach(e => {
            e.addEventListener("click", __classPrivateFieldGet(this, _Jogin_btnSN, "f"));
        });
    }
    else if (this. == 2) {
        const escolha = Math.floor(Math.random() * 3);
        this._escreverContexto(eventos[escolha].descricao);
        this. = eventos[escolha];
        __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_mudarVisibilidadeBotoes).call(this, 4);
        btnNenhum.removeEventListener('click', __classPrivateFieldGet(this, _Jogin_cancelar, "f"));
        btnNenhum.addEventListener('click', __classPrivateFieldGet(this, _Jogin_nenhuma, "f"));
        if (this..tipo == 'atq')
            magAtq.forEach(magAtq => {
                magAtq.addEventListener('click', __classPrivateFieldGet(this, _Jogin_magicasAtq, "f"));
            });
        else if (this..tipo == 'sup')
            magSup.forEach(magSup => {
                magSup.addEventListener('click', __classPrivateFieldGet(this, _Jogin_magicasSup, "f"));
            });
    }
    else if (this. == 3) {
        dialogo.append(' Prepare-se para batalha');
        const escolha = Math.floor(Math.random() * 1);
        this._escreverContexto(eventos[escolha].descricao);
        this. = eventos[escolha];
        this. = this..vida;
        let testeAgi = __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_rolarAcerto).call(this, 'agilidade'), testeAgiOp = __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_rolarAcertoOponente).call(this, 'agilidade');
        while (testeAgiOp == testeAgi) {
            if (this..agilidade != this..agilidade) {
                testeAgi += this..agilidade;
                testeAgiOp += this..agilidade;
            }
            else {
                testeAgi = __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_rolarAcerto).call(this, 'agilidade');
                testeAgiOp = __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_rolarAcertoOponente).call(this, 'agilidade');
            }
        }
        testeAgi >= testeAgiOp ? __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_rolarAtaqueFurtivo).call(this) : __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_iniciarTurnoOp).call(this);
    }
    else if (this. == 4) {
        dialogo.innerText = `Você andou para ${ultimaAndada} e encontrou... Para onde você quer ir?`;
        const escolha = "m" + this. + (Math.floor(Math.random() * (1 - 1)) + 1);
        this._escreverContexto(eventos[escolha].descricao);
        ultimoEvento = eval(escolha);
        iniciarBatalha();
    }
    this. = this.;
}, _Jogin_adicionar = function _Jogin_adicionar(span, elemento, div, img, hover, slot) {
    span.innerHTML = this..nome;
    elemento.removeAttribute('title');
    elemento.childNodes[0].replaceWith(span);
    div.innerText = this..descricao;
    img.setAttribute('src', this..imgArma);
    hover.classList.add('hoverAtivo');
    this.[slot] = this.;
    dialogo.innerText = 'Pra onde você quer ir?';
    __classPrivateFieldGet(this, _Jogin_instances, "m", _Jogin_opcaoCaminhar).call(this);
};
new Jogin;
let maaaaaaaaaaaaaa = [3, 1];
