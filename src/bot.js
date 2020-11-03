require("dotenv").config();

const { Client } = require("discord.js");

const client = new Client();

client.login(process.env.DISCORDJS_BOT_TOKEN);

client.on("ready", () => {
  //   console.log(`${client.user.username}`);
});

client.on("message", (message) => {
  if (message.author.bot) return;
  if (message.content.substring(0, 3) === "rps") {
    let userInput = message.content.split(" ")[1].toLowerCase();
    let options = ["rock", "paper", "scissors"];
    let randomNumber = Math.floor(Math.random() * options.length) + 1;
    let botInput = options[randomNumber - 1];
    let map = {};

    function sendMessage(botVerdict) {
      if (botVerdict === "win") {
        message.channel.send(
          `You chose ${userInput} and I chose ${botInput}. I win.`
        );
      } else if (botVerdict === "lose") {
        message.channel.send(
          `You chose ${userInput} and I chose ${botInput}. You win.`
        );
      } else if (botVerdict === "draw") {
        message.channel.send(
          `You chose ${userInput} and I chose ${botInput}. It's a draw.`
        );
      }
    }

    // not gonna lie, I ripped this straight from SO and made changes
    // huge shout out to this mad lad https://stackoverflow.com/a/17977555
    options.forEach(function (choice, i) {
      map[choice] = {};
      for (
        var j = 0, half = (options.length - 1) / 2;
        j < options.length;
        j++
      ) {
        var opposition = (i + j) % options.length;
        if (!j) map[choice][choice] = `We both chose ${choice}.`;
        else if (j <= half)
          map[choice][
            options[opposition]
          ] = `I chose ${options[opposition]} and you chose ${choice}. I win.`;
        else
          map[choice][
            options[opposition]
          ] = `You chose ${choice} and I chose ${options[opposition]}. You win.`;
      }
    });

    function compare(choice1, choice2) {
      return (map[choice1] || {})[choice2] || "Invalid choice";
    }

    message.channel.send(compare(userInput, botInput));
  }
});
