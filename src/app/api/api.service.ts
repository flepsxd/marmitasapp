import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { Pessoa } from '../crud/pessoa';
import { Lancamento } from '../crud/lancamento';
import { Pedido } from '../crud/pedido';
import { Produto } from '../crud/produto';
import { Endereco } from '../crud/endereco';
import { PedidoItens } from '../crud/pedido-itens';

import { formatCurrency } from '@angular/common';

@Injectable()
export class ApiService {
  public pessoas: Array<Pessoa>;
  public lancamentos: Array<Lancamento>;
  public pedidos: Array<Pedido>;
  public produtos: Array<Produto>;
  public enderecos: Array<Endereco>;
  public pedido_itens: Array<PedidoItens>;

  constructor(@Inject(LOCALE_ID) private locale: string) {
    this.pessoas = [
      {
        nome: 'Ava',
        telefone: 354194390,
        email: 'orci.lacus.vestibulum@sollicitudin.net',
        status: 'A',
        idpessoa: 1
      },
      {
        nome: 'Quemby',
        telefone: 906853006,
        email: 'tortor.Integer@odio.ca',
        status: 'A',
        idpessoa: 2
      },
      {
        nome: 'Drew',
        telefone: 172496779,
        email: 'et@ultrices.net',
        status: 'A',
        idpessoa: 3
      },
      {
        nome: 'Blaine',
        telefone: 529462673,
        email: 'non.sollicitudin@pharetraNam.net',
        status: 'A',
        idpessoa: 4
      },
      {
        nome: 'Kato',
        telefone: 148957292,
        email: 'odio.tristique.pharetra@est.com',
        status: 'A',
        idpessoa: 5
      },
      {
        nome: 'Abbot',
        telefone: 817921051,
        email: 'eu.arcu@sitamet.org',
        status: 'A',
        idpessoa: 6
      },
      {
        nome: 'Anjolie',
        telefone: 320585957,
        email: 'molestie.tortor@sem.edu',
        status: 'A',
        idpessoa: 7
      },
      {
        nome: 'Freya',
        telefone: 536787318,
        email: 'turpis.vitae.purus@nuncQuisque.com',
        status: 'A',
        idpessoa: 8
      },
      {
        nome: 'Athena',
        telefone: 511633397,
        email: 'tortor@Vivamus.ca',
        status: 'A',
        idpessoa: 9
      },
      {
        nome: 'Gareth',
        telefone: 144183550,
        email: 'massa.Mauris.vestibulum@semper.edu',
        status: 'A',
        idpessoa: 10
      },
      {
        nome: 'Duncan',
        telefone: 299485619,
        email: 'elit.Curabitur.sed@elementumategestas.ca',
        status: 'A',
        idpessoa: 11
      },
      {
        nome: 'Chastity',
        telefone: 967238349,
        email: 'non.cursus.non@massaVestibulumaccumsan.co.uk',
        status: 'A',
        idpessoa: 12
      },
      {
        nome: 'Althea',
        telefone: 698344900,
        email: 'quis.accumsan@vitaedolor.co.uk',
        status: 'A',
        idpessoa: 13
      },
      {
        nome: 'Edan',
        telefone: 829810532,
        email: 'nunc@non.org',
        status: 'A',
        idpessoa: 14
      },
      {
        nome: 'Ruby',
        telefone: 541014265,
        email: 'pretium.aliquet@eratvolutpat.com',
        status: 'A',
        idpessoa: 15
      },
      {
        nome: 'Fletcher',
        telefone: 694977001,
        email: 'ipsum@nuncest.com',
        status: 'A',
        idpessoa: 16
      },
      {
        nome: 'Desiree',
        telefone: 703901900,
        email: 'pretium.aliquet.metus@semPellentesque.edu',
        status: 'A',
        idpessoa: 17
      },
      {
        nome: 'Brett',
        telefone: 265000849,
        email: 'vitae.aliquet@Phasellusin.net',
        status: 'A',
        idpessoa: 18
      },
      {
        nome: 'Yeo',
        telefone: 973490675,
        email: 'commodo.auctor@nulla.edu',
        status: 'A',
        idpessoa: 19
      },
      {
        nome: 'Gray',
        telefone: 766746641,
        email: 'fringilla@Namtempordiam.net',
        status: 'A',
        idpessoa: 20
      },
      {
        nome: 'Zenaida',
        telefone: 451629868,
        email: 'vitae.risus@gravidanon.com',
        status: 'A',
        idpessoa: 21
      },
      {
        nome: 'Dillon',
        telefone: 259746381,
        email: 'laoreet@nislelementum.ca',
        status: 'A',
        idpessoa: 22
      },
      {
        nome: 'Aristotle',
        telefone: 418932526,
        email: 'at@eget.org',
        status: 'A',
        idpessoa: 23
      },
      {
        nome: 'Vivian',
        telefone: 353308737,
        email: 'Aenean@eueuismodac.edu',
        status: 'A',
        idpessoa: 24
      },
      {
        nome: 'Yardley',
        telefone: 596658059,
        email: 'vestibulum@cursusnonegestas.ca',
        status: 'A',
        idpessoa: 25
      },
      {
        nome: 'Vincent',
        telefone: 335158442,
        email: 'lacus@enim.ca',
        status: 'A',
        idpessoa: 26
      },
      {
        nome: 'Megan',
        telefone: 927304640,
        email: 'ornare@tinciduntadipiscingMauris.net',
        status: 'A',
        idpessoa: 27
      },
      {
        nome: 'Cadman',
        telefone: 383740562,
        email: 'ac.fermentum.vel@vulputate.com',
        status: 'A',
        idpessoa: 28
      },
      {
        nome: 'Britanni',
        telefone: 730007736,
        email: 'est.Mauris@Nullamlobortisquam.co.uk',
        status: 'A',
        idpessoa: 29
      },
      {
        nome: 'Yoshi',
        telefone: 491765205,
        email: 'Sed.auctor.odio@egestas.org',
        status: 'A',
        idpessoa: 30
      },
      {
        nome: 'Hayes',
        telefone: 981788528,
        email: 'pede.Cras.vulputate@maurisIntegersem.co.uk',
        status: 'A',
        idpessoa: 31
      },
      {
        nome: 'Benedict',
        telefone: 330279106,
        email: 'vel.lectus@nullavulputate.com',
        status: 'A',
        idpessoa: 32
      },
      {
        nome: 'Halee',
        telefone: 784987196,
        email: 'commodo@vitaeposuereat.ca',
        status: 'A',
        idpessoa: 33
      },
      {
        nome: 'Alfreda',
        telefone: 458548096,
        email: 'vitae.erat@liberoestcongue.net',
        status: 'A',
        idpessoa: 34
      },
      {
        nome: 'Chava',
        telefone: 861562319,
        email: 'metus.urna@blandit.org',
        status: 'A',
        idpessoa: 35
      },
      {
        nome: 'Ross',
        telefone: 463797425,
        email: 'at.risus.Nunc@quis.ca',
        status: 'A',
        idpessoa: 36
      },
      {
        nome: 'Reuben',
        telefone: 222617692,
        email: 'malesuada.vel.venenatis@vitae.ca',
        status: 'A',
        idpessoa: 37
      },
      {
        nome: 'Perry',
        telefone: 987943021,
        email: 'orci@Curabitursedtortor.co.uk',
        status: 'A',
        idpessoa: 38
      },
      {
        nome: 'Samson',
        telefone: 501433192,
        email: 'risus.Nunc.ac@odioauctorvitae.ca',
        status: 'A',
        idpessoa: 39
      },
      {
        nome: 'Petra',
        telefone: 973648882,
        email: 'Proin.non@luctus.net',
        status: 'A',
        idpessoa: 40
      },
      {
        nome: 'Chava',
        telefone: 937018180,
        email: 'fermentum.convallis@Donec.edu',
        status: 'A',
        idpessoa: 41
      },
      {
        nome: 'Beck',
        telefone: 337616784,
        email: 'fringilla@adipiscinglobortisrisus.net',
        status: 'A',
        idpessoa: 42
      },
      {
        nome: 'Zoe',
        telefone: 933203297,
        email: 'nec.tempus.scelerisque@acmieleifend.edu',
        status: 'A',
        idpessoa: 43
      },
      {
        nome: 'Aiko',
        telefone: 802786754,
        email: 'scelerisque@magnisdisparturient.net',
        status: 'A',
        idpessoa: 44
      },
      {
        nome: 'Nehru',
        telefone: 217755416,
        email: 'risus@sapienimperdietornare.net',
        status: 'A',
        idpessoa: 45
      },
      {
        nome: 'Zelda',
        telefone: 516819197,
        email: 'Quisque@ornareliberoat.net',
        status: 'A',
        idpessoa: 46
      },
      {
        nome: 'Derek',
        telefone: 698977768,
        email: 'Praesent.eu.dui@imperdietullamcorperDuis.com',
        status: 'A',
        idpessoa: 47
      },
      {
        nome: 'Barclay',
        telefone: 246793926,
        email: 'sollicitudin.commodo.ipsum@augueacipsum.co.uk',
        status: 'A',
        idpessoa: 48
      },
      {
        nome: 'Bryar',
        telefone: 469908341,
        email: 'quis@a.edu',
        status: 'A',
        idpessoa: 49
      },
      {
        nome: 'Tobias',
        telefone: 702411693,
        email: 'placerat.Cras.dictum@euaugue.ca',
        status: 'A',
        idpessoa: 50
      },
      {
        nome: 'Gage',
        telefone: 488813475,
        email: 'ut.cursus.luctus@at.net',
        status: 'A',
        idpessoa: 51
      },
      {
        nome: 'Sonya',
        telefone: 608305011,
        email: 'Cras.dictum@diamDuismi.co.uk',
        status: 'A',
        idpessoa: 52
      },
      {
        nome: 'Kelsey',
        telefone: 644814578,
        email: 'blandit@sodales.net',
        status: 'A',
        idpessoa: 53
      },
      {
        nome: 'Kenneth',
        telefone: 303290597,
        email: 'consectetuer@Integervitaenibh.com',
        status: 'A',
        idpessoa: 54
      },
      {
        nome: 'Elizabeth',
        telefone: 388678630,
        email: 'ridiculus@acfeugiat.ca',
        status: 'A',
        idpessoa: 55
      },
      {
        nome: 'Ulla',
        telefone: 927723453,
        email: 'cursus@lacus.ca',
        status: 'A',
        idpessoa: 56
      },
      {
        nome: 'Trevor',
        telefone: 294739181,
        email: 'aliquet.sem.ut@sociis.edu',
        status: 'A',
        idpessoa: 57
      },
      {
        nome: 'Cheryl',
        telefone: 192944189,
        email: 'Cum@venenatisa.com',
        status: 'A',
        idpessoa: 58
      },
      {
        nome: 'Colton',
        telefone: 992880798,
        email: 'eu.accumsan@quis.co.uk',
        status: 'A',
        idpessoa: 59
      },
      {
        nome: 'Venus',
        telefone: 457018625,
        email: 'euismod.mauris.eu@nec.co.uk',
        status: 'A',
        idpessoa: 60
      },
      {
        nome: 'Autumn',
        telefone: 990236667,
        email: 'quis.pede.Suspendisse@ipsumCurabitur.edu',
        status: 'A',
        idpessoa: 61
      },
      {
        nome: 'Giacomo',
        telefone: 944759295,
        email: 'pede@nascetur.com',
        status: 'A',
        idpessoa: 62
      },
      {
        nome: 'Preston',
        telefone: 529403803,
        email: 'iaculis@vulputaterisusa.net',
        status: 'A',
        idpessoa: 63
      },
      {
        nome: 'Sierra',
        telefone: 319078621,
        email: 'Nam@Namtempordiam.co.uk',
        status: 'A',
        idpessoa: 64
      },
      {
        nome: 'Porter',
        telefone: 943092751,
        email: 'faucibus@sit.ca',
        status: 'A',
        idpessoa: 65
      },
      {
        nome: 'Malik',
        telefone: 351724388,
        email: 'nec.quam.Curabitur@egetnisi.ca',
        status: 'A',
        idpessoa: 66
      },
      {
        nome: 'Cairo',
        telefone: 621496525,
        email: 'Aliquam.fringilla.cursus@sitametrisus.org',
        status: 'A',
        idpessoa: 67
      },
      {
        nome: 'Aaron',
        telefone: 504700337,
        email: 'turpis@aduiCras.net',
        status: 'A',
        idpessoa: 68
      },
      {
        nome: 'Noah',
        telefone: 669472714,
        email: 'Vivamus@tristiquesenectuset.org',
        status: 'A',
        idpessoa: 69
      },
      {
        nome: 'Diana',
        telefone: 578651771,
        email: 'augue.ut.lacus@duiFuscediam.org',
        status: 'A',
        idpessoa: 70
      },
      {
        nome: 'John',
        telefone: 449377837,
        email: 'arcu.Aliquam.ultrices@Nullaeget.net',
        status: 'A',
        idpessoa: 71
      },
      {
        nome: 'Darryl',
        telefone: 572239816,
        email: 'vel.pede.blandit@vitaerisus.org',
        status: 'A',
        idpessoa: 72
      },
      {
        nome: 'Shelly',
        telefone: 701736655,
        email: 'tempor.est@dictum.com',
        status: 'A',
        idpessoa: 73
      },
      {
        nome: 'Kamal',
        telefone: 715882916,
        email: 'imperdiet@vel.com',
        status: 'A',
        idpessoa: 74
      },
      {
        nome: 'Violet',
        telefone: 746057829,
        email: 'lectus.Cum.sociis@temporarcu.ca',
        status: 'A',
        idpessoa: 75
      },
      {
        nome: 'Ivana',
        telefone: 633041014,
        email: 'porttitor.interdum.Sed@cursusvestibulum.org',
        status: 'A',
        idpessoa: 76
      },
      {
        nome: 'Malik',
        telefone: 502602695,
        email: 'posuere@nonummy.com',
        status: 'A',
        idpessoa: 77
      },
      {
        nome: 'Lester',
        telefone: 443350166,
        email: 'urna@arcuMorbi.net',
        status: 'A',
        idpessoa: 78
      },
      {
        nome: 'Ali',
        telefone: 689054836,
        email: 'fames.ac@enimEtiam.net',
        status: 'A',
        idpessoa: 79
      },
      {
        nome: 'Ira',
        telefone: 748078982,
        email: 'facilisis.non@rhoncusidmollis.net',
        status: 'A',
        idpessoa: 80
      },
      {
        nome: 'Keely',
        telefone: 893370758,
        email: 'convallis@atauctor.com',
        status: 'A',
        idpessoa: 81
      },
      {
        nome: 'Debra',
        telefone: 185689281,
        email: 'ultricies.ornare@tellusnon.org',
        status: 'A',
        idpessoa: 82
      },
      {
        nome: 'Zenaida',
        telefone: 949968954,
        email: 'sapien.Nunc.pulvinar@acfermentumvel.com',
        status: 'A',
        idpessoa: 83
      },
      {
        nome: 'Austin',
        telefone: 241908379,
        email: 'erat@elitelit.ca',
        status: 'A',
        idpessoa: 84
      },
      {
        nome: 'Gray',
        telefone: 895758256,
        email: 'sociis@elitelitfermentum.edu',
        status: 'A',
        idpessoa: 85
      },
      {
        nome: 'Molly',
        telefone: 126723832,
        email: 'mi.felis@etrutrumeu.edu',
        status: 'A',
        idpessoa: 86
      },
      {
        nome: 'Whilemina',
        telefone: 179925777,
        email: 'ac@convallisdolor.edu',
        status: 'A',
        idpessoa: 87
      },
      {
        nome: 'Amos',
        telefone: 966959053,
        email: 'metus.urna@facilisis.co.uk',
        status: 'A',
        idpessoa: 88
      },
      {
        nome: 'Igor',
        telefone: 376322081,
        email: 'convallis@rhoncusProin.edu',
        status: 'A',
        idpessoa: 89
      },
      {
        nome: 'Bethany',
        telefone: 808166180,
        email: 'cursus.vestibulum.Mauris@semut.ca',
        status: 'A',
        idpessoa: 90
      },
      {
        nome: 'Raven',
        telefone: 609601104,
        email: 'neque.et@diam.co.uk',
        status: 'A',
        idpessoa: 91
      },
      {
        nome: 'Nerea',
        telefone: 157069279,
        email: 'Etiam@eleifendvitaeerat.ca',
        status: 'A',
        idpessoa: 92
      },
      {
        nome: 'Ginger',
        telefone: 950391924,
        email: 'orci@velit.edu',
        status: 'A',
        idpessoa: 93
      },
      {
        nome: 'Avye',
        telefone: 874164008,
        email: 'Vestibulum.accumsan@nostraperinceptos.net',
        status: 'A',
        idpessoa: 94
      },
      {
        nome: 'Sierra',
        telefone: 903593059,
        email: 'nisi.sem@enimsit.org',
        status: 'A',
        idpessoa: 95
      },
      {
        nome: 'Keaton',
        telefone: 374459509,
        email: 'Donec.non.justo@aliquetProinvelit.co.uk',
        status: 'A',
        idpessoa: 96
      },
      {
        nome: 'Damon',
        telefone: 328027487,
        email: 'at@DonecestNunc.net',
        status: 'A',
        idpessoa: 97
      },
      {
        nome: 'Brent',
        telefone: 489299038,
        email: 'pellentesque.tellus@nulla.co.uk',
        status: 'A',
        idpessoa: 98
      },
      {
        nome: 'Jerome',
        telefone: 360555418,
        email: 'purus.Duis@augueSedmolestie.org',
        status: 'A',
        idpessoa: 99
      },
      {
        nome: 'Whitney',
        telefone: 179253268,
        email: 'ipsum@nislMaecenas.edu',
        status: 'A',
        idpessoa: 100
      }
    ];

    this.produtos = [
      { idproduto: 1, descricao: 'Hall[45]', preco: 1635, status: 'A' },
      { idproduto: 2, descricao: 'Porter[45]', preco: 946, status: 'A' },
      { idproduto: 3, descricao: 'Maxwell[45]', preco: 604, status: 'A' },
      { idproduto: 4, descricao: 'Parks[45]', preco: 1229, status: 'A' },
      { idproduto: 5, descricao: 'Gilliam[45]', preco: 455, status: 'A' },
      { idproduto: 6, descricao: 'Fulton[45]', preco: 1589, status: 'A' },
      { idproduto: 7, descricao: 'Pena[45]', preco: 875, status: 'A' },
      { idproduto: 8, descricao: 'Henson[45]', preco: 184, status: 'A' },
      { idproduto: 9, descricao: 'Robles[45]', preco: 1238, status: 'A' },
      { idproduto: 10, descricao: 'Pitts[45]', preco: 1996, status: 'A' },
      { idproduto: 11, descricao: 'Orr[45]', preco: 742, status: 'A' },
      { idproduto: 12, descricao: 'Lloyd[45]', preco: 1252, status: 'A' },
      { idproduto: 13, descricao: 'Phillips[45]', preco: 38, status: 'A' },
      { idproduto: 14, descricao: 'Spence[45]', preco: 1366, status: 'A' },
      { idproduto: 15, descricao: 'Gilbert[45]', preco: 1697, status: 'A' },
      { idproduto: 16, descricao: 'Bonner[45]', preco: 1593, status: 'A' },
      { idproduto: 17, descricao: 'Christensen[45]', preco: 948, status: 'A' },
      { idproduto: 18, descricao: 'Jacobs[45]', preco: 1888, status: 'A' },
      { idproduto: 19, descricao: 'Mcgee[45]', preco: 1272, status: 'A' },
      { idproduto: 20, descricao: 'Contreras[45]', preco: 743, status: 'A' },
      { idproduto: 21, descricao: 'Chambers[45]', preco: 388, status: 'A' },
      { idproduto: 22, descricao: 'Nichols[45]', preco: 825, status: 'A' },
      { idproduto: 23, descricao: 'Lane[45]', preco: 142, status: 'A' },
      { idproduto: 24, descricao: 'Mclaughlin[45]', preco: 1915, status: 'A' },
      { idproduto: 25, descricao: 'Ochoa[45]', preco: 1271, status: 'A' },
      { idproduto: 26, descricao: 'Chang[45]', preco: 1443, status: 'A' },
      { idproduto: 27, descricao: 'Carver[45]', preco: 1353, status: 'A' },
      { idproduto: 28, descricao: 'Porter[45]', preco: 1882, status: 'A' },
      { idproduto: 29, descricao: 'Horne[45]', preco: 1915, status: 'A' },
      { idproduto: 30, descricao: 'Sheppard[45]', preco: 806, status: 'A' },
      { idproduto: 31, descricao: 'Mitchell[45]', preco: 63, status: 'A' },
      { idproduto: 32, descricao: 'Ford[45]', preco: 693, status: 'A' },
      { idproduto: 33, descricao: 'Castillo[45]', preco: 575, status: 'A' },
      { idproduto: 34, descricao: 'Gamble[45]', preco: 25, status: 'A' },
      { idproduto: 35, descricao: 'Kelley[45]', preco: 1325, status: 'A' },
      { idproduto: 36, descricao: 'Hayes[45]', preco: 697, status: 'A' },
      { idproduto: 37, descricao: 'Harrington[45]', preco: 1975, status: 'A' },
      { idproduto: 38, descricao: 'Perry[45]', preco: 1691, status: 'A' },
      { idproduto: 39, descricao: 'Horn[45]', preco: 77, status: 'A' },
      { idproduto: 40, descricao: 'Leon[45]', preco: 1651, status: 'A' },
      { idproduto: 41, descricao: 'Klein[45]', preco: 1008, status: 'A' },
      { idproduto: 42, descricao: 'Anthony[45]', preco: 369, status: 'A' },
      { idproduto: 43, descricao: 'Huffman[45]', preco: 1913, status: 'A' },
      { idproduto: 44, descricao: 'Roberts[45]', preco: 527, status: 'A' },
      { idproduto: 45, descricao: 'Norris[45]', preco: 1372, status: 'A' },
      { idproduto: 46, descricao: 'Hicks[45]', preco: 616, status: 'A' },
      { idproduto: 47, descricao: 'Bradford[45]', preco: 959, status: 'A' },
      { idproduto: 48, descricao: 'Pittman[45]', preco: 448, status: 'A' },
      { idproduto: 49, descricao: 'Mclaughlin[45]', preco: 295, status: 'A' },
      { idproduto: 50, descricao: 'Mclaughlin[45]', preco: 817, status: 'A' },
      { idproduto: 51, descricao: 'Mendoza[45]', preco: 1799, status: 'A' },
      { idproduto: 52, descricao: 'Stuart[45]', preco: 1010, status: 'A' },
      { idproduto: 53, descricao: 'Leon[45]', preco: 1806, status: 'A' },
      { idproduto: 54, descricao: 'Alexander[45]', preco: 750, status: 'A' },
      { idproduto: 55, descricao: 'Bernard[45]', preco: 786, status: 'A' },
      { idproduto: 56, descricao: 'Palmer[45]', preco: 532, status: 'A' },
      { idproduto: 57, descricao: 'Campos[45]', preco: 1693, status: 'A' },
      { idproduto: 58, descricao: 'Hoover[45]', preco: 1585, status: 'A' },
      { idproduto: 59, descricao: 'Chandler[45]', preco: 1425, status: 'A' },
      { idproduto: 60, descricao: 'Fitzpatrick[45]', preco: 1383, status: 'A' },
      { idproduto: 61, descricao: 'Patrick[45]', preco: 1645, status: 'A' },
      { idproduto: 62, descricao: 'Farrell[45]', preco: 1936, status: 'A' },
      { idproduto: 63, descricao: 'Castaneda[45]', preco: 698, status: 'A' },
      { idproduto: 64, descricao: 'Brown[45]', preco: 360, status: 'A' },
      { idproduto: 65, descricao: 'Torres[45]', preco: 772, status: 'A' },
      { idproduto: 66, descricao: 'Mccormick[45]', preco: 1830, status: 'A' },
      { idproduto: 67, descricao: 'Wong[45]', preco: 607, status: 'A' },
      { idproduto: 68, descricao: 'Bruce[45]', preco: 568, status: 'A' },
      { idproduto: 69, descricao: 'Young[45]', preco: 1562, status: 'A' },
      { idproduto: 70, descricao: 'Sharp[45]', preco: 997, status: 'A' },
      { idproduto: 71, descricao: 'Cummings[45]', preco: 660, status: 'A' },
      { idproduto: 72, descricao: 'Brennan[45]', preco: 1784, status: 'A' },
      { idproduto: 73, descricao: 'Dudley[45]', preco: 1435, status: 'A' },
      { idproduto: 74, descricao: 'Mccullough[45]', preco: 515, status: 'A' },
      { idproduto: 75, descricao: 'Richards[45]', preco: 1413, status: 'A' },
      { idproduto: 76, descricao: 'Fox[45]', preco: 1159, status: 'A' },
      { idproduto: 77, descricao: 'Gallegos[45]', preco: 620, status: 'A' },
      { idproduto: 78, descricao: 'Lopez[45]', preco: 13, status: 'A' },
      { idproduto: 79, descricao: 'Little[45]', preco: 788, status: 'A' },
      { idproduto: 80, descricao: 'Michael[45]', preco: 1115, status: 'A' },
      { idproduto: 81, descricao: 'Bright[45]', preco: 579, status: 'A' },
      { idproduto: 82, descricao: 'Rose[45]', preco: 505, status: 'A' },
      { idproduto: 83, descricao: 'Huff[45]', preco: 828, status: 'A' },
      { idproduto: 84, descricao: 'Heath[45]', preco: 1204, status: 'A' },
      { idproduto: 85, descricao: 'Ryan[45]', preco: 598, status: 'A' },
      { idproduto: 86, descricao: 'Bates[45]', preco: 1668, status: 'A' },
      { idproduto: 87, descricao: 'Fletcher[45]', preco: 1193, status: 'A' },
      { idproduto: 88, descricao: 'Peterson[45]', preco: 1753, status: 'A' },
      { idproduto: 89, descricao: 'Grant[45]', preco: 712, status: 'A' },
      { idproduto: 90, descricao: 'Fields[45]', preco: 614, status: 'A' },
      { idproduto: 91, descricao: 'Bentley[45]', preco: 902, status: 'A' },
      { idproduto: 92, descricao: 'Alvarez[45]', preco: 15, status: 'A' },
      { idproduto: 93, descricao: 'Haney[45]', preco: 1138, status: 'A' },
      { idproduto: 94, descricao: 'Soto[45]', preco: 296, status: 'A' },
      { idproduto: 95, descricao: 'Santiago[45]', preco: 716, status: 'A' },
      { idproduto: 96, descricao: 'Knight[45]', preco: 1032, status: 'A' },
      { idproduto: 97, descricao: 'Barber[45]', preco: 661, status: 'A' },
      { idproduto: 98, descricao: 'Middleton[45]', preco: 331, status: 'A' },
      { idproduto: 99, descricao: 'Franks[45]', preco: 1901, status: 'A' },
      { idproduto: 100, descricao: 'Bauer[45]', preco: 169, status: 'A' }
    ];

    this.pedidos = [
      {
        idpedido: 1,
        idpessoa: 38,
        datahora: '2018-12-18T18:10:06-08:00',
        etapa: '',
        valor: 35,
        observacoes:
          'mus. Aenean eget magna. Suspendisse tristique neque venenatis',
        status: ''
      },
      {
        idpedido: 2,
        idpessoa: 63,
        datahora: '2018-02-24T21:53:30-08:00',
        etapa: 'E',
        valor: 18,
        observacoes:
          'velit. Cras lorem lorem, luctus ut, pellentesque eget, dictum',
        status: 'S'
      },
      {
        idpedido: 3,
        idpessoa: 23,
        datahora: '2018-10-10T04:42:00-07:00',
        etapa: '',
        valor: 9,
        observacoes: 'diam. Duis mi',
        status: 'C'
      },
      {
        idpedido: 4,
        idpessoa: 80,
        datahora: '2018-05-29T07:58:58-07:00',
        etapa: 'A',
        valor: 98,
        observacoes: 'enim, condimentum eget, volutpat ornare,',
        status: 'C'
      },
      {
        idpedido: 5,
        idpessoa: 68,
        datahora: '2019-03-30T16:49:41-07:00',
        etapa: 'C',
        valor: 41,
        observacoes: 'nunc. In',
        status: ''
      },
      {
        idpedido: 6,
        idpessoa: 27,
        datahora: '2018-02-21T16:02:12-08:00',
        etapa: '',
        valor: 149,
        observacoes: 'amet, dapibus',
        status: ''
      },
      {
        idpedido: 7,
        idpessoa: 34,
        datahora: '2018-10-13T08:26:30-07:00',
        etapa: 'C',
        valor: 42,
        observacoes: 'nascetur',
        status: 'S'
      },
      {
        idpedido: 8,
        idpessoa: 65,
        datahora: '2019-07-29T08:37:56-07:00',
        etapa: 'E',
        valor: 89,
        observacoes: 'dolor. Quisque',
        status: ''
      },
      {
        idpedido: 9,
        idpessoa: 32,
        datahora: '2019-08-09T23:01:40-07:00',
        etapa: 'I',
        valor: 112,
        observacoes:
          'fermentum arcu. Vestibulum ante ipsum primis in faucibus orci',
        status: 'C'
      },
      {
        idpedido: 10,
        idpessoa: 45,
        datahora: '2019-04-25T07:04:43-07:00',
        etapa: 'I',
        valor: 114,
        observacoes: 'purus. Duis elementum, dui quis accumsan convallis,',
        status: 'S'
      },
      {
        idpedido: 11,
        idpessoa: 81,
        datahora: '2018-07-11T20:08:58-07:00',
        etapa: '',
        valor: 28,
        observacoes: 'Aenean sed pede nec ante',
        status: 'T'
      },
      {
        idpedido: 12,
        idpessoa: 99,
        datahora: '2019-02-02T14:14:01-08:00',
        etapa: 'E',
        valor: 90,
        observacoes:
          'ullamcorper, velit in aliquet lobortis, nisi nibh lacinia',
        status: ''
      },
      {
        idpedido: 13,
        idpessoa: 6,
        datahora: '2017-10-04T23:20:33-07:00',
        etapa: '',
        valor: 106,
        observacoes: 'odio semper cursus. Integer',
        status: ''
      },
      {
        idpedido: 14,
        idpessoa: 11,
        datahora: '2019-01-13T06:56:32-08:00',
        etapa: 'C',
        valor: 147,
        observacoes:
          'Praesent interdum ligula eu enim. Etiam imperdiet dictum magna. Ut',
        status: ''
      },
      {
        idpedido: 15,
        idpessoa: 6,
        datahora: '2018-09-28T22:11:13-07:00',
        etapa: 'I',
        valor: 30,
        observacoes: 'Phasellus libero mauris,',
        status: 'A'
      },
      {
        idpedido: 16,
        idpessoa: 81,
        datahora: '2018-03-01T19:13:01-08:00',
        etapa: '',
        valor: 89,
        observacoes:
          'lacinia vitae, sodales at, velit. Pellentesque ultricies dignissim',
        status: ''
      },
      {
        idpedido: 17,
        idpessoa: 30,
        datahora: '2017-12-01T18:54:12-08:00',
        etapa: '',
        valor: 65,
        observacoes: 'Nunc',
        status: 'A'
      },
      {
        idpedido: 18,
        idpessoa: 16,
        datahora: '2018-07-27T20:18:59-07:00',
        etapa: 'E',
        valor: 119,
        observacoes: 'aliquam iaculis, lacus pede',
        status: ''
      },
      {
        idpedido: 19,
        idpessoa: 80,
        datahora: '2018-11-21T17:09:07-08:00',
        etapa: 'I',
        valor: 146,
        observacoes: 'Sed molestie. Sed id risus quis diam',
        status: 'E'
      },
      {
        idpedido: 20,
        idpessoa: 81,
        datahora: '2019-05-21T02:01:45-07:00',
        etapa: 'E',
        valor: 17,
        observacoes: 'ut nisi a',
        status: 'S'
      },
      {
        idpedido: 21,
        idpessoa: 4,
        datahora: '2018-01-26T18:14:27-08:00',
        etapa: '',
        valor: 141,
        observacoes: 'luctus',
        status: 'A'
      },
      {
        idpedido: 22,
        idpessoa: 35,
        datahora: '2018-01-01T05:13:29-08:00',
        etapa: '',
        valor: 19,
        observacoes: 'nibh dolor, nonummy ac, feugiat non, lobortis quis,',
        status: 'C'
      },
      {
        idpedido: 23,
        idpessoa: 68,
        datahora: '2019-08-09T05:38:37-07:00',
        etapa: '',
        valor: 98,
        observacoes:
          'Quisque imperdiet, erat nonummy ultricies ornare, elit elit fermentum',
        status: ''
      },
      {
        idpedido: 24,
        idpessoa: 86,
        datahora: '2019-04-04T00:05:45-07:00',
        etapa: '',
        valor: 47,
        observacoes: 'magnis dis parturient montes, nascetur ridiculus',
        status: ''
      },
      {
        idpedido: 25,
        idpessoa: 40,
        datahora: '2018-12-07T10:32:59-08:00',
        etapa: 'P',
        valor: 0,
        observacoes:
          'lorem, vehicula et, rutrum eu, ultrices sit amet, risus. Donec',
        status: ''
      },
      {
        idpedido: 26,
        idpessoa: 76,
        datahora: '2017-11-30T20:24:22-08:00',
        etapa: 'C',
        valor: 79,
        observacoes: 'ornare. In faucibus. Morbi vehicula. Pellentesque',
        status: ''
      },
      {
        idpedido: 27,
        idpessoa: 79,
        datahora: '2019-07-06T14:08:11-07:00',
        etapa: '',
        valor: 35,
        observacoes: 'vel, venenatis vel, faucibus id,',
        status: 'E'
      },
      {
        idpedido: 28,
        idpessoa: 43,
        datahora: '2018-04-22T13:30:24-07:00',
        etapa: 'A',
        valor: 100,
        observacoes:
          'vitae purus gravida sagittis. Duis gravida. Praesent eu nulla',
        status: 'T'
      },
      {
        idpedido: 29,
        idpessoa: 22,
        datahora: '2018-02-09T02:32:18-08:00',
        etapa: 'I',
        valor: 60,
        observacoes: 'amet lorem semper auctor. Mauris',
        status: 'A'
      },
      {
        idpedido: 30,
        idpessoa: 72,
        datahora: '2018-07-23T22:58:26-07:00',
        etapa: '',
        valor: 78,
        observacoes: 'egestas hendrerit neque.',
        status: ''
      },
      {
        idpedido: 31,
        idpessoa: 6,
        datahora: '2018-10-08T02:09:04-07:00',
        etapa: 'E',
        valor: 141,
        observacoes:
          'malesuada vel, convallis in, cursus et, eros. Proin ultrices. Duis',
        status: 'A'
      },
      {
        idpedido: 32,
        idpessoa: 30,
        datahora: '2017-11-16T09:22:58-08:00',
        etapa: '',
        valor: 48,
        observacoes: 'dignissim. Maecenas',
        status: ''
      },
      {
        idpedido: 33,
        idpessoa: 74,
        datahora: '2018-07-06T14:18:30-07:00',
        etapa: 'C',
        valor: 148,
        observacoes: 'egestas',
        status: 'C'
      },
      {
        idpedido: 34,
        idpessoa: 3,
        datahora: '2018-03-02T21:21:34-08:00',
        etapa: 'I',
        valor: 58,
        observacoes: 'lorem ipsum sodales',
        status: 'T'
      },
      {
        idpedido: 35,
        idpessoa: 24,
        datahora: '2019-03-26T02:17:01-07:00',
        etapa: 'E',
        valor: 114,
        observacoes: 'risus. Morbi metus. Vivamus',
        status: 'E'
      },
      {
        idpedido: 36,
        idpessoa: 81,
        datahora: '2018-08-22T17:12:16-07:00',
        etapa: '',
        valor: 125,
        observacoes: 'nec tempus',
        status: 'A'
      },
      {
        idpedido: 37,
        idpessoa: 68,
        datahora: '2018-03-01T21:27:37-08:00',
        etapa: 'C',
        valor: 71,
        observacoes: 'ante dictum cursus. Nunc mauris elit,',
        status: ''
      },
      {
        idpedido: 38,
        idpessoa: 95,
        datahora: '2018-11-03T03:52:45-07:00',
        etapa: 'C',
        valor: 10,
        observacoes:
          'urna. Nullam lobortis quam a felis ullamcorper viverra. Maecenas iaculis',
        status: ''
      },
      {
        idpedido: 39,
        idpessoa: 55,
        datahora: '2017-09-27T16:11:58-07:00',
        etapa: 'A',
        valor: 29,
        observacoes: 'nec quam. Curabitur vel lectus. Cum',
        status: ''
      },
      {
        idpedido: 40,
        idpessoa: 74,
        datahora: '2017-12-10T04:14:06-08:00',
        etapa: '',
        valor: 134,
        observacoes: 'Quisque ornare tortor at risus. Nunc',
        status: ''
      },
      {
        idpedido: 41,
        idpessoa: 21,
        datahora: '2017-11-14T18:50:48-08:00',
        etapa: '',
        valor: 30,
        observacoes: 'ac',
        status: 'T'
      },
      {
        idpedido: 42,
        idpessoa: 78,
        datahora: '2017-10-17T00:09:58-07:00',
        etapa: 'P',
        valor: 95,
        observacoes: 'magna nec quam. Curabitur vel lectus. Cum sociis natoque',
        status: 'E'
      },
      {
        idpedido: 43,
        idpessoa: 5,
        datahora: '2019-02-04T19:23:25-08:00',
        etapa: '',
        valor: 10,
        observacoes:
          'vitae odio sagittis semper. Nam tempor diam dictum sapien.',
        status: 'A'
      },
      {
        idpedido: 44,
        idpessoa: 62,
        datahora: '2019-04-08T19:57:41-07:00',
        etapa: 'E',
        valor: 114,
        observacoes: 'sem ut cursus luctus,',
        status: 'S'
      },
      {
        idpedido: 45,
        idpessoa: 84,
        datahora: '2019-01-07T18:35:41-08:00',
        etapa: '',
        valor: 87,
        observacoes: 'Phasellus',
        status: ''
      },
      {
        idpedido: 46,
        idpessoa: 34,
        datahora: '2018-02-25T12:13:05-08:00',
        etapa: '',
        valor: 73,
        observacoes:
          'elementum, lorem ut aliquam iaculis, lacus pede sagittis augue, eu',
        status: ''
      },
      {
        idpedido: 47,
        idpessoa: 28,
        datahora: '2017-10-11T19:52:40-07:00',
        etapa: 'I',
        valor: 44,
        observacoes: 'Quisque varius.',
        status: 'S'
      },
      {
        idpedido: 48,
        idpessoa: 65,
        datahora: '2018-01-26T09:34:07-08:00',
        etapa: 'E',
        valor: 33,
        observacoes: 'blandit enim consequat purus.',
        status: ''
      },
      {
        idpedido: 49,
        idpessoa: 88,
        datahora: '2019-07-13T00:07:47-07:00',
        etapa: 'E',
        valor: 73,
        observacoes: 'et malesuada fames ac turpis',
        status: 'C'
      },
      {
        idpedido: 50,
        idpessoa: 38,
        datahora: '2017-10-21T20:26:30-07:00',
        etapa: '',
        valor: 93,
        observacoes: 'pulvinar arcu et pede. Nunc sed orci lobortis augue',
        status: 'E'
      },
      {
        idpedido: 51,
        idpessoa: 6,
        datahora: '2019-09-02T05:05:13-07:00',
        etapa: '',
        valor: 2,
        observacoes: 'ipsum. Suspendisse sagittis. Nullam',
        status: 'S'
      },
      {
        idpedido: 52,
        idpessoa: 1,
        datahora: '2019-01-04T09:10:00-08:00',
        etapa: '',
        valor: 20,
        observacoes: 'congue, elit sed consequat auctor, nunc nulla vulputate',
        status: 'A'
      },
      {
        idpedido: 53,
        idpessoa: 10,
        datahora: '2018-03-04T19:59:05-08:00',
        etapa: 'E',
        valor: 66,
        observacoes: 'Class aptent taciti sociosqu ad',
        status: ''
      },
      {
        idpedido: 54,
        idpessoa: 72,
        datahora: '2019-03-21T15:34:43-07:00',
        etapa: 'E',
        valor: 143,
        observacoes:
          'vestibulum, neque sed dictum eleifend, nunc risus varius orci, in',
        status: 'T'
      },
      {
        idpedido: 55,
        idpessoa: 1,
        datahora: '2019-07-06T00:05:49-07:00',
        etapa: 'E',
        valor: 145,
        observacoes: 'Praesent eu',
        status: 'S'
      },
      {
        idpedido: 56,
        idpessoa: 98,
        datahora: '2019-08-14T21:32:57-07:00',
        etapa: '',
        valor: 14,
        observacoes: 'semper tellus id nunc interdum feugiat.',
        status: 'A'
      },
      {
        idpedido: 57,
        idpessoa: 92,
        datahora: '2018-05-11T14:51:53-07:00',
        etapa: 'A',
        valor: 131,
        observacoes: 'sed, hendrerit a, arcu.',
        status: 'T'
      },
      {
        idpedido: 58,
        idpessoa: 5,
        datahora: '2017-11-24T00:05:57-08:00',
        etapa: '',
        valor: 89,
        observacoes:
          'metus. Aliquam erat volutpat. Nulla facilisis. Suspendisse commodo tincidunt',
        status: 'T'
      },
      {
        idpedido: 59,
        idpessoa: 76,
        datahora: '2018-05-16T18:49:20-07:00',
        etapa: '',
        valor: 117,
        observacoes: 'ultricies adipiscing, enim mi tempor lorem,',
        status: ''
      },
      {
        idpedido: 60,
        idpessoa: 12,
        datahora: '2019-02-20T15:08:23-08:00',
        etapa: 'I',
        valor: 110,
        observacoes: 'felis. Nulla tempor augue ac ipsum.',
        status: 'C'
      },
      {
        idpedido: 61,
        idpessoa: 43,
        datahora: '2017-10-26T11:56:19-07:00',
        etapa: 'I',
        valor: 92,
        observacoes: 'vulputate mauris sagittis placerat. Cras',
        status: ''
      },
      {
        idpedido: 62,
        idpessoa: 4,
        datahora: '2018-11-15T09:20:05-08:00',
        etapa: '',
        valor: 66,
        observacoes: 'porttitor eros nec tellus. Nunc lectus pede, ultrices a,',
        status: 'C'
      },
      {
        idpedido: 63,
        idpessoa: 32,
        datahora: '2018-01-21T20:34:15-08:00',
        etapa: '',
        valor: 79,
        observacoes: 'dui quis accumsan convallis, ante lectus',
        status: 'S'
      },
      {
        idpedido: 64,
        idpessoa: 29,
        datahora: '2018-10-11T00:14:27-07:00',
        etapa: '',
        valor: 110,
        observacoes: 'at fringilla purus mauris a nunc. In at pede. Cras',
        status: 'E'
      },
      {
        idpedido: 65,
        idpessoa: 41,
        datahora: '2017-11-23T04:20:08-08:00',
        etapa: '',
        valor: 75,
        observacoes: 'dapibus ligula.',
        status: 'C'
      },
      {
        idpedido: 66,
        idpessoa: 79,
        datahora: '2018-12-19T12:49:04-08:00',
        etapa: 'I',
        valor: 110,
        observacoes:
          'dui augue eu tellus. Phasellus elit pede, malesuada vel, venenatis',
        status: ''
      },
      {
        idpedido: 67,
        idpessoa: 97,
        datahora: '2019-02-19T06:26:28-08:00',
        etapa: 'P',
        valor: 11,
        observacoes:
          'egestas hendrerit neque. In ornare sagittis felis. Donec tempor, est',
        status: ''
      },
      {
        idpedido: 68,
        idpessoa: 33,
        datahora: '2019-04-12T16:47:50-07:00',
        etapa: '',
        valor: 41,
        observacoes: 'lacus. Nulla tincidunt, neque vitae semper',
        status: ''
      },
      {
        idpedido: 69,
        idpessoa: 44,
        datahora: '2017-10-12T18:43:00-07:00',
        etapa: 'E',
        valor: 66,
        observacoes:
          'Sed molestie. Sed id risus quis diam luctus lobortis. Class',
        status: 'S'
      },
      {
        idpedido: 70,
        idpessoa: 62,
        datahora: '2018-12-21T14:30:07-08:00',
        etapa: 'E',
        valor: 139,
        observacoes: 'magna. Lorem ipsum dolor sit amet,',
        status: ''
      },
      {
        idpedido: 71,
        idpessoa: 28,
        datahora: '2019-03-06T02:05:37-08:00',
        etapa: 'C',
        valor: 67,
        observacoes: 'mollis lectus pede et',
        status: ''
      },
      {
        idpedido: 72,
        idpessoa: 32,
        datahora: '2018-06-19T06:27:17-07:00',
        etapa: 'C',
        valor: 9,
        observacoes:
          'erat volutpat. Nulla facilisis. Suspendisse commodo tincidunt nibh.',
        status: ''
      },
      {
        idpedido: 73,
        idpessoa: 59,
        datahora: '2018-05-02T22:40:48-07:00',
        etapa: 'E',
        valor: 106,
        observacoes:
          'eget, ipsum. Donec sollicitudin adipiscing ligula. Aenean gravida',
        status: 'C'
      },
      {
        idpedido: 74,
        idpessoa: 21,
        datahora: '2018-05-01T23:10:56-07:00',
        etapa: 'A',
        valor: 71,
        observacoes:
          'tristique neque venenatis lacus. Etiam bibendum fermentum metus. Aenean',
        status: ''
      },
      {
        idpedido: 75,
        idpessoa: 65,
        datahora: '2018-08-09T06:45:53-07:00',
        etapa: 'C',
        valor: 103,
        observacoes:
          'luctus vulputate, nisi sem semper erat, in consectetuer ipsum',
        status: ''
      },
      {
        idpedido: 76,
        idpessoa: 61,
        datahora: '2019-01-18T22:34:45-08:00',
        etapa: '',
        valor: 80,
        observacoes: 'purus mauris a nunc. In at',
        status: ''
      },
      {
        idpedido: 77,
        idpessoa: 84,
        datahora: '2018-09-17T03:43:56-07:00',
        etapa: 'P',
        valor: 63,
        observacoes: 'lectus rutrum urna,',
        status: 'S'
      },
      {
        idpedido: 78,
        idpessoa: 51,
        datahora: '2018-02-28T14:09:46-08:00',
        etapa: 'A',
        valor: 136,
        observacoes: 'dolor',
        status: 'T'
      },
      {
        idpedido: 79,
        idpessoa: 40,
        datahora: '2018-09-01T09:32:03-07:00',
        etapa: '',
        valor: 49,
        observacoes:
          'dapibus rutrum, justo. Praesent luctus. Curabitur egestas nunc sed',
        status: 'C'
      },
      {
        idpedido: 80,
        idpessoa: 70,
        datahora: '2019-02-23T10:41:23-08:00',
        etapa: 'I',
        valor: 110,
        observacoes: 'lorem ipsum sodales purus, in molestie tortor',
        status: ''
      },
      {
        idpedido: 81,
        idpessoa: 17,
        datahora: '2018-02-16T12:50:19-08:00',
        etapa: 'P',
        valor: 102,
        observacoes:
          'feugiat non, lobortis quis, pede. Suspendisse dui. Fusce diam',
        status: 'T'
      },
      {
        idpedido: 82,
        idpessoa: 56,
        datahora: '2018-09-15T05:00:50-07:00',
        etapa: '',
        valor: 50,
        observacoes: 'fringilla',
        status: 'T'
      },
      {
        idpedido: 83,
        idpessoa: 81,
        datahora: '2018-02-20T05:15:18-08:00',
        etapa: 'E',
        valor: 129,
        observacoes: 'a, facilisis non, bibendum sed, est. Nunc',
        status: 'A'
      },
      {
        idpedido: 84,
        idpessoa: 43,
        datahora: '2019-04-04T16:37:18-07:00',
        etapa: '',
        valor: 109,
        observacoes: 'ornare sagittis felis. Donec tempor, est ac',
        status: ''
      },
      {
        idpedido: 85,
        idpessoa: 80,
        datahora: '2017-11-07T04:16:18-08:00',
        etapa: 'E',
        valor: 57,
        observacoes: 'erat semper rutrum. Fusce dolor quam, elementum',
        status: ''
      },
      {
        idpedido: 86,
        idpessoa: 84,
        datahora: '2018-03-28T11:51:25-07:00',
        etapa: '',
        valor: 141,
        observacoes:
          'Nulla facilisis. Suspendisse commodo tincidunt nibh. Phasellus',
        status: 'C'
      },
      {
        idpedido: 87,
        idpessoa: 94,
        datahora: '2018-06-11T22:51:30-07:00',
        etapa: '',
        valor: 19,
        observacoes: 'arcu iaculis enim, sit amet ornare lectus justo eu',
        status: ''
      },
      {
        idpedido: 88,
        idpessoa: 44,
        datahora: '2018-01-14T03:40:53-08:00',
        etapa: '',
        valor: 18,
        observacoes:
          'fermentum vel, mauris. Integer sem elit, pharetra ut, pharetra sed,',
        status: 'A'
      },
      {
        idpedido: 89,
        idpessoa: 21,
        datahora: '2018-07-26T05:49:59-07:00',
        etapa: '',
        valor: 35,
        observacoes: 'lorem. Donec',
        status: ''
      },
      {
        idpedido: 90,
        idpessoa: 63,
        datahora: '2018-10-30T10:04:34-07:00',
        etapa: '',
        valor: 59,
        observacoes:
          'rutrum. Fusce dolor quam, elementum at, egestas a, scelerisque',
        status: 'C'
      },
      {
        idpedido: 91,
        idpessoa: 58,
        datahora: '2018-10-01T08:24:28-07:00',
        etapa: '',
        valor: 67,
        observacoes: 'interdum',
        status: ''
      },
      {
        idpedido: 92,
        idpessoa: 97,
        datahora: '2018-04-29T02:05:03-07:00',
        etapa: 'E',
        valor: 38,
        observacoes: 'sapien. Nunc pulvinar arcu',
        status: ''
      },
      {
        idpedido: 93,
        idpessoa: 74,
        datahora: '2019-03-11T18:37:03-07:00',
        etapa: 'I',
        valor: 39,
        observacoes: 'iaculis enim, sit amet ornare lectus justo',
        status: 'E'
      },
      {
        idpedido: 94,
        idpessoa: 50,
        datahora: '2018-06-25T20:38:24-07:00',
        etapa: 'P',
        valor: 144,
        observacoes: 'lacus. Mauris',
        status: 'T'
      },
      {
        idpedido: 95,
        idpessoa: 35,
        datahora: '2018-03-23T15:59:47-07:00',
        etapa: 'I',
        valor: 101,
        observacoes:
          'metus. Aenean sed pede nec ante blandit viverra. Donec tempus,',
        status: ''
      },
      {
        idpedido: 96,
        idpessoa: 80,
        datahora: '2018-12-11T13:59:08-08:00',
        etapa: '',
        valor: 127,
        observacoes:
          'Mauris ut quam vel sapien imperdiet ornare. In faucibus. Morbi',
        status: ''
      },
      {
        idpedido: 97,
        idpessoa: 74,
        datahora: '2017-11-16T07:22:55-08:00',
        etapa: '',
        valor: 141,
        observacoes: 'egestas. Fusce aliquet',
        status: ''
      },
      {
        idpedido: 98,
        idpessoa: 91,
        datahora: '2019-04-15T19:05:46-07:00',
        etapa: 'A',
        valor: 127,
        observacoes: 'sodales elit',
        status: 'E'
      },
      {
        idpedido: 99,
        idpessoa: 76,
        datahora: '2018-12-22T23:33:42-08:00',
        etapa: 'E',
        valor: 36,
        observacoes: 'In ornare sagittis felis. Donec',
        status: ''
      },
      {
        idpedido: 100,
        idpessoa: 2,
        datahora: '2018-04-17T02:17:51-07:00',
        etapa: 'C',
        valor: 39,
        observacoes:
          'adipiscing, enim mi tempor lorem, eget mollis lectus pede',
        status: 'T'
      }
    ];
  }

