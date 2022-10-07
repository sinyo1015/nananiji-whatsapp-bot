const fs = require('fs/promises');
const path = require('path');
const { MessageMedia } = require('whatsapp-web.js');
const { RATIO_DIMENSIONS, POSITIONS } = require('../constants/sticker_constants');
const im = require('imagemagick');
/**
 * Determine what command should be called.
 */
const COMMAND = "#stiker";

/**
 * Determine what pattern can be used if needed. You can use regex here.
 */
const PATTERN = /^#stiker(\s(?:help|(1\:1|3\:4|3\:2))(?:\s(-u|-tl|-t|-tg|-s|-bd|-b|-bl))?(?:\s-teks\=[a-zA-Z0-9]+)?)?$/m;

const HELP_MENU =
    `[Sticker Maker]\n
Cara menggunakan _Sticker Maker_.\n
Kirim gambar dengan caption *#stiker*, kemudian bot ini akan membalas dengan gambar yang akan dijadikan sebagai stiker.
Opsi lainnya yang tersedia:\n
*[Cropping]:*
Dimensi yang tersedia: *1:1 (1x1, warna merah)*, *3:2 (3x2, warna hijau)*, *3:4 (3x4, warna biru)* (sesuai dengan gambar terlampir)\n
Cara menggunakannya: *_#stiker[spasi][UKURAN CROPPING]*, misal, _#stiker 1:1_\n
*[Posisi Cropping]:*
Posisi yang tersedia:
-u  : Atas
-tl : Pojok kanan atas
-t  : Kanan
-tg : Pojok kanan bawah
-s  : Bawah
-bd : Pojok kiri bawah
-b  : Kiri
-bl : Pojok kiri atas\n
Cara menggunakannya: *_#stiker[spasi][UKURAN CROPPING][spasi][ARAH CROPPING]_*, misal _#stiker 1:1 -u_ (huruf kecil semua, posisi terlampir dalam gambar)`;


/**
 * Determine what callback after certain menu has been called.
 * Params: 
 *  - message: Get message properties
 *  - client: Get client properties
 *  - args: Additional parameters
 */

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

let image = MessageMedia.fromFilePath(process.cwd() + "/assets/guideline_path.jpg");
let extension = {
    "image/jpg" : ".jpg",
    "image/jpeg" : ".jpeg",
    "image/png" : ".png",
    "image/gif" : ".gif",
}

const CALLBACK = async (message, client, ...args) => {
    if (!PATTERN.test(message.body)) {
        message.reply(image, undefined, { caption: "*Format Salah*\n" + HELP_MENU });
        return;
    }

    let split = message.body.split(" ");
    let arg1 = split[1]?.toLowerCase();
    let arg2 = split[2]?.toLowerCase();

    let ratio = RATIO_DIMENSIONS['1:1'];
    let position = POSITIONS['-c'];

    if (arg1 === "help") {
        message.reply(image, undefined, { caption: HELP_MENU });
        return;
    }
    else if (arg1 !== undefined)
        ratio = RATIO_DIMENSIONS[arg1];

    if (arg2 === undefined)
        arg2 = position;
    else if (arg2 !== undefined)
        position = POSITIONS[arg2];

    if (!message.hasMedia) {
        message.reply("Silahkan kirimkan gambar beserta perintah didalam caption gambar");
        return;
    }

    let imageData = await message.downloadMedia();
    let mimeType = imageData.mimetype;
    if(!["image/jpg", "image/jpeg", "image/png", "image/gif"].includes(mimeType?.toLowerCase())){
        message.reply("Format gambar tidak sesuai. Hanya menerima jpg, jpeg, png, gif");
        return;
    }

    let processedData = Buffer.from(imageData.data, 'base64');
    try {
        await fs.mkdir(process.cwd() + "/.temp/wa_stickers", { recursive: true });
    }
    catch (err) {
        //Ignore
    }
    let premakeFile = process.cwd() + "/.temp/wa_stickers/" + makeid(16) + extension[mimeType];
    let premakeFile2 = process.cwd() + "/.temp/wa_stickers/_out"  + extension[mimeType];
    try{
        await fs.writeFile(premakeFile, processedData, "binary");
    }
    catch(err){
        message.reply("Tidak dapat membuat stiker, silahkan coba lagi nanti");
        return;
    }
    im.convert([premakeFile, "-gravity", position.position, "-crop", ratio.ratio, premakeFile2], async (err, res) => {
        if(err){
            message.reply("Tidak dapat membuat stiker, silahkan coba lagi nanti");
            return;
        }
        let prepareMedia = MessageMedia.fromFilePath(premakeFile2);
        message.reply(prepareMedia, undefined, {
            sendMediaAsSticker: true,
            stickerAuthor: "NoName",
            stickerName: "-"
        });
        try{
            await fs.rm(premakeFile);
            await fs.rm(premakeFile2);
        }
        catch(err){
            //Ignore
        }
    });
};

module.exports = { COMMAND, PATTERN, CALLBACK };