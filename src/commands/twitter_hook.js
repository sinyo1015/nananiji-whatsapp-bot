const { isAdmin } = require("../helpers/admins");
const Database = require('better-sqlite3');
const twitterInstance = require("../helpers/twitter_instance");
const BOT_MODE = require("../constants/bot_mode");
const isOnlyRunInGroup = require("../services/group_only_command");
const db = new Database('local.db', { verbose: console.log });
/**
 * Determine what command should be called.
 */
const COMMAND = "#twitter";

/**
 * Determine what pattern can be used if needed. You can use regex here.
 */
const PATTERN = /^(\#twitter)\s(tambah|hapus)\s[a-zA-Z0-9_]+$/;

/**
 * Help menu to spesific command
 */
const HELP_MENU = "Perintah yang tersedia:\n\n" +
    "- _#twitter tambah [username]_ untuk menambahkan feed kepada username tertentu, misal *#twitter tambah reinyan_0526* (tanpa @).\n\n" +
    "- _#twitter hapus [username]_ untuk menghapus feed terhadap username tertentu, misal *#twitter hapus reinyan_0525* (tanpa @).";

/**
 * Set Limitter
 */
let IS_RATE_LIMIT = false;
const RATE_LIMIT_TIMEOUT = 3000;

/**
 * Determine what callback after certain menu has been called.
 * Params: 
 *  - message: Get message properties
 *  - client: Get client properties
 *  - args: Additional parameters
 */
const CALLBACK = async (message, client, ...args) => {
    if(!(await isOnlyRunInGroup(message))) return;

    if (/^(\#twitter)\s(help)+$/.test(message.body)) {
        message.reply("[Twitter Feed]\n\n" + HELP_MENU);
        return;
    }

    if (!PATTERN.test(message.body)) {
        message.reply("[Twitter Feed]\n\n❌ Perintah tidak valid.\n" + HELP_MENU);
        return;
    }
    let split = message.body.split(" ");
    let action = split[1];
    let username = split[2];

    switch (action) {
        case "tambah":
            try {
                if (IS_RATE_LIMIT) {
                    message.reply("[Twitter Feed]\n\n❌ Silahkan coba kembali nanti.");
                    return;
                }

                IS_RATE_LIMIT = true;

                const user = await twitterInstance.v2.userByUsername(username);
                if (user?.errors?.length > 0)
                    message.reply("[Twitter Feed]\n\n❌ Tidak dapat menemukan username");

                setTimeout(() => {
                    IS_RATE_LIMIT = false;
                }, RATE_LIMIT_TIMEOUT);

                let check = db.prepare("SELECT * FROM twitter_username_hooks WHERE username = ?").get(user.data.username);
                if (check !== undefined) {
                    message.reply("[Twitter Feed]\n\n❌ Username ini sudah ada didalam feed");
                    return;
                }

                db.prepare("INSERT INTO twitter_username_hooks VALUES(?, ?, ?)")
                    .run(null, user.data.username, new Date().toISOString().slice(0, 10) + " " + new Date().toLocaleTimeString('id-ID'));

                message.reply("[Twitter Feed]\n\n✅ Berhasil menambahkan username ke feed.")
            }
            catch (err) {
                message.reply("[Twitter Feed]\n\n❌ Tidak dapat menambahkan username, silahkan coba kembali nanti.");
            }
            break;

        case "hapus":
            try {
                const query = db.prepare("SELECT * FROM twitter_username_hooks WHERE username = ?");
                
                if (query.get(username) === undefined) {
                    message.reply("[Twitter Feed]\n\n❌ Username tidak ditemukan, tidak dapat menghapus.");
                    return;
                }
                
                db.prepare("DELETE FROM twitter_username_hooks WHERE username = ?").run(username);
                
                message.reply("[Twitter Feed]\n\n✅ Berhasil menghapus username dari feed.");
            }
            catch (err) {
                message.reply("[Twitter Feed]\n\n❌ Gagal menghapus username dari feed.");
            }
            break;

        default:
            message.reply("[Twitter Feed]\n\n❌ Perintah tidak valid.\n" + HELP_MENU);
            break;
    }
};

module.exports = { COMMAND, PATTERN, CALLBACK };