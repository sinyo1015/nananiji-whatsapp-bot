# Nananiji WhatsApp Bot

## What does this bot do?
- Pulling latest tweet from 22/7 staff and re-broadcast it back
- Pulling latest news and blog from 22/7 main site and re-broadcast it back (WIP)
- Sticker maker

## Prerequisite
- Node.js ^v.16.x
- For Linux users, [see here](https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md)

## How to run?
- Use npm/yarn or other package manager as you like to install dependencies
- Rename `_env` file to `.env`
- Get your Twitter token's at [here](https://developer.twitter.com/en/portal/dashboard)
- Register your group chat number in `.env` file, to get group chat id's edit `src/index.js` and add `console.log(msg.from)`. After that make sure this account that pretends as bot already join in group and test it by send dummy message. You'll see something like `xxxxxx-yyyyy@g.us` yyyyy@g.us is your group chat identifier.
- To add background service, eg. pulling news you can take a look in `src/services/group_only_command.js` as an example
- To add command, copy `src/commands/template.js` and modify it as you wish. After that you need to register it in `src/command_registry.js` follow by syntax above it

## Libraries that used here
- [@iamtraction/google-translate](https://github.com/iamtraction/google-translate)
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)
- [dotenv](https://github.com/motdotla/dotenv)
- [imagemagick](https://github.com/rsms/node-imagemagick)
- [qrcode-terminal](https://github.com/gtanner/qrcode-terminal)
- [twitter-api-v2](https://github.com/plhery/node-twitter-api-v2)
- [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)

## License & Credits
This project use MIT for licensing.
This project also uses some 22/7 for non-commercial usages from it's main site, copyrighted from Aniplex, and Buzzwave LLC