export interface Command {
	id: string
	aliases: string[]
	callback: () => string | void | Promise<string | void>
}

export class CommandHandler {
	public static commands = new Set<Command>()

	public static handleCommand() {
		throw `Method not implemented`
	}
}
