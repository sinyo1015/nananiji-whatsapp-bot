const UTA = require('../static_datas/227_members/seiyuu/gen_1/biodatas/sub_gen_1/kawase_uta.json');
const MOE = require('../static_datas/227_members/seiyuu/gen_1/biodatas/sub_gen_1/suzuhana_moe.json');
const URARA = require('../static_datas/227_members/seiyuu/gen_1/biodatas/sub_gen_1/takatsuji_urara.json');
const AINA = require('../static_datas/227_members/seiyuu/gen_1/biodatas/sub_gen_1/takeda_aina.json');

const SALLY = require('../static_datas/227_members/seiyuu/gen_1/biodatas/amaki_sally.json');
const MEI = require('../static_datas/227_members/seiyuu/gen_1/biodatas/hanakawa_mei.json');
const CHIHARU = require('../static_datas/227_members/seiyuu/gen_1/biodatas/hokaze_chiharu.json');
const MIZUHA = require('../static_datas/227_members/seiyuu/gen_1/biodatas/kuraoka_mizuha.json');
const REINA = require('../static_datas/227_members/seiyuu/gen_1/biodatas/miyase_reina.json');
const NAGOMI = require('../static_datas/227_members/seiyuu/gen_1/biodatas/saijo_nagomi.json');
const KANAE = require('../static_datas/227_members/seiyuu/gen_1/biodatas/shirosawa_kanae.json');
const RURI = require('../static_datas/227_members/seiyuu/gen_1/biodatas/umino_ruri.json');

const NAO = require('../static_datas/227_members/seiyuu/gen_2/biodatas/aikawa_nao.json');
const OTO = require('../static_datas/227_members/seiyuu/gen_2/biodatas/amaya_oto.json');
const MAO = require('../static_datas/227_members/seiyuu/gen_2/biodatas/asaoka_mao.json');
const MINA = require('../static_datas/227_members/seiyuu/gen_2/biodatas/kiyoi_mina.json');
const RINO = require('../static_datas/227_members/seiyuu/gen_2/biodatas/mochizuki_rino.json');
const SATSUKI = require('../static_datas/227_members/seiyuu/gen_2/biodatas/shiina_satsuki.json');
const LUNA = require('../static_datas/227_members/seiyuu/gen_2/biodatas/shijo_luna.json');
const EMMA = require('../static_datas/227_members/seiyuu/gen_2/biodatas/tsukishiro_emma.json');
const { MessageMedia } = require('whatsapp-web.js');


/**
 * Determine what command should be called.
 */
const COMMAND = "#seiyuu";

/**
 * Determine what pattern can be used if needed. You can use regex here.
 */
const PATTERN = /^#seiyuu\s(help|uta|moe|urara|aina|sally|mei|chiharu|mizuha|reina|nagomi|kanae|ruri|kawase uta|suzuhana moe|takatsuji urara|takeda aina|amaki sally|hanakawa mei|hokaze chiharu|kuraoka mizuha|miyase reina|saijo nagomi|shirosawa kanae|umino ruri|nao|oto|mao|mina|rino|satsuki|luna|emma|aikawa nao|amaya oto|asaoka mao|kiyoi mina|mochizuki rino|shiina satsuki|shijo luna|tsukishiro emma)+$/m;

const HELP_MENU =
    `[Biodata Seiyuu 22/7]
Perintah ini berfungsi untuk menampilkan biodata seiyuu. Untuk menggunakan perintah ini ketik *#seiyuu[spasi][NAMA_SEIYUU]*\n
Misal: _#seiyuu nao_(Nama Belakang) atau _#seiyuu aikawa nao_(Nama Panjang)\n\n
Nama belakang yang tersedia: _uta; moe; urara; aina; sally; mei; chiharu; mizuha; reina; nagomi; kanae; ruri; nao; oto; mao; mina; rino; satsuki; luna; emma_\n\n
Nama lengkap yang tersedia: _kawase uta; suzuhana moe; takatsuji urara; takeda aina; amaki sally; hanakawa mei; hokaze chiharu; kuraoka mizuha; miyase reina; saijo nagomi; shirosawa kanae; umino ruri; aikawa nao; amaya oto; asaoka mao; kiyoi mina; mochizuki rino; shiina satsuki; shijo luna; tsukishiro emma_`

/**
 * Determine what callback after certain menu has been called.
 * Params: 
 *  - message: Get message properties
 *  - client: Get client properties
 *  - args: Additional parameters
 */
const SEIYUU_SWITCH = (input) => {
    switch (input?.toLowerCase()) {
        case "kawase uta":
        case "uta":
            return UTA;

        case "suzuhana moe":
        case "moe":
            return MOE;

        case "takatsuji urara":
        case "urara":
            return URARA;

        case "takeda aina":
        case "aina":
            return AINA;

        case "amaki sally":
        case "sally":
            return SALLY;

        case "hanakawa mei":
        case "mei":
            return MEI;

        case "chiharu":
        case "hokaze chiharu":
            return CHIHARU;

        case "mizuha":
        case "kuraoka mizuha":
            return MIZUHA;

        case "reina":
        case "miyase reina":
            return REINA;

        case "nagomi":
        case "saijo nagomi":
            return NAGOMI;

        case "kanae":
        case "shirosawa kanae":
            return KANAE;

        case "ruri":
        case "umino ruri":
            return RURI;

        case "nao":
        case "aikawa nao":
            return NAO;

        case "oto":
        case "amaya oto":
            return OTO;

        case "mao":
        case "asaoka mao":
            return MAO;

        case "mina":
        case "kiyoi mina":
            return MINA;

        case "rino":
        case "mochizuki rino":
            return RINO;

        case "satsuki":
        case "shiina satsuki":
            return SATSUKI;

        case "luna":
        case "shijo luna":
            return LUNA;

        case "emma":
        case "tsukishiro emma":
            return EMMA;
    }
}

const CALLBACK = (message, client, ...args) => {

    if (!PATTERN.test(message.body)) {
        message.reply("Format salah!\n\n" + HELP_MENU);
        return;
    }

    const split = message.body?.split(" ");
    if (split?.[1]?.toLowerCase() === "help") {
        message.reply(HELP_MENU);
        return;
    }


    const seiyuu = SEIYUU_SWITCH(message.body?.split("#seiyuu ")?.[1]);
    const profpic = process.cwd() + "/" + seiyuu.profile_picture;
    const picture = MessageMedia.fromFilePath(profpic);
    const template =
        `[Biodata Seiyuu 22/7]
*[${seiyuu.romanji_name} (${seiyuu.name})] ${seiyuu.icon}*
    
_${seiyuu.commentary}_

*Nama:* ${seiyuu.romanji_name}
*Generasi:* ${seiyuu.generation}
*Birthday:* ${seiyuu.birthday_date}

*Panggilan:* ${seiyuu.nicknames.join(", ")}

*Hobi:* ${seiyuu.hobbies.join(", ")}

*Skill:* ${seiyuu.skills.join(", ")}

*Karakter:* ${seiyuu.character_voice_romanji} (${seiyuu.character_voice})

${seiyuu.links.map((e, i) => {
            return `*${e.type}*: ${e.link}`;
        }).join("\n")}
    `

    message.reply(picture, undefined, { caption: template });
};

module.exports = { COMMAND, PATTERN, CALLBACK };