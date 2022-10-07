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
    console.log("Hit");
    message.reply("Euy");
};

module.exports = {COMMAND, PATTERN, CALLBACK};