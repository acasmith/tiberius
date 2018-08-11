# Tiberius
Discord bot for querying the D&amp;D 5e SRD.

## Installing the bot on your server.
### Important: you must own the server to install a bot.
Currently, there is no external hosting. To use this bot you must host the bot 
yourself using the following steps. 

## Registering a discord application:
First, head <a href="https://discordapp.com/developers">here</a>, 
and create a new application and a bot user for that application. Notice the 
bot has a token value, we'll use that later.

Next, head to the OAuth2 section of the application dashboard. In the 'Scopes' 
panel select the 'bot' scope and in the 'Permissions' panel select 'Send 
Messages'. Copy the URL this generates, navigate to that address and select 
the server you want the bot to join.

On success, a bot user will join your server.

## Running the Project
To run the project locally, you must first have node.js installed.
Open the terminal/cmd and enter:
```
node -v
```
If you don't see a version number, go <a href="https://nodejs.org/">here</a> and install 
the latest version.

Next, install the dependencies. Using the terminal, navigate to the project
directory and enter:
```
npm install
```

Now we need your bot's token. Copy the token from the developer dashboard, and 
open botconfig.json from the project files. Set the value of "token" to your 
bots token. Make sure to wrap the value in "" quotes.

To run the project, enter:
```
node tiberius
```

"Tiberius ready!" will be logged to the console on a successful launch.

### Commands
Please use !commands to see the full list of commands.