declare interface Message {
	m: string;
}

declare interface Tag {
	text: string;
	color: string;
}

declare interface Participant {
	name: string;
	color: string;
	_id: string;
	id?: string;
	x?: string | number;
	y?: string | number;
	tag?: Tag;
}

declare interface ChatMessageIncoming extends Message {
	m: 'a';
	a: string;
	p: Participant;
	t: number;
}

declare interface Vector2<T = number> {
	x: T;
	y: T;
}

declare interface Crown {
	userId: string;
	participantId?: string;
	startPos: Vector2<string | number>;
	endPos: Vector2<string | number>;
}

declare interface ChannelSettings {
	visible: boolean;
	chat: boolean;
	crownsolo: boolean;
	color: string;

	lobby?: boolean;
	color2?: string;
	'no cussing'?: boolean;
	'lyrical notes'?: boolean;
	owner_id?: boolean;
}

declare interface ChannelInfo {
	_id: string;
	id: string;
	count: number;
	crown: Crown;
	settings: ChannelSettings;
}

declare interface ChannelListMessageIncoming extends Message {
	m: 'ls';
	c: boolean;
	u: Partial<ChannelInfo>[];
}

declare interface ChannelMessageIncoming extends Message {
	m: 'ch';
	ch: ChannelInfo;
	p: string;
	ppl: Participant[];
}

// there is no linter, it won't load
// let's use default linter for now
