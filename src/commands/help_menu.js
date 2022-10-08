const REGISTERS = require("../command_registry");

/**
 * Determine what command should be called.
 */
const COMMAND = "#help";

/**
 * Determine what pattern can be used if needed. You can use regex here.
 */
const PATTERN = "#help";

/**
 * Determine what callback after certain menu has been called.
 * Params: 
 *  - message: Get message properties
 *  - client: Get client properties
 *  - args: Additional parameters
 */
const CALLBACK = (message, client, ...args) => {
    message.reply(`Perintah yang tersedia _${Object.keys(REGISTERS).join(", ")}_`);
};

module.exports = {COMMAND, PATTERN, CALLBACK};