  public filter(reference, val) {
    const ref = typeof reference == 'string' ? this[reference] : reference;
    return (ref || []).filter(ele => {
      let filtered = false;
      Object.keys(ele).forEach(key => {
        if (ele[key] && !filtered) {
          filtered = (ele[key] + '').toLowerCase().includes(val);
        }
      });
      return filtered;
    });
  }
  public filterAtivo(reference, val, ativo = true) {
    const ref = typeof reference == 'string' ? this[reference] : reference;
    const refAtivo = (ref || []).filter(e => {
      return e.status == 'A' ? ativo : !ativo;
    });
    if (val) {
      return this.filter(refAtivo, val.toLowerCase());
    } else {
      return refAtivo;
    }
  }

  public getById(model, reference, val, only = true) {
    const get = (this[model] || []).filter(ele => {
      return ele[reference] == val;
    });
    return only ? get[0] : get;
  }

  public getByReference(model, reference, val) {
    return this.getById(model, reference, val, false);
  }

  public currencyFormat(val) {
    return formatCurrency(val, 'PT', 'R$');
  }

  public aoSelecionar(form, reference, geral, val) {
    const obj = {};
    obj[reference] = val[reference];
    obj[geral] = val;
    form.patchValue(obj);
  }

  public confirmDialog(instance) {
    if (instance.confirmar) {
      return instance.confirmar().then(() => {
        console.log('dialog');
      });
    }
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 100);
    });
  }

  public cancelarDialog(instance) {
    if (instance.cancelar) {
      return instance.cancelar().then(() => {
        console.log('dialog');
      });
    }
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 100);
    });
  }
}
