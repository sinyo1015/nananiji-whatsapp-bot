const HELP = require('./commands/help_menu.js');
const TWITTER_HOOK = require('./commands/twitter_hook.js');
const STICKER_MAKER = require('./commands/sticker_maker.js');
const SEIYUU_BIO = require('./commands/seiyuu_bio.js');
const CHARACTER_BIO = require('./commands/character_bio.js');

const REGISTERS = {
    [HELP.COMMAND] : HELP.CALLBACK,
    [TWITTER_HOOK.COMMAND] : TWITTER_HOOK.CALLBACK,
    [STICKER_MAKER.COMMAND] : STICKER_MAKER.CALLBACK,
    [SEIYUU_BIO.COMMAND] : SEIYUU_BIO.CALLBACK,
    [CHARACTER_BIO.COMMAND] : CHARACTER_BIO.CALLBACK
}

module.exports = REGISTERS;