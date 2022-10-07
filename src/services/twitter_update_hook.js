/**
 * Example service for background service
 * In this case, pulling out Twitter tweet's
 */

const twitterInstance = require("../helpers/twitter_instance");
const Database = require('better-sqlite3');
const translate = require("@iamtraction/google-translate");
const { MessageMedia } = require("whatsapp-web.js");
const db = new Database('local.db', { verbose: console.log });

const UPDATE_INTERVAL = 30000; //In milliseconds

const ACTION = async (client, ...args) => {
    setInterval(() => {
        console.log(`[Twitter Hook Service]Starting sync at ${new Date().toISOString().slice(0, 10) + " " + new Date().toLocaleTimeString('id-ID')}`);
        try{
            let usernameHooks = db.prepare("SELECT * FROM twitter_username_hooks").all();
            for(const username of usernameHooks){
                setTimeout(async () => {
                    let textToSend = "";
                    let latestUpdate = db.prepare("SELECT * FROM twitter_latest_updates WHERE username_id = ?").get(username.id);
                    let user = await twitterInstance.v1.userTimelineByUsername(username.username, {"exclude_replies" : true, "include_entities" : true, "include_rts" : false, "count" : 1});
                    let tweetInfo = user.data[0];
                    if(tweetInfo?.id_str !== latestUpdate?.latest_tweet_id){
                        let image = tweetInfo.entities.media !== undefined ? tweetInfo.entities.media[0].media_url_https : undefined;
                        textToSend += `*@${username.username}:*\n\n` + tweetInfo?.full_text;
                        try{
                            let translatedText = await translate(tweetInfo?.full_text, {from: "ja", to: "id"});
                            textToSend += "\n\n*[Translate ID]*\n\n" + translatedText?.text; 
                        }
                        catch(err){
                            //Ignore translate errors
                        }
                        if(latestUpdate === undefined){
                            db.prepare("INSERT INTO twitter_latest_updates VALUES(?, ?, ?, ?, ?)").run(null, username.id, tweetInfo.id_str, new Date().toISOString().slice(0, 10) + " " + new Date().toLocaleTimeString('id-ID'), new Date().toISOString().slice(0, 10) + " " + new Date().toLocaleTimeString('id-ID'));
                        }
                        else{
                            db.prepare("UPDATE twitter_latest_updates SET latest_tweet_id = ?, updated_at = ? WHERE username_id = ?").run(tweetInfo.id_str, new Date().toISOString().slice(0, 10) + " " + new Date().toLocaleTimeString('id-ID'), username.id);
                        }

                        if(image !== undefined){
                            let mediaSend = await MessageMedia.fromUrl(image);
                            await client.sendMessage(process.env.GROUP_CHAT_NUMBER, mediaSend, {
                                caption: textToSend
                            });
                        }
                        else{
                            await client.sendMessage(process.env.GROUP_CHAT_NUMBER, textToSend);
                        }
                        await new Promise((res, rej) => setTimeout(res, 5000));
                    }
                    
                }, 5000);
            }
        }
        catch(err){
            console.log(["err", err]);
        }
        console.log(`[Twitter Hook Service]Finish sync at ${new Date().toISOString().slice(0, 10) + " " + new Date().toLocaleTimeString('id-ID')}`);
    }, UPDATE_INTERVAL);
}

module.exports = ACTION;