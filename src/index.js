require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const COMMAND_REGISTER = require('./command_registry');
const SERVICES = require('./service_registry');
const BOOTSTRAPS = require('./bootstrap_registry');
const BOT_MODE = require('./constants/bot_mode');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: false,
        args: [
            '--no-zygote',
            '--log-level=3',
            '--disable-site-isolation-trials',
            '--no-experiments',
            '--ignore-gpu-blacklist',
            '--ignore-certificate-errors',
            '--ignore-certificate-errors-spki-list',
            '--disable-gpu',
            '--disable-extensions',
            '--disable-default-apps',
            '--enable-features=NetworkService',
            '--disable-setuid-sandbox',
            '--no-sandbox',
            '--disable-webgl',
            '--disable-infobars',
            '--window-position=0,0',
            '--ignore-certifcate-errors',
            '--ignore-certifcate-errors-spki-list',
            '--disable-threaded-animation',
            '--disable-threaded-scrolling',
            '--disable-in-process-stack-traces',
            '--disable-histogram-customizer',
            '--disable-gl-extensions',
            '--disable-composited-antialiasing',
            '--disable-canvas-aa',
            '--disable-3d-apis',
            '--disable-accelerated-2d-canvas',
            '--disable-accelerated-jpeg-decoding',
            '--disable-accelerated-mjpeg-decode',
            '--disable-app-list-dismiss-on-blur',
            '--disable-accelerated-video-decode',
            '--disable-dev-shm-usage',
            '--disable-gl-drawing-for-tests',
            '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'
        ]
    }
});

/**
 * Bootstraps Area
 */
for(const BOOTSTRAP of BOOTSTRAPS)
    BOOTSTRAP();


/**
 * WhatsApp Area
 */

client.on('qr', (qr) => {
    qrcode.generate(qr, {small : true});
});

client.on('ready', () => {
    console.log('Client is ready!');
    /**
     * Background Services Area
     */
    for(const SERVICE of SERVICES)
        SERVICE(client);
});

client.on('message', msg => {
    COMMAND_REGISTER.message_handler(msg, client);
});

client.initialize();
