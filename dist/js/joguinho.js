import { Mixin } from './ts-mixer.js';
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
    progressbarVida?.style.setProperty('--progress', '100');
}
function definirMana() {
    progressbarMana?.style.setProperty('--progress', '100');
}
function limparInvGri() {
    inv.forEach((inv) => {
        inv.innerText = '[vazio]';
    });
    mag.forEach((mag) => {
        mag.innerText = '[vazio]';
    });
}
import Eventos from './eventos.js';
import Habilidades from './habilidades.js';
import Viajante from './viajante.js';
class Jogin extends Mixin(Viajante, Eventos, Habilidades) {
    #mapaEscolhido = 0;
    #ultimoMapa;
    #ultimoLugar;
    #ultimoEventoVida = 0;
    #usos;
    #todosPontos;
    #validarUpar;
    #inventario;
    #magiasAtuais;
    #habilidadesAtuais;
    #furtivo;
    #validarPoderoso;
    #dadosAtqPod;
    #testeDefesa;
    #contadorDano;
    #somaDano;
    #acumuloAtqPod;
    #contagemTurno;
    #intervaloProMana;
    #intervaloValMag0;
    #intervaloValMag1;
    #intervaloValMags;
    #cancelarToggle;
    #numHabilidades;
    #constNumHab;
    constructor() {
        super();
        this.#ultimoMapa = 0;
        this.#ultimoLugar = '';
        this.#usos = 0;
        this.#todosPontos = 0;
        this.#validarUpar = false;
        this.#inventario = {
            slot1: {},
            slot2: {},
            slot3: {},
            slot4: {},
            slot5: {}
        };
        this.#magiasAtuais = {
            mag1: {},
            mag2: {},
            mag3: {},
            mag4: {},
        };
        this.#habilidadesAtuais = [];
        this.#furtivo = false;
        this.#validarPoderoso = false;
        this.#dadosAtqPod = [];
        this.#testeDefesa = 0;
        this.#contadorDano = 0;
        this.#somaDano = 0;
        this.#acumuloAtqPod = 0;
        this.#contagemTurno = 0;
        this.#intervaloProMana = 0;
        this.#intervaloValMag0 = 0;
        this.#intervaloValMag1 = 0;
        this.#intervaloValMags = [this.#intervaloValMag0, this.#intervaloValMag1];
        this.#cancelarToggle = false;
        this.#numHabilidades = 0;
        this.#constNumHab = 0;
        btnUpar?.addEventListener('mouseover', this.#mouseOverUpar);
        btnUpar?.addEventListener('mouseout', this.#mouseOutUpar);
        this._mudarVazio();
        this.#definirIntro();
        this.#definirCondicao();
        document.body.style.opacity = '1';
    }
    #mudarVisibilidadeBotoes(ctx) {
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
    #definirIntro() {
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
            resposta?.focus();
            resposta?.addEventListener('keyup', (e) => {
                var key = e.which || e.keyCode;
                if (key == 13) {
                    if (resposta && (resposta.value != "")) {
                        this._nome = resposta.value;
                        dialogo && (dialogo.innerText = "Olá " + this._nome + ", para onde você quer ir?");
                        resposta.style.display = "none";
                        this.#opcaoCaminhar();
                    }
                    else {
                        resposta.placeholder = 'Não entendi o seu nome';
                    }
                }
            });
        }
    }
    _escreverContexto(texto) {
        contexto?.append(texto + '\n\n');
        contexto && (contexto.scrollTop = contexto.scrollHeight);
    }
    _inserirHtmlContexto(elemento, texto, prop, value) {
        const elementoCriado = document.createElement(elemento);
        elementoCriado.innerText = `${texto} \n\n`;
        elementoCriado.style.setProperty(prop, value);
        contexto?.appendChild(elementoCriado);
        contexto && (contexto.scrollTop = contexto.scrollHeight);
    }
    #semManaOver = () => {
        dlg = dialogo?.innerText + '';
        dialogo && (dialogo.style.color = '#DB4B55');
        dialogo && (dialogo.innerText = 'Mana insuficiente');
        this.#intervaloProMana = setInterval(() => {
            if (progressbarMana?.style.backgroundColor == '') {
                progressbarMana.style.backgroundColor = 'rgba(219, 75, 85, 0.25)';
                return;
            }
            progressbarMana && (progressbarMana.style.backgroundColor = '');
        }, 500);
        magAtq.forEach(e => {
            e.removeEventListener('mouseout', this.#semManaOut);
        });
        magAtq.forEach(e => {
            e.addEventListener('mouseout', this.#semManaOut);
        });
    };
    #semManaOut = () => {
        dialogo && (dialogo.style.color = 'white');
        dialogo && (dialogo.innerText = dlg);
        progressbarMana && (progressbarMana.style.backgroundColor = '');
        clearInterval(this.#intervaloProMana);
    };
    #definirExp(xp) {
        progressbarXP?.style.setProperty('--progress', parseFloat(xp) + '');
    }
    #definirCondicao() {
        switch (condicao?.innerText) {
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
    }
    #aleatorizar() {
        const chance = Math.floor(Math.random() * 500);
        if (chance <= 180)
            this.#mapaEscolhido = 0;
        if (chance > 180 && chance <= 275)
            this.#mapaEscolhido = 1;
        if (chance > 275 && chance <= 370)
            this.#mapaEscolhido = 2;
        if (chance > 370 && chance <= 450)
            this.#mapaEscolhido = 3;
        if (chance > 450)
            this.#mapaEscolhido = 4;
    }
    #rolarAcertoOponente(atributo) {
        console.log('teste oponente: ' + atributo);
        const a = this._ultimoEvento;
        return this._rolarDados('d20', (this._ultimoEvento[atributo] + 1));
    }
    #rolarAcerto(atributo) {
        console.log('teste viajante: ' + atributo);
        const a = this.addModsHab;
        let teste = this._rolarDados('d20', (this.#recAtr(atributo) + 1)) + this.addModsHab[atributo];
        console.log(teste);
        return teste;
    }
    #recAtr(atributo) {
        const a = this._atributos;
        return this._atributos[atributo];
    }
    #dano() {
        this._vida -= this._calcularVida(this._ultimoEvento.efeito ? this._ultimoEvento.efeito() : 0);
        progressbarVida?.style.setProperty('--progress', this._vida + '');
        if (this._ultimoEvento.textoAtaques)
            this._escreverContexto(this._ultimoEvento.nome + ', ' + this._ultimoEvento.textoAtaques[Math.floor(Math.random() * (this._ultimoEvento.textoAtaques.length))]);
        else
            console.log('ERRO TOTAL linha 951');
    }
    #eventoUpar() {
        let dtNivel;
        this._nivel == 0 ? dtNivel = 200 : dtNivel = 100 * this._nivel * 3;
        let xp = this._experiencia / (dtNivel / 100);
        this.#definirExp(xp);
        if (this._experiencia >= dtNivel) {
            this._nivel++;
            lvl && (lvl.innerText = 'Nível: ' + this._nivel);
            this._pontos += this._nivel + 5;
            pnts && (pnts.innerText = 'Pontos: ' + this._pontos);
            this._constVigor = this.#recAtr('vigor');
            this.#todosPontos = this._pontos;
            let obValues = Object.values(this._atributos);
            obValues.forEach((obValue) => {
                this.#todosPontos += obValue;
            });
            this._nivel == 1 ? this.#numHabilidades = 2 : this.#numHabilidades = this._nivel + 2;
            this.#constNumHab = this.#numHabilidades;
            this._experiencia = 0;
            this.#definirExp(this._experiencia);
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
    }
    #upgradeAtributos() {
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
            tituloUp.style.margin = '0px';
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
        this.habilidades.forEach((k) => {
            if (k.nivel <= this._nivel && !k.adiquirida) {
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
        divQntsHab.innerText = 'Você pode escolher até ' + this.#numHabilidades + ' habilidades';
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
        ptns.innerText = 'Pontos: ' + this._pontos;
        let obKeys = Object.keys(this._atributos);
        let atriIndex = 0;
        const atri = document.querySelectorAll('.atributos');
        atri.forEach(el => {
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
            const obs = obKeys[atriIndex];
            const t = this._atributos;
            divAtrs.innerText = el.innerText.split(':')[0] + ': ' + this._atributos[obs];
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
            blurr?.appendChild(telaUps);
            blurr?.appendChild(btnPronto);
            elDivChecks = document.querySelectorAll('.divChecks');
            elDivChecks.forEach((div) => {
                div.addEventListener('click', this.#clickHabilidades);
            });
            btnMais = document.querySelectorAll('.btnsMais');
            btnMenos = document.querySelectorAll('.btnsMenos');
            btnMais.forEach(btn => {
                btn.addEventListener('click', this.#clickBtnMais);
            });
            btnMenos.forEach(btn => {
                btn.addEventListener('click', this.#clickBtnMenos);
            });
            btnPronto.addEventListener('click', this.#clickPronto);
            setTimeout(() => {
                telaUps.style.position = 'static';
                telaUps.style.opacity = '1';
                btnPronto.style.opacity = '1';
                blurr && (blurr.style.alignContent = 'space-around');
            }, 200);
        }, 2000);
    }
    #mouseOverUpar = () => {
        btnUpar?.removeEventListener('click', this.#clickUpar);
        btnUpar && (btnUpar.style.color = 'white');
        if (this.#validarUpar) {
            btnUpar && (btnUpar.innerText = 'Você pode subir de nível');
            btnUpar && (btnUpar.style.padding = '2px 10px 2px 5px');
            if (this.#ultimoMapa != 3 && this.#ultimoMapa != 4) {
                btnUpar?.addEventListener('click', this.#clickUpar);
            }
            else
                btnUpar && (btnUpar.innerText = 'Não da para upar agora');
        }
        else {
            btnUpar && (btnUpar.innerText = 'Sem níveis para subir');
            btnUpar && (btnUpar.style.padding = '2px 10px 2px 5px');
        }
    };
    #mouseOutUpar = () => {
        btnUpar && (btnUpar.innerText = '+');
        btnUpar && (btnUpar.style.padding = '2px 2px 2px 5px');
    };
    #clickUpar = () => {
        btnUpar?.removeEventListener('click', this.#clickUpar);
        this.#upgradeAtributos();
    };
    #clickHabilidades = (e) => {
        const key = e.currentTarget;
        for (let i = 0; i < this.habilidades.length; i++) {
            if (key.innerText == this.habilidades[i].nome) {
                if (this.#numHabilidades > 0 && !this.habilidades[i].toggle) {
                    key.style.color = 'red';
                    this.habilidades[i].toggle = true;
                    this.#numHabilidades--;
                    return;
                }
                if (this.#numHabilidades > 0 && this.habilidades[i].toggle) {
                    key.style.color = 'white';
                    this.habilidades[i].toggle = false;
                    this.#numHabilidades++;
                    return;
                }
                if (this.#numHabilidades == 0 && this.habilidades[i].toggle) {
                    key.style.color = 'white';
                    this.habilidades[i].toggle = false;
                    this.#numHabilidades++;
                    return;
                }
                if (this.#numHabilidades == 0 && !this.habilidades[i].toggle) {
                    for (let j = 0; j < elDivChecks.length; j++) {
                        this.habilidades[j].toggle = false;
                        elDivChecks[j].style.color = 'white';
                    }
                    if (this.#constNumHab > 1) {
                        this.#numHabilidades = this.#constNumHab - 1;
                    }
                    key.style.color = 'red';
                    this.habilidades[i].toggle = true;
                    return;
                }
            }
        }
    };
    #clickBtnMais = (mais) => {
        const target = mais.currentTarget;
        let obKeys = Object.keys(this._atributos);
        const ptns = document.getElementById('ptns');
        const divAtrs = document.querySelectorAll('#divAtrs');
        const g = this._atributos;
        for (let m = 0; m < obKeys.length; m++) {
            const key = target.id;
            if (key == obKeys[m] && this._pontos > 0) {
                this._atributos[key]++;
                this._pontos--;
                divAtrs[m].innerText = divAtrs[m].innerText.split(':')[0] + ': ' + this._atributos[key];
                ptns && (ptns.innerText = 'Pontos: ' + this._pontos);
                console.log(this._atributos);
            }
        }
    };
    #clickBtnMenos = (menos) => {
        const target = menos.currentTarget;
        let obKeys = Object.keys(this._atributos);
        const ptns = document.getElementById('ptns');
        const divAtrs = document.querySelectorAll('#divAtrs');
        const a = this._atributos;
        for (let m = 0; m < obKeys.length; m++) {
            const key = target.id;
            if (key == obKeys[m] && this._atributos[key] > 0 && this._pontos <= this.#todosPontos) {
                this._atributos[key]--;
                this._pontos++;
                divAtrs[m].innerText = divAtrs[m].innerText.split(':')[0] + ': ' + this._atributos[key];
                ptns.innerText = 'Pontos: ' + this._pontos;
            }
        }
    };
    #clickPronto = () => {
        const atri = document.querySelectorAll('.atributos');
        const obValues = Object.values(this._atributos);
        const habilidades = document.getElementById('habilidades');
        for (let i = 0; i < atri.length; i++)
            atri[i].innerText = atri[i].innerText.split(':')[0] + ': ' + obValues[i];
        pnts.innerText = 'Pontos: ' + this._pontos;
        this._pontosVida += this._nivel * 5;
        if (this._atributos['vigor'] - this._constVigor > 0) {
            this._vida += this._calcularVida((this._atributos['vigor'] - this._constVigor) * this._nivel + 10);
            this._vida > 100 ? this._vida = 100 : '';
        }
        progressbarVida?.style.setProperty('--progress', this._vida + '');
        const divHab = document.getElementById('divHab');
        this.habilidades.forEach((habilidade) => {
            if (habilidade.toggle) {
                habilidade.adiquirida = true;
                const span = document.createElement('span');
                span.innerText = habilidade.nome;
                span.setAttribute('title', habilidade.descricao);
                divHab?.append(span);
                this.#habilidadesAtuais.push(habilidade);
            }
        });
        habilidades?.append(divHab ? divHab : 'ERROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO linha 1242');
        this.habilidades.forEach((habilidade) => {
            habilidade.toggle = false;
        });
        this.#habilidadesAtuais.forEach((habilidade) => {
            habilidade.efeito();
        });
        blurr ? document.body.removeChild(blurr) : console.log('ERRO EXTREMO linha 1252');
        this.#validarUpar = false;
    };
    #magicasAtq = (e) => {
        const target = e.currentTarget;
        target.innerText = this._ultimoEvento.nome + '';
        this._mudarVazio();
        target.setAttribute('title', this._ultimoEvento.descricao + '');
        const g = this.#magiasAtuais;
        for (let i = 0; i < 2; i++)
            if (magAtq[i].innerText == this._ultimoEvento.nome)
                this.#magiasAtuais[('mag' + (i + 1))] = this._ultimoEvento;
        mag.forEach((mag) => {
            mag.removeEventListener('click', this.#magicasAtq);
        });
        dialogo && (dialogo.innerText = 'Pra onde você quer ir?');
        this.#opcaoCaminhar();
    };
    #magicasSup = (e) => {
        const target = e.currentTarget;
        target.innerText = this._ultimoEvento.nome + '';
        this._mudarVazio();
        target.setAttribute('title', this._ultimoEvento.descricao + '');
        const g = this.#magiasAtuais;
        for (let i = 0; i < 2; i++)
            if (magSup[i].innerText == this._ultimoEvento.nome)
                this.#magiasAtuais[('mag' + (i + 3))] = this._ultimoEvento;
        mag.forEach((mag) => {
            mag.removeEventListener('click', this.#magicasSup);
        });
        dialogo && (dialogo.innerText = 'Pra onde você quer ir?');
        this.#opcaoCaminhar();
    };
    #nenhuma = () => {
        dialogo && (dialogo.innerText = `Pra onde você quer ir?`);
        mag.forEach((mag) => {
            mag.removeEventListener('click', this.#magicasAtq);
            mag.removeEventListener('click', this.#magicasSup);
        });
        btnNenhum?.removeEventListener('click', this.#nenhuma);
        this.#opcaoCaminhar();
    };
    #iniciarBatalha() {
        this.#contagemTurno++;
        turno && (turno.innerText = `Turno: ${this.#contagemTurno}`);
        console.log('somadano: ' + this.#somaDano);
        btnPoderoso?.setAttribute('title', 'Atq.Poderoso precisa ser carregado');
        this.#validarPoderoso = false;
        this.#dadosAtqPod = [];
        if (this._nivel > 0) {
            this.#contadorDano = 50 * (this._nivel);
            console.log('contador dano: ' + this.#contadorDano);
            if (this._vida <= 45 && this.#somaDano >= this.#contadorDano) {
                for (let i = 0; i < 3; i++)
                    this.#dadosAtqPod.push(this._nivel + i + 3);
                let contar = 0;
                this.#dadosAtqPod.forEach(dado => {
                    if (this._calcularMana(dado * 2 + 5) > this._mana)
                        contar++;
                });
                if (contar < 3) {
                    btnPoderoso?.removeAttribute('title');
                    btnPoderoso?.addEventListener('click', this.#ataquePoderoso);
                    this.#validarPoderoso = true;
                }
            }
        }
        btnPoderoso.disabled = !this.#validarPoderoso;
        if (!this.#furtivo) {
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
        this.#mudarVisibilidadeBotoes(1);
        btnsAcao.forEach((btnsAcao) => {
            btnsAcao.removeEventListener('click', this.#acoes);
        });
        btnsAcao.forEach((btnsAcao) => {
            btnsAcao.addEventListener('click', this.#acoes);
        });
    }
    #iniciarTurnoOp() {
        this.#contagemTurno = -1;
        this.#contagemTurno++;
        this.#mudarVisibilidadeBotoes(5);
        setTimeout(() => {
            this.#ataqueOponente();
        }, 3000);
    }
    #rolarAtaqueFurtivo() {
        let testeAgi = this.#rolarAcerto('agilidade'), testeIntOp = this.#rolarAcertoOponente('inteligencia');
        testeAgi > testeIntOp ? this.#furtivo = true :
            this.#furtivo = false;
        console.log(this.#furtivo);
        btnsAcao[1].innerText = 'Fugir';
        btnsAcao[0].style.setProperty('color', '#575CFA');
        btnsAcao[0].style.setProperty('--bcBotoes', '#575CFA');
        btnsAtq[0].style.setProperty('color', '#575CFA');
        btnsAtq[0].style.setProperty('--bcBotoes', '#575CFA');
        this._inserirHtmlContexto('span', 'Possibilidade de ataque furtivo!', 'color', '#575CFA');
        this.#iniciarBatalha();
    }
    #definirDefesaPassiva(ctx) {
        let defesaPassiva = 5 + this.bonusDefesaPassiva;
        if (ctx == 'vig') {
            defesaPassiva += this._adicionalDef;
            if (this.#recAtr('defesa') != 0)
                defesaPassiva = ((this._atributos.defesa + 1) * defesaPassiva) + 5;
        }
        else {
            if (this._ultimoEvento.defesa != 0 && this._ultimoEvento.defesa)
                defesaPassiva = ((this._ultimoEvento.defesa + 1) * defesaPassiva) + 5;
        }
        return defesaPassiva;
    }
    #acoes = (e) => {
        const target = e.currentTarget;
        btnsAcao.forEach((btnsAcao) => {
            btnsAcao.style.display = 'none';
        });
        this.#testeDefesa = 0;
        switch (target.innerText) {
            case 'Atacar':
                if (Object.keys(this.#inventario['slot1']).length > 0 || Object.keys(this.#inventario['slot2']).length > 0) {
                    btnsAtq[1].disabled = false;
                    btnsAtq[1].innerText = 'Atq. armado';
                    if (this.#furtivo) {
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
                if (this.#acumuloAtqPod != 0)
                    btnsAtq[2].setAttribute('title', 'Não da pra usar o ataque poderoso com ataques mágicos :(');
                else {
                    let i = 0, magiasSemMana = [];
                    for (let key in this.#magiasAtuais) {
                        const g = this.#magiasAtuais;
                        var magia = this.#magiasAtuais[key];
                        if (Object.keys(magia).length > 0 && i < 2)
                            if (this._mana < this._calcularMana(magia.gastoMana))
                                magiasSemMana.push(magia);
                            else
                                toggleMag(true);
                        i++;
                    }
                    if (magiasSemMana.length >= 2 || this.#furtivo)
                        toggleMag(false);
                }
                btnsAtq.forEach((btnsAtq) => {
                    btnsAtq.removeEventListener('click', this.#ataqueViajante);
                });
                btnsAtq.forEach((btnsAtq) => {
                    btnsAtq.addEventListener('click', this.#ataqueViajante);
                    btnsAtq.style.display = 'inline';
                });
                break;
            case 'Defender':
                this.#testeDefesa = this.#rolarAcerto('defesa');
                this.#furtivo = false;
                this.#mudarVisibilidadeBotoes(5);
                setTimeout(() => {
                    this.#ataqueOponente();
                }, 2000);
                break;
            case 'Itens/magia':
                this.#furtivo = false;
                this.#mudarVisibilidadeBotoes(4);
                this.#cancelarToggle = true;
                btnNenhum?.removeEventListener('click', this.#nenhuma);
                btnNenhum?.addEventListener('click', this.#cancelar);
                for (let i = 0; i < 2; i++) {
                    const n = this.#inventario;
                    let item = this.#inventario[('slot' + (i + 4))];
                    const g = this.#magiasAtuais;
                    let magia = this.#magiasAtuais[('mag' + (i + 3))];
                    if (Object.keys(item).length > 0 && item.usavel)
                        invSup[i]?.addEventListener('click', this.#itensMagia);
                    if (Object.keys(magia).length > 0)
                        magSup[i].addEventListener('click', this.#itensMagia);
                }
                break;
            case 'Fugir':
                let testeSorte = this.#rolarAcerto('sorte');
                let dt = this._ultimoEvento.inteligencia ? this._ultimoEvento.inteligencia * 5 + 5 : 0;
                console.log('dt: ' + dt);
                this.#furtivo = false;
                if (testeSorte >= dt) {
                    this._escreverContexto('Você Fugiu!');
                    turno && (turno.innerText = '');
                    this.#contagemTurno = 0;
                    this.#somaDano = 0;
                    this.#opcaoCaminhar();
                }
                else {
                    this._escreverContexto('Em um momento de desespero, você tenta fugir, mas a criatura te ataca.');
                    this.#mudarVisibilidadeBotoes(5);
                    setTimeout(() => {
                        this.#ataqueOponente();
                    }, 3000);
                }
                break;
            default:
                break;
        }
    };
    #itensMagia = (e) => {
        const target = e.currentTarget;
        invSup.forEach(invSup => {
            invSup?.removeEventListener('click', this.#itensMagia);
        });
        magSup.forEach(magSup => {
            magSup.removeEventListener('click', this.#itensMagia);
        });
        for (let key in this.#inventario) {
            if (!this.#inventario.hasOwnProperty(key))
                continue;
            const n = this.#inventario;
            let item = this.#inventario[key];
            if (item.usavel)
                if (item.nome == target.innerHTML.split('<span>')[1].split('</span>')[0]) {
                    item.efeito();
                }
        }
        for (let key in this.#magiasAtuais) {
            if (!this.#magiasAtuais.hasOwnProperty(key))
                continue;
            const g = this.#magiasAtuais;
            let magia = this.#magiasAtuais[key];
            if (magia.nome == target.innerText) {
                magia.efeito();
            }
        }
        this.#mudarVisibilidadeBotoes(5);
        setTimeout(() => {
            this.#ataqueOponente();
        }, 2000);
    };
    #ataquePoderoso = () => {
        btnPoderoso?.removeEventListener('click', this.#ataquePoderoso);
        this.#somaDano = 0;
        const respAtqPoderoso = document.getElementById('respAtqPoderoso');
        for (let i = 0; i < 3; i++) {
            buttonsAtqPod[i] = document.createElement('button');
            respAtqPoderoso?.appendChild(buttonsAtqPod[i]);
        }
        buttonsAtqPod[0].innerHTML = `<span>+${(this._nivel + 3)}d12</span>`;
        buttonsAtqPod[1].innerHTML = `<span>+${(this._nivel + 4)}d12</span>`;
        buttonsAtqPod[2].innerHTML = `<span>+${(this._nivel + 5)}d12</span>`;
        buttonsAtqPod.forEach((button) => {
            button.removeEventListener('click', this.#AddDadosAtqP);
            button.disabled = true;
        });
        for (let m = 0; m < this.#dadosAtqPod.length; m++) {
            if (this._calcularMana((this.#dadosAtqPod[m] * 2 + 5)) <= this._mana) {
                buttonsAtqPod[m].disabled = false;
                buttonsAtqPod[m].addEventListener('click', this.#AddDadosAtqP);
            }
        }
    };
    #AddDadosAtqP = (e) => {
        const target = e.currentTarget;
        this.#dadosAtqPod.forEach(dado => {
            if (target.innerText == ('+' + dado + 'd12')) {
                this.#acumuloAtqPod = this._rolarDados('d12', dado);
                this._mana -= this._calcularMana((dado * 2 + 5));
                progressbarMana?.style.setProperty('--progress', this._mana + '');
                buttonsAtqPod.forEach((btn) => {
                    const b = btn;
                    b.style.display = 'none';
                });
                btnsAtq.forEach(btn => {
                    const b = btn;
                    if (btn.innerText == 'Atq. mágico')
                        b.disabled = true;
                });
                btnsAcao.forEach(btn => {
                    if (btn.innerText == 'Atacar')
                        btn.click();
                });
            }
        });
    };
    #ataqueOponente() {
        btnsAcao[1].innerText = 'Defender';
        let usarMagias = false;
        Object.keys(this._ultimoEvento).forEach(key => {
            if (key == 'magias' && this.#usos > 0)
                usarMagias = (Math.floor(Math.random() * 100) < 50) ? true : false;
        });
        console.log('usou magia? ' + usarMagias);
        if (usarMagias) {
            let numMagia = Math.floor(Math.random() * Object.keys(this._ultimoEvento.magias).length);
            if (this.#testeDefesa != 0)
                this._inserirHtmlContexto('span', 'Não há como defender ataques mágicos', 'text-decoration', 'underline');
            if (this.#rolarAcerto('vigor') <= this.#rolarAcertoOponente('inteligencia'))
                this._vida -= this._calcularVida(this._ultimoEvento.magias[numMagia].efeito());
            else
                this._vida -= (this._calcularVida(this._ultimoEvento.magias[numMagia].efeito()) / 2);
            this.#definirCondicao();
            progressbarVida?.style.setProperty('--progress', this._vida + '');
        }
        else {
            if (this.#rolarAcertoOponente('forca') >= this.#testeDefesa)
                this.#dano();
            else if (this.#definirDefesaPassiva('vig') <= this.#rolarAcertoOponente('forca'))
                this.#dano();
            else
                contexto?.append('Você defende!');
        }
        console.log('vida: ' + this._vida);
        turnoBicho && (turnoBicho.style.display = 'none');
        this.#iniciarBatalha();
    }
    #ataqueViajante = (e) => {
        const target = e.currentTarget;
        let vidaTirada = 0, testeForca = this.#rolarAcerto('forca');
        switch (target.innerText) {
            case 'Soquinho':
                dialogo && (dialogo.innerText = 'Você deu um soquinho');
                if (this.#definirDefesaPassiva(null) <= testeForca) {
                    vidaTirada = this._rolarDados('d3', 1);
                    vidaTirada += this.#adicionaisAtq();
                    if (this._critico) {
                        let resto = this.#recAtr('sorte') % 5;
                        if (this.#recAtr('sorte') <= 0)
                            vidaTirada *= 2;
                        else if (resto == 0) {
                            let i = this.#recAtr('sorte') / 5;
                            vidaTirada *= (i + 2);
                        }
                    }
                    this._ultimoEvento.vida -= vidaTirada;
                    console.log('vida tirada: ' + this._ultimoEvento.vida);
                    console.log('defesa bicho: ' + this.#definirDefesaPassiva(null));
                    this.#somaDano += vidaTirada;
                    this._escreverContexto(`Você da um soco, e acerta com ${testeForca}, tirando ${vidaTirada} de vida.`);
                }
                else {
                    this._escreverContexto('Em um momento de desespero, você tenta dar um soco nesta criatura, que desvia com facilidade.');
                    this.#mudarVisibilidadeBotoes(5);
                    setTimeout(() => {
                        this.#ataqueOponente();
                    }, 2000);
                }
                this.#acumuloAtqPod = 0;
                this.#furtivo = false;
                if (this._ultimoEvento.vida <= 0) {
                    this.#morteOponente('Com um golpe fatal, você arranca a cabeça desta criatura.');
                }
                else {
                    this.#mudarVisibilidadeBotoes(5);
                    setTimeout(() => {
                        this.#ataqueOponente();
                    }, 2000);
                }
                break;
            case 'Atq. mágico':
                this.#mudarVisibilidadeBotoes(4);
                for (let i = 0; i < magAtq.length; i++) {
                    let m = this.#magiasAtuais;
                    const magia = m[('mag' + (i + 1))];
                    if (Object.keys(magia).length > 0) {
                        if (this._mana < this._calcularMana(magia.gastoMana)) {
                            magAtq[i].removeEventListener('mouseover', this.#semManaOver);
                            magAtq[i].addEventListener('mouseover', this.#semManaOver);
                        }
                        else {
                            magAtq[i].addEventListener('click', this.#atacarMagia);
                            this.#intervaloValMags[i] = setInterval(() => {
                                magAtq[i].style.color = mag[0].style.borderColor;
                            }, 300);
                        }
                    }
                }
                this.#cancelarToggle = false;
                btnNenhum?.removeEventListener('click', this.#nenhuma);
                btnNenhum?.addEventListener('click', this.#cancelar);
                break;
            case 'Atq. armado':
                console.log(this.#inventario);
                for (let i = 0; i < 2; i++) {
                    let n = this.#inventario;
                    const arma = n[('slot' + (i + 1))];
                    if (Object.keys(arma).length > 0)
                        inv[i].addEventListener('click', this.#atacarArma);
                }
                this.#mudarVisibilidadeBotoes(4);
                this.#cancelarToggle = false;
                btnNenhum?.removeEventListener('click', this.#nenhuma);
                btnNenhum?.addEventListener('click', this.#cancelar);
                break;
            default:
                break;
        }
    };
    #adicionaisAtq() {
        let vidaTirada = 0;
        let forca = this.#recAtr('forca');
        forca > 0 ? vidaTirada += this._rolarDados('d3', forca) : '';
        console.log(this.#acumuloAtqPod);
        vidaTirada += this.#acumuloAtqPod;
        if (this.#furtivo)
            vidaTirada += this._rolarDados('d6', (this.#recAtr('agilidade') + 2));
        return vidaTirada;
    }
    #atacarMagia = (e) => {
        const target = e.currentTarget;
        mag.forEach(mag => {
            mag.removeEventListener('click', this.#atacarMagia);
        });
        magAtq.forEach(magAtq => {
            magAtq.removeEventListener('mouseover', this.#semManaOver);
            magAtq.removeEventListener('mouseout', this.#semManaOut);
        });
        let i = 0;
        while (i < this.#intervaloValMags.length) {
            clearInterval(this.#intervaloValMags[i]);
            i++;
        }
        this._mudarVazio();
        let vidaTirada = 0, testeInt = this.#rolarAcerto('inteligencia');
        for (var key in this.#magiasAtuais) {
            if (!this.#magiasAtuais.hasOwnProperty(key))
                continue;
            let m = this.#magiasAtuais;
            let magia = m[key];
            if (magia.nome == target.innerText) {
                const teste = magia.efeito()['teste'];
                const condicao = magia.efeito()['condicao'] && (magia.efeito()['condicao']);
                vidaTirada += this._rolarDados('d3', (this.#recAtr('inteligencia') + 1));
                if (this.#rolarAcertoOponente('vigor') <= testeInt) {
                    this._ultimoEvento.condicao = condicao;
                    vidaTirada += teste;
                }
                else
                    vidaTirada += Math.floor(teste / 2);
                if (this._critico) {
                    let resto = this.#recAtr('sorte') % 5;
                    if (this.#recAtr('sorte') <= 0)
                        vidaTirada *= 2;
                    else if (resto == 0) {
                        let i = this.#recAtr('sorte') / 5;
                        vidaTirada *= (i + 2);
                    }
                }
                this._ultimoEvento.vida && (this._ultimoEvento.vida -= vidaTirada);
                this._mana -= this._calcularMana(magia.gastoMana);
                progressbarMana?.style.setProperty('--progress', this._mana + '');
                this._escreverContexto(`Você acerta sua magia com ${testeInt}, tirando ${vidaTirada} de vida.`);
                console.log('vida tirada: ' + this._ultimoEvento.vida);
                if (this._ultimoEvento.vida && (this._ultimoEvento.vida <= 0)) {
                    this.#morteOponente('Em uma explosão de mana, você oblitera esta criatura.');
                }
                else {
                    this.#mudarVisibilidadeBotoes(5);
                    this.#somaDano += vidaTirada;
                    setTimeout(() => {
                        this.#ataqueOponente();
                    }, 2000);
                }
                break;
            }
        }
    };
    #atacarArma = (e) => {
        const target = e.currentTarget;
        inv.forEach(k => {
            k.removeEventListener('click', this.#atacarArma);
        });
        let vidaTirada = 0;
        let testeForca = this.#rolarAcerto('forca');
        for (let key in this.#inventario) {
            if (!this.#inventario.hasOwnProperty(key))
                continue;
            let i = this.#inventario;
            let armaAtual = i[key];
            if (armaAtual.nome == target.innerHTML.split('<span>')[1].split('</span>')[0]) {
                if (this.#definirDefesaPassiva(null) <= testeForca) {
                    vidaTirada = armaAtual.efeito();
                    vidaTirada += this.#adicionaisAtq();
                    if (this._critico) {
                        let resto = this.#recAtr('sorte') % 5;
                        if (this.#recAtr('sorte') <= 0)
                            vidaTirada *= 2;
                        else if (resto == 0) {
                            let i = this.#recAtr('sorte') / 5;
                            vidaTirada *= (i + 2);
                        }
                    }
                    this._ultimoEvento.vida = this._ultimoEvento.vida - vidaTirada;
                    this._escreverContexto(`Você acerta com ${testeForca} em seu teste, tirando ${vidaTirada} de vida. `);
                    console.log('vida tirada: ' + this._ultimoEvento.vida);
                    console.log('defesa bicho: ' + this.#definirDefesaPassiva(null));
                    this.#acumuloAtqPod = 0;
                    this.#furtivo = false;
                    if (this._ultimoEvento.vida <= 0) {
                        this.#morteOponente(armaAtual.msgMorte);
                    }
                    else {
                        this.#mudarVisibilidadeBotoes(5);
                        this.#somaDano += vidaTirada;
                        setTimeout(() => {
                            this.#ataqueOponente();
                        }, 2500);
                    }
                }
            }
        }
    };
    #cancelar = () => {
        invSup.forEach(invSup => {
            invSup?.removeEventListener('click', this.#itensMagia);
        });
        magSup.forEach(magSup => {
            magSup.removeEventListener('click', this.#itensMagia);
        });
        magAtq.forEach(e => {
            e.removeEventListener('mouseover', this.#semManaOver);
            e.removeEventListener('mouseout', this.#semManaOut);
        });
        let i = 0;
        while (i < this.#intervaloValMags.length) {
            clearInterval(this.#intervaloValMags[i]);
            this._mudarVazio();
            i++;
        }
        mag.forEach(mag => {
            mag.removeEventListener('click', this.#atacarMagia);
        });
        inv.forEach(inv => {
            inv.removeEventListener('click', this.#atacarArma);
        });
        this.#mudarVisibilidadeBotoes(this.#cancelarToggle ? 1 : 3);
        btnNenhum?.removeEventListener('click', this.#cancelar);
    };
    #morteOponente(msg) {
        this._escreverContexto(msg);
        this._ultimoEvento.vida = this.#ultimoEventoVida;
        this.#usos = 0;
        turno && (turno.innerText = '');
        this.#contagemTurno = 0;
        this.#somaDano = 0;
        this.#ultimoMapa = 0;
        this._experiencia += this._ultimoEvento.exp;
        if (this.#eventoUpar())
            this.#validarUpar = true;
        this.#opcaoCaminhar();
    }
    #eventoAndar = (e) => {
        const target = e.currentTarget;
        this.#ultimoLugar = target.innerText.toLowerCase();
        this.#escolherMapa();
    };
    #opcaoCaminhar() {
        this.#mudarVisibilidadeBotoes(0);
        btnsAndar.forEach((btnsAndar) => {
            btnsAndar.removeEventListener('click', this.#eventoAndar);
        });
        btnsAndar.forEach((btnsAndar) => {
            btnsAndar.addEventListener('click', this.#eventoAndar);
        });
    }
    #escolherMapa() {
        let ultimaAndada = this.#ultimoLugar;
        let eventos = [];
        this.#mapaEscolhido = maaaaaaaaaaaaaa[Math.floor(Math.random() * maaaaaaaaaaaaaa.length)];
        if (this._nivel < 5 && this.#mapaEscolhido == 4)
            this.#mapaEscolhido = 0;
        this.getEventos.forEach((e) => {
            if (e.classe == this.#mapaEscolhido)
                eventos.push(e);
        });
        dialogo && (dialogo.innerText = `Você andou para ${ultimaAndada} e encontrou...`);
        if (this.#mapaEscolhido == 0) {
            const escolha = Math.floor(Math.random() * 10);
            this._escreverContexto(eventos[escolha].descricao[Math.floor(Math.random() * 5)] + '');
            this._ultimoEvento = eventos[escolha];
        }
        else if (this.#mapaEscolhido == 1) {
            const escolha = Math.floor(Math.random() * 7);
            this._escreverContexto(eventos[escolha].descricao);
            this._ultimoEvento = eventos[escolha];
            if (this._ultimoEvento.tipo == 'pocao') {
                dialogo && (dialogo.innerHTML = `<b style="color: yellow" > &#9888 Poções podem substituir comidas</b>`);
                invSup[0] && (invSup[0].style.color = 'yellow');
            }
            if (this._ultimoEvento.tipo == 'comida') {
                dialogo && (dialogo.innerHTML = `<b style="color: yellow" > &#9888 Comidas podem substituir poções</b>`);
                invSup[0] && (invSup[0].style.color = 'yellow');
            }
            this.#mudarVisibilidadeBotoes(2);
            btnsSN.forEach(e => {
                e.removeEventListener("click", this.#btnSN);
            });
            btnsSN.forEach(e => {
                e.addEventListener("click", this.#btnSN);
            });
        }
        else if (this.#mapaEscolhido == 2) {
            const escolha = Math.floor(Math.random() * 3);
            this._escreverContexto(eventos[escolha].descricao);
            this._ultimoEvento = eventos[escolha];
            this.#mudarVisibilidadeBotoes(4);
            btnNenhum?.removeEventListener('click', this.#cancelar);
            btnNenhum?.addEventListener('click', this.#nenhuma);
            if (this._ultimoEvento.tipo == 'atq')
                magAtq.forEach(magAtq => {
                    magAtq.addEventListener('click', this.#magicasAtq);
                });
            else if (this._ultimoEvento.tipo == 'sup')
                magSup.forEach(magSup => {
                    magSup.addEventListener('click', this.#magicasSup);
                });
        }
        else if (this.#mapaEscolhido == 3) {
            dialogo?.append(' Prepare-se para batalha');
            const escolha = Math.floor(Math.random() * 1);
            this._escreverContexto(eventos[escolha].descricao);
            this._ultimoEvento = eventos[escolha];
            this.#ultimoEventoVida = this._ultimoEvento.vida;
            let testeAgi = this.#rolarAcerto('agilidade'), testeAgiOp = this.#rolarAcertoOponente('agilidade');
            while (testeAgiOp == testeAgi) {
                if (this._atributos.agilidade != this._ultimoEvento.agilidade && this._ultimoEvento != undefined) {
                    testeAgi += this._atributos.agilidade;
                    testeAgiOp += this._ultimoEvento.agilidade;
                }
                else {
                    testeAgi = this.#rolarAcerto('agilidade');
                    testeAgiOp = this.#rolarAcertoOponente('agilidade');
                }
            }
            testeAgi >= testeAgiOp ? this.#rolarAtaqueFurtivo() : this.#iniciarTurnoOp();
        }
        else if (this.#mapaEscolhido == 4) {
        }
        this._seUltimoEvento = this._ultimoEvento;
        this.#ultimoMapa = this.#mapaEscolhido;
    }
    #btnSN = (e) => {
        const target = e.currentTarget;
        const valor = target.innerHTML;
        let contentSpanAC = document.createElement('span');
        let contentSpanAD = document.createElement('span');
        let contentSpanCo = document.createElement('span');
        let contentSpanPo = document.createElement('span');
        let contentSpanAm = document.createElement('span');
        let contentSpanAr = document.createElement('span');
        this._mudarVazio();
        switch (valor) {
            case "Sim":
                switch (this._ultimoEvento.tipo) {
                    case 'armaCaC':
                        this.#adicionar(contentSpanAC, inv[0], divContent1, imgContent1, hover[0], 'slot1');
                        break;
                    case 'armaDis':
                        this.#adicionar(contentSpanAD, inv[1], divContent2, imgContent2, hover[1], 'slot2');
                        break;
                    case 'armadura':
                        this.#adicionar(contentSpanAr, inv[2], divContent3, imgContent3, hover[2], 'slot3');
                        break;
                    case 'pocao':
                        this.#adicionar(contentSpanPo, inv[3], divContent4, imgContent4, hover[3], 'slot4');
                        break;
                    case 'comida':
                        this.#adicionar(contentSpanCo, inv[3], divContent4, imgContent4, hover[3], 'slot4');
                        break;
                    case 'amuleto':
                        this.#adicionar(contentSpanAm, inv[4], divContent5, imgContent5, hover[4], 'slot5');
                        break;
                    default:
                        break;
                }
                this._mudarVazio();
                break;
            case "Não":
                dialogo && (dialogo.innerText = 'Pra onde você quer ir?');
                this.#opcaoCaminhar();
                break;
            default:
                break;
        }
    };
    #adicionar(span, elemento, div, img, hover, slot) {
        span.innerHTML = this._ultimoEvento.nome + '';
        elemento.removeAttribute('title');
        elemento.childNodes[0].replaceWith(span);
        div && (div.innerText = this._ultimoEvento.descricao + '');
        img?.setAttribute('src', this._ultimoEvento.imgArma + '');
        hover.classList.add('hoverAtivo');
        let i = this.#inventario;
        i[slot] = this._ultimoEvento;
        dialogo && (dialogo.innerText = 'Pra onde você quer ir?');
        this.#opcaoCaminhar();
    }
}
new Jogin;
let maaaaaaaaaaaaaa = [3, 1, 2];
