# Tiberius
Discord bot for querying the D&amp;D 5e SRD.

## Installing the bot on your server.
### Important: you must own the server to install a bot.
Head 
<a href="https://discordapp.com/api/oauth2/authorize?client_id=476693312011501569&permissions=2048&scope=bot">
here
</a>, login to discord and choose the server you want to use from the dropdown menu.
On success, a Tiberius bot user will join your server.

Note: currently there is no external hosting. To use this bot you must host the bot yourself. Please see "Running the Project" for how to self-host.

### Commands
Please use !commands to see the full list of commands.

## Running the Project
To run the project locally, you must first have node.js installed.
Open the terminal/cmd, navigate to the project directory and enter
```
node -v
```
If you don't see a version number, go <a href="https://nodejs.org/">here</a> and install 
the latest version.

Next, install the dependencies. Using the terminal, navigate to the project
directory enter
```
npm install
```

To run the project, enter
```
node tiberius
```

"Tiberius ready!" will be logged to the console on a successful launch.