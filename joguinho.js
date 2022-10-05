let dialogo = document.getElementById("dialogo");
let btnContinuar = document.getElementById('continuar');

let btnsAndar = document.querySelectorAll('.botoes');
let btnsSN = document.querySelectorAll('.botoesSN');
let btnsAcao = document.querySelectorAll('.botoesAcao');
let btnsAtq = document.querySelectorAll('.botoesAtq');
let btnsMais = document.querySelectorAll('.btnMais');
let btnsMenos = document.querySelectorAll('.btnMenos');
let btnNenhum = document.getElementById('btnNenhuma');
let btnAtacar = document.getElementById('btnAtacar');
let btnDefender = document.getElementById('btnDefender');
let btnPoderoso = document.getElementById('btnPoderoso');
let btnItens = document.getElementById('btnItens');

let respostas = document.getElementsByClassName('resposta')
let infos = document.getElementsByClassName('infos');
let contexto = document.getElementById('iContexto');
let hud = document.getElementsByClassName('hud');

let mag = document.querySelectorAll('.mag');
let magAtq = document.querySelectorAll('.mag-atq');
let magSup = document.querySelectorAll('.mag-sup');
let inv = document.querySelectorAll('.inv');
let hover = document.querySelectorAll('.hover');
let pontinhos = document.querySelectorAll('.pontinho');
let turnoBicho = document.getElementById('turnoBicho');
let inv1 = document.getElementById('inv1');
let imgContent1 = document.getElementById('img-content1');
let divContent1 = document.getElementById('div-content1');
let inv2 = document.getElementById('inv2');
let imgContent2 = document.getElementById('img-content2');
let divContent2 = document.getElementById('div-content2');
let inv3 = document.getElementById('inv3');
let imgContent3 = document.getElementById('img-content3');
let divContent3 = document.getElementById('div-content3');
let inv4 = document.getElementById('inv4');
let imgContent4 = document.getElementById('img-content4');
let divContent4 = document.getElementById('div-content4');
let inv5 = document.getElementById('inv5');
let imgContent5 = document.getElementById('img-content5');
let divContent5 = document.getElementById('div-content5');
let mag1 = document.getElementById('mag1');
let mag2 = document.getElementById('mag2');
let mag3 = document.getElementById('mag3');
let mag4 = document.getElementById('mag4');

let contentSpan = document.createElement('span');

let ultimaEscolha = document.getElementById('ultimaEscolha');
let ultimaAndada = document.getElementById('ultimaAndada').innerText;
let ultimoEvento = document.getElementById('ultimoEvento').innerText;
let ultimoEventoVida = document.getElementById('ultimoEventoVida').innerText;

let nome, mapaEscolhido, validarEspecial, furtivo, boolComecar;
let pontosVida = 20, pontosMana = 20, forca = 0,
vigor = 0, inteligencia = 0, defesa = 0, agilidade = 0,
sorte = 0, nivel = 0, contagemTurno = 0, vida = 100,
mana = 100, usos = [], critico = false, 
testeDefesa = 0, armaAtual, magiaAtual, 
magiaSemMana = false, somaDano = 0, contadorDano = 0, 
buttonsAtqPod = [], acumuloAtqPod = 0, acumuloManaPod = 0;

let progressbarVida = document.querySelector('#barraVida');
let progressbarMana = document.querySelector('#barraMana');
let lvl = document.getElementById('nivel');
let pnts = document.getElementById('pontos');
let turno = document.getElementById('turno');
let condicao = document.getElementById('condicao');

inv.forEach(inv =>{
    inv.setAttribute('title', 'Você está se sentindo leve, mas desprotegido, é melhor pegar alguns itens... Alías, inventário, viajante, viajante, inventário.');
});

mag.forEach(mag => {
    mag.setAttribute('title', 'Aqui é onde você escreve ou guarda suas magias, eu chamo de Alfredo, mas você pode escolher algo como grimório, não sei.');
});

//        !!!!!!!!!  refatorar fors !!!!!!!!!

//defesa = 0 -> 5 de dt
//vigor 0 = -> 5 de dt a cada 1 pnt +5

// --------- mudar cores inventário de magias ----------

window.setInterval(() => {
    for (var i = mag.length - 1; i >= 0; i--) {
        if(window.getComputedStyle(mag[i]).borderColor == 'rgb(18, 1, 105)') {
            mag[i].style.setProperty('border-color', 'rgb(1, 13, 115)');
        } else if(window.getComputedStyle(mag[i]).borderColor == 'rgb(1, 13, 115)') {
            mag[i].style.setProperty('border-color', 'rgb(4, 36, 91)');
        } else if(window.getComputedStyle(mag[i]).borderColor == 'rgb(4, 36, 91)') {
            mag[i].style.setProperty('border-color', 'rgb(1, 73, 115)');
        } else if(window.getComputedStyle(mag[i]).borderColor == 'rgb(1, 73, 115)') {
            mag[i].style.setProperty('border-color', 'rgb(18, 1, 105)');
        }
    }
}, 300);

window.setInterval(() => {

    if(pontinhos[0].style.display == 'inline') {
        if(pontinhos[1].style.display == 'inline') {
            if(pontinhos[2].style.display == 'inline') {
                pontinhos[0].style.display = 'none';
                pontinhos[1].style.display = 'none';
                pontinhos[2].style.display = 'none';
            } else
                pontinhos[2].style.display = 'inline';
        } else
            pontinhos[1].style.display = 'inline';
    } else
        pontinhos[0].style.display = 'inline';

}, 500);

// --------------- explicação da condição --------------

function definirCondicao() {
    switch(condicao.innerText) {
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
            condicao.style.setProperty('color', '' ); //a decidir
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

definirCondicao();

function definirVida() {
    //vida nivel 0 = 10 pontos
    //a cada nivel aumenta 5 pontos totais e atuais
    //a cada 5 niveis os pontos adjascentes dobram
  	progressbarVida.style.setProperty('--progress', 100);
}

function definirMana() {
    //mana trabalha com porcentagem, resistencia nivel 0 = 0
    //a cada nivel a resistencia aumenta em 0.5%
    //resistencia - gasto da magia = percentual final
	progressbarMana.style.setProperty('--progress', 100);
}

function limparInvGri() {

    inv.forEach((inv) => {
        inv.innerText = '[vazio]';
    });

    mag.forEach((mag) =>{
        mag.innerText = '[vazio]';
    });

}

function definirIntro() {
    for (var i = btnsAndar.length - 1; i >= 0; i--) {
        //inline
	    btnsAndar[i].style.display = 'none';
        //inline
        btnsAcao[i].style.display = 'none';
    }
    for (var i = btnsSN.length - 1; i >= 0; i--) {
        //inline
        btnsSN[i].style.display = 'none';
    }
    for (var i = btnsAtq.length - 1; i >= 0; i--) {
        btnsAtq[i].style.display = 'none';
    }
    //inline
    btnNenhum.style.display = 'none';
    //block
    respostas[0].style.display = 'none';
    //flex
    infos[0].style.display = 'none';
    hud[0].style.display = 'none';
    //block
    btnsMais.forEach(btnMais => {
        btnMais.style.display = 'none';
    });
    btnsMenos.forEach(btnMenos => {
        btnMenos.style.display = 'none';
    });

    dialogo.innerText = "Que bom que você esteja aqui!";

    let n = 3;
    if(n == 3) {
        dialogo.innerText = "Vamos começar com seu nome:";
        btnContinuar.style.display = 'none';
        respostas[0].style.display = 'block';
        infos[0].style.display = 'flex';
        hud[0].style.display = 'flex';
        definirVida();
        definirMana();
        // limparInvGri(); <- por enquanto
    }

    btnContinuar.addEventListener('click', () => {
        if(n == 0) {
            dialogo.innerText = "Seu objetivo é só meter porrada em tudo que ver...";
            n = 1;
            return;
        }
        if (n == 1) {
            dialogo.innerText = "O sistema é bem fácil! \n \n" +
                           "1.Quantos mais pontos tiver em um atributo, mais fácil será obter sucesso em sua execução. \n \n" +
                           "2.Itens te ajudará na recuperação de pontos ou auxiliará em seu dano. \n \n" +
                           "3.Pousando o mouse sobre os elementos, aparacerá dicas > [Tente aqui] <. O resto você descobre, eu confio.";

            dialogo.setAttribute('title', 'Isso mesmo, é assim que faz')
            n = 2;
            return;
        }
        if(n == 2) {
            dialogo.innerText = "Ah! Mais uma coisa, não esquece, é importante, se recarregar a página, você perderá todo preogresso. Boa sorte!";
            dialogo.removeAttribute('title');
            n = 3;
            return;
        }
        if(n == 3) {
            dialogo.innerText = "Vamos começar com seu nome:";
            btnContinuar.style.display = 'none';
            respostas[0].style.display = 'block';
            infos[0].style.display = 'flex';
            hud[0].style.display = 'flex';
            definirVida();
            definirMana();
            // limparInvGri(); <- por enquanto
        }

    });
}

definirIntro();

// ----------------- nome -----------------

function resposta() {
	const resposta = document.getElementById('inputResposta');
	resposta.addEventListener('keyup', (e) => {
  	    var key = e.which || e.keyCode;
  	    if (key == 13) {
    	    if(resposta.value != "") {
                nome = resposta.value
                dialogo.innerText = "Olá " + nome + ", para onde você quer ir?"
                inputResposta.style.display = "none"
                opcaoCaminhar();
            } else {
                resposta.placeholder = 'Não entendi o seu nome';
            }
  	    }
    });
}

resposta();

// mapas
// ---------------- eventos aleatórios ----------------

let m01 = {
    indice: '01',
    descricao: 'Nada, além de um silêncio calmante...',
};

let m02 = {
    indice: '02',
    descricao: 'Uma pedra? Não parece ser nada.',
};

let m03 = {
    indice: '03',
    descricao: 'Há um som estranho no ambiente... você olha para a frente e se depara com nada.',
};

let m04 = {
    indice: '04',
    descricao: 'Parabéns, viajante, você encontrou nada...',
};

let m05 = {
    indice: '05',
    descricao: 'Hmmm, melhor continuar, nada por aqui.',
};

let m07 = {
    indice: '07',
    descricao: '',
};

let m08 = {
    indice: '08',
    nada: 8,
    descricao: '',
};

let m09 = {
    indice: '09',
    nada: 9,
    descricao: '',
};

let m010 = {
    indice: '010',
    descricao: '',
};

// ---------------- itens ----------------

let m11 = {
    indice: '11',
    nome: 'Arma 1',
    tipo: 'arma',
    imgArma: './img/testinho.png',
    descricao: '[Espada enferrujada, 1d6 + 4 de dano]',
    bonusCrt: 1,
    efeito: () => {
        return rolarDados('d6', 1) + 4;
    },
};

let m12 = {
    indice: '12',
    nome: 'Esp. 2',
    tipo: 'comida',
    descricao: '[Espada de aço, 1d6 + 6 de dano]',
};

let m13 = {
    indice: '13',
    nome: 'Arma 2',
    tipo: 'arma',
    imgArma: './img/testezinho.png',
    descricao: '[Arco torto, 1d6 + 3 de dano]',
    bonusCrt: 1,
    efeito: () => {
        ultimoEvento.condicao = 'PARALIZIA';
        return rolarDados('d6', 1) + 3
    },
};

let m14 = {
    indice: '14',
    nome: 'Esp. 4',
    tipo: 'pocao',
    descricao: '[Besta lenta, 1d6 + 4 de dano]',
    dano: (Math.floor(Math.random() * (6 - 1)) + 1) + 4,
};

let m15 = {
    indice: '15',
    nome: 'Arma 3',
    tipo: 'arma',
    imgArma: './img/miuu.png',
    descricao: '[Espada rosa, 1d8 + 2]',
    bonusCrt: 1,
    efeito: () => {
        return rolarDados('d8', 1) + 2
    },
};

let m16 = {
    indice: '16',
    nome: 'Esp. 6',
    tipo: true,
    descricao: '[Espadão, 2d6 + 8 de dano]',
    bonusCrt: 1,
    dano: (Math.floor(Math.random() * (6 - 1)) + 1) +
          (Math.floor(Math.random() * (6 - 1)) + 1) + 8,
};

let m17 = {
    indice: '17',
    nome: 'Arma 4',
    imgArma: './img/miuu.png',
    tipo: 'arma',
    descricao: '[Espada do chacau, 1d12]',
    bonusCrt: 2,
    efeito: () => {
        return rolarDados('d12', 1);
    },
};

let m18 = {
    indice: '18',
    nome: 'Esp. 8',
    tipo: '',
    descricao: '[Lança gigante, 2d12 de dano]',
    dano: (Math.floor(Math.random() * (12 - 1)) + 1) +
          (Math.floor(Math.random() * (12 - 1)) + 1),
};

let m19 = {
    indice: '19',
    nome: 'Arma 5',
    tipo: 'arma',
    imgArma: './img/miuu.png',
    descricao: '[Machadinha, 1d6 + 2]',
    bonusCrt: 1,
    efeito: () => {
        //ver se essa linha ta funcionando como deve
        ultimoEvento.condicao = 'VULNERAVEL';
        return rolarDados('d6', 1) + 2;
    },
};

let m110 = {
    indice: '110',
    nome: 'Esp. 10',
    tipo: false,
    descricao: '[Foice da morte, 2d12 + 6 de dano]',
    dano: (Math.floor(Math.random() * (12 - 1)) + 1) +
          (Math.floor(Math.random() * (12 - 1)) + 1) + 6,
};

// ---------------- magias ----------------

let m21 = {
    indice: 'k20',
    nome: 'magia',
    tipo: 'atq',
    descricao: 'descrição de uma magia 1',
    efeito: () => {
        ultimoEvento.condicao = 'AMALDICOADO';
        return rolarDados('d10', 1);
    },
    gastoMana: 5,
    bonusCrt: 1,
};

let m22 = {
    indice: 'k21',
    nome: 'magia 2',
    tipo: 'sup',
    descricao: 'descrição de uma magia 2',
};

// ---------------- bichos ---------------- 

let m31 = {
    indice: '31',
    nome: 'um zumbi de gelo',
    descricao: 'uma descrição de um bicho',
    vida: 500,
    defesa: 0,
    forca: 1,
    inteligencia: 1,
    vigor: 0,
    agilidade: 1,
    condicao: 'NORMAL',
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
        //0-4 erro
        //5-9 acerto
        //10-14 acerto muito
        //15-19 acerto critico
        'te acerta suas garras em sua barriga, fazendo um corte liso.',
        'te acerta e crava suas garras em seu ombro.',
        'te acerta '
    ],
    finalizacao: '',
};

// ----------------- boss -----------------

let m41 = {
    indice: '41',
    descricao: 'um boss',
};

//mapa com evento aleatório = 0
//mapa com item = 1
//mapa com magias = 2
//mapa com monstro = 3
//mapa com boss = 4

function aleatorizar() {

    const chance = Math.floor(Math.random() * 500);
    if(chance <= 180)
        mapaEscolhido = 0;
    if(chance > 180 && chance <= 275)
        mapaEscolhido = 1;
    if(chance > 275 && chance <= 370)
        mapaEscolhido = 2;
    if(chance > 370 && chance <= 450)
        mapaEscolhido = 3;
    if(chance > 450)
        mapaEscolhido = 4;

    console.log(chance);
}

function danoSofrido(dano) {
    return Math.floor((dano * 100) / pontosVida);
}

function manaGasta(mana) {
    return Math.floor((mana * 100) / pontosMana);
}

function escreverContexto(texto) {
    contexto.append(texto);
    contexto.scrollTop = contexto.scrollHeight;
}

function inserirHtmlContexto(elemento, texto) {
    const elementoCriado = document.createElement(elemento);
    elementoCriado.innerText = `${texto} \n\n`;
    elementoCriado.style.setProperty('text-decoration', 'underline');
    contexto.appendChild(elementoCriado);
    contexto.scrollTop = contexto.scrollHeight;
}

function recuperarAtributosViajante() {

    let itens = [];

    const itemFicha = ficha.innerText.split('\n');
    itemFicha.forEach(itemFicha => {
        itens.push(itemFicha.valueOf().split(':'));
    });

    itens.forEach(itens => {
        switch (itens[0]) {
            case 'Força':
                forca = parseInt(itens[1].trim());
                break;
            case 'Defesa':
                defesa = parseInt(itens[1].trim());
                break;
            case 'Inteligência':
                inteligencia = parseInt(itens[1].trim());
                break;
            case 'Vigor':
                vigor = parseInt(itens[1].trim());
                break;
            case 'Agilidade':
                agilidade = parseInt(itens[1].trim());
                break;
            case 'Sorte':
                sorte = parseInt(itens[1].trim());
                break;
            default:
                break;
        }
    });

}

function rolarDados(tipoDados, qntDados) {
    let dados = [], result = 0;
    switch (tipoDados) {
        case 'd3':
            //dano (verificar se é preciso colocar um tipo de rolada, ex: dano, teste aleatório, teste...).
            for(var i = 1; i <= qntDados; i++) {
                result += Math.floor(Math.random() * (4 - 1) + 1);
            }

            console.log(result);

            return result;
        case 'd6':
            for(var i = 1; i <= qntDados; i++) {
                result += Math.floor(Math.random() * (7 - 1) + 1);
            }

            console.log(result);

            return result;
        case 'd8':
            for(var i = 1; i <= qntDados; i++) {
                result += Math.floor(Math.random() * (9 - 1) + 1);
            }

            console.log(result);

            return result;
        case 'd10':
            for(var i = 1; i <= qntDados; i++) {
                result += Math.floor(Math.random() * (11 - 1) + 1);
            }

            console.log(result);

            return result;
        case 'd12':
            for(var i = 1; i <= qntDados; i++) {
                result += Math.floor(Math.random() * (13 - 1) + 1);
            }

            console.log(result);

            return result;
        case 'd20':
            for(var i = 1; i <= qntDados; i++) {
                dados.push(Math.floor(Math.random() * (21 - 1) + 1));
            }

            result = Math.max.apply(null, dados);
            if(result == 20)
                critico = true;
            else
                critico = false;

            for (let i = 2; i <= dados.length; i++) {
                result += 5;
            }

            console.log(dados);
            console.log(result);

            return result;
        default:
            console.log('Escolha um dado adequado');
            break;
    }
}

function rolarAcertoOponente(atributo) {
    return rolarDados('d20', ultimoEvento[atributo] + 1);
}

function ataqueOponente() {
    let usarMagias = false;

    Object.keys(ultimoEvento).forEach(key => {
        if(key == 'magias')
            usarMagias = (Math.floor(Math.random() * 100)< 50) ? true : false;
    });

    while(usarMagias || !usarMagias) {
        console.log('usou magia? ' + usarMagias);
        switch(usarMagias) {
            case true:
                let numMagia = Math.floor(Math.random() * Object.keys(ultimoEvento.magias).length);

                if(usos.length <= 0)
                    usos.push(ultimoEvento.magias[numMagia].usos);
                else
                    usos.push(usos[usos.length - 1] - 1);

                if(usos.length > ultimoEvento.magias[numMagia].usos + 1)
                    usos.pop();

                console.log('usos: ' + usos);

                if(usos[usos.length - 1] > 0) {

                    if(testeDefesa != 0) {
                        let span = document.createElement('span');
                        span.innerText = 'Não há como defender ataques mágicos \n\n';
                        span.style.setProperty('text-decoration', 'underline');
                        contexto.appendChild(span);
                        contexto.scrollTop = contexto.scrollHeight;
                    }

                    if(rolarAcerto('Vigor') <= rolarAcertoOponente('inteligencia'))
                        vida -= danoSofrido(ultimoEvento.magias[numMagia].efeito());
                    else {
                        vida = vida - danoSofrido(ultimoEvento.magias[numMagia].efeito()) / 2;
                        console.log("metade do dano");
                    }

                    definirCondicao();
                    progressbarVida.style.setProperty('--progress', vida);
                } else {
                    usarMagias = false;
                    continue;
                }
                break;
            case false:
                //fazer else para o op errar
                if(testeDefesa != 0) {
                    if(rolarAcertoOponente('forca') >= testeDefesa) {
                        vida = vida - danoSofrido(ultimoEvento.dano());
                        progressbarVida.style.setProperty('--progress', vida);
                        contexto.append(ultimoEvento.nome + ', ' + ultimoEvento.textoAtaques[Math.floor(Math.random() * (ultimoEvento.textoAtaques.length))] + '\n\n');
                        contexto.scrollTop = contexto.scrollHeight;
                    }
                } else {
                    let defesaPassiva = 5;
                    if(defesa != 0)
                        defesaPassiva = ((defesa + 1) * defesaPassiva) + 5;

                    if(defesaPassiva <= rolarAcertoOponente('forca')) {
                        vida = vida - danoSofrido(ultimoEvento.dano());
                        progressbarVida.style.setProperty('--progress', vida);
                        contexto.append(ultimoEvento.nome + ', ' + ultimoEvento.textoAtaques[Math.floor(Math.random() * (ultimoEvento.textoAtaques.length))] + '\n\n');
                        contexto.scrollTop = contexto.scrollHeight;
                    }
                }
                break;
            default:
                console.log('Erro no ataque do oponente.');
                break;
        }
        break;
    }

    console.log('vida: ' + vida);

    turnoBicho.style.display = 'none';
    iniciarBatalha();
}

function rolarAcerto(atributo) {
    const itemFicha = ficha.innerText.split('\n');
    let itens = [], i;
    itemFicha.forEach(itemFicha => {
        itens.push(itemFicha.valueOf().split(':'));
    });

    itens.forEach(itens => {
        if(itens[0] == atributo) {
            i = parseInt(itens[1].trim()) + 1;
        }
    });

    console.log(itens);

    return rolarDados('d20', i);
}

var _ataqueViajante = function(e) {
    let vidaTirada = 0, defesaPassiva = 5, testeForca = rolarAcerto('Força');
    //tirar depois, inplementar bd ou session...
    recuperarAtributosViajante();

    switch (e.currentTarget.innerText) {
        case 'Soquinho':

            dialogo.innerText = 'Você deu um soquinho';

            if(ultimoEvento.defesa != 0)
                defesaPassiva = ((ultimoEvento.defesa + 1) * defesaPassiva) + 5;

            if(defesaPassiva <= testeForca) {
                vidaTirada = rolarDados('d3', 1);
                if(furtivo)
                    vidaTirada += rolarDados('d6', agilidade+2);
                if (critico)
                    vidaTirada += rolarDados('d3', 1);

                vidaTirada += acumuloAtqPod;
                if(acumuloAtqPod != 0) {
                    mana -= acumuloManaPod;
                    if(mana > 0)
                        progressbarMana.style.setProperty('--progress', mana);
                    else {
                        contexto.append('Não tem mana \n\n');
                        contexto.scrollTop = contexto.scrollHeight;
                        
                        furtivo = false;
                        btnsAcao.forEach((btnAcao) => {
                            if(btnAcao.innerText == 'Atacar') {
                                btnAcao.style.setProperty('border-color', '#767676');
                            }
                        });

                        acumuloAtqPod = 0;
                        acumuloManaPod = 0;

                        btnsAtq.forEach(btnAtq => {
                            btnAtq.style.display = 'none';
                        });
                        turnoBicho.style.display = 'block';
                        somaDano += vidaTirada;
                        setTimeout(() => {
                            ataqueOponente();
                        }, 2000);

                        break;
                    }
                }

                //bonus da força
                forca > 0 ? vidaTirada += rolarDados('d3', forca) : console.log('nada por aqui');

                ultimoEvento.vida = ultimoEvento.vida - vidaTirada;
                contexto.append(`Você da um soco, e acerta com ${testeForca} em seu teste, tirando ${vidaTirada} de vida. \n\n`);
                contexto.scrollTop = contexto.scrollHeight;
                console.log('vida tirada: ' + ultimoEvento.vida);
                console.log('defesa bicho: ' + defesaPassiva);
            }

            furtivo = false;
            btnsAcao.forEach((btnAcao) => {
                if(btnAcao.innerText == 'Atacar') {
                    btnAcao.style.setProperty('border-color', '#767676');
                }
            });

            acumuloAtqPod = 0;
            acumuloManaPod = 0;

            if(ultimoEvento.vida <= 0) {
                contexto.append('Com um golpe fatal, você arranca a cabeça desta criatura. \n\n');
                ultimoEvento.vida = ultimoEventoVida;
                usos = [];
                turno.innerText = '';
                //erro muito bizarro aconteceu aqui, vc lembra?
                contagemTurno = 0;
                somaDano = 0;
                opcaoCaminhar();
            } else {
                btnsAtq.forEach(btnAtq => {
                    btnAtq.style.display = 'none';
                });
                turnoBicho.style.display = 'block';
                somaDano += vidaTirada;
                setTimeout(() =>{
                    ataqueOponente();
                }, 2000);
            }
            break;
        case 'Atq. mágico':
            if(mana > 0) {
                //tirar modo furtivo
                furtivo = false;
                btnsAcao.forEach((btnAcao) => {
                    if(btnAcao.innerText == 'Atacar') {
                        btnAcao.style.setProperty('border-color', '#767676');
                    }
                });

                btnsAtq.forEach(btnAtq => {
                    btnAtq.style.display = 'none';
                });

                magAtq.forEach(magAtq => {
                    if(magAtq.innerText != '[vazio]')
                        magAtq.addEventListener('click', _atacarMagia);
                });

                btnNenhum.style.display = 'inline'
                btnNenhum.removeEventListener('click', _nenhuma);
                btnNenhum.addEventListener('click', _cancelar,);
            } else {
                contexto.append('Não tem mana fi da puta');
                contexto.scrollTop = contexto.scrollHeight;
                magiaSemMana = true;
                iniciarBatalha();
            }
            break;
        case armaAtual.nome:

            if(ultimoEvento.defesa != 0)
                defesaPassiva = ((ultimoEvento.defesa + 1) * defesaPassiva) + 5;

            if(defesaPassiva <= testeForca) {
                vidaTirada = armaAtual.efeito();
                if(furtivo)
                    vidaTirada += rolarDados('d6', agilidade+2);
                if (critico)
                    vidaTirada += rolarDados('d3', sorte + armaAtual.bonusCrt);

                vidaTirada += acumuloAtqPod;

                //bonus da força
                forca > 0 ? vidaTirada += rolarDados('d3', forca) : console.log('nada por aqui');

                ultimoEvento.vida = ultimoEvento.vida - vidaTirada;
                contexto.append(`Você acerta com ${testeForca} em seu teste, tirando ${vidaTirada} de vida. \n\n`);
                contexto.scrollTop = contexto.scrollHeight;
                console.log('vida tirada: ' + ultimoEvento.vida);
                console.log('defesa bicho: ' + defesaPassiva);
            }

            furtivo = false;
            btnsAcao.forEach((btnAcao) => {
                if(btnAcao.innerText == 'Atacar') {
                    btnAcao.style.setProperty('border-color', '#767676');
                }
            });

            acumuloAtqPod = 0;

            if(ultimoEvento.vida <= 0) {
                contexto.append('Com um golpe fatal, você arranca a cabeça desta criatura. \n\n');
                ultimoEvento.vida = ultimoEventoVida;
                usos = [];
                turno.innerText = '';
                //erro muito bizarro aconteceu aqui, vc lembra?
                contagemTurno = 0;
                somaDano = 0;
                opcaoCaminhar();
            } else {
                btnsAtq.forEach(btnAtq => {
                    btnAtq.style.display = 'none';
                });
                turnoBicho.style.display = 'block';
                somaDano += vidaTirada;
                setTimeout(() =>{
                    ataqueOponente();
                }, 2000);
            }
            break;
        default:
            break;
    }
}

var _cancelar = function () {
    mag.forEach(mag => {
        mag.removeEventListener('click', _atacarMagia);
    });
    btnsAtq.forEach(btnAtq => {
        btnAtq.style.display = 'inline';
    });
    btnNenhum.style.display = 'none';
    btnNenhum.removeEventListener('click', _cancelar);
}

var _atacarMagia = function (e) {
    let vidaTirada = 0,
    testeInt = rolarAcerto('Inteligência');
    console.log(magiaAtual);
    magiaAtual.forEach(magiaAtual => {
        if(e.currentTarget.innerText == magiaAtual.nome) {
            if (critico)
                vidaTirada += rolarDados('d6', sorte + magiaAtual.bonusCrt);
            //bonus inteligência
            vidaTirada += rolarDados('d3', inteligencia+1);
            if(rolarAcertoOponente('vigor') <= testeInt) {
                vidaTirada += magiaAtual.efeito();
                ultimoEvento.vida -= vidaTirada;
            } else {
                vidaTirada += magiaAtual.efeito();
                vidaTirada = Math.floor(vidaTirada / 2);
                ultimoEvento.vida -= vidaTirada;
            }
            mana -= manaGasta(magiaAtual.gastoMana);
            progressbarMana.style.setProperty('--progress', mana);
        }
    });
    contexto.append(`Você acerta sua magia com ${testeInt} em seu teste, tirando ${vidaTirada} de vida. \n\n`);
    contexto.scrollTop = contexto.scrollHeight;
    console.log('vida tirada: ' + ultimoEvento.vida);
    
    if(ultimoEvento.vida <= 0) {
        contexto.append('Com um golpe fatal, você arranca a cabeça desta criatura. \n\n');
        ultimoEvento.vida = ultimoEventoVida;
        usos = [];
        turno.innerText = '';
        contagemTurno = 0;
        somaDano = 0;
        opcaoCaminhar();
    } else {
        btnNenhum.style.display = 'none';
        turnoBicho.style.display = 'block';
        somaDano += vidaTirada;
        setTimeout(() => {
            ataqueOponente();
        }, 2000);
    }
    mag.forEach(mag => {
        mag.removeEventListener('click', _atacarMagia);
    });
}

var _nenhuma = function () {
    dialogo.innerText = `Pra onde você quer ir?`;
    mag.forEach((mag) => {
        mag.removeEventListener('click', _magicasAtq);
        mag.removeEventListener('click', _magicasSup);
    });
    btnNenhum.removeEventListener('click', _nenhuma);
    opcaoCaminhar();
}

var _magicasAtq = function (e) {
    e.currentTarget.innerText = ultimoEvento.nome;
    e.currentTarget.setAttribute('title', ultimoEvento.descricao);
    mag.forEach((mag) => {
        mag.removeEventListener('click', _magicasAtq);
    });
    dialogo.innerText = 'Pra onde você quer ir?';
    opcaoCaminhar();
}

var _magicasSup = function (e) {
    e.currentTarget.innerText = ultimoEvento.nome;
    e.currentTarget.setAttribute('title', ultimoEvento.descricao);
    mag.forEach((mag) => {
        mag.removeEventListener('click', _magicasSup);
    });
    dialogo.innerText = 'Pra onde você quer ir?';
    opcaoCaminhar();
}

var _eventoAndar = function (e) {

    ultimaAndada = e.currentTarget.innerText.toLowerCase();
    escolherMapa();
    contexto.scrollTop = contexto.scrollHeight;

}

var _acoes = function (e) {

    btnsAcao.forEach((btnsAcao) => {
        btnsAcao.style.display = 'none';
    });

    testeDefesa = 0;

    switch(e.currentTarget.innerText) {
        case 'Atacar':
            magiaAtual = [];
            if(inv[0].innerText == '[vazio]') {
                btnsAtq[1].disabled = true;
                btnsAtq[1].setAttribute('title', 'você não possui uma arma, tente dar um soquinho :)');
            } else {
                btnsAtq[1].disabled = false;
                btnsAtq[1].innerText = inv[0].innerText;
                for (let i = 1; i <= 10; i++)
                    if(eval('m1' + i).nome == inv[0].innerText) {
                        armaAtual = eval('m1' + i);
                        btnsAtq[1].setAttribute('title', armaAtual.descricao);
                    }
            }

            btnsAtq[2].disabled = true;
            btnsAtq[2].setAttribute('title', 'Você nenhuma magia, tente dar um soquinho :)');
            if(acumuloAtqPod != 0) {
                btnsAtq[2].setAttribute('title', 'Não da pra usar o ataque poderoso em ataques mágicos :(');
            } else {
                if(mag1.innerText != '[vazio]' || mag2.innerText != '[vazio]') {
                    btnsAtq[2].disabled = false;
                    btnsAtq[2].removeAttribute('title');
                    for(let i = 1; i <= 2; i++)
                        magiaAtual.push(eval('m2' + i));
                }
            }

            btnsAtq.forEach((btnsAtq) => {
                btnsAtq.addEventListener('click', _ataqueViajante);
                btnsAtq.style.display = 'inline';
            });

            break;
        case 'Defender':
            testeDefesa = rolarAcerto('Defesa');
            turnoBicho.style.display = 'block';
            furtivo = false;
            btnsAcao.forEach((btnAcao) => {
                if(btnAcao.innerText == 'Atacar') {
                    btnAcao.style.setProperty('border-color', '#767676');
                }
            });
            setTimeout(() => {
                ataqueOponente();
            }, 2000);
            break;
        //muda borda botão
        case 'Atq. poderoso':
            break;
        case 'Itens/magia':
            break;
        default:
            break;
    }

}

function opcaoCaminhar(){

    contexto.scrollTop = contexto.scrollHeight;

	for (var i = btnsAndar.length - 1; i >= 0; i--) {
		btnsAndar[i].style.display = 'inline';
        btnsAcao[i].style.display = 'none';
	}
    for (var i = btnsSN.length - 1; i >= 0; i--) {
        btnsSN[i].style.display = 'none';
    }
    for (var i = btnsAtq.length - 1; i >= 0; i--) {
        btnsAtq[i].style.display = 'none';
    }

    btnNenhum.style.display = 'none';

    btnsAndar.forEach((btnsAndar) => {
        btnsAndar.removeEventListener('click', _eventoAndar);
    });

    btnsAndar.forEach((btnsAndar) => {
        btnsAndar.addEventListener('click', _eventoAndar);
    });

}

function rolarAtaqueFurtivo() {
    let testeAgi = rolarAcerto('Agilidade'),
    testeIntOp = rolarAcertoOponente('inteligencia');

    testeAgi > testeIntOp ? furtivo = true :
                            furtivo = false;

    console.log(furtivo);
    btnsAcao.forEach((btnAcao) => {
        if(btnAcao.innerText == 'Atacar') {
            btnAcao.style.setProperty('border-color', '#575CFA');
        }
    });
    let textoAtqFurt = 'Possibilidade de ataque furtivo! \n\n';
    let span = document.createElement('span');
    span.innerText = textoAtqFurt;
    span.style.color = '#575CFA';
    contexto.appendChild(span);
    iniciarBatalha();

}

var _AddDadosAtqP = function(e) {
    switch (e.currentTarget.innerText) {
        case buttonsAtqPod[0].innerText:
            acumuloAtqPod = rolarDados('d12', parseInt(buttonsAtqPod[0].innerHTML.split('d')[0]));
            acumuloManaPod = 25;
            buttonsAtqPod.forEach(btn => {
                btn.style.display = 'none';
            });
            btnsAtq.forEach(btn => {
                if(btn.innerText == 'Atq. mágico')
                    btn.disabled = true;
            });
            btnsAcao.forEach(btn => {
                if(btn.innerText == 'Atacar')
                    btn.click();
            });
            break;
        case buttonsAtqPod[1].innerText:
            acumuloAtqPod = rolarDados('d12', parseInt(buttonsAtqPod[1].innerHTML.split('d')[0]));
            acumuloManaPod = 30;
            buttonsAtqPod.forEach(btn => {
                btn.style.display = 'none';
            });
            btnsAtq.forEach(btn => {
                if(btn.innerText == 'Atq. mágico')
                    btn.disabled = true;
            });
            btnsAcao.forEach(btn => {
                if(btn.innerText == 'Atacar')
                    btn.click();
            });
            break;
        case buttonsAtqPod[2].innerText:
            acumuloAtqPod = rolarDados('d12', parseInt(buttonsAtqPod[2].innerHTML.split('d')[0]));
            acumuloManaPod = 40;
            buttonsAtqPod.forEach(btn => {
                btn.style.display = 'none';
            });
            btnsAtq.forEach(btn => {
                if(btn.innerText == 'Atq. mágico')
                    btn.disabled = true;
            });
            btnsAcao.forEach(btn => {
                if(btn.innerText == 'Atacar')
                    btn.click();
            });
            break;
        default:
            break;
    }
}

var _ataquePoderoso = function() {
    somaDano = 0;
    const respAtqPoderoso = document.getElementById('respAtqPoderoso');
    nivel = lvl.innerText.split(':')[1].trim();
    for (let i = 0; i < 3; i++) {
        buttonsAtqPod[i] = document.createElement('button');
        respAtqPoderoso.appendChild(buttonsAtqPod[i]);
    }
    buttonsAtqPod[0].innerText = '+' + (parseInt(nivel)+3) + 'd12';
    buttonsAtqPod[1].innerText = '+' + (parseInt(nivel)+4) + 'd12';
    buttonsAtqPod[2].innerText = '+' + (parseInt(nivel)+5) + 'd12';
    buttonsAtqPod.forEach(button => {
        button.removeEventListener('click', _AddDadosAtqP);
    });
    buttonsAtqPod.forEach(button => {
        button.addEventListener('click', _AddDadosAtqP);
    });
}

function iniciarBatalha() {

    if(!magiaSemMana) {
        contagemTurno ++;
        turno.innerText = `Turno: ${contagemTurno}`;
    }

    console.log('somadano: ' + somaDano);
    validarEspecial = false;
    if(lvl.innerText.split(':')[1].trim() > 0) {
        contadorDano = 50 * (lvl.innerText.split(':')[1].trim());
        console.log('contador dano: ' + contadorDano);
        if(vida <= 45 && somaDano >= contadorDano) {
            validarEspecial = true;
        }
    }
        
    if(!validarEspecial)
        btnPoderoso.setAttribute('title', 'Especial precisa ser carregado');
    else
        btnPoderoso.removeAttribute('title');
    
    btnPoderoso.disabled = !validarEspecial;
    btnPoderoso.removeEventListener('click', _ataquePoderoso);
    btnPoderoso.addEventListener('click', _ataquePoderoso);
    magiaSemMana = false;

    btnsAtq.forEach((btnsAtq) => {
        btnsAtq.style.display = 'none';
    });
    btnsAndar.forEach((btnsAndar) => {
        btnsAndar.style.display = 'none';
    });
    btnsAcao.forEach((btnsAcao) => {
        btnsAcao.style.display = 'inline';
        btnsAcao.removeEventListener('click', _acoes);
    });
    btnsAcao.forEach((btnsAcao) => {
        btnsAcao.addEventListener('click', _acoes);
    });

}

function iniciarTurnoOp() {
    contagemTurno = -1;
    contagemTurno ++;
    btnsAndar.forEach((btnsAndar) => {
        btnsAndar.style.display = 'none';
    });
    turnoBicho.style.display = 'block';
    setTimeout(() => {
        ataqueOponente();
    }, 4000);
}

function escolherMapa() {

    aleatorizar();
    console.log(mapaEscolhido);

    recuperarAtributosViajante();

    if(ultimaEscolha.value == mapaEscolhido && ultimaEscolha.value != 0) {
        escolherMapa();
    } else {

        if(parseInt(lvl.innerText.split(':')[1].trim()) < 5 && mapaEscolhido == 4)
            mapaEscolhido = 0;

        if(mapaEscolhido == 0) {
            dialogo.innerText = `Você andou para ${ultimaAndada} e encontrou... Para onde você quer ir?`
            //depois ver se o const não ta fodendo tudo...
            const escolha = "m" + mapaEscolhido + (Math.floor(Math.random() * (5 - 1)) + 1);
            contexto.append(eval(escolha).descricao + "\n\n");
            ultimoEvento = eval(escolha);

        } else if(mapaEscolhido == 1) {
            dialogo.innerText = `Você andou para ${ultimaAndada} e encontrou... Colocar no inventário?`
            let escolha = "m" + mapaEscolhido + (Math.floor(Math.random() * (2 - 1)) + 1);
            contexto.append(eval(escolha).descricao + "\n\n");
            ultimoEvento = eval(escolha);

            for (var i = btnsAndar.length - 1; i >= 0; i--) {
                btnsAndar[i].style.display = 'none';
            }
            for (var i = btnsSN.length - 1; i >= 0; i--) {
                btnsSN[i].style.display = 'inline';
            }

            for(var i = 0; i < btnsSN.length; i++) {
                btnsSN[i].addEventListener("click", function () {
                    const valor = this.innerHTML;
                    switch(valor) {
                        case "Sim":
                            // cdg para add nos diferentes invs: console.log(eval('inv' + eval(escolha).nada));
                            switch(ultimoEvento.tipo) {
                                case 'arma':
                                    contentSpan.innerText = ultimoEvento.nome;
                                    inv1.removeAttribute('title');
                                    inv1.childNodes[0].replaceWith(contentSpan);
                                    divContent1.innerText = ultimoEvento.descricao;
                                    imgContent1.setAttribute('src', ultimoEvento.imgArma);
                                    hover[0].classList.add('hoverAtivo');
                                    dialogo.innerText = 'Pra onde você quer ir?';
                                    opcaoCaminhar();
                                    break;
                                case 'comida':
                                    opcaoCaminhar();
                                    break;
                                case 'pocao':
                                    opcaoCaminhar();
                                    break;
                                case 'amuleto':
                                    opcaoCaminhar();
                                    break;
                                case 'armadura':
                                    opcaoCaminhar();
                                default:
                                    //por enquanto
                                    opcaoCaminhar();
                                    break;
                            }
                            break;
                        case "Não":
                            dialogo.innerText = 'Pra onde você quer ir?';
                            opcaoCaminhar();
                            break;
                        default:
                            break;
                    }
                }, { once: true });
            }
        } else if(mapaEscolhido == 2){
            dialogo.innerText = `Você andou para ${ultimaAndada} e encontrou... Aprender nova magia?`
            let escolha = "m" + mapaEscolhido + (Math.floor(Math.random() * (3 - 1)) + 1);
            contexto.append(eval(escolha).descricao + "\n\n");
            ultimoEvento = eval(escolha);

            for (var i = btnsAndar.length - 1; i >= 0; i--) {
                btnsAndar[i].style.display = 'none';
            }
            
            btnNenhum.style.display = 'inline';
            btnNenhum.removeEventListener('click', _cancelar);
            btnNenhum.addEventListener('click', _nenhuma);

            if(ultimoEvento.tipo == 'atq') {
                magAtq.forEach(magAtq => {
                    magAtq.addEventListener('click', _magicasAtq);
                });
            } else if(ultimoEvento.tipo == 'sup') {
                magSup.forEach(magSup => {
                    magSup.addEventListener('click', _magicasSup)
                });
            }

        } else if(mapaEscolhido == 3) {
            dialogo.innerText = `Você andou para ${ultimaAndada} e encontrou... Prepare-se para batalha`
            const escolha = "m" + mapaEscolhido + (Math.floor(Math.random() * (1 - 1)) + 1);
            contexto.append(eval(escolha).descricao + "\n\n");
            ultimoEvento = eval(escolha);
            ultimoEventoVida = ultimoEvento.vida;
            
            let testeAgi = rolarAcerto('Agilidade'), testeAgiOp = rolarAcertoOponente('agilidade');
            while(testeAgiOp == testeAgi) {
                //ao invés de rolar de novo, colocar quem tem a agilidade maior, caso for igual rola de novo
                testeAgi = rolarAcerto('Agilidade');
                testeAgiOp = rolarAcertoOponente('agilidade');
            }

            // 0 = viajante // 1 = oponente
            testeAgi > testeAgiOp ? boolComecar = 0 : boolComecar = 1;
            if(boolComecar == 0) {
                rolarAtaqueFurtivo();
            } else if(boolComecar == 1) {
                iniciarTurnoOp();

            } else {
                console.log('não foi definido quem começará');
            }

        } else if(mapaEscolhido == 4) {
            dialogo.innerText = `Você andou para ${ultimaAndada} e encontrou... Para onde você quer ir?`
            const escolha = "m" + mapaEscolhido + (Math.floor(Math.random() * (1 - 1)) + 1);
            contexto.append(eval(escolha).descricao + "\n\n");
            ultimoEvento = eval(escolha);
            iniciarBatalha();

        }

        ultimaEscolha.value = mapaEscolhido;
        console.log('ultima escolha ' + ultimaEscolha.value);

    }

}