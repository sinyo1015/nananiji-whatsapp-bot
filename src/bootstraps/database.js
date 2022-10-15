const Database = require('better-sqlite3');
const db = new Database('local.db', { verbose: console.log });

const ACTION = () => {
    db.exec(`CREATE TABLE IF NOT EXISTS twitter_username_hooks(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        created_at TEXT
    );`);
    db.exec(`CREATE TABLE IF NOT EXISTS twitter_latest_updates(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username_id INTEGER NOT NULL,
        latest_tweet_id TEXT NOT NULL,
        created_at TEXT,
        updated_at TEXT,
        FOREIGN KEY (username_id) REFERENCES twitter_username_hooks(id) ON UPDATE CASCADE ON DELETE CASCADE
    );`);
    db.exec(`CREATE TABLE IF NOT EXISTS blocked_whatsapp_numbers(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        whatsapp_number TEXT NOT NULL
    );`);
};

module.exports = ACTION;
