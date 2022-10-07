const TSUBOMI = require('../static_datas/227_members/character/gen_1/biodatas/sub_gen_1/hiragi_tsubomi.json');
const MIKAMI = require('../static_datas/227_members/character/gen_1/biodatas/sub_gen_1/kamiki_mikami.json');
const YUKI = require('../static_datas/227_members/character/gen_1/biodatas/sub_gen_1/tojo_yuki.json');

const SAKURA = require('../static_datas/227_members/character/gen_1/biodatas/fujima_sakura.json');
const MIYAKO = require('../static_datas/227_members/character/gen_1/biodatas/kono_miyako.json');
const AKANE = require('../static_datas/227_members/character/gen_1/biodatas/maruyama_akane.json');
const NICOLE = require('../static_datas/227_members/character/gen_1/biodatas/saito_nicole.json');
const REIKA = require('../static_datas/227_members/character/gen_1/biodatas/sato_reika.json');
const AYAKA = require('../static_datas/227_members/character/gen_1/biodatas/tachikawa_ayaka.json');
const MIU = require('../static_datas/227_members/character/gen_1/biodatas/takigawa_miu.json');
const JUN = require('../static_datas/227_members/character/gen_1/biodatas/toda_jun.json');

const MIZUKI = require('../static_datas/227_members/character/gen_2/biodatas/himuro_mizuki.json');
const HOTARU = require('../static_datas/227_members/character/gen_2/biodatas/ichinose_hotaru.json');
const TOUKO = require('../static_datas/227_members/character/gen_2/biodatas/kiryu_touko.json');
const KAEDE = require('../static_datas/227_members/character/gen_2/biodatas/nagamine_kaede.json');
const SORA = require('../static_datas/227_members/character/gen_2/biodatas/nishiura_sora.json');
const SUMIKA = require('../static_datas/227_members/character/gen_2/biodatas/orihara_sumika.json');
const HONOKA = require('../static_datas/227_members/character/gen_2/biodatas/sera_honoka.json');
const TOA = require('../static_datas/227_members/character/gen_2/biodatas/yagami_toa.json');
const { MessageMedia } = require('whatsapp-web.js');

/**
 * Determine what command should be called.
 */
const COMMAND = "#karakter";

/**
 * Determine what pattern can be used if needed. You can use regex here.
 */
const PATTERN = /^#karakter\s(help|hiragi tsubomi|kamiki mikami|tojo yuki|fujima sakura|kono miyako|maruyama akane|saito nicole|sato reika|tachikawa ayaka|takigawa miu|toda jun|himuro mizuki|kiryu touko|nagamine kaede|nishiura sora|orihara sumika|sera honoka|yagami toa|ichinose hotaru|tsubomi|mikami|yuki|sakura|miyako|akane|nicole|reika|ayaka|miu|jun|mizuki|touko|kaede|sora|sumika|honoka|toa|hotaru)+$/m;

const HELP_MENU =
    `[Biodata Karakter 22/7]
Perintah ini berfungsi untuk menampilkan biodata karakter. Untuk menggunakan perintah ini ketik *#karakter[spasi][NAMA_KARAKTER]*\n
Misal: _#karakter miu_(Nama Belakang) atau _#karakter takigawa miu_(Nama Panjang)\n\n
Nama belakang yang tersedia: _tsubomi; mikami; yuki; sakura; miyako; akane; nicole; reika; ayaka; miu; jun; mizuki; touko; kaede; sora; sumika; honoka; toa; hotaru_\n\n
Nama lengkap yang tersedia: _hiragi tsubomi; kamiki mikami; tojo yuki; fujima sakura; kono miyako; maruyama akane; saito nicole; sato reika; tachikawa ayaka; takigawa miu; toda jun; himuro mizuki; kiryu touko; nagamine kaede; nishiura sora; orihara sumika; sera honoka; yagami toa; ichinose hotaru_`

/**
 * Determine what callback after certain menu has been called.
 * Params: 
 *  - message: Get message properties
 *  - client: Get client properties
 *  - args: Additional parameters
 */

const CHARACTER_SWITCH = (input) => {
    switch (input?.toLowerCase()) {
        case "hiragi tsubomi":
        case "tsubomi":
            return TSUBOMI;

        case "kamiki mikami":
        case "mikami":
            return MIKAMI;

        case "tojo yuki":
        case "yuki":
            return YUKI;

        case "fujima sakura":
        case "sakura":
            return SAKURA;

        case "kono miyako":
        case "miyako":
            return MIYAKO;

        case "maruyama akane":
        case "akane":
            return AKANE;

        case "saito nicole":
        case "nicole":
            return NICOLE;

        case "sato reika":
        case "reika":
            return REIKA;

        case "tachikawa ayaka":
        case "ayaka":
            return AYAKA;

        case "takigawa miu":
        case "miu":
            return MIU;

        case "toda jun":
        case "jun":
            return JUN;

        case "himuro mizuki":
        case "mizuki":
            return MIZUKI;

        case "kiryu touko":
        case "touko":
            return TOUKO;

        case "nagamine kaede":
        case "kaede":
            return KAEDE;

        case "nishiura sora":
        case "sora":
            return SORA;

        case "orihara sumika":
        case "sumika":
            return SUMIKA;

        case "sera honoka":
        case "honoka":
            return HONOKA;

        case "yagami toa":
        case "toa":
            return TOA;

        case "hotaru":
        case "ichinose hotaru":
            return HOTARU;
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


    const character = CHARACTER_SWITCH(message.body?.split("#karakter ")?.[1]);
    const profpic = process.cwd() + "/" + character.profile_picture;
    const picture = MessageMedia.fromFilePath(profpic);
    const template = `[Biodata Karakter 22/7]
*[${character.romanji_name} (${character.name})]*

_${character.commentary}_

*Nama:* ${character.romanji_name}
*Generasi:* ${character.generation}
*Birthday:* ${character.birthday_date}
*Asal:* ${character.birth_place}
*Umur:* ${character.age}
*Tinggi:* ${character.height}

*Seiyuu:* ${character.seiyuu}
*Desainer Karakter:* ${character.character_designer} _(${character.character_designer_serie})_

${character.links.map((e, i) => {
        return `*${e.type}*: ${e.link}`;
    }).join("\n")}
`;

    message.reply(picture, undefined, { caption: template });
};

module.exports = { COMMAND, PATTERN, CALLBACK };