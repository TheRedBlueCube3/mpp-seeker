import conf from './src/config.json' assert { type: 'json' };
import Client from './src/Client.ts';
import { DB } from 'https://deno.land/x/sqlite@v3.7.0/mod.ts';

const db = new DB('src/db/users.db');

db.execute(`
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT,
		color TEXT,
		nameHistory TEXT
	);
`);
// writing readme.md
const getUserData = (id: string) => {
	db.query(`SELECT * FROM users WHERE id = (id)`, [id]);
};

const setNameHistory = (id: string, nh: string) => {
	// TODO
	// db.query(``);
};

const addName = (id: string, name: string) => {
	// TODO
};

let roomList: Partial<ChannelInfo>[];

let adminIds = [
	'819695470c858041f5f5ad6f',
	'3bff3f33e6dc0410fdc61d13',
	'b8e8694638387d339340b6bc',
	'ead940199c7d9717e5149919'
];

let isAdmin = (id: string) => {
	return adminIds.indexOf(id) == -1 ? true : false;
};

const bot = new Client({
	token: conf.token,
	name: conf.name,
	channel: conf.channel,
	color: conf.color,
	uri: conf.uri
});

bot.on('connect', () => {
	console.log('Connected to ' + bot.uri);
	bot.sendArray([{ m: '+ls' }]);
});

bot.on('ch', msg => {
	console.debug('Connected to channel ' + msg.ch._id);
});

bot.on('ls', (msg: ChannelListMessageIncoming) => {
	if (msg.c == true) {
		roomList = msg.u;
		console.log(roomList);
	}
});

const prefix = '--';

bot.on('a', (msg: ChatMessageIncoming) => {
	const message = msg.a;
	const uname = msg.p.name;
	const ucolor = msg.p.color;
	const args = message.split(' ');
	const command = args.shift();
	const input = args.join(' ');
	// const uid = msg.p.id;
	const uid = msg.p._id; // id without _ is participant id, not user id
	const pid = msg.p.id;

	if (command == `${prefix}help`) {
		bot.chat(
			'Available commands: ts, about, disconnect, restart, whoami, dm, id.'
		);
	}

	// i thought this was just > and not -->
	// if (command == `${prefix}>`) {
	if (command == `>`) {
		if (!isAdmin(uid)) return bot.chat('No permission.');
		try {
			const tcode = eval(input);
			bot.chat(`< ${typeof tcode} | ${tcode}`);
		} catch (err) {
			bot.chat(`< Error | ${err}`);
		}
	}

	if (command == `${prefix}about`) {
		bot.chat('bot that is used to test TypeScript code');
	}

	if (command == `${prefix}disconnect`) {
		if (!isAdmin(uid)) return bot.chat('No permission.');
		bot.disconnect();
	}

	if (command == `${prefix}whoami`) {
		bot.chat(`${uname}, ${ucolor}, ${uid}.`);
	}

	if (command == `${prefix}dm`) {
		bot.chat('Sent.');
		bot.dm(uid, input);
	}

	if (command == `${prefix}id`) {
		bot.chat(`ID: ${uid}`);
	}
});
