const BOT_MODE = require("../constants/bot_mode");

const isAdmin = (number) => {
    if(process.env.CHAT_MODE === BOT_MODE.INDIVIDUAL) 
        return true;

    let numbers = process.env.ADMIN_NUMBERS;
    let splits = numbers.split(",");
    
    return splits.includes(number);
}

module.exports = {isAdmin};