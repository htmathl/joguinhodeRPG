let dialogo = document.getElementById("dialogo");
let btnContinuar = document.getElementById('continuar');

let btnsAndar, btnsSN, btnsAcao, btnsAtq, btnsMais, btnsMenos, btnNenhum, 
btnAtacar, btnDefender,btnPoderoso, btnItens;

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

let buttonsAtqPod = [];

let progressbarVida = document.querySelector('#barraVida');
let progressbarMana = document.querySelector('#barraMana');
let lvl = document.getElementById('nivel');
let pnts = document.getElementById('pontos');
let turno = document.getElementById('turno');
let condicao = document.getElementById('condicao');

let dlg;

inv.forEach(inv =>{
    inv.setAttribute('title', 'Você está se sentindo leve, mas desprotegido, é melhor pegar alguns itens... Alías, inventário, viajante, viajante, inventário.');
});

mag.forEach(mag => {
    mag.setAttribute('title', 'Aqui é onde você escreve ou guarda suas magias, eu chamo de Alfredo, mas você pode escolher algo como grimório, não sei.');
});

//@todo fazer sistemas de escapar dos bichos tbm (tem alguns que nao vai funcionar)
//sistema só funciona quando há uma certeza que terá atq furtivo
//mudar o botao de defesa para fugir
//colocar algumas recompensas alem de xp por derrotar certas criaturas

//   @todo     !!!!!!!!!  refatorar fors !!!!!!!!!

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

function recuperarBtns() {
    btnsAndar = document.querySelectorAll('.botoes');
    btnsSN = document.querySelectorAll('.botoesSN');
    btnsAcao = document.querySelectorAll('.botoesAcao');
    btnsAtq = document.querySelectorAll('.botoesAtq');
    btnsMais = document.querySelectorAll('.btnMais');
    btnsMenos = document.querySelectorAll('.btnMenos');
    btnNenhum = document.getElementById('btnNenhuma');
    btnAtacar = document.getElementById('btnAtacar');
    btnDefender = document.getElementById('btnDefender');
    btnPoderoso = document.getElementById('btnPoderoso');
    btnItens = document.getElementById('btnItens');
}

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
    mag.forEach((mag) => {
        mag.innerText = '[vazio]';
    });
}

class jogin {
    #mapaEscolhido;
    #ultimoMapa;
    #ultimoLugar;
    #ultimoEvento;
    #ultimoEventoVida;
    #usos = [];
    #nome;
    #atributos = { 
        forca: 5,
        vigor: 0,
        inteligencia: 0,
        defesa: 0,
        agilidade: 6,
        sorte: 0,
    };
    #pontosVida = 20; 
    #pontosMana = 90;
    #vida = 100;
    #mana = 100;
    #experiencia = 0;
    #nivel = 1;
    #pontos = 0;
    #inventario = {
        slot1: {
        },
        slot2: {
        },
        slot3: {
        },
        slot4: {
        },
        slot5: {
        }
    };
    #magiasAtuais = {
        mag1: {
        },
        mag2: {
        },
        mag3: {
        },
        mag4: {
        },
    };
    #critico = false;
    #furtivo;
    #validarPoderoso;
    #dadosAtqPod = [];
    #testeDefesa = 0;
    #contadorDano = 0;
    #somaDano = 0;
    #acumuloAtqPod = 0;
    #contagemTurno = 0;
    #intervaloProMana;
    #intervaloValMag0;
    #intervaloValMag1;
    #intervaloValMags = [this.#intervaloValMag0, this.#intervaloValMag1];

    //@todo rever os atributos dos bichos e tudo mias
    //@todo rever o bonus dos negocios ( +15 para 4 dados me parece muito ) ( pode ser tipo a cada numero impar ou par aumentar o bonus )
    //@todo se tirar 1 (mesmo que ataque magico) colocar desastre (acontece algo ruim);
    //@todo se matar com magia a cor do botao nao fica branca (arrumar)

    // @follow-up -------------- eventos ---------------
    //mapa com evento aleatório = 0
    //mapa com item = 1
    //mapa com magias = 2
    //mapa com monstro = 3
    //mapa com boss = 4
    #eventos = [
        // ---------------- eventos aleatórios ----------------
        {
            indice: 0,
            classe: 0,
            descricao: ['Nada, além de um silêncio calmante...', 
            'Uma pedra? Não parece ser nada.',
            'Há um som estranho no ambiente... você olha para a frente e se depara com nada.',
            'Parabéns, viajante, você encontrou nada...',
            'Hmmm, melhor continuar, nada por aqui.',
            ],
        },
        {
            indice: 1,
            classe: 0,
            descricao: ['Nada, além de um silêncio calmante...', 
            'Uma pedra? Não parece ser nada.',
            'Há um som estranho no ambiente... você olha para a frente e se depara com nada.',
            'Parabéns, viajante, você encontrou nada...',
            'Hmmm, melhor continuar, nada por aqui.',
            ],
        },
        {
            indice: 2,
            classe: 0,
            descricao: ['Nada, além de um silêncio calmante...', 
            'Uma pedra? Não parece ser nada.',
            'Há um som estranho no ambiente... você olha para a frente e se depara com nada.',
            'Parabéns, viajante, você encontrou nada...',
            'Hmmm, melhor continuar, nada por aqui.',
            ],
        },
        {
            indice: 3,
            classe: 0,
            descricao: ['Nada, além de um silêncio calmante...', 
            'Uma pedra? Não parece ser nada.',
            'Há um som estranho no ambiente... você olha para a frente e se depara com nada.',
            'Parabéns, viajante, você encontrou nada...',
            'Hmmm, melhor continuar, nada por aqui.',
            ],
        },
        {
            indice: 4,
            classe: 0,
            descricao: ['Nada, além de um silêncio calmante...', 
            'Uma pedra? Não parece ser nada.',
            'Há um som estranho no ambiente... você olha para a frente e se depara com nada.',
            'Parabéns, viajante, você encontrou nada...',
            'Hmmm, melhor continuar, nada por aqui.',
            ],
        },
        {
            indice: 5,
            classe: 0,
            descricao: ['Nada, além de um silêncio calmante...', 
            'Uma pedra? Não parece ser nada.',
            'Há um som estranho no ambiente... você olha para a frente e se depara com nada.',
            'Parabéns, viajante, você encontrou nada...',
            'Hmmm, melhor continuar, nada por aqui.',
            ],
        },
        {
            indice: 6,
            classe: 0,
            descricao: ['Nada, além de um silêncio calmante...', 
            'Uma pedra? Não parece ser nada.',
            'Há um som estranho no ambiente... você olha para a frente e se depara com nada.',
            'Parabéns, viajante, você encontrou nada...',
            'Hmmm, melhor continuar, nada por aqui.',
            ],
        },
        {
            indice: 7,
            classe: 0,
            descricao: ['Nada, além de um silêncio calmante...', 
            'Uma pedra? Não parece ser nada.',
            'Há um som estranho no ambiente... você olha para a frente e se depara com nada.',
            'Parabéns, viajante, você encontrou nada...',
            'Hmmm, melhor continuar, nada por aqui.',
            ],
        },
        {
            indice: 8,
            classe: 0,
            descricao: ['Nada, além de um silêncio calmante...', 
            'Uma pedra? Não parece ser nada.',
            'Há um som estranho no ambiente... você olha para a frente e se depara com nada.',
            'Parabéns, viajante, você encontrou nada...',
            'Hmmm, melhor continuar, nada por aqui.',
            ],
        },
        {
            indice: 9,
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
            indice: 11,
            classe: 1,
            nome: 'Arma 1',
            tipo: 'armaCaC',
            imgArma: './img/testinho.png',
            descricao: '[Espada enferrujada, 1d6 + 4 de dano]',
            msgMorte: 'Um corte rápido que arranca o braço da criatura faz com que ela morra de hemorragia',
            efeito: () => {
                return this.#rolarDados('d6', 1) + 4;
            },
        },
        
        {
            indice: 12,
            classe: 1,
            nome: 'Esp. 2',
            tipo: 'comida',
            descricao: '[Espada de aço, 1d6 + 6 de dano]',
        },
        
        {
            indice: 13,
            classe: 1,
            nome: 'Arma 2',
            tipo: 'arma',
            imgArma: './img/testezinho.png',
            descricao: '[Arco torto, 1d6 + 3 de dano]',
            bonusCrt: 1,
            efeito: () => {
                ultimoEvento.condicao = 'PARALIZIA';
                return rolarDados('d6', 1) + 3
            },
        },
        
        {
            indice: 14,
            classe: 1,
            nome: 'Esp. 4',
            tipo: 'pocao',
            descricao: '[Besta lenta, 1d6 + 4 de dano]',
            dano: (Math.floor(Math.random() * (6 - 1)) + 1) + 4,
        },
        
        {
            indice: 15,
            classe: 1,
            nome: 'Arma 3',
            tipo: 'arma',
            imgArma: './img/miuu.png',
            descricao: '[Espada rosa, 1d8 + 2]',
            bonusCrt: 1,
            efeito: () => {
                return rolarDados('d8', 1) + 2
            },
        },
        
        {
            indice: 16,
            classe: 1,
            nome: 'Esp. 6',
            tipo: true,
            descricao: '[Espadão, 2d6 + 8 de dano]',
            bonusCrt: 1,
            dano: (Math.floor(Math.random() * (6 - 1)) + 1) +
                  (Math.floor(Math.random() * (6 - 1)) + 1) + 8,
        },
        
        {
            indice: 17,
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
            indice: 18,
            classe: 1,
            nome: 'Esp. 8',
            tipo: '',
            descricao: '[Lança gigante, 2d12 de dano]',
            dano: (Math.floor(Math.random() * (12 - 1)) + 1) +
                  (Math.floor(Math.random() * (12 - 1)) + 1),
        },
        
        {
            indice: 19,
            classe: 1,
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
        },
        
        {
            indice: 110,
            classe: 1,
            nome: 'Esp. 10',
            tipo: false,
            descricao: '[Foice da morte, 2d12 + 6 de dano]',
            dano: (Math.floor(Math.random() * (12 - 1)) + 1) +
                  (Math.floor(Math.random() * (12 - 1)) + 1) + 6,
        },
        
        // ---------------- magias ----------------
        
        {
            indice: 20,
            classe: 2,
            nome: 'magia',
            tipo: 'atq',
            descricao: 'descrição de uma magia 1',
            efeito: () => {
                this.#ultimoEvento.condicao = 'AMALDICOADO';
                return this.#rolarDados('d10', 1);
            },
            gastoMana: 16,
            bonusCrt: 1,
        },

        {
            indice: 21,
            classe: 2,
            nome: 'magia 3',
            tipo: 'atq',
            descricao: 'descrição de uma magia 3',
            efeito: () => {
                this.#ultimoEvento.condicao = 'AMALDICOADO';
                return this.#rolarDados('d10', 5);
            },
            gastoMana: 4,
            bonusCrt: 1,
        },
        
        {
            indice: 22,
            classe: 2,
            nome: 'magia 2',
            tipo: 'sup',
            descricao: 'descrição de uma magia 2',
        },
        
        // ---------------- bichos ---------------- 
        
        {
            indice: 31,
            classe: 3,
            nome: 'um zumbi de gelo',
            descricao: 'uma descrição de um bicho',
            vida: 500,
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
        },

        // ----------------- boss -----------------
        {
            indice: 41,
            classe: 4,
            descricao: 'um boss',
        },
    ];
    
    constructor() {
        this.#mudarVazio();
        this.#definirIntro();
        this.#definirCondicao();
    }

    //@follow-up --------------------- estilos -------------------------
    #mudarVisibilidadeBotoes(ctx) {
        recuperarBtns();
        let botoes = [ btnsAndar, btnsAcao, btnsSN, btnsAtq ];
        botoes.forEach(e => {
            e.forEach(e => { e.style.display = 'none' });
        });
        if( ctx <= 3 ) 
            botoes[ctx].forEach(e => { e.style.display = 'inline' });
        ctx == 4 ? btnNenhum.style.display = 'inline' : 
                   btnNenhum.style.display = 'none';
        ctx == 5 ? turnoBicho.style.display = 'block':
                   turnoBicho.style.display = 'none';
    }

    #mudarVazio() {
        inv.forEach(e => {
            if( e.innerText != '[vazio]' )
                e.style.color = 'white';
            else
                e.style.color = 'rgba(255, 255, 255, 0.499)';
        });
        mag.forEach(e => {
            if( e.innerText != '[vazio]' )
                e.style.color = 'white';
            else
                e.style.color = 'rgba(255, 255, 255, 0.499)';
        });
    }

    #definirIntro() {
        recuperarBtns();
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
    
        //@todo quando for tirar isso para voltar a ter intro, lembrar de atualizar todo if do n == 3
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
            contexto.append('A luz da lua irradia pela a fresta sobre sua cabeça, o ambiente está gelado, você consegue ver algo escrito na parede a sua frente. \n\n');
            const resposta = document.getElementById('inputResposta');
                resposta.focus();
                resposta.addEventListener('keyup', (e) => {
                    var key = e.which || e.keyCode;
                        if (key == 13) {
                            if(resposta.value != "") {
                                this.#nome = resposta.value;
                                dialogo.innerText = "Olá " + this.#nome + ", para onde você quer ir?"
                                inputResposta.style.display = "none"
                                this.#opcaoCaminhar();
                            } else {
                                resposta.placeholder = 'Não entendi o seu nome';
                            }
                        }
                });
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
                // ----------------- nome -----------------
                function resposta() {
                    const resposta = document.getElementById('inputResposta');
                    resposta.addEventListener('keyup', (e) => {
                    var key = e.which || e.keyCode;
                    if (key == 13) {
                        if(resposta.value != "") {
                            nome = resposta.value;
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
            }
        });
    }

    escreverContexto(texto) {
        contexto.append(texto);
        contexto.scrollTop = contexto.scrollHeight;
    }

    inserirHtmlContexto(elemento, texto) {
        const elementoCriado = document.createElement(elemento);
        elementoCriado.innerText = `${texto} \n\n`;
        elementoCriado.style.setProperty('text-decoration', 'underline');
        contexto.appendChild(elementoCriado);
        contexto.scrollTop = contexto.scrollHeight;
    }

    #semManaOver = () => {
        dlg = dialogo.innerText;
        dialogo.style.color = '#DB4B55';
        dialogo.innerText = 'Mana insuficiente';
        this.#intervaloProMana = setInterval(() => {
            if( progressbarMana.style.backgroundColor == '' ) {
                progressbarMana.style.backgroundColor = 'rgba(219, 75, 85, 0.25)';
            } else {
                progressbarMana.style.backgroundColor = '';
            }
        }, 500);

        magAtq.forEach(e => {
            e.removeEventListener('mouseout', this.#semManaOut);
        });
        magAtq.forEach(e => {
            e.addEventListener('mouseout', this.#semManaOut);
        });
    }

    #semManaOut = () => {
        dialogo.style.color = 'white';
        dialogo.innerText = dlg;
        progressbarMana.style.backgroundColor = '';
        clearInterval(this.#intervaloProMana);
    }

    // @follow-up --------------- explicação da condição -------------- 
    #definirCondicao() {
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

    //@follow-up ---------------- calcular dados e funções  ------------------
    #aleatorizar() {
        const chance = Math.floor(Math.random() * 500);
        if(chance <= 180)
            this.#mapaEscolhido = 0;
        if(chance > 180 && chance <= 275)
            this.#mapaEscolhido = 1;
        if(chance > 275 && chance <= 370)
            this.#mapaEscolhido = 2;
        if(chance > 370 && chance <= 450)
            this.#mapaEscolhido = 3;
        if(chance > 450)
            this.#mapaEscolhido = 4;
    }

    #rolarDados(tipoDados, qntDados) {
        let dados = [], result = 0;
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
                if(result == 20)
                    this.#critico = true;
                else
                    this.#critico = false;
    
                for (let i = 2; i <= dados.length; i++) {
                    result += 5;
                }
    
                console.log(dados);
                console.log(tipoDados + ':' + result);
    
                return result;
            default:
                console.log('Escolha um dado adequado');
                break;
        }
    }

    _rolarAcertoOponente(atributo) {
        console.log('teste oponente: ' + atributo);
        return this.#rolarDados('d20', (this.#ultimoEvento[atributo] + 1));
    }

    _rolarAcerto(atributo) {
        console.log('teste viajante: ' + atributo);
        return this.#rolarDados('d20', (this.#recAtr(atributo) + 1));
    }

    #recAtr(atributo) {
        return this.#atributos[atributo];
    }

    #danoSofrido(dano) {
        return Math.floor((dano * 100) / this.#pontosVida);
    }

    #dano() {
        this.#vida -= this.#danoSofrido(this.#ultimoEvento.dano());
        progressbarVida.style.setProperty('--progress', this.#vida);
        contexto.append(this.#ultimoEvento.nome + ', ' + this.#ultimoEvento.textoAtaques[Math.floor(Math.random() * (this.#ultimoEvento.textoAtaques.length))] + '\n\n');
        contexto.scrollTop = contexto.scrollHeight;
    }
    
    #manaGasta(mana) {
        return Math.floor((mana * 100) / this.#pontosMana);
    }

    #eventoUpar() {
        //@todo balancear
        if(this.#experiencia >= (100*this.#nivel))
            lvl.innerText = 'Nível: ' + (parseInt(lvl.innerText.split(':')[1].trim()) + 1);
    }

    //@follow-up ----------------- adicionar magias ao inv --------------

    #magicasAtq = (e) => {
        e.currentTarget.innerText = this.#ultimoEvento.nome;
        this.#mudarVazio();
        e.currentTarget.setAttribute('title', this.#ultimoEvento.descricao);
        for( let i = 0; i < 2; i++ )
            if( magAtq[i].innerText == this.#ultimoEvento.nome )
                this.#magiasAtuais['mag' + (i+1)] = this.#ultimoEvento;
        mag.forEach((mag) => {
            mag.removeEventListener('click', this.#magicasAtq);
        });
        dialogo.innerText = 'Pra onde você quer ir?';
        this.#opcaoCaminhar();
    }
    
    #magicasSup = (e) => {
        e.currentTarget.innerText = this.#ultimoEvento.nome;
        this.#mudarVazio();
        e.currentTarget.setAttribute('title', this.#ultimoEvento.descricao);
        for( let i = 0; i < 2; i++ )
            if( magSup[i].innerText == this.#ultimoEvento.nome )
                this.#magiasAtuais['mag' + (i+3)] = this.#ultimoEvento;
        mag.forEach((mag) => {
            mag.removeEventListener('click', this.#magicasSup);
        });
        dialogo.innerText = 'Pra onde você quer ir?';
        this.#opcaoCaminhar();
    }

    #nenhuma = () => {
        dialogo.innerText = `Pra onde você quer ir?`;
        mag.forEach((mag) => {
            mag.removeEventListener('click', this.#magicasAtq);
            mag.removeEventListener('click', this.#magicasSup);
        });
        btnNenhum.removeEventListener('click', this.#nenhuma);
        this.#opcaoCaminhar();
    }

    //@follow-up ------------------ batalha -------------------------
    #iniciarBatalha() {
        this.#contagemTurno ++;
        turno.innerText = `Turno: ${this.#contagemTurno}`;
    
        console.log('somadano: ' + this.#somaDano);
        btnPoderoso.setAttribute('title', 'Atq.Poderoso precisa ser carregado');
        this.#validarPoderoso = false;
        this.#dadosAtqPod = [];

        //validar poderoso
        if(this.#nivel > 0) {
            this.#contadorDano = 50 * (this.#nivel);
            console.log('contador dano: ' + this.#contadorDano);
            if(this.#vida <= 45 && this.#somaDano >= this.#contadorDano) {
                for (let i = 0; i < 3; i++)
                    this.#dadosAtqPod.push(parseInt(this.#nivel)+(i+3));
                let contar = 0;
                this.#dadosAtqPod.forEach(dado => {
                    if(this.#manaGasta(dado*2+5) > this.#mana)
                        contar++;
                });
                if(contar < 3) {
                    btnPoderoso.removeAttribute('title');
                    btnPoderoso.addEventListener('click', this.#ataquePoderoso);
                    this.#validarPoderoso = true;
                }
            }
        }

        btnPoderoso.disabled = !this.#validarPoderoso;
    
        this.#mudarVisibilidadeBotoes(1);
        btnsAcao.forEach((btnsAcao) => {
            btnsAcao.removeEventListener('click', this.#acoes);
            if(btnsAcao.innerText == 'Atacar' && !this.#furtivo)
            //@todo ver os tirar furtivo (nem todos colocam o botao branco e sim cinza)
                btnsAcao.style.setProperty('color', 'white');
        });
        btnsAcao.forEach((btnsAcao) => {
            btnsAcao.addEventListener('click', this.#acoes);
        });
    
    }

    #iniciarTurnoOp() {
        this.#contagemTurno = -1;
        this.#contagemTurno ++;
        this.#mudarVisibilidadeBotoes(5);
        setTimeout(() => {
            this.#ataqueOponente();
        }, 3000);
    }

    #rolarAtaqueFurtivo() {
        let testeAgi = this._rolarAcerto('agilidade'),
        testeIntOp = this._rolarAcertoOponente('inteligencia');
    
        testeAgi > testeIntOp ? this.#furtivo = true :
                                this.#furtivo = false;
    
        console.log(this.#furtivo);
        btnsAcao.forEach((btnAcao) => {
            if(btnAcao.innerText == 'Atacar')
                btnAcao.style.setProperty('color', '#575CFA');
        });
        let textoAtqFurt = 'Possibilidade de ataque furtivo! \n\n';
        let span = document.createElement('span');
        span.innerText = textoAtqFurt;
        span.style.color = '#575CFA';
        contexto.appendChild(span);
        this.#iniciarBatalha();
    }

    #definirDefesaPassiva(ctx) {
        let defesaPassiva = 5;
        if( ctx == 'vig' ) {
            if(this.#recAtr('defesa') != 0)
                defesaPassiva = ((this.#atributos.defesa + 1) * defesaPassiva) + 5;  
        } else {
            if( this.#ultimoEvento.defesa != 0)
                defesaPassiva = ((this.#ultimoEvento.defesa + 1) * defesaPassiva) + 5;
        }
        return defesaPassiva;
    }

    #acoes = (e) => {
        btnsAcao.forEach((btnsAcao) => {
            btnsAcao.style.display = 'none';
        });
    
        this.#testeDefesa = 0;
        switch(e.currentTarget.innerText) {
            case 'Atacar':
                //armas
                if( Object.keys( this.#inventario['slot1'] ) != 0 || Object.keys( this.#inventario['slot2'] ) != 0 ) {
                    btnsAtq[1].disabled = false;
                    btnsAtq[1].innerText = 'Atq. armado';
                } else {
                    btnsAtq[1].disabled = true;
                    btnsAtq[1].setAttribute('title', 'Você não possui uma arma, tente dar um soquinho :)');
                }

                //se não tiver magia ou mana ou for atq.furtivo
                function toggleMag(toggle) {
                    btnsAtq[2].disabled = !toggle;
                    !toggle ?
                    btnsAtq[2].setAttribute('title', 'Você não consegue usar magias agora, tente dar um soquinho :)') :
                    btnsAtq[2].removeAttribute('title');
                }
                toggleMag(false);
                if(this.#acumuloAtqPod != 0)
                    btnsAtq[2].setAttribute('title', 'Não da pra usar o ataque poderoso com ataques mágicos :(');
                else {
                    let i = 0, magiasSemMana = [];
                    for( let key in this.#magiasAtuais ) {
                        var magia = this.#magiasAtuais[key];
                        if( Object.keys(magia) != 0 && i < 2 )
                            if( this.#mana < this.#manaGasta(magia.gastoMana) )
                                magiasSemMana.push(magia);
                            else
                                toggleMag(true);
                        i++;
                    }
                    if(magiasSemMana.length >= 2 || this.#furtivo )
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
                testeDefesa = rolarAcerto(defesa);
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
            case 'Atq. poderoso':
                break;
            case 'Itens/magia':
                break;
            default:
                break;
        }
    
    }

    #ataquePoderoso = () => {
        btnPoderoso.removeEventListener('click', this.#ataquePoderoso);
        this.#somaDano = 0;
        const respAtqPoderoso = document.getElementById('respAtqPoderoso');
        for (let i = 0; i < 3; i++) {
            buttonsAtqPod[i] = document.createElement('button');
            respAtqPoderoso.appendChild(buttonsAtqPod[i]);
        }
        buttonsAtqPod[0].innerHTML = `<span>+${(parseInt(this.#nivel)+3)}d12</span>`;
        buttonsAtqPod[1].innerHTML = `<span>+${(parseInt(this.#nivel)+4)}d12</span>`;
        buttonsAtqPod[2].innerHTML = `<span>+${(parseInt(this.#nivel)+5)}d12</span>`;
        buttonsAtqPod.forEach(button => {
            button.removeEventListener('click', this.#AddDadosAtqP);
            button.disabled = true;
        });
        for( let m = 0; m < this.#dadosAtqPod.length; m++ ) {
            if( this.#manaGasta((this.#dadosAtqPod[m]*2+5)) <= this.#mana ) {
                buttonsAtqPod[m].disabled = false;
                buttonsAtqPod[m].addEventListener('click', this.#AddDadosAtqP);
            }
        }
    }

    #AddDadosAtqP = (e) => {
        this.#dadosAtqPod.forEach(dado => {
            if( e.currentTarget.innerText == ('+' + dado + 'd12') ) {
                this.#acumuloAtqPod = this.#rolarDados('d12', dado);
                this.#mana -= this.#manaGasta((dado*2+5));
                progressbarMana.style.setProperty('--progress', this.#mana);
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
            }
        });
    }

    #ataqueOponente() {
        let usarMagias = false;
        let ultimoEvento = this.#ultimoEvento; 
    
        //@todo arrumar esse troço ( nem fazer a chance se o uso de magia tiver acabado )
        Object.keys(ultimoEvento).forEach(key => {
            if(key == 'magias')
                usarMagias = (Math.floor(Math.random() * 100) < 50) ? true : false;
        });
    
        while(usarMagias || !usarMagias) {
            console.log('usou magia? ' + usarMagias);
            switch(usarMagias) {
                case true:
                    let numMagia = Math.floor(Math.random() * Object.keys(ultimoEvento.magias).length);
    
                    if(this.#usos.length <= 0)
                        this.#usos.push(ultimoEvento.magias[numMagia].usos);
                    else
                        this.#usos.push(this.#usos[this.#usos.length - 1] - 1);
    
                    if(this.#usos.length > ultimoEvento.magias[numMagia].usos + 1)
                        this.#usos.pop();
    
                    console.log('usos: ' + this.#usos);
    
                    if(this.#usos[this.#usos.length - 1] > 0) {

                        if(this.#testeDefesa != 0) {
                            let span = document.createElement('span');
                            span.innerText = 'Não há como defender ataques mágicos \n\n';
                            span.style.setProperty('text-decoration', 'underline');
                            contexto.appendChild(span);
                            contexto.scrollTop = contexto.scrollHeight;
                        }
    
                        if(this._rolarAcerto('vigor') <= this._rolarAcertoOponente('inteligencia'))
                            this.#vida -= this.#danoSofrido(ultimoEvento.magias[numMagia].efeito());
                        else {
                            this.#vida -= (this.#danoSofrido(ultimoEvento.magias[numMagia].efeito()) / 2);
                            console.log("metade do dano");
                        }
    
                        this.#definirCondicao();
                        progressbarVida.style.setProperty('--progress', this.#vida);
                    } else {
                        usarMagias = false;
                        continue;
                    }
                    break;
                case false:
                    if(this.#testeDefesa != 0) {
                        if(rolarAcertoOponente('forca') >= this.#testeDefesa)
                            this.#dano();
                    } else {
                        if(this.#definirDefesaPassiva('vig') <= this._rolarAcertoOponente('forca'))
                            this.#dano();
                    }
                    break;
                default:
                    console.log('Erro no ataque do oponente.');
                    break;
            }
            break;
        }
    
        console.log('vida: ' + this.#vida);
    
        turnoBicho.style.display = 'none';
        this.#iniciarBatalha();
    }
    
    #ataqueViajante = (e) => {
        let vidaTirada = 0, testeForca = this._rolarAcerto('forca');
        let ultimoEvento = this.#ultimoEvento;

        switch (e.currentTarget.innerText) {
            case 'Soquinho':
                dialogo.innerText = 'Você deu um soquinho';
    
                if(this.#definirDefesaPassiva(null) <= testeForca) {
                    //dano soquinho
                    vidaTirada = this.#rolarDados('d3', 1);
                    //adicionais
                    vidaTirada += this.#adicionaisAtq();
                    //critico
                    if(this.#critico) {
                        let resto = this.#recAtr('sorte') % 5;
                        if( this.#recAtr('sorte') <= 0 )
                            vidaTirada *= 2;
                        else
                            if(resto == 0) {
                                let i = this.#recAtr('sorte') / 5;
                                vidaTirada *= (i+2);
                            }
                    }

                    ultimoEvento.vida -= vidaTirada;
                    contexto.scrollTop = contexto.scrollHeight;
                    console.log('vida tirada: ' + ultimoEvento.vida);
                    console.log('defesa bicho: ' + this.#definirDefesaPassiva(null));
                    this.#somaDano += vidaTirada;

                    //tirar furtivo e atq poderoso
                    this.#acumuloAtqPod = 0;
                    this.#furtivo = false;
                    btnsAcao.forEach((btnAcao) => {
                        if(btnAcao.innerText == 'Atacar') {
                            btnAcao.style.setProperty('color', 'white');
                        }
                    });

                    contexto.append(`Você da um soco, e acerta com ${testeForca}, tirando ${vidaTirada} de vida. \n\n`);   
                } else {
                    //@todo fazer pra outros tipos de defesa alem de esquiva (se for implementado)
                    contexto.append('Em um momento de desespero, você tenta dar um soco nesta criatura, que desvia com facilidade. \n\n');
                    contexto.scrollTop = contexto.scrollHeight;
                    this.#mudarVisibilidadeBotoes(5);
                    setTimeout(() =>{
                        this.#ataqueOponente();
                    }, 2500);
                }

                if(ultimoEvento.vida <= 0) {
                    //@todo colocar cada vez menos chance de encontrar o bicho que ja matou
                    //@todo colocar texto dinamico pra cada arma (dentro de eventos)
                    this.#morteOponente('Com um golpe fatal, você arranca a cabeça desta criatura.')
                } else {
                    this.#mudarVisibilidadeBotoes(5);
                    setTimeout(() => {
                        this.#ataqueOponente();
                    }, 2500);
                }          

                break;
            case 'Atq. mágico':
                //@todo bloquear botao de atq magico caso for atq furtivo ou poderoso (provavelmente em funcao anterior a esse botao)
                this.#furtivo = false;
                btnsAcao.forEach((btnAcao) => {
                    if(btnAcao.innerText == 'Atacar') {
                        btnAcao.style.setProperty('color', 'white');
                    }
                });     

                this.#mudarVisibilidadeBotoes(4);

                for (let i = 0; i < magAtq.length; i++) {
                    const magia = this.#magiasAtuais['mag' + (i+1)];
                    if( Object.keys(magia) != 0 ) {
                        if(this.#mana < this.#manaGasta(magia.gastoMana)) {
                            magAtq[i].removeEventListener('mouseover', this.#semManaOver);
                            magAtq[i].addEventListener('mouseover', this.#semManaOver);
                        } else {
                            magAtq[i].addEventListener('click', this.#atacarMagia);
                            this.#intervaloValMags[i] = setInterval(() => {
                                magAtq[i].style.color = mag[0].style.borderColor;
                            }, 300);
                        }
                    }
                }

                btnNenhum.removeEventListener('click', this.#nenhuma);
                btnNenhum.addEventListener('click', this._cancelar);
                break;
            case 'Atq. armado':
                console.log(this.#inventario);
                for( let i = 0; i < 2; i++) {
                    const arma = this.#inventario['slot' + (i+1)];
                    if( Object.keys(arma) != 0 )
                        inv[i].addEventListener('click', this.#atacarArma);
                }

                this.#mudarVisibilidadeBotoes(4);
                btnNenhum.removeEventListener('click', this.#nenhuma);
                btnNenhum.addEventListener('click', this._cancelar);
                break;
            default:
                break;
        }
    }
    
    #adicionaisAtq() {
        let vidaTirada = 0;
        let forca = this.#recAtr('forca');
        //bonus da força
        forca > 0 ? vidaTirada += this.#rolarDados('d3', forca) : '';
        //adicionais
        console.log(this.#acumuloAtqPod);
        vidaTirada += this.#acumuloAtqPod;
        //@todo balancear po
        if(this.#furtivo)
            vidaTirada += this.#rolarDados('d6', (this.#recAtr('agilidade')+2));

        return vidaTirada;
    }

    #atacarMagia = (e) => {
        mag.forEach(mag => {
            mag.removeEventListener('click', this.#atacarMagia);
        });

        magAtq.forEach(e => {
            e.removeEventListener('mouseover', this.#semManaOver);
            e.removeEventListener('mouseout', this.#semManaOut);
        });

        let i = 0;
        while(i < this.#intervaloValMags.length) {
            clearInterval(this.#intervaloValMags[i]);
            magAtq[i].style.color = 'white';
            i++;
        }

        let vidaTirada = 0,
        testeInt = this._rolarAcerto('inteligencia');
        let ultimoEvento = this.#ultimoEvento;

        for( var key in this.#magiasAtuais ) {
            if (!this.#magiasAtuais.hasOwnProperty(key)) continue;

            let magia = this.#magiasAtuais[key];
            //@todo depois fazer algum sistema pra não pegar itens reptidos
            if( magia.nome == e.currentTarget.innerText ) {
                //bonus inteligência
                vidaTirada += this.#rolarDados('d3', (this.#recAtr('inteligencia')+1));
                //critico
                if(this.#critico) {
                    let resto = this.#recAtr('sorte') % 5;
                    if( this.#recAtr('sorte') <= 0 )
                        vidaTirada *= 2;
                    else
                        if(resto == 0) {
                            let i = this.#recAtr('sorte') / 5;
                            vidaTirada *= (i+2);
                        }
                }
                if(this._rolarAcertoOponente('vigor') <= testeInt) {
                    vidaTirada += magia.efeito();
                    ultimoEvento.vida -= vidaTirada;
                } else {
                    vidaTirada += magia.efeito();
                    vidaTirada = Math.floor(vidaTirada / 2);
                    ultimoEvento.vida -= vidaTirada;
                }

                this.#mana -= this.#manaGasta(magia.gastoMana);
                progressbarMana.style.setProperty('--progress', this.#mana);
                contexto.append(`Você acerta sua magia com ${testeInt}, tirando ${vidaTirada} de vida. \n\n`);
                contexto.scrollTop = contexto.scrollHeight;
                console.log('vida tirada: ' + ultimoEvento.vida);
        
                if(ultimoEvento.vida <= 0) {
                    //@todo depois colocar narração legal e exclusiva par amagias tbm
                    this.#morteOponente('Em uma explosão de mana, você oblitera esta criatura.')
                } else {
                    this.#mudarVisibilidadeBotoes(5);
                    this.#somaDano += vidaTirada;
                    setTimeout(() => {
                        this.#ataqueOponente();
                    }, 2500);
                }
                break;
            }
        }       
    }

    #atacarArma = (e) => {
        inv.forEach(k => {
            k.removeEventListener('click', this.#atacarArma);
        });

        let ultimoEvento = this.#ultimoEvento, vidaTirada = 0;
        let testeForca = this._rolarAcerto('forca');

        for( let key in this.#inventario ) {
            if(!this.#inventario.hasOwnProperty(key)) continue;

            let armaAtual = this.#inventario[key];
            if( armaAtual.nome == e.currentTarget.innerHTML.split('<span>')[1].split('</span>')[0] ) {
               
                if(this.#definirDefesaPassiva(null) <= testeForca) {
                    //dano arma
                    vidaTirada = armaAtual.efeito();
                    //adicionais
                    vidaTirada += this.#adicionaisAtq();
                    //critico
                    if(this.#critico) {
                        let resto = this.#recAtr('sorte') % 5;
                    if( this.#recAtr('sorte') <= 0 )
                        vidaTirada *= 2;
                    else
                        if(resto == 0) {
                            let i = this.#recAtr('sorte') / 5;
                            vidaTirada *= (i+2);
                        }
                    }

                    ultimoEvento.vida = ultimoEvento.vida - vidaTirada;
                    contexto.append(`Você acerta com ${testeForca} em seu teste, tirando ${vidaTirada} de vida. \n\n`);
                    contexto.scrollTop = contexto.scrollHeight;
                    console.log('vida tirada: ' + ultimoEvento.vida);
                    console.log('defesa bicho: ' + this.#definirDefesaPassiva());

                    //remover furtivo e atq poderoso
                    this.#acumuloAtqPod = 0;
                    this.#furtivo = false;
                    btnsAcao.forEach((btnAcao) => {
                        if(btnAcao.innerText == 'Atacar') {
                            btnAcao.style.setProperty('color', 'white');
                        }
                    });

                    if(ultimoEvento.vida <= 0) {
                        this.#morteOponente(armaAtual.msgMorte);
                    } else {
                        this.#mudarVisibilidadeBotoes(5);
                        this.#somaDano += vidaTirada;
                        setTimeout(() =>{
                            this.#ataqueOponente();
                        }, 2500);
                    }
                }
            }
        }
    }

    _cancelar = () => {
        magAtq.forEach(e => {
            e.removeEventListener('mouseover', this.#semManaOver);
            e.removeEventListener('mouseout', this.#semManaOut);
        });

        let i = 0;
        while(i < this.#intervaloValMags.length) {
            clearInterval(this.#intervaloValMags[i]);
            this.#mudarVazio();
            i++;
        }

        mag.forEach(mag => {
            mag.removeEventListener('click', this.#atacarMagia);
        });

        inv.forEach(inv => {
            inv.removeEventListener('click', this.#atacarArma);
        });

        this.#mudarVisibilidadeBotoes(3);
        btnNenhum.removeEventListener('click', this._cancelar);
    }

    #morteOponente(msg) {
        contexto.append(msg + '\n\n');
        this.#ultimoEvento.vida = this.#ultimoEventoVida;
        this.#usos = [];
        turno.innerText = '';
        this.#contagemTurno = 0;
        this.#somaDano = 0;
        this.#experiencia += this.#ultimoEvento.exp;
        this.#eventoUpar();
        this.#opcaoCaminhar();
    }

    //@follow-up -------------- definir o que rolou ------------------
    #eventoAndar = (e) => {
        this.#ultimoLugar = e.currentTarget.innerText.toLowerCase();
        this.#escolherMapa();
        contexto.scrollTop = contexto.scrollHeight;
    }

    #opcaoCaminhar(){
        this.#mudarVisibilidadeBotoes(0);

        contexto.scrollTop = contexto.scrollHeight;

        btnsAndar.forEach((btnsAndar) => {
            btnsAndar.removeEventListener('click', this.#eventoAndar);
        });

        btnsAndar.forEach((btnsAndar) => {
            btnsAndar.addEventListener('click', this.#eventoAndar);
        });
    
    }

    #escolherMapa() {
        //this.#aleatorizar();
        let ultimaAndada = this.#ultimoLugar;
        let eventos =  [];

        this.#mapaEscolhido = maaaaaaaaaaaaaa;

        if(this.#ultimoMapa == this.#mapaEscolhido && this.#ultimoMapa != 0) {
            this.#escolherMapa();
        } else {

            if(this.#nivel < 5 && this.#mapaEscolhido == 4)
                this.#mapaEscolhido = 0;

            this.#eventos.forEach(e => {
                if( e.classe == this.#mapaEscolhido )
                    eventos.push(e);
            });

            dialogo.innerText = `Você andou para ${ultimaAndada} e encontrou...`

            if(this.#mapaEscolhido == 0) {
                const escolha = Math.floor(Math.random() * 10);
                contexto.append(eventos[escolha].descricao[Math.floor(Math.random() * 5)] + "\n\n");
                this.#ultimoEvento = eventos[escolha];

            } else if(this.#mapaEscolhido == 1) {
                const escolha = Math.floor(Math.random() * 1);
                contexto.append(eventos[escolha].descricao + "\n\n");
                this.#ultimoEvento = eventos[escolha];

                this.#mudarVisibilidadeBotoes(2);

                const cntSN= document.getElementById('cntSN');
                document.querySelectorAll('.botoesSN').forEach(e => {
                    cntSN.replaceChild(e.cloneNode(1), e);
                });

                //@todo mudar o bagulho de substituir o botao pra tirar o eventlisstener
                recuperarBtns();
                btnsSN.forEach(e => {
                    e.addEventListener("click", (e) => {
                        const valor = e.currentTarget.innerHTML;
                        switch(valor) {
                            case "Sim":
                                switch(this.#ultimoEvento.tipo) {
                                    case 'armaCaC':
                                        contentSpan.innerText = this.#ultimoEvento.nome;
                                        inv1.removeAttribute('title');
                                        inv1.childNodes[0].replaceWith(contentSpan);
                                        divContent1.innerText = this.#ultimoEvento.descricao;
                                        imgContent1.setAttribute('src', this.#ultimoEvento.imgArma);
                                        hover[0].classList.add('hoverAtivo');
                                        this.#inventario['slot1'] = this.#ultimoEvento;
                                        dialogo.innerText = 'Pra onde você quer ir?';
                                        this.#opcaoCaminhar();
                                        break;
                                    case 'armaDis':
                                        this.#opcaoCaminhar();
                                        break;
                                    case 'comida':
                                        this.#opcaoCaminhar();
                                        break;
                                    case 'pocao':
                                        this.#opcaoCaminhar();
                                        break;
                                    case 'amuleto':
                                        this.#opcaoCaminhar();
                                        break;
                                    case 'armadura':
                                        this.#opcaoCaminhar();
                                    default:
                                        //por enquanto
                                        this.#opcaoCaminhar();
                                        break;
                                }
                                this.#mudarVazio();
                                break;
                            case "Não":
                                dialogo.innerText = 'Pra onde você quer ir?';
                                this.#opcaoCaminhar();
                                break;
                            default:
                                break;
                        }
                    });
                });
                
            } else if(this.#mapaEscolhido == 2){
                const escolha = Math.floor(Math.random() * 3);
                contexto.append(eventos[escolha].descricao + "\n\n");
                this.#ultimoEvento = eventos[escolha];

                this.#mudarVisibilidadeBotoes(4);

                btnNenhum.removeEventListener('click', this._cancelar);
                btnNenhum.addEventListener('click', this.#nenhuma);

                if(this.#ultimoEvento.tipo == 'atq')
                    magAtq.forEach(magAtq => {
                        magAtq.addEventListener('click', this.#magicasAtq);
                    });
                else if(this.#ultimoEvento.tipo == 'sup')
                    magSup.forEach(magSup => {
                        magSup.addEventListener('click', this.#magicasSup);
                    });

            } else if(this.#mapaEscolhido == 3) {
                dialogo.append(' Prepare-se para batalha');
                const escolha = Math.floor(Math.random() * 1);
                contexto.append(eventos[escolha].descricao + "\n\n");
                this.#ultimoEvento = eventos[escolha];
                this.#ultimoEventoVida = this.#ultimoEvento.vida;

                //ver quem começa
                let testeAgi = this._rolarAcerto('agilidade'), testeAgiOp = this._rolarAcertoOponente('agilidade');
                while(testeAgiOp == testeAgi) {
                    if( this.#atributos.agilidade != this.#ultimoEvento.agilidade ) {
                        testeAgi += this.#atributos.agilidade;
                        testeAgiOp += this.#ultimoEvento.agilidade;
                    } else {
                        testeAgi = this._rolarAcerto('agilidade');
                        testeAgiOp = this._rolarAcertoOponente('agilidade');
                    }
                }

                testeAgi >= testeAgiOp ? this.#rolarAtaqueFurtivo() : this.#iniciarTurnoOp();                 

            } else if(this.#mapaEscolhido == 4) {
                dialogo.innerText = `Você andou para ${ultimaAndada} e encontrou... Para onde você quer ir?`
                const escolha = "m" + this.#mapaEscolhido + (Math.floor(Math.random() * (1 - 1)) + 1);
                contexto.append(eval(escolha).descricao + "\n\n");
                ultimoEvento = eval(escolha);
                iniciarBatalha();
            }

            //this.#ultimoMapa = this.#mapaEscolhido;
            console.log('ultima escolha ' + this.#ultimoMapa);

        }

    }

}

new jogin;

let maaaaaaaaaaaaaa = 3;