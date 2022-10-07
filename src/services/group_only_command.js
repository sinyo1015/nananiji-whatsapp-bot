const BOT_MODE = require("../constants/bot_mode");

const isOnlyRunInGroup = async (message) => {
    // 1. Check if env BOT_MODE running on BOT_MODE.GROUP
    if(process.env.CHAT_MODE !== BOT_MODE.GROUP) return false;

    // 2. Check if chat type in group
    return (await message.getChat()).isGroup;
};

module.exports = isOnlyRunInGroup;