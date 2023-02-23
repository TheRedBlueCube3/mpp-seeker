import EventEmitter from 'https://deno.land/std@0.177.0/node/events.ts';
//eventemitter fixed
export interface BotParams {
	name: string;
	token: string;
	channel: string;
	color: string;
	uri: string;
}
// hri check index.ts daniel is asking something
export default class Client extends EventEmitter {
	public token: string;
	public name: string;
	public desiredChannel: string;
	public color: string;
	public uri: string;
	public ws: WebSocket;

	constructor({ token, name, channel, color, uri }: BotParams) {
		super();
		this.token = token;
		this.desiredChannel = channel;
		this.color = color;
		this.uri = uri;
		this.name = name;
		this.ws = new WebSocket(this.uri);

		this.ws.addEventListener('open', () => {
			this.emit('connect');

			this.sendReq({ m: 'hi', token: this.token });
			this.userset(this.name, this.color);

			setInterval(() => {
				this.sendReq({ m: 't', e: Date.now() });
			}, 15000);
		});

		this.ws.addEventListener('message', evt => {
			try {
				const json = evt.data;
				const transmission = JSON.parse(json);
				for (const msg of transmission) {
					this.emit(msg.m, msg);
				}
			} catch (err) {
				this.emit('msgerror', err, evt.data);
			}
		});

		this.ws.addEventListener('close', () => {
			this.emit('disconnect');
		});

		this.ws.addEventListener('error', err => {
			this.emit('wserror', err);
		});

		this.on('hi', msg => {
			this.sendReq({ m: 'ch', _id: this.desiredChannel });
		});
	}

	public isConnected(): boolean {
		return this.ws.readyState == WebSocket.OPEN;
	}

	// sendArray(arr) (old function, but usefull)
	public sendArray(arr: Array<unknown>): void {
		if (this.isConnected()) this.ws.send(JSON.stringify(arr));
		//fix for index.ts:18
	}

	public sendReq<T extends Message>(msg: T) {
		if (this.isConnected()) this.ws.send(JSON.stringify([msg]));
	}

	public chat(a: string): void {
		//a.k.a say
		this.sendReq({ m: 'a', message: a });
	}

	public moveMouse(x: number, y: number): void {
		this.sendReq({ m: 'm', x: x, y: y });
	}

	// why would you use red? that's one of the most common colors on mpp
	public userset(name = 'MPP Bot', color = '#adadad'): void {
		this.sendReq({ m: 'userset', set: { name, color } });
	}

	public disconnect(): void {
		console.log('Disconnected.');
		this.ws.close();
	}

	public dropCrown(): void {
		this.sendReq({ m: 'chown' });
	}

	public giveCrown(identifier: string): void {
		this.sendReq({ m: 'chown', _id: identifier });
	}

	public kickban(identifier: string): void {
		this.sendReq({ m: 'kickban', _id: identifier });
	}

	public unban(identifier: string): void {
		this.sendReq({ m: 'unban', _id: identifier });
	}

	public dm(identifier: string, a: string): void {
		this.sendReq({ m: 'dm', message: a, _id: identifier });
	}

	public setChannel(channelname: string): void {
		this.sendReq({ m: 'ch', _id: channelname });
	}
}
