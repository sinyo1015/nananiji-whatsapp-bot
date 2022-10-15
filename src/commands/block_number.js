const Database = require('better-sqlite3');
const db = new Database('local.db', { verbose: console.log });
/**
 * Determine what command should be called.
 */
const COMMAND = "#block";

/**
 * Determine what pattern can be used if needed. You can use regex here.
 */
const PATTERN = "#block";

/**
 * Determine what callback after certain menu has been called.
 * Params: 
 *  - message: Get message properties
 *  - client: Get client properties
 *  - args: Additional parameters
 */
const CALLBACK = (message, client, ...args) => {
    const split = message.body?.split(" ");
    if(split?.length < 2){
        message.reply("[Admin] Invalid");
        return;
    }

    try{
        db.prepare("INSERT INTO blocked_whatsapp_numbers VALUES(null, ?)").run(split[1]);

        message.reply("Berhasil menambahkan blocklist");
    }
    catch(err){
        message.reply("Gagal menambahkan blocklist");
    }
};

module.exports = {COMMAND, PATTERN, CALLBACK};
