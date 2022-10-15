const Database = require('better-sqlite3');
const db = new Database('local.db', { verbose: console.log });

const HELP = require('./commands/help_menu.js');
const TWITTER_HOOK = require('./commands/twitter_hook.js');
const STICKER_MAKER = require('./commands/sticker_maker.js');
const SEIYUU_BIO = require('./commands/seiyuu_bio.js');
const CHARACTER_BIO = require('./commands/character_bio.js');

/**
 * ADMIN AREA
 */
const ADMIN_BLOCK_USER = require('./commands/block_number.js');
const ADMIN_UNBLOCK_USER = require('./commands/unblock_number.js');


const REGISTERS = {
    [HELP.COMMAND] : HELP.CALLBACK,
    [TWITTER_HOOK.COMMAND] : TWITTER_HOOK.CALLBACK,
    [STICKER_MAKER.COMMAND] : STICKER_MAKER.CALLBACK,
    [SEIYUU_BIO.COMMAND] : SEIYUU_BIO.CALLBACK,
    [CHARACTER_BIO.COMMAND] : CHARACTER_BIO.CALLBACK,
    [ADMIN_BLOCK_USER.COMMAND] : ADMIN_BLOCK_USER.CALLBACK,
    [ADMIN_UNBLOCK_USER.COMMAND] : ADMIN_UNBLOCK_USER.CALLBACK
};

const EXCLUDE_COMMANDS = [
  TWITTER_HOOK.COMMAND,
  ADMIN_BLOCK_USER.COMMAND,
  ADMIN_UNBLOCK_USER.COMMAND
];

const message_handler = (msg, client) => {
    const   split = msg.body.split(" "),
            check = REGISTERS[split[0]] === undefined,
            shebangCheck = msg.body[0] === "#";

    if(split[0] === "#help"){
        msg.reply(`Perintah yang tersedia _${Object.keys(REGISTERS).filter(x => !EXCLUDE_COMMANDS.includes(x)).join(", ")}_`);
        return;
    }

    if(check && shebangCheck){
        msg.reply("Ketik #help untuk melihat daftar perintah. Untuk melihat bantuan setiap perintah, tambahkan *help* setelah perintah, misal _#seiyuu help_");
        return;
    }

    try{
        let whatsappNumber = db.prepare("SELECT * FROM blocked_whatsapp_numbers WHERE whatsapp_number = ?").get(msg?.author);
        if(whatsappNumber !== undefined)
            return;
    }
    catch(err){
        message.reply("Tidak dapat mengesekusi perintah");
    }

    REGISTERS[split[0]](msg, client);
};

module.exports = {message_handler, REGISTERS};
