# MPP Seeker Bot

This is a _seeker_ bot! This means it can collect IDs, names, etc.  
Runs on Deno.

## Setting up the bot

1. Installing Deno

This involves installing Deno. To see how to install Deno, see the [Deno installation guide](https://deno.land/manual@v1.30.3/getting_started/installation).

2. Setting up the bot

- config.json  
  The config file is the most necessary part of every bot. It contains the token, name, etc.
  To make a config file, create a `config.json` file. _(in the `src` folder)_  
  Then, fill the contents of the `config.json` file with this:

```json
{
	"token": "your token goes here",
	"name": "Seek...",
	"color": "#adadad",
	"channel": "Channel",
	"uri": "wss://mppclone.com:8443"
}
```

- users.db  
  Just create a users.db file. The `index.ts` file will automatically fill it in. (should be in db folder)

3. Run the bot

Run the bot in `powershell` or `cmd`. Any command processor works.  
Then, run `deno run --allow-net index.ts`. Make sure you're in the root folder of the bot.

Tada, you're _all done_!

## Contributing

If you're in a live share session (I know, it's bad), use `conversation.txt` for communication, since the chat window is extremely unreliable.

The contents of `TODO.md` should be clear.

## Help/Contact

To contact TheRedBlueCube3, email _theredbluecube2@gmail.com_.
