// Load up the discord.js library
const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
var request = require('request');
var cheerio = require('cheerio');
var fortnite = require('fortnite');
var getJSON = require('get-json');
// Now we start the music module.
function getStatData(location , $){

    var selector = $('.stats-stat .value').eq(location).text();

    var stat_array = $.parseHTML(selector);

    var stat = 0;

    if(stat_array == null || stat_array.lengh == 0){
      return -1;

    }else{
      stat = stat_array[0].data;
    }

    return stat;
  }
const ms = require('ms');
const status = {
  online: "Online",
  idle: "Idle",
  dnd: "Do Not Disturb",
  offline: "Offline/Invisible"
};
var jokes = [
                     "What time did the man go to the dentist? Tooth hurt-y",
                     "I'm reading a book about anti-gravity. It's impossible to put down!",
                     "Want to hear a joke about a piece of paper? Never mind... it's tearable.",
                     "I just watched a documentary about beavers. It was the best dam show I ever saw!",
                     "If you see a robbery at an Apple Store does that make you an iWitness?",
                     "Spring is here! I got so excited I wet my plants!",
                     "A ham sandwich walks into a bar and orders a beer. The bartender says, \"Sorry we don’t serve food here.\"",
                     "What’s Forrest Gump’s password? 1forrest1",
                     "I bought some shoes from a drug dealer. I don't know what he laced them with, but I was tripping all day!",
                     "Why do chicken coops only have two doors? Because if they had four, they would be chicken sedans!",
                     "What do you call a factory that sells passable products? A satisfactory.",
                     "A termite walks into a bar and asks, \"Is the bar tender here?\"",
                     "When a dad drives past a graveyard: Did you know that's a popular cemetery? Yep, people are just dying to get in there!",
                     "Two peanuts were walking down the street. One was a salted.",
                     "Why did the invisible man turn down the job offer? He couldn't see himself doing it.",
                     "I used to have a job at a calendar factory but I got the sack because I took a couple of days off.",
                     "How do you make holy water? You boil the hell out of it.",
                     "A three-legged dog walks into a bar and says to the bartender, \"I’m looking for the man who shot my paw.\"",
                     "When you ask a dad if he's alright: \"No, I’m half left.\"",
                     "I had a dream that I was a muffler last night. I woke up exhausted!",
                     "How do you tell the difference between a frog and a horny toad? A frog says, \"Ribbit, ribbit\" and a horny toad says, \"Rub it, rub it.\"",
                     "Did you hear the news? FedEx and UPS are merging. They’re going to go by the name Fed-Up from now on.",
                     "5/4 of people admit that they’re bad with fractions.",
                     "MOM: \"How do I look?\" DAD: \"With your eyes.\"",
                     "What is Beethoven’s favorite fruit? A ba-na-na-na.",
                     "What did the horse say after it tripped? \"Help! I’ve fallen and I can’t giddyup!\”",
                     "Did you hear about the circus fire? It was in tents!",
                     "Don't trust atoms. They make up everything!",
                     "What do you get when you cross an elephant with a rhino? Elephino.",
                     "How many tickles does it take to make an octopus laugh? Ten-tickles.",
                     "What's the best part about living in Switzerland? I don't know, but the flag is a big plus.",
                     "What do prisoners use to call each other? Cell phones.",
                     "Why couldn't the bike standup by itself? It was two tired.",
                     "What do you call a dog that can do magic? A Labracadabrador.",
                     "Why didn't the vampire attack Taylor Swift? She had bad blood.",
                     "NURSE: \"Blood type?\" DAD: \"Red.\"",
                     "SERVER: \"Sorry about your wait.\" DAD: \"Are you saying I’m fat?\”",
                     "What do you call a fish with two knees? A “two-knee” fish.",
                     "I was interrogated over the theft of a cheese toastie. Man, they really grilled me.",
                     "What do you get when you cross a snowman with a vampire? Frostbite.",
                     "Can February March? No, but April May!",
                     "When you ask a dad if they got a haircut: \"No, I got them all cut!\"",
                     "What does a zombie vegetarian eat? “GRRRAAAAAIIIINNNNS!”",
                     "What does an angry pepper do? It gets jalapeño face.",
                     "Why wasn't the woman happy with the velcro she bought? It was a total ripoff.",
                     "What did the buffalo say to his son when he dropped him off at school? Bison.",
                     "What do you call someone with no body and no nose? Nobody knows.",
                     "Where did the college-aged vampire like to shop? Forever 21.",
                     "You heard of that new band 1023MB? They're good but they haven't got a gig yet.",
                     "Why did the crab never share? Because he's shellfish."
                 ];
var fortunes = [
"yes",
"perhaps",
"you can count on it",
"no",
"maybe",
"dont know, try again"
         ];
var hd = [
    "Heads",
    "Tails"
];
// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();
client.music = require("discord.js-musicbot-addon");
// Here we load the config.json file that contains our token and our prefix values.
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.
client.on('ready', () => {
  client.user.setActivity('For a command | ;help to start', { type: 'WATCHING' })
})
client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});
client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});
client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  // Let's go with a few common example commands! Feel free to delete or change those.
  // Misc Commands
  if(command === "8ball") {
  if(!args[0]){
return message.channel.send(":x: " + "| Please Enter A Question You Would Like Answered")
}
if (args[0]) message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
else message.channel.send(":x: " + "| I Wasnt Able To Read That :(");
}
  if(command === "bingo") {
    let y = Math.floor(Math.random() * (Math.floor(75) - Math.ceil(1) + 1)) + Math.ceil(1);
   let x = null;

   if (y < 15) { x = "B"; }
   else if (y < 30){ x = "I"; }
   else if (y < 45){ x = "N"; }
   else if (y < 60){ x = "G"; }
   else { x = "O"; }

   message.channel.send(x + y);
  }
  if(command === "birb") {
      const request = require('request-promise-native');
    let options = {
    url: 'http://api.giphy.com/v1/gifs/search',
    qs: {
      q: 'birbs',
      api_key: 'dc6zaTOxFJmzC',
      limit: 10,
      offset: 0
    },
    json: true
  };
  let response = await request(options);

  if (!response.data.length) {
  return message.channel.send("error")
  }

  await message.channel.send({
    embed: {
      title: ``,
      image: {
        url: response.data[Math.floor(Math.random() * response.data.length)].images.original.url
      },
      footer: {
        text: 'Powered by GIPHY'
      }
    }
  });
    }
  if(command === "cat") {
      const request = require('node-superfetch');
    const { body } = await request.get('https://aws.random.cat/meow');
return message.channel.send({ files: [body.file] });
  }
  if(command === "chucknorris") {
    const snekfetch = require('snekfetch')
snekfetch.get('https://api.chucknorris.io/jokes/random')
  .then(response => {
      let em = new Discord.RichEmbed()
      .setTitle(`Chuck Norris Jokes`)
      .setDescription(response.body.value)
      .setColor("RANDOM")
      .setThumbnail(response.body.icon_url)
      message.channel.send({embed: em})
  })
}
  if(command === "coin") {
    message.channel.send(message.author.toString() + " You Flipped: " + (hd[Math.floor(Math.random() * hd.length)]));
  }
  if(command === "dadjoke") {
    var DAD = new Discord.RichEmbed()
      .setDescription(jokes[Math.floor(Math.random() * jokes.length)])

      .setColor("RANDOM")

      message.channel.send(DAD);
  }
  if(command === "dog") {
      const request = require('node-superfetch');
    const { body } = await request.get('https://dog.ceo/api/breeds/image/random');
return message.channel.send({ files: [body.message] });
  }
  if(command === "highlight") {
  message.delete();

if(!args.join(" ")){
return message.channel.send(":x: " + "| Please Enter Something For The Bot To Highlight With Syntax")
}
message.channel.send("```" + args.join(" ") + "```");
}
  if(command === "hug") {
  const request = require('request-promise-native');
  let user = message.mentions.users.first();
  if (!user) {
  return message.channel.send("please mention someone that is huggable")
}
  let options = {
  url: 'http://api.giphy.com/v1/gifs/search',
  qs: {
    q: 'hug',
    api_key: 'dc6zaTOxFJmzC',
    limit: 10,
    offset: 0
  },
  json: true
};

let response = await request(options);

if (!response.data.length) {
return message.channel.send("error")
}

await message.channel.send({
  embed: {
    title: `${message.author.username} hugged ${user.username}`,
    image: {
      url: response.data[Math.floor(Math.random() * response.data.length)].images.original.url
    },
    footer: {
      text: 'Powered by GIPHY'
    }
  }
});
}
  if(command === "jumbo") {
  if (args.length < 1) {
      return message.channel.send('Please provide an emoji to enlarge.');
  }

  if (args[0].charCodeAt(0) >= 55296) {
      return message.channel.send('Cannot enlarge built-in discord emoji.');
  }

  const match = args[0].match(/<:[a-zA-Z0-9_-]+:(\d{18})>/);

  if (!match || !match[1]) {
      return message.channel.send('Please provide a valid emoji.');
  }

  const emoji = client.emojis.get(match[1]);

  if (!emoji) {
      return message.channel.send('That emoji could not be identified!');
  }

  message.delete();
  message.channel.send({
      files: [
          emoji.url
      ]
  });
}
  if(command === "killme") {
  message.channel.send(`${message.author.username} has died.`).then(Message => {
     setTimeout(() => { Message.edit("Respawning..."); }, 1000);
     setTimeout(() => { Message.edit(`Revival complete. Welcome back, ${message.author.username}`); }, 1000);
 });
}
  if(command === "kiss") {
    const request = require('request-promise-native');
  let user = message.mentions.users.first();
if (!user) {
  return message.channel.send("please mention someone that is kissable")
}
  let options = {
url: 'http://api.giphy.com/v1/gifs/search',
qs: {
  q: 'kiss',
  api_key: 'dc6zaTOxFJmzC',
  limit: 10,
  offset: 0
},
json: true
};

let response = await request(options);

if (!response.data.length) {
return message.channel.send("error")
}

await message.channel.send({
embed: {
  title: `${message.author.username} kissed ${user.username}`,
  image: {
    url: response.data[Math.floor(Math.random() * response.data.length)].images.original.url
  },
  footer: {
    text: 'Powered by GIPHY'
  }
}
});
}
  if(command === "knockknock") {
  const k = require('knock-knock-jokes')
  let embed = new Discord.RichEmbed()
.setTitle(`Galactic Enforcer Knock Knock Jokes`)
.setDescription(`${k()}`)
.setColor("RANDOM")
.setFooter(`Powered By Knock-Knock-Jokes`)
.setTimestamp()
message.channel.send({ embed });
}
  if(command === "memes") {
  const request = require("request")
  request("https://reddit.com/r/meme/random.json", function (error, response, body) {
   body = JSON.parse(body)
   var bod = body[0]
   var data = bod["data"]
   var children = data["children"]
   var childre = children[0]
   var data2 = childre["data"]
   if(data2["url"].match(".jpg") || data2["url"].match(".png")) {
   var embed = new Discord.RichEmbed()
   .setColor("RANDOM")
   .setAuthor("Galactic Enforcer")
   .setTitle("r/meme")
   .setURL(`https://reddit.com${data2["permalink"]}`)
   .setFooter(`Meme by ${data2["author"]}`)
   .setImage(data2["url"])
   message.channel.send({embed});
   } else {
    var embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor("Galactic Enforcer")
    .setTitle("r/meme")
    .setURL(`https://reddit.com${data2["permalink"]}`)
    .setFooter(`Meme by ${data2["author"]}`)
    .setImage(data2["url"]+".jpg")
    message.channel.send({embed});
   }
});
}
  if(command === "notice") {
  message.channel.send(message.author.toString() + " I Have Noticed You, Feel Proud!");

}
  if(command === "number") {
  let min = parseInt(args[0]);
      let max = parseInt(args[1]);

      if(min > max){
          let temp = max;
          max = min;
          min = temp;
      }

      var Result = Math.floor(Math.random() * (max - min + 1)) + min;

      if(isNaN(Result)){
          return message.channel.send("Please enter a min and a max number")
      }else{
          message.channel.send(Result);
      }
}
  if(command === "puppy") {
  const puppy = require('random-puppy');
 puppy()
 .then(url => {
     message.channel.send(url);
 });
}
  if(command === "pupper") {
  const request = require('request-promise-native');
let options = {
url: 'http://api.giphy.com/v1/gifs/search',
qs: {
  q: 'pupper',
  api_key: 'dc6zaTOxFJmzC',
  limit: 10,
  offset: 0
},
json: true
};
let response = await request(options);

if (!response.data.length) {
return message.channel.send("error")
}

await message.channel.send({
embed: {
  title: ``,
  image: {
    url: response.data[Math.floor(Math.random() * response.data.length)].images.original.url
  },
  footer: {
    text: 'Powered by GIPHY'
  }
}
});
}
  if(command === "russ") {
    var v = ~~(Math.random() * 3);  // 0 to 2
   console.log("--> Rolled " + v + " in russian roulette");
   var deathText = "<:dizzy_face:418874338138128395>    <:boom:418874561006927881> <:gun:418869220932190228> UNLUCKY";
   var aliveText = "<:sweat_smile:418874817719304215>           <:gun:418869220932190228> LUCKY";
   var defaultText = "<:smile:418868020623179797>            <:gun:418869220932190228>";

   message.channel.send(defaultText + "   3")
       .then(msg => {
           setTimeout(function() {
               msg.edit(defaultText + "   2")
                   .then(msg => {
                       setTimeout(function() {
                           msg.edit(defaultText + "   1")
                               .then(msg => {
                                   setTimeout(function() {
                                       if(v == 0){
                                           msg.edit(deathText);
                                       }else{
                                           msg.edit(aliveText);
                                       }
                                   }, 1000);
                               });
                       }, 1000);
                   });
           }, 1000);
       })
       .catch(console.error);
  }
  if(command === "roast") {
  let num = Math.floor(Math.random()*1000)
  let num2 = Math.floor(Math.random()*num)
  let target = message.mentions.users.first() || message.author;
   let member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;

  let embed = new Discord.RichEmbed()
  .setTitle("Hulkbot Roasting")
  .setDescription(`${member.user.tag} has a ${num2}% chance of failing in life.`)
  .setFooter(`${member.user.tag} got roasted by ${message.member.user.tag}!`)
  .setThumbnail(`https://i.imgur.com/6Bzv6Wv.png`)
  .setAuthor(`Galactic Enforcer`)
  .setColor("RANDOM")

  message.channel.send({ embed });
}
  if(command === "ship") {
  let users = message.mentions.users.map(u => u.username);
if (users.length < 2) {
 return message.channel.send('please make sure to mention two people that you want to ship.');
}

let shippedName = '';
for (let i = 0; i < users.length; i++) {
 shippedName += `${users[i].substring(0, users[i].length / 2)}`;
}

await message.channel.send({
 embed: {
   title: 'Shipped Users',
   description: `${users.join(' + ')} = **${shippedName}**`
 }
});
}
  if(command === "shoot") {
let user = message.mentions.users.first();
    if (message.mentions.users.size < 1) {
            return message.channel.send('@mention some people to shoot!');
        }

        let output = message.mentions.users.map(m => `**${m}** :gun:`).join('\n');

        message.delete();
        message.channel.send(`:boom: ${client.user.username} is on a killing spree!\n` +
        `${user.username}, you have been shot and killed`)
  }
  if(command === "slap") {
    const request = require('request-promise-native');
    let user = message.mentions.users.first();
    if (!user) {
    return message.channel.send("please mention someone that is slappable")
  }
    let options = {
    url: 'http://api.giphy.com/v1/gifs/search',
    qs: {
      q: 'slapping',
      api_key: 'dc6zaTOxFJmzC',
      limit: 10,
      offset: 0
    },
    json: true
  };

  let response = await request(options);

  if (!response.data.length) {
  return message.channel.send("error")
  }

  await message.channel.send({
    embed: {
      title: `${message.author.username} slapped ${user.username}`,
      image: {
        url: response.data[Math.floor(Math.random() * response.data.length)].images.original.url
      },
      footer: {
        text: 'Powered by GIPHY'
      }
    }
  });
}
  if(command === "timer") {
  let Timer = args[0];

if(!args[0]){
 return message.channel.send(":x: " + "| Please Enter a time period followed by \"s or m or h\"");
}

if(args[0] <= 0){
 return message.channel.send(":x: " + "| Please Enter a time period followed by \"s or m or h\"");
}

message.channel.send(":white_check_mark: " + "| Timer Started for: " + `${ms(ms(Timer), {long: true})}`)

setTimeout(function(){
 message.channel.send(message.author.toString() + ` The Timer Has FINISHED!, it lasted: ${ms(ms(Timer), {long: true})}`)

}, ms(Timer));
}

  // Information Commands
  if(command === "csgo") {

    var UR_L = "http://csgo.tracker.network/profile/" + args[0];

        if(!args[0]){
          return message.channel.send("Please Enter a valid STEAMID64 or custom url");
        }

        request(UR_L, function(err, resp, body){

            $ = cheerio.load(body);

            var KD = getStatData(0, $);
            if(KD == -1){
              message.channel.send("Invalid, make sure your profile is not private and you have entered a valid STEAMID64 or Custom URL!");
              return;
            }

            var WIN = getStatData(1, $);
            var HS = getStatData(4, $);
            var MONEY = getStatData(5, $);
            var SCORE = getStatData(6, $);
            var KILLS = getStatData(7, $);
            var DEATHS = getStatData(8, $);
            var MVP = getStatData(9, $);
            var BS = getStatData(13, $);
            var BD = getStatData(14, $);
            var HR = getStatData(15, $);

            var STAT = new Discord.RichEmbed()

            .setTitle("__***CSGO Stats***__")
            .setURL(UR_L)

            .addField("------------------------------------",
                      "Total KD: " + "__**" + KD + "**__" + "\n" +
                      "Total Win%: " + "__**" + WIN + "**__" + "\n" +
                      "Total MVPs: " + "__**" + MVP + "**__" + "\n" +
                      "Total Score: " + "__**" + SCORE + "**__" + "\n" +
                      "Total Kills: " + "__**" + KILLS + "**__" + "\n" +
                      "Total Deaths: " + "__**" + DEATHS + "**__" + "\n" +
                      "Total Bombs Set: " + "__**" + BS + "**__" + "\n" +
                      "Total Bombs Defused: " + "__**" + BD + "**__" + "\n" +
                      "Total Headshots: " + "__**" + HS + "**__" + "\n" +
                      "Total Money Earned: " + "__**" + MONEY + "**__" + "\n" +
                      "Total Hostages Rescued: " + "__**" + HR + "**__" + "\n" +
                      "------------------------------------\n", true)

              .setColor("0x#FF0000")
            message.channel.send(STAT);

});
}
  if(command === "google") {
    const querystring = require('querystring');
    const snekfetch = require('snekfetch');
    if (!args[0]) {
    message.channel.send(`:x: You need a item to search google.`);
    return;
  }

  let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(args.join(' '))}`;
  message.channel.send(`Searching google for ${args.join(' ')}...`).then(m => m.delete(2500))
  return snekfetch.get(searchUrl).then((result) => {

    // Cheerio lets us parse the HTML on our google result to grab the URL.
    let $ = cheerio.load(result.text);
    let googleData = $('.r').first().find('a').first().attr('href');

    googleData = querystring.parse(googleData.replace('/url?', ''));
    message.channel.send(`Results found on google for ${args.join(' ')}:\n${googleData.q}`)

  }).catch((err) => {
    message.channel.send(`No results found on google for ${args.join(' ')}...`)
  });
  }
  if(command === "contact") {
 var mes = args.join(' ')
    let embed = new Discord.RichEmbed()
    .setTitle(`Contact System`)
    .setDescription(mes)
    .setColor(`BLUE`)
    .setFooter(`This message was sent by ${message.author.tag}`)
    .setThumbnail(client.user.avatarURL)
    client.channels.find('id','538107572830601267').send({ embed })
}
  if(command === "serverinfo") {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);
    return message.channel.send(serverembed)
  }
  if(command === "listservers") {
     message.channel.send(`I am in ${client.guilds.array().length} servers. I know ${client.users.array().length} users, and ${client.channels.array().length} channels.`)
  }
  if(command === "help") {
  message.author.send(
                          "**__Moderation Commands__: Access Trainee+**\n" +
                           "`;" + "warn [@NAME] [REASON]` - warn the mentioned user (Trainee+)\n" +
                           "`;" + "mute [@NAME] (Duration) (Reason)` - mute a mentioned member (Mod+)\n" +
                           "`;" + "unmute [@NAME]` - unmutes the mentioned member (Mod+)\n" +
                           "`;" + "ban [@NAME] (Reason)` - ban the mentioned user (Mod+)\n" +
                           "`;" + "kick [@NAME]` - kick the mentioned user (Mod+) \n" +
                           "`;" + "purge [NUMBER]` - delete a certain number of messages (Mod+) \n" +
                           "`;" + "addrole [MENTION] [ROLE] [LENGTH]` - add a role to the mentioned user\n" +
                           "`;" + "removerole [MENTION] [ROLE]` - remove the person(\'s) mentioned role\n" +
                           "`;" + "lockdown [DURATION] [REASON]` - allows you to temporarily lockdown a channel and prevent people from messaging on it (Mod+)\n" +
                           "`;" + "reboot` - restarts the robot (BRANDON ONLY)\n" +
                           "\n" + "\n");
  message.author.send(
                           "**__Information Commands__: Access All**\n" +
                           "`;" + "ping` - a simple latency response\n" +
                           "`;" + "alert` - sends a pm to all admin in the server\n" +
                           "`;" + "contact [MESSAGE]` - sends a message to the support server\n" +
                           "`;" + "myid` - displays your discord id\n" +
                           "`;" + "serverinfo` - see the information about the server\n" +
                           "`;" + "support` - get the permanent link for the support server\n" +
                           "`;" + "poll [QUESTION]` - starts a yes/no poll\n" +
                           "`;" + "uptime` - see how long the bot has been up for\n" +
                           "`;" + "botinfo` - see the information about the bot\n" +
                           "`;" + "invite` - get the permanent invite link for the server\n" +
                           "`;" + "userinfo [@NAME]` - show your profile info or mentioned info \n" +
                           "`;" + "csgo [STEAMID64/CUSTOM URL NAME]` - show stats of requested player\n" +
                           "`;" + "roles` - see all the roles in the server \n" +
                           "`;" + "help` - show the main help page \n" +
                           "`;" + "stats` - see what the bot runs off of\n" +
                           "`;" + "google` - allows you to search for items on google right on discord\n" +
                           "\n" + "\n");
  message.author.send(
                           "**__Random Response Commands__: Access All**\n" +
                           "`;" + "coin` - flip a coin to get heads or tails \n" +
                           "`;" + "8ball [QUESTION]` - get a random answer \n" +
                           "`;" + "number [min] [max]` - get a random number between min and max \n" +
                           "`;" + "notice` - get noticed by the bot \n" +
                           "`;" + "dadjoke` - randomly get an awful dad joke\n" +
                           "`;" + "knockknock` - yes I really made this a command fite me\n" +
                           "`;" + "cat` - see some cats!\n" +
                           "`;" + "dog/pupper/puppy` - see some dogs!\n" +
                           "`;" + "memes` - see some memes!\n" +
                           "\n" + "\n");
  message.author.send(
                           "**__Misc Commands__: Access All**\n" +
                           "`;" + "jumbo [EMOJI]` - super-size your emoji\n" +
                           "`;" + "roast [@NAME]` - roast someone\'s existance\n" +
                           "`;" + "bingo` - play some bingo with the bot\n" +
                           "`;" + "russ` - you feeling lucky comrade?\n" +
                           "`;" + "shoot [@NAME]` - *insert Stand-off music here*\n" +
                           "`;" + "avatar` - see you or the mentioned persons avatar \n" +
                           "`;" + "chucknorris` - get a random chuck norris joke\n" +
                           "`;" + "highlight [ANYTHING]` - show text entered with black background \n" +
                           "`;" + "timer [1s/1m/1h]` - start a timer with the given amount of time \n" +
                           "`;" + "embed` - show a test version of a embed \n" +
                           "`;" + "hug [@NAME]` - allows you to hug the mentioned member\n" +
                           "`;" + "kiss [@NAME]` - allows you to kiss the mentioned member\n" +
                           "`;" + "ship [@NAME] [@NAME]` - allows you to ship the mentioned users\n" +
                           "`;" + "slap [@NAME]` - allows you to slap the mentioned member\n");
  message.author.send(
                          "**__Music Commands__: Access All**\n" +
                          "`;" + "play [NAME/URL]` - plays music from the bot\n" +
                          "`;" + "stop` - stops the current music being played\n" +
                          "`;" + "np` - shows the playing song\n" +
                          "`;" + "queue` - shows the list of songs waiting to play\n" +
                          "`;" + "pause` - pauses the song currently playing\n" +
                          "`;" + "resume` - resumes the paused song\n" +
                          "`;" + "search` - searches for up to 10 videos from Youtube\n" +
                          "`;" + "loop` - loops the queue\n" +
                          "`;" + "leave` - makes the music bot leave\n" +
                          "`;" + "skip` - skips the currently playing song\n");

  message.channel.send(":bulb: A list of commands have been sent to your DMs")
}
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`:ping_pong: Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`);
  }
  if(command === "botinfo") {
    const package = require('./package.json')
    const embed = new Discord.RichEmbed()
.setThumbnail(`${client.user.displayAvatarURL}`)
.addField(`Bot Information, ${client.user.tag}` , `Hello, I'm ${client.user.username} version ${package.version}, a Discord bot running on NodeJS Version 8.`)
.addField(`When was I born?`,`I was created at ${moment.utc(client.user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`)
.addField(`Version?`,`I'm currently running on Discord.js v${Discord.version} which utilizes the most stable version of Discord.js.`)
.addField(`Creators`,`The developer of my source code is <@339476546001698818>.`)
.addField(`How to use me`,`To see what I can do, use ;help`)
.addField(`More!`, `currently, I only respond to messages beginning with ;`)
.setDescription(`
⚙ **Bot Version:** ${package.version}\n
🖍 **Bot Prefix:** ${config.prefix}\n
🔎 **I am in:**\n -   ${client.guilds.size} Guilds\n -   ${client.channels.size} Channels\n -   ${client.users.size} Users\n
⌛ **Uptime:** ${Math.round(client.uptime / (1000 * 60 * 60))} hours, ${Math.round(client.uptime / (1000 * 60)) % 60}  minutes, ${Math.round(client.uptime / 1000) % 60} seconds.\n\n`)
.setTimestamp()
.setColor("RANDOM")
message.channel.send({embed: embed})
}
  if(command === "userinfo") {
let target = message.mentions.users.first() || message.author;
 let member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
  if (!member) return message.reply("Please provide a vaild Mention or USER ID");
 const embed = new Discord.RichEmbed()
  .setColor(3447003)
  .setThumbnail(`${target.displayAvatarURL}`)
  .setAuthor(`${member.user.tag} (${member.id})`, `${target.displayAvatarURL}`)
  .addField("Nickname:", `${member.nickname !== null ? `Nickname: ${member.nickname}` : "No nickname"}`, true)
  .addField("Status", `${status[member.user.presence.status]}`, true)
  .addField("Playing", `${member.user.presence.game ? `${member.user.presence.game.name}` : "not playing anything."}`, true)
  .addField("Roles", `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "No Roles"}`, true)
  .addField("Joined At", `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
  .addField("Created At", `${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true);

message.channel.send({
  embed
});
}
  if(command === "support") {
    const em = new Discord.RichEmbed()
 .addField("Support Server", `You can join our support server [here](https://discord.gg/Y8vq6G5).`)
 .setTimestamp()
 .setColor("RANDOM")
 message.channel.send({embed: em});
  }
  if(command === "alert") {
    let msg = args.join(" ");
if (message.author.id == message.guild.ownerID) {
   message.channel.send("Alerting admins...")
  message.guild.members.forEach(member => {
    if (member.hasPermission("ADMINISTRATOR") || member.hasPermission("MANAGE_GUILD") && !member.user.bot) {
      if (!msg) {
        member.send(`${message.author.username} is calling for you in server ${message.guild.name}.`)
        message.channel.send(`Alerted ${member.user.username}.`)
      } else {
        member.send(`${message.author.username} is calling for you in server ${message.guild.name}. Message: ${msg}`)
        message.channel.send(`Alerted ${member.user.username}.`)
      }
    }
  })
  } else {
    message.channel.send("Only the guild owner can use this command.");
  }
  }
  if(command === "avatar") {
   let msg = await message.channel.send("Generating avatar...");
   let target = message.mentions.users.first() || message.author;

   await message.channel.send({files: [
     {
       attachment: target.displayAvatarURL,
       name: "avatar.png"
     }
   ]});
}
  if(command === "stats") {
 const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
 message.channel.send(`= STATISTICS =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Users      :: ${client.users.size.toLocaleString()}
• Servers    :: ${client.guilds.size.toLocaleString()}
• Channels   :: ${client.channels.size.toLocaleString()}
• Discord.js :: v${Discord.version}
• Node       :: ${process.version}`, {code: "asciidoc"});

}
  if(command === "roles") {
  ROLEZZ = message.guild.roles.array()

var ROLES = "";

 ROLEZZ.forEach(function(element){
     ROLES += element.name + "\n"
 });

 message.channel.send("```" + "\n" +
                      "---------------------------------" + "\n" +
                      "ALL SERVER ROLES" + "\n" +
                      "---------------------------------" + "\n" +
                      `${ROLES}` + "```")
}
  if(command === "uptime") {
     const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  message.channel.send(  ` • Uptime -> ${duration}` );

  }
  if(command === "invite") {
  var invite = new Discord.RichEmbed()

       .addField("__**" + "INVITE LINK: " + "**__", "https://discord.gg/rMZ3MdA", true)
       .addField("__**" + "Bot Invite Link: " + "**__", "https://discordapp.com/oauth2/authorize?client_id=519290838790963220&scope=bot&permissions=2146958847", false)


       .setColor("RANDOM")

message.channel.send({embed: invite});
}
  if(command === "poll") {
    let question = args.slice(0).join(" ");
    if(!message.member.roles.some(r=>["Administrator", "Moderator", "Head Mod", "Manager", "Developer"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
if (args.length === 0)
return message.reply('**Invalid Format:** `!Poll <Question>`')

const embed = new Discord.RichEmbed()
.setTitle("A Poll Has Been Started!")
.setColor("#5599ff")
.setDescription(`${question}`)
.setFooter(`Poll Started By: ${message.author.username}`, `${message.author.avatarURL}`)

message.channel.send({embed})
.then(msg => {
  msg.react('👍')
  msg.react('👎')
  msg.react('🤷')
})
.catch(() => console.error('Emoji failed to react.'));
  }
  if(command === "embed") {
    var embed = new Discord.RichEmbed()
     .addField("Test Title 1", "Test Description 1", true)
     .addField("Test Title 2", "Test Description 2", true)
     .addField("Test Title 3", "Test Description 3", true)
     .addField("Test Title 4", "Test Description 4")
     .setColor("RANDOM")
     .setFooter("THIS IS THE EMBED FOOTER")

 message.channel.send({embed: embed});
}
  if(command === "creators") {
return message.channel.send('The creator of this bot is <@339476546001698818>.')
}
  if(command === "myid") {
 message.channel.send(`Your ID is: ${message.author.id}`)
}
  // Admin Commands
  if(command === "dnd") {
    if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    client.user.setStatus(`dnd`)
  client.user.setActivity('Undergoing Maintenance', { type: 'PLAYING' });
  let embed = new Discord.RichEmbed()
    .setTitle("Status Changer")
    .setThumbnail(client.user.avatarURL)
    .setDescription("Successfully set the bot status to Do Not Disturb!")
    .setFooter(`This command was used at ${new Date()}`)
    .setColor("RED")

  message.channel.send({ embed });
}
  if(command === "online") {
    if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    client.user.setStatus(`online`)
      client.user.setActivity('For a command | ;help to start', { type: 'WATCHING' });
  let embed = new Discord.RichEmbed()
    .setTitle("Status Changer")
    .setDescription("Successfully set the bot status to Online!")
    .setColor("GREEN")
    .setThumbnail(client.user.avatarURL)
    .setFooter(`This command was used at ${new Date()}`)
  message.channel.send({ embed });
  }
  if(command === "supportannounce") {
    const supportguild = client.guilds.get('472461572577427456');
    const own2 = client.users.get("339476546001698818");
    const own =  client.users.get("196829450292297729");
    const msg = args.join(" ");
  //  client.guilds.forEach((guild, id) => {

   if (!supportguild.available) return;
   const sembed = new Discord.RichEmbed()
     .addField(`Support Announcement`, `This is an important announcement from the support team.`)
     .addField(`Heyo! This is an official announcement from the support team.`, `Announcement:\n**${msg}**`)
     .setFooter("Announcement | This system will *not* be spammed.")
     .setTimestamp()
     .setColor("GREEN")

   own2.send({embed: sembed});
   own.send({embed: sembed});

 //});

  }
  if(command === "exit") {
    if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;

    await message.delete().catch();
   await message.channel.send(`Good night, ${member.user.tag}!`);
   await process.exit().catch((e) => { console.error(e); });
  }
  if(command === "reboot") {
    if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    message.channel.send('Are you sure you want to reboot me?\n\nReply with \`cancel\` to **abort** the reboot. The reboot will self-abort in 30 seconds.');

 return message.channel.awaitMessages(m => m.author.id === message.author.id, {
   'errors': ['time'],
   'max': 1,
   time: 30000
 }).then(resp => {
   if (!resp) return;
   resp = resp.array()[0];
   let validAnswers = ['yes', 'y', 'no', 'n', 'cancel'];
   if (validAnswers.includes(resp.content)) {
     if (resp.content === 'cancel' || resp.content === 'no' || resp.content === 'n') {
       return message.channel.send('**Aborting** reboot.');
     } else if (resp.content === 'yes' || resp.content === 'y') {
       client.destroy().then(() => {
         process.exit();
       }).catch(console.error);
     }
   } else {
     message.channel.send(`Only \`${validAnswers.join('`, `')}\` are valid, please supply one of those.`).catch(()=>console.error);
   }
 }).catch(() => {
   console.error;
   message.channel.send('Reboot timed out.');
 });
  }

  // Moderation Commands
  if(command === "lockdown") {
    const ms = require("ms");
      let reason = args.slice(1).join(' ');
  let time = args[0];
    if (!client.lockit) { client.lockit = []; }
 let validUnlocks = ["release", "unlock", "u"];
 if (!time) { return message.reply("I need a set time to lock the channel down for!"); }

 const Lockembed = new Discord.RichEmbed()
   .setColor(0xDD2E44)
   .setTimestamp()
   .setTitle("🔒 LOCKDOWN NOTICE 🔒")
   .setDescription(`This channel has been put on lockdown by ${message.author.tag} for ${time} for reason ${reason}`);

 const Unlockembed = new Discord.RichEmbed()
   .setColor(0xDD2E44)
   .setTimestamp()
   .setTitle("🔓 LOCKDOWN NOTICE 🔓")
   .setDescription("This channel is now unlocked.");

 if (message.channel.permissionsFor(message.author.id).has("MUTE_MEMBERS") === false) {
   const embed =  new Discord.RichEmbed()
     .setColor(0xDD2E44)
     .setTimestamp()
     .setTitle("❌ ERROR: MISSING PERMISSIONS! ❌")
     .setDescription("You do not have the correct permissions for this command!");
   return message.channel.send({embed});
 }

 if (validUnlocks.includes(time)) {
   message.channel.overwritePermissions(message.guild.id, { SEND_MESSAGES: null }).then(() => {
     message.channel.send({embed: Unlockembed});
     clearTimeout(client.lockit[message.channel.id]);
     delete client.lockit[message.channel.id];
   }).catch(error => { console.log(error); });
 } else {
   message.channel.overwritePermissions(message.guild.id, { SEND_MESSAGES: false }).then(() => {
     message.channel.send({embed: Lockembed}).then(() => {
       client.lockit[message.channel.id] = setTimeout(() => {
         message.channel.overwritePermissions(message.guild.id, {
           SEND_MESSAGES: null
         }).then(message.channel.send({embed: Unlockembed})).catch(console.error);
         delete client.lockit[message.channel.id];
       }, ms(time));
     }).catch(error => { console.log(error); });
   });
 }
  }
  if(command === "warn") {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let logchannel = message.guild.channels.find('name', 'bot-log');
  if(!message.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) )
    return message.reply("Sorry, you don't have permissions to use this!");
  if (!logchannel) return message.reply('I cannot find a logs channel');
  if (reason.length < 1) return message.reply('You must supply a reason for the warning.');
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.').catch(console.error);
  const embed = new Discord.RichEmbed()
  .setColor(0xFFFF00)
  .setThumbnail(`${user.displayAvatarURL}`)
  .setTimestamp()
  .addField('Action:', 'Warning')
  .addField('User:', `${user.username}#${user.discriminator}`)
  .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
  .addField('Reason', reason);
  message.channel.send(':white_check_mark: Success! I\'ve logged the warning in <#472517158597820452>.\n')
  message.channel.send(`@${user.username}, You have received a warning for: ` + reason)
  return client.channels.get(logchannel.id).send({embed});
 }
  if(command === "mute") {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You do not have permissions to use this command");

       //!tempmute @user 1s/m/h/d

       let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
       if(!tomute) return message.reply("Couldn't find user.");
       if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
       let muterole = message.guild.roles.find(`name`, "Muted");
       if(!muterole){
         try{
           muterole = await message.guild.createRole({
             name: "Muted",
             color: "#000000",
             permissions:[]
           })
           message.guild.channels.forEach(async (channel, id) => {
             await channel.overwritePermissions(muterole, {
               SEND_MESSAGES: false,
               ADD_REACTIONS: false
             });
           });
         }catch(e){
           console.log(e.stack);
         }
       }
       let mutetime = args[1];
       if(!mutetime) return message.reply("You didn't specify a time!");

       await(tomute.addRole(muterole.id));
       message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

       setTimeout(function(){
         tomute.removeRole(muterole.id);
         message.channel.send(`<@${tomute.id}> has been unmuted!`);
       }, ms(mutetime));

}
  if(command === "unmute") {
    let guild = message.guild;
   let args = message.content.split(' ').slice(1);
   let argresult = args.join(' ');
   let reason = args;
   message.delete(1000);
   if (!message.guild.member(message.author).hasPermission('MANAGE_ROLES')) {
       return message.reply(':lock: **I** need `MANAGE_ROLES` Permissions to execute `mute`').catch(e => logger.error(e));
   }
   if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) {
       return message.reply(':lock: **I** need `MANAGE_ROLES` Permissions to execute `mute`').catch(e => logger.error(e));
   }
   let user = message.mentions.users.first();
   let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'muted');
   if (message.mentions.users.size < 1) {
       return message.reply('You need to mention someone to unmute them!.');
   }
   message.guild.member(user).removeRole(muteRole).then(() => {
       message.channel.send(`You've succesfully unmuted ${user}`);
   });
  }
  if(command === "addrole") {
  if(message.member.hasPermission("ADMINISTRATOR, MODERATOR, MANAGER, HEAD MOD, DEVELOPER")) {
        let member2 = message.mentions.members.first();
        if(!member2) return message.reply(":x: " + "| You need to mention a user/member!");

        let muteRole2 = message.mentions.roles.first();
        if(!muteRole2) return message.reply(":x: " + `| There is no such role!`);

        let time2 = args[2];
        if(!time2) {
          member2.addRole(muteRole2.id);
          message.channel.send(member2 + ` you have been given the permanent role: ` + muteRole2.name);
        }else {
          member2.addRole(muteRole2.id);
          message.channel.send(member2 + ` you have been given the role: ` + muteRole2.name + ` for: ${ms(ms(time2), {long: true})}`);

          setTimeout(function(){
            member2.removeRole(muteRole2.id);
            message.channel.send(member2 + ` you role has been taken off of you your glory lasted: ${ms(ms(time2), {long: true})}`)

          }, ms(time2));

          };
          }else {
            return message.reply(":x: " + "| You need to have the \"Mod+\" Permission")
          };
}
  if(command === "kick") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit:
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable)
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";

    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.roles.some(r=>["Administrator, Moderator, Head Mod"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable)
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";

    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  if(command === "purge") {
    // This command removes all messages from all users in the channel, up to 100.

    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);

    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
  if(command === "removerole") {
    if(message.member.hasPermission("ADMINISTRATOR, MODERATOR, MANAGER, HEAD MOD, DEVELOPER")) {
  let member3 = message.mentions.members.first();
  if(!member3) return message.reply(":x: " + "| You need to mention a user/member!");

  let muteRole3 = message.mentions.roles.first();
  if(!muteRole3) return message.reply(":x: " + `| There is no such thing as a \"${muteRole3.name}\" role!`);

  member3.removeRole(muteRole3.id);
  message.channel.send(member3 + ` you have lost the role: ` + muteRole3.name + `!`);

  }else {
    return message.reply(":x: " + "| You need to have the \"Mod+\" Permission")
  };
  }


});
const ytdl = require('ytdl-core');
const {YTSearcher} = require('ytsearcher');
const ytpl = require('ytpl');
client.music.start(client, {

  youtubeKey: "AIzaSyCMCi-MrmkDTkfSgP1Y4SuEDLCtRLUWrg4",
  botPrefix: ";",
  help:{
  enabled: false                    // True/False statement.                  // Excludes the command from the help command.
},
});

exports.start = (client, options) => {

try {
    if (process.version.slice(1).split('.')[0] < 8) {
      console.error(new Error(`[MusicBot] node v8 or higher is needed, please update`));
      process.exit(1);
    };

    class Music {
      constructor(client, options) {
        // Data Objects
        this.commands = new Map();
        this.commandsArray = [];
        this.aliases = new Map();
        this.queues = new Map();
        this.client = client;

        // Play Command options
        this.play = {
          enabled: (options.play == undefined ? true : (options.play && typeof options.play.enabled !== 'undefined' ? options.play && options.play.enabled : true)),
          run: "playFunction",
          alt: (options && options.play && options.play.alt) || [],
          help: (options && options.play && options.play.help) || "Queue a song/playlist by URL or name.",
          name: (options && options.play && options.play.name) || "play",
          usage: (options && options.play && options.play.usage) || null,
          exclude: Boolean((options && options.play && options.play.exclude)),
          masked: "play"
        };

        // Help Command options
        this.help = {
          enabled: (options.help == undefined ? true : (options.help && typeof options.help.enabled !== 'undefined' ? options.help && options.help.enabled : true)),
          run: "helpFunction",
          alt: (options && options.help && options.help.alt) || [],
          help: (options && options.help && options.help.help) || "Help for commands.",
          name: (options && options.help && options.help.name) || "help",
          usage: (options && options.help && options.help.usage) || null,
          exclude: Boolean((options && options.help && options.help.exclude)),
          masked: "help"
        };

        // Pause Command options
        this.pause = {
          enabled: (options.pause == undefined ? true : (options.pause && typeof options.pause.enabled !== 'undefined' ? options.pause && options.pause.enabled : true)),
          run: "pauseFunction",
          alt: (options && options.pause && options.pause.alt) || [],
          help: (options && options.pause && options.pause.help) || "Pauses playing music.",
          name: (options && options.pause && options.pause.name) || "pause",
          usage: (options && options.pause && options.pause.usage) || null,
          exclude: Boolean((options && options.pause && options.pause.exclude)),
          masked: "pause"
        };

        // Resume Command options
        this.resume = {
          enabled: (options.resume == undefined ? true : (options.resume && typeof options.resume.enabled !== 'undefined' ? options.resume && options.resume.enabled : true)),
          run: "resumeFunction",
          alt: (options && options.resume && options.resume.alt) || [],
          help: (options && options.resume && options.resume.help) || "Resumes a paused queue.",
          name: (options && options.resume && options.resume.name) || "resume",
          usage: (options && options.resume && options.resume.usage) || null,
          exclude: Boolean((options && options.resume && options.resume.exclude)),
          masked: "resume"
        };

        // Leave Command options
        this.leave = {
          enabled: (options.leave == undefined ? true : (options.leave && typeof options.leave.enabled !== 'undefined' ? options.leave && options.leave.enabled : true)),
          run: "leaveFunction",
          alt: (options && options.leave && options.leave.alt) || [],
          help: (options && options.leave && options.leave.help) || "Leaves the voice channel.",
          name: (options && options.leave && options.leave.name) || "leave",
          usage: (options && options.leave && options.leave.usage) || null,
          exclude: Boolean((options && options.leave && options.leave.exclude)),
          masked: "leave"
        };

        // Queue Command options
        this.queue = {
          enabled: (options.queue == undefined ? true : (options.queue && typeof options.queue.enabled !== 'undefined' ? options.queue && options.queue.enabled : true)),
          run: "queueFunction",
          alt: (options && options.queue && options.queue.alt) || [],
          help: (options && options.queue && options.queue.help) || "View the current queue.",
          name: (options && options.queue && options.queue.name) || "queue",
          usage: (options && options.queue && options.queue.usage) || null,
          exclude: Boolean((options && options.queue && options.queue.exclude)),
          masked: "queue"
        };

        // Nowplaying Command options
        this.np = {
          enabled: (options.np == undefined ? true : (options.np && typeof options.np.enabled !== 'undefined' ? options.np && options.np.enabled : true)),
          run: "npFunction",
          alt: (options && options.np && options.np.alt) || [],
          help: (options && options.np && options.np.help) || "Shows the now playing text.",
          name: (options && options.np && options.np.name) || "np",
          usage: (options && options.np && options.np.usage) || null,
          exclude: Boolean((options && options.np && options.np.exclude)),
          masked: "np"
        };

        // Loop Command options
        this.loop = {
          enabled: (options.loop == undefined ? true : (options.loop && typeof options.loop.enabled !== 'undefined' ? options.loop && options.loop.enabled : true)),
          run: "loopFunction",
          alt: (options && options.loop && options.loop.alt) || [],
          help: (options && options.loop && options.loop.help) || "Sets the loop state for the queue.",
          name: (options && options.loop && options.loop.name) || "loop",
          usage: (options && options.loop && options.loop.usage) || null,
          exclude: Boolean((options && options.loop && options.loop.exclude)),
          masked: "loop"
        };

        // Search Command options
        this.search = {
          enabled: (options.search == undefined ? true : (options.search && typeof options.search.enabled !== 'undefined' ? options.search && options.search.enabled : true)),
          run: "searchFunction",
          alt: (options && options.search && options.search.alt) || [],
          help: (options && options.search && options.search.help) || "Searchs for up to 10 videos from YouTube.",
          name: (options && options.search && options.search.name) || "search",
          usage: (options && options.search && options.search.usage) || null,
          exclude: Boolean((options && options.search && options.search.exclude)),
          masked: "search"
        };

        // Clear Command options
        this.clearqueue = {
          enabled: (options.clearqueue == undefined ? true : (options.clearqueue && typeof options.clearqueue.enabled !== 'undefined' ? options.clearqueue && options.clearqueue.enabled : true)),
          run: "clearFunction",
          alt: (options && options.clear && options.clear.alt) || [],
          help: (options && options.clear && options.clear.help) || "Clears the entire queue.",
          name: (options && options.clear && options.clear.name) || "clear",
          usage: (options && options.clear && options.clear.usage) || null,
          exclude: Boolean((options && options.clearqueue && options.clearqueue.exclude)),
          masked: "clearqueue"
        };

        // Volume Command options
        this.volume = {
          enabled: (options.volume == undefined ? true : (options.volume && typeof options.volume.enabled !== 'undefined' ? options.volume && options.volume.enabled : true)),
          run: "volumeFunction",
          alt: (options && options.volume && options.volume.alt) || [],
          help: (options && options.volume && options.volume.help) || "Changes the volume output of the bot.",
          name: (options && options.volume && options.volume.name) || "volume",
          usage: (options && options.volume && options.volume.usage) || null,
          exclude: Boolean((options && options.volume && options.volume.exclude)),
          masked: "volume"
        };

        this.remove = {
          enabled: (options.remove == undefined ? true : (options.remove && typeof options.remove.enabled !== 'undefined' ? options.remove && options.remove.enabled : true)),
          run: "removeFunction",
          alt: (options && options.remove && options.remove.alt) || [],
          help: (options && options.remove && options.remove.help) || "Remove a song from the queue by position in the queue.",
          name: (options && options.remove && options.remove.name) || "remove",
          usage: (options && options.remove && options.remove.usage) || "{{prefix}}remove [position]",
          exclude: Boolean((options && options.remove && options.remove.exclude)),
          masked: "remove"
        };

        // Skip Command options
        this.skip = {
          enabled: (options.skip == undefined ? true : (options.skip && typeof options.skip.enabled !== 'undefined' ? options.skip && options.skip.enabled : true)),
          run: "skipFunction",
          alt: (options && options.skip && options.skip.alt) || [],
          help: (options && options.skip && options.skip.help) || "Skip a song or songs with `skip [number]`",
          name: (options && options.skip && options.skip.name) || "skip",
          usage: (options && options.skip && options.skip.usage) || null,
          exclude: Boolean((options && options.skip && options.skip.exclude)),
          masked: "skip"
        };

        this.embedColor = (options && options.embedColor) || 'GREEN';
        this.anyoneCanSkip = (options && typeof options.anyoneCanSkip !== 'undefined' ? options && options.anyoneCanSkip : false);
        this.anyoneCanLeave = (options && typeof options.anyoneCanLeave !== 'undefined' ? options && options.anyoneCanLeave : false);
        this.djRole = (options && options.djRole) || "DJ";
        this.anyoneCanPause = (options && typeof options.anyoneCanPause !== 'undefined' ? options && options.anyoneCanPause : false);
        this.anyoneCanAdjust = (options && typeof options.anyoneCanAdjust !== 'undefined' ? options && options.anyoneCanAdjust : false);
        this.youtubeKey = (options && options.youtubeKey);
        this.botPrefix = (options && options.botPrefix) || "!";
        this.defVolume = (options && options.defVolume) || 50;
        this.maxQueueSize = (options && options.maxQueueSize) || 50;
        this.ownerOverMember = (options && typeof options.ownerOverMember !== 'undefined' ? options && options.ownerOverMember : false);
        this.botAdmins = (options && options.botAdmins) || [];
        this.ownerID = (options && options.ownerID);
        this.logging = (options && typeof options.logging !== 'undefined' ? options && options.logging : true);
        this.requesterName = (options && typeof options.requesterName !== 'undefined' ? options && options.requesterName : true);
        this.inlineEmbeds = (options && typeof options.inlineEmbeds !== 'undefined' ? options && options.inlineEmbeds : false);
        this.clearOnLeave = (options && typeof options.clearOnLeave !== 'undefined' ? options && options.clearOnLeave : true);
        this.messageHelp = (options && typeof options.messageHelp !== 'undefined' ? options && options.messageHelp : false);
        this.dateLocal = (options && options.dateLocal) || 'en-US';
        this.bigPicture = (options && typeof options.bigPicture !== 'undefined' ? options && options.bigPicture : false);
        this.messageNewSong = (options && typeof options.messageNewSong !== 'undefined' ? options && options.messageNewSong : true);
        this.insertMusic = (options && typeof options.insertMusic !== 'undefined' ? options && options.insertMusic : false);
        this.defaultPrefix = (options && options.defaultPrefix) || "!";
        this.channelWhitelist = (options && options.channelWhitelist) || [];
        this.channelBlacklist = (options && options.channelBlacklist) || [];
        this.nextPresence = (options && options.nextPresence) || null;

        // Cooldown Settings
        this.cooldown = {
          enabled: (options && options.cooldown ? options && options.cooldown.enabled : true),
          timer: parseInt((options && options.cooldown && options.cooldown.timer) || 10000),
          exclude: (options && options.cooldown && options.cooldown.exclude) || ["volume","queue","pause","resume","np"]
        };

        this.musicPresence = options.musicPresence || false;
        this.clearPresence = options.clearPresence || false;
        this.recentTalk = new Set();
      }

      async updatePositions(obj, server) {
        return new Promise((resolve, reject) => {
          if (!obj || typeof obj !== "object") reject();
          let mm = 0;
          var newsongs = [];
          obj.forEach(s => {
            if (s.position !== mm) s.position = mm;
            newsongs.push(s);
            mm++;
          });
          this.queues.get(server).last.position = 0;
          resolve(newsongs);
        });
      };

      isAdmin(member) {
        if (member.roles.find(r => r.name == this.djRole)) return true;
        if (this.ownerOverMember && member.id === this.botOwner) return true;
        if (this.botAdmins.includes(member.id)) return true;
        return member.hasPermission("ADMINISTRATOR");
      };

      canSkip(member, queue) {
        if (this.anyoneCanSkip) return true;
        else if (this.botAdmins.includes(member.id)) return true;
        else if (this.ownerOverMember && member.id === this.botOwner) return true;
        else if (queue.last.requester === member.id) return true;
        else if (this.isAdmin(member)) return true;
        else return false;
      };

      canAdjust(member, queue) {
        if (this.anyoneCanAdjust) return true;
        else if (this.botAdmins.includes(member.id)) return true;
        else if (this.ownerOverMember && member.id === this.botOwner) return true;
        else if (queue.last.requester === member.id) return true;
        else if (this.isAdmin(member)) return true;
        else return false;
      };

      getQueue(server) {
          if (!this.queues.has(server)) {
            this.queues.set(server, {songs: new Array(), last: null, loop: "none", id: server,volume: this.defVolume});
          };
          return this.queues.get(server);
      };

      setLast(server, last) {
        return new Promise((resolve, reject) => {
          if (this.queues.has(server)) {
            let q = this.queues.get(server);
            q.last = last;
            this.queues.set(server, q);
            resolve(this.queues.get(server));
          } else {
            reject("no server queue");
          };
        });
      };

      getLast(server) {
        return new Promise((resolve, reject) => {
          let q = this.queues.has(server) ? this.queues.get(server).last : null;
          if (!q || !q.last) resolve(null)
          else if (q.last) resolve(q.last);
        });
      };

      emptyQueue(server) {
        return new Promise((resolve, reject) => {
          if (!musicbot.queues.has(server)) reject(new Error(`[emptyQueue] no queue found for ${server}`));
          musicbot.queues.set(server, {songs: [], last: null, loop: "none", id: server, volume: this.defVolume});
          resolve(musicbot.queues.get(server));
        });
      };

      async updatePresence(queue, client, clear) {
        return new Promise((resolve, reject) => {
          if (this.nextPresence !== null) clear = false;
          if (!queue || !client) reject("invalid arguments");
          if (queue.songs.length > 0 && queue.last) {
            client.user.setPresence({
              game: {
                name: "🎵 | " + queue.last.title,
                type: 'PLAYING'
              }
            });
            resolve(client.user.presence);
          } else {
            if (clear) {
              client.user.setPresence({ game: { name: null} });
              resolve(client.user.presence);
            } else {
              if (this.nextPresence !== null) {
                let props;
                if (this.nextPresence.status && ["online","dnd","idle","invisible"].includes(this.nextPresence.status)) props.status = this.nextPresence.status;
                if (this.nextPresence.afk && typeof this.nextPresence.afk == "boolean") props.afk = this.nextPresence.afk;
                if (this.nextPresence.game && typeof this.nextPresence.game == "string") props.game = {name: this.nextPresence.game}
                else if (this.nextPresence.game && typeof this.nextPresence.game == "object") props.game = this.nextPresence.game;
                client.user.setPresence(props).catch((res) => {
                  console.error("[MUSICBOT] Could not update presence\n" + res);
                  client.user.setPresence({ game: { name: null} });
                  resolve(client.user.presence);
                }).then((res) => {
                  resolve(res);
                });
              } else {
                client.user.setPresence({
                  game: {
                    name: "🎵 | nothing",
                    type: 'PLAYING'
                  }
                });
              }
              resolve(client.user.presence);
            };
          };
        });
      };

      updatePrefix(server, prefix) {
        if (typeof prefix == undefined) prefix = this.defaultPrefix;
        if (typeof this.botPrefix != "object") this.botPrefix = new Map();
          this.botPrefix.set(server, {prefix: prefix});
      };
    };

    var musicbot = new Music(client, options);
    if (musicbot.insertMusic == true) client.music = musicbot;
    else exports.bot = musicbot;

    musicbot.searcher = new YTSearcher(musicbot.youtubeKey);
    musicbot.changeKey = (key) => {
      return new Promise((resolve, reject) => {
        if (!key || typeof key !== "string") reject("key must be a string");
        musicbot.youtubeKey = key;
        musicbot.searcher.key = key;
        resolve(musicbot);
      });
    };

    client.on("ready", () => {
      console.log(`------- Music Bot -------\n> Version: ${PACKAGE.version}\n> Extra Logging: ${musicbot.logging}.\n> Node.js Version: ${process.version}\n------- Music Bot -------`);
      if (musicbot.cooldown.exclude.includes("skip")) console.warn(`[MUSIC] Excluding SKIP CMD from cooldowns can cause issues.`);
      if (musicbot.cooldown.exclude.includes("play")) console.warn(`[MUSIC] Excluding PLAY CMD from cooldowns can cause issues.`);
      if (musicbot.cooldown.exclude.includes("remove")) console.warn(`[MUSIC] Excluding REMOVE CMD from cooldowns can cause issues.`);
      if (musicbot.cooldown.exclude.includes("search")) console.warn(`[MUSIC] Excluding SEARCH CMD from cooldowns can cause issues.`);
      setTimeout(() => { if (musicbot.musicPresence == true && musicbot.client.guilds.length > 1) console.warn(`[MUSIC] MusicPresence is enabled with more than one server!`); }, 2000);
    });

    client.on("message", (msg) => {
      if (msg.author.bot || musicbot.channelBlacklist.includes(msg.channel.id)) return;
      if (musicbot.channelWhitelist.length > 0 && !musicbot.channelWhitelist.includes(msg.channel.id)) return;
      const message = msg.content.trim();
      const prefix = typeof musicbot.botPrefix == "object" ? (musicbot.botPrefix.has(msg.guild.id) ? musicbot.botPrefix.get(msg.guild.id).prefix : musicbot.defaultPrefix) : musicbot.botPrefix;
      const command = message.substring(prefix.length).split(/[ \n]/)[0].trim();
      const suffix = message.substring(prefix.length + command.length).trim();
      const args = message.slice(prefix.length + command.length).trim().split(/ +/g);

      if (message.startsWith(prefix) && msg.channel.type == "text") {
        if (musicbot.commands.has(command)) {
          let tCmd = musicbot.commands.get(command);
          if (tCmd.enabled) {
            if (!musicbot.cooldown.enabled == true && !musicbot.cooldown.exclude.includes(tCmd.masked)) {
              if (musicbot.recentTalk.has(msg.author.id)) {
                if (musicbot.cooldown.enabled == true && !musicbot.cooldown.exclude.includes(tCmd.masked)) return msg.channel.send(musicbot.note("fail", "You must wait to use music commands again."));
              }
              musicbot.recentTalk.add(msg.author.id);
              setTimeout(() => { musicbot.recentTalk.delete(msg.author.id) }, musicbot.cooldown.timer);
            }
            return musicbot[tCmd.run](msg, suffix, args);
          }
        } else if (musicbot.aliases.has(command)) {
          let aCmd = musicbot.aliases.get(command);
          if (aCmd.enabled) {
            if (!musicbot.cooldown.enabled == true && !musicbot.cooldown.exclude.includes(aCmd.masked)) {
              if (musicbot.recentTalk.has(msg.author.id)) {
                if (musicbot.cooldown.enabled == true && !musicbot.cooldown.exclude.includes(aCmd.masked)) return msg.channel.send(musicbot.note("fail", "You must wait to use music commands again."));
              }
              musicbot.recentTalk.add(msg.author.id);
              setTimeout(() => { musicbot.recentTalk.delete(msg.author.id) }, musicbot.cooldown.timer);
            }
            return musicbot[aCmd.run](msg, suffix, args);
          }
        };
      };
    });

    musicbot.playFunction = (msg, suffix, args) => {
      if (msg.member.voiceChannel === undefined) return msg.channel.send(musicbot.note('fail', `You're not in a voice channel.`));
      if (!suffix) return msg.channel.send(musicbot.note('fail', 'No video specified!'));
      let q = musicbot.getQueue(msg.guild.id);
      if (q.songs.length >= musicbot.maxQueueSize && musicbot.maxQueueSize !== 0) return msg.channel.send(musicbot.note('fail', 'Maximum queue size reached!'));
      var searchstring = suffix.trim();
      if (searchstring.includes("https://youtu.be/") || searchstring.includes("https://www.youtube.com/") && searchstring.includes("&")) searchstring = searchstring.split("&")[0];


      if (searchstring.startsWith('http') && searchstring.includes("list=")) {
        msg.channel.send(musicbot.note("search", `Searching playlist items~`));
        var playid = searchstring.toString()
        .split('list=')[1];
        if (playid.toString()
        .includes('?')) playid = playid.split('?')[0];
        if (playid.toString()
        .includes('&t=')) playid = playid.split('&t=')[0];

        ytpl(playid, function(err, playlist) {
          if(err) return msg.channel.send(musicbot.note('fail', `Something went wrong fetching that playlist!`));
          if (playlist.items.length <= 0) return msg.channel.send(musicbot.note('fail', `Couldn't get any videos from that playlist.`));
          if (playlist.total_items >= 50) return msg.channel.send(musicbot.note('fail', `Too many videos to queue. A maximum of 50 is allowed.`));
          var index = 0;
          var ran = 0;
          const queue = musicbot.getQueue(msg.guild.id);

          playlist.items.forEach(video => {
            ran++;
            if (queue.songs.length == (musicbot.maxQueueSize + 1) && musicbot.maxQueueSize !== 0 || !video) return;
            video.url = `https://www.youtube.com/watch?v=` + video.id;
            video.channelTitle = video.author.name;
            video.channelURL = video.author.ref;
            video.requester = msg.author.id;
            video.position = musicbot.queues.get(msg.guild.id).songs ? musicbot.queues.get(msg.guild.id).songs.length : 0;
            video.queuedOn = new Date().toLocaleDateString(musicbot.dateLocal, { weekday: 'long', hour: 'numeric' });
            video.requesterAvatarURL = msg.author.displayAvatarURL;
            queue.songs.push(video);
            if (queue.songs.length === 1) musicbot.executeQueue(msg, queue);
            index++;

            if (ran >= playlist.items.length) {
              if (index == 0) msg.channel.send(musicbot.note('fail', `Coudln't get any songs from that playlist!`))
              else if (index == 1) msg.channel.send(musicbot.note('note', `Queued one song.`));
              else if (index > 1) msg.channel.send(musicbot.note('note', `Queued ${index} songs.`));
            }
          });
        });
      } else {
        msg.channel.send(musicbot.note("search", `\`Searching: ${searchstring}\`~`));
        new Promise(async (resolve, reject) => {
          let result = await musicbot.searcher.search(searchstring, { type: 'video' });
          resolve(result.first)
        }).then((res) => {
          if (!res) return msg.channel.send(musicbot.note("fail", "Something went wrong. Try again!"));
          res.requester = msg.author.id;
          if (searchstring.startsWith("https://www.youtube.com/") || searchstring.startsWith("https://youtu.be/")) res.url = searchstring;
          res.channelURL = `https://www.youtube.com/channel/${res.channelId}`;
          res.queuedOn = new Date().toLocaleDateString(musicbot.dateLocal, { weekday: 'long', hour: 'numeric' });
          if (musicbot.requesterName) res.requesterAvatarURL = msg.author.displayAvatarURL;
          const queue = musicbot.getQueue(msg.guild.id)
          res.position = queue.songs.length ? queue.songs.length : 0;
          queue.songs.push(res);

          if (msg.channel.permissionsFor(msg.guild.me).has('EMBED_LINKS')) {
            const embed = new Discord.RichEmbed();
            try {
              embed.setAuthor('Adding To Queue', client.user.avatarURL);
              var songTitle = res.title.replace(/\\/g, '\\\\')
              .replace(/\`/g, '\\`')
              .replace(/\*/g, '\\*')
              .replace(/_/g, '\\_')
              .replace(/~/g, '\\~')
              .replace(/`/g, '\\`');
              embed.setColor(musicbot.embedColor);
              embed.addField(res.channelTitle, `[${songTitle}](${res.url})`, musicbot.inlineEmbeds);
              embed.addField("Queued On", res.queuedOn, musicbot.inlineEmbeds);
              if (!musicbot.bigPicture) embed.setThumbnail(`https://img.youtube.com/vi/${res.id}/maxresdefault.jpg`);
              if (musicbot.bigPicture) embed.setImage(`https://img.youtube.com/vi/${res.id}/maxresdefault.jpg`);
              const resMem = client.users.get(res.requester);
              if (musicbot.requesterName && resMem) embed.setFooter(`Requested by ${client.users.get(res.requester).username}`, res.requesterAvatarURL);
              if (musicbot.requesterName && !resMem) embed.setFooter(`Requested by \`UnknownUser (ID: ${res.requester})\``, res.requesterAvatarURL);
              msg.channel.send({
                embed
              });
            } catch (e) {
              console.error(`[${msg.guild.name}] [playCmd] ` + e.stack);
            };
          } else {
            try {
              var songTitle = res.title.replace(/\\/g, '\\\\')
              .replace(/\`/g, '\\`')
              .replace(/\*/g, '\\*')
              .replace(/_/g, '\\_')
              .replace(/~/g, '\\~')
              .replace(/`/g, '\\`');
              msg.channel.send(`Now Playing: **${songTitle}**\nRequested By: ${client.users.get(res.requester).username}\nQueued On: ${res.queuedOn}`)
            } catch (e) {
              console.error(`[${msg.guild.name}] [npCmd] ` + e.stack);
            };
          };
          if (queue.songs.length === 1 || !client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id)) musicbot.executeQueue(msg, queue);
        }).catch((res) => {
          console.log(new Error(res));
        });
      };
    };

    musicbot.helpFunction = (msg, suffix, args) => {
      let command = suffix.trim();
      if (!suffix) {
        if (msg.channel.permissionsFor(msg.guild.me)
          .has('EMBED_LINKS')) {
          const embed = new Discord.RichEmbed();
          embed.setAuthor("Commands", msg.author.displayAvatarURL);
          embed.setDescription(`Use \`${musicbot.botPrefix}${musicbot.help.name} command name\` for help on usage. Anyone with a role named \`${musicbot.djRole}\` can use any command.`);
          // embed.addField(musicbot.helpCmd, musicbot.helpHelp);
          const newCmds = Array.from(musicbot.commands);
          let index = 0;
          let max = musicbot.commandsArray.length;
          embed.setColor(musicbot.embedColor);
          for (var i = 0; i < musicbot.commandsArray.length; i++) {
            if (!musicbot.commandsArray[i].exclude) embed.addField(musicbot.commandsArray[i].name, musicbot.commandsArray[i].help);
            index++;
            if (index == max) {
              if (musicbot.messageHelp) {
                let sent = false;
                msg.author.send({
                    embed
                  })
                  .then(() => {
                    sent = true;
                  });
                setTimeout(() => {
                  if (!sent) return msg.channel.send({
                    embed
                  });
                }, 1200);
              } else {
                return msg.channel.send({
                  embed
                });
              };
            }
          };
        } else {
          var cmdmsg = `= Music Commands =\nUse ${musicbot.botPrefix}${musicbot.help.name} [command] for help on a command. Anyone with a role named \`${musicbot.djRole}\` can use any command.\n`;
          let index = 0;
          let max = musicbot.commandsArray.length;
          for (var i = 0; i < musicbot.commandsArray.length; i++) {
            if (!musicbot.commandsArray[i].disabled || !musicbot.commandsArray[i].exclude) {
              cmdmsg = cmdmsg + `\n• ${musicbot.commandsArray[i].name}: ${musicbot.commandsArray[i].help}`;
              index++;
              if (index == musicbot.commandsArray.length) {
                if (musicbot.messageHelp) {
                  let sent = false;
                  msg.author.send(cmdmsg, {
                      code: 'asciidoc'
                    })
                    .then(() => {
                      sent = true;
                    });
                  setTimeout(() => {
                    if (!sent) return msg.channel.send(cmdmsg, {
                      code: 'asciidoc'
                    });
                  }, 500);
                } else {
                  return msg.channel.send(cmdmsg, {
                    code: 'asciidoc'
                  });
                };
              }
            };
          };
        };
      } else if (musicbot.commands.has(command) || musicbot.aliases.has(command)) {
        if (msg.channel.permissionsFor(msg.guild.me)
          .has('EMBED_LINKS')) {
          const embed = new Discord.RichEmbed();
          command = musicbot.commands.get(command) || musicbot.aliases.get(command);
          if (command.exclude) return msg.channel.send(musicbot.note('fail', `${suffix} is not a valid command!`));
          embed.setAuthor(command.name, msg.client.user.avatarURL);
          embed.setDescription(command.help);
          if (command.alt.length > 0) embed.addField(`Aliases`, command.alt.join(", "), musicbot.inlineEmbeds);
          if (command.usage && typeof command.usage == "string") embed.addFieldd(`Usage`, command.usage.replace(/{{prefix}})/g, musicbot.botPrefix), musicbot.inlineEmbeds);
          embed.setColor(musicbot.embedColor);
          msg.channel.send({
            embed
          });
        } else {
          command = musicbot.commands.get(command) || musicbot.aliases.get(command);
          if (command.exclude) return msg.channel.send(musicbot.note('fail', `${suffix} is not a valid command!`));
          var cmdhelp = `= ${command.name} =\n`;
          cmdhelp + `\n${command.help}`;
          if (command.usage !== null) cmdhelp = cmdhelp + `\nUsage: ${command.usage.replace(/{{prefix}})/g, musicbot.botPrefix)}`;
          if (command.alt.length > 0) cmdhelp = cmdhelp + `\nAliases: ${command.alt.join(", ")}`;
          msg.channel.send(cmdhelp, {
            code: 'asciidoc'
          });
        };
      } else {
        msg.channel.send(musicbot.note('fail', `${suffix} is not a valid command!`));
      };
    };

    musicbot.skipFunction = (msg, suffix, args) => {
      const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
      if (voiceConnection === null) return msg.channel.send(musicbot.note('fail', 'No music being played.'));
      const queue = musicbot.getQueue(msg.guild.id);
      if (!musicbot.canSkip(msg.member, queue)) return msg.channel.send(musicbot.note('fail', `You cannot skip this as you didn't queue it.`));

      if (musicbot.queues.get(msg.guild.id).loop == "song") return msg.channel.send(musicbot.note("fail", "Cannot skip while loop is set to single."));

      const dispatcher = voiceConnection.player.dispatcher;
      if (!dispatcher || dispatcher === null) {
        if (musicbot.logging) return console.log(new Error(`dispatcher null on skip cmd [${msg.guild.name}] [${msg.author.username}]`));
        return msg.channel.send(musicbot.note("fail", "Something went wrong running skip."));
      };
      if (voiceConnection.paused) dispatcher.end();
      dispatcher.end();
      msg.channel.send(musicbot.note("note", "Skipped song."));
    };

    musicbot.pauseFunction = (msg, suffix, args) => {
      const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
      if (voiceConnection === null) return msg.channel.send(musicbot.note('fail', 'No music being played.'));
      if (!musicbot.isAdmin(msg.member) && !musicbot.anyoneCanPause) return msg.channel.send(musicbot.note('fail', 'You cannot pause queues.'));

      const dispatcher = voiceConnection.player.dispatcher;
      if (dispatcher.paused) return msg.channel.send(musicbot.note(`fail`, `Music already paused!`))
      else dispatcher.pause();
      msg.channel.send(musicbot.note('note', 'Playback paused.'));
    };

    musicbot.resumeFunction = (msg, suffix, args) => {
      const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
      if (voiceConnection === null) return msg.channel.send(musicbot.note('fail', 'No music is being played.'));
      if (!musicbot.isAdmin(msg.member) && !musicbot.anyoneCanPause) return msg.channel.send(musicbot.note('fail', `You cannot resume queues.`));

      const dispatcher = voiceConnection.player.dispatcher;
      if (!dispatcher.paused) return msg.channel.send(musicbot.note('fail', `Music already playing.`))
      else dispatcher.resume();
      msg.channel.send(musicbot.note('note', 'Playback resumed.'));
    };

    musicbot.leaveFunction = (msg, suffix) => {
      if (musicbot.isAdmin(msg.member) || musicbot.anyoneCanLeave === true) {
        const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
        if (voiceConnection === null) return msg.channel.send(musicbot.note('fail', 'I\'m not in a voice channel.'));
        musicbot.emptyQueue(msg.guild.id);

        if (!voiceConnection.player.dispatcher) return;
        voiceConnection.player.dispatcher.end();
        voiceConnection.disconnect();
        msg.channel.send(musicbot.note('note', 'Successfully left the voice channel.'));
      } else {
        const chance = Math.floor((Math.random() * 100) + 1);
        if (chance <= 10) return msg.channel.send(musicbot.note('fail', `I'm afraid I can't let you do that, ${msg.author.username}.`))
        else return msg.channel.send(musicbot.note('fail', 'Sorry, you\'re not allowed to do that.'));
      }
    }

    musicbot.npFunction = (msg, suffix, args) => {
      const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
      const queue = musicbot.getQueue(msg.guild.id, true);
      if (voiceConnection === null) return msg.channel.send(musicbot.note('fail', 'No music is being played.'));
      const dispatcher = voiceConnection.player.dispatcher;

      if (musicbot.queues.get(msg.guild.id).songs.length <= 0) return msg.channel.send(musicbot.note('note', 'Queue empty.'));

      if (msg.channel.permissionsFor(msg.guild.me)
        .has('EMBED_LINKS')) {
        const embed = new Discord.RichEmbed();
        try {
          embed.setAuthor('Now Playing', client.user.avatarURL);
          var songTitle = queue.last.title.replace(/\\/g, '\\\\')
            .replace(/\`/g, '\\`')
            .replace(/\*/g, '\\*')
            .replace(/_/g, '\\_')
            .replace(/~/g, '\\~')
            .replace(/`/g, '\\`');
          embed.setColor(musicbot.embedColor);
          embed.addField(queue.last.channelTitle, `[${songTitle}](${queue.last.url})`, musicbot.inlineEmbeds);
          embed.addField("Queued On", queue.last.queuedOn, musicbot.inlineEmbeds);
          if (!musicbot.bigPicture) embed.setThumbnail(`https://img.youtube.com/vi/${queue.last.id}/maxresdefault.jpg`);
          if (musicbot.bigPicture) embed.setImage(`https://img.youtube.com/vi/${queue.last.id}/maxresdefault.jpg`);
          const resMem = client.users.get(queue.last.requester);
          if (musicbot.requesterName && resMem) embed.setFooter(`Requested by ${client.users.get(queue.last.requester).username}`, queue.last.requesterAvatarURL);
          if (musicbot.requesterName && !resMem) embed.setFooter(`Requested by \`UnknownUser (ID: ${queue.last.requester})\``, queue.last.requesterAvatarURL);
          msg.channel.send({
            embed
          });
        } catch (e) {
          console.error(`[${msg.guild.name}] [npCmd] ` + e.stack);
        };
      } else {
        try {
          var songTitle = queue.last.title.replace(/\\/g, '\\\\')
            .replace(/\`/g, '\\`')
            .replace(/\*/g, '\\*')
            .replace(/_/g, '\\_')
            .replace(/~/g, '\\~')
            .replace(/`/g, '\\`');
          msg.channel.send(`Now Playing: **${songTitle}**\nRequested By: ${client.users.get(queue.last.requester).username}\nQueued On: ${queue.last.queuedOn}`)
        } catch (e) {
          console.error(`[${msg.guild.name}] [npCmd] ` + e.stack);
        };
      }
    };

    musicbot.queueFunction = (msg, suffix, args) => {
      if (!musicbot.queues.has(msg.guild.id)) return msg.channel.send(musicbot.note("fail", "Could not find a queue for this server."));
      else if (musicbot.queues.get(msg.guild.id).songs.length <= 0) return msg.channel.send(musicbot.note("fail", "Queue is empty."));
      const queue = musicbot.queues.get(msg.guild.id);
      if (suffix) {
        let video = queue.songs.find(s => s.position == parseInt(suffix) - 1);
        if (!video) return msg.channel.send(musicbot.note("fail", "Couldn't find that video."));
        const embed = new Discord.RichEmbed()
        .setAuthor('Queued Song', client.user.avatarURL)
        .setColor(musicbot.embedColor)
        .addField(video.channelTitle, `[${video.title.replace(/\\/g, '\\\\').replace(/\`/g, '\\`').replace(/\*/g, '\\*').replace(/_/g, '\\_').replace(/~/g, '\\~').replace(/`/g, '\\`')}](${video.url})`, musicbot.inlineEmbeds)
        .addField("Queued On", video.queuedOn, musicbot.inlineEmbeds)
        .addField("Position", video.position + 1, musicbot.inlineEmbeds);
        if (!musicbot.bigPicture) embed.setThumbnail(`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`);
        if (musicbot.bigPicture) embed.setImage(`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`);
        const resMem = client.users.get(video.requester);
        if (musicbot.requesterName && resMem) embed.setFooter(`Requested by ${client.users.get(video.requester).username}`, video.requesterAvatarURL);
        if (musicbot.requesterName && !resMem) embed.setFooter(`Requested by \`UnknownUser (ID: ${video.requester})\``, video.requesterAvatarURL);
        msg.channel.send({embed});
      } else {
        if (queue.songs.length > 11) {
          let pages = [];
          let page = 1;
          const newSongs = queue.songs.musicArraySort(10);
          newSongs.forEach(s => {
            var i = s.map((video, index) => (
              `**${video.position + 1}:** __${video.title.replace(/\\/g, '\\\\').replace(/\`/g, '\\`').replace(/\*/g, '\\*').replace(/_/g, '\\_').replace(/~/g, '\\~').replace(/`/g, '\\`')}__`
            )).join('\n\n');
            if (i !== undefined) pages.push(i)
          });

          const embed = new Discord.RichEmbed();
          embed.setAuthor('Queued Songs', client.user.avatarURL);
          embed.setColor(musicbot.embedColor);
          embed.setFooter(`Page ${page} of ${pages.length}`);
          embed.setDescription(pages[page - 1]);
          msg.channel.send(embed).then(m => {
            m.react('⏪').then( r => {
              m.react('⏩')
              let forwardsFilter = m.createReactionCollector((reaction, user) => reaction.emoji.name === '⏩' && user.id === msg.author.id, { time: 120000 });
              let backFilter = m.createReactionCollector((reaction, user) => reaction.emoji.name === '⏪' && user.id === msg.author.id, { time: 120000 });

              forwardsFilter.on('collect', r => {
                if (page === pages.length) return;
                page++;
                embed.setDescription(pages[page - 1]);
                embed.setFooter(`Page ${page} of ${pages.length}`, msg.author.displayAvatarURL);
                m.edit(embed);
              })
              backFilter.on('collect', r => {
                if (page === 1) return;
                page--;
                embed.setDescription(pages[page - 1]);
                embed.setFooter(`Page ${page} of ${pages.length}`);
                m.edit(embed);
              })
            })
          })
        } else {
          var newSongs = musicbot.queues.get(msg.guild.id).songs.map((video, index) => (`**${video.position + 1}:** __${video.title.replace(/\\/g, '\\\\').replace(/\`/g, '\\`').replace(/\*/g, '\\*').replace(/_/g, '\\_').replace(/~/g, '\\~').replace(/`/g, '\\`')}__`)).join('\n\n');
          const embed = new Discord.RichEmbed();
          embed.setAuthor('Queued Songs', client.user.avatarURL);
          embed.setColor(musicbot.embedColor);
          embed.setDescription(newSongs);
          embed.setFooter(`Page 1 of 1`, msg.author.displayAvatarURL);
          return msg.channel.send(embed);
        };
      };
    };

    musicbot.searchFunction = (msg, suffix, args) => {
      if (msg.member.voiceChannel === undefined) return msg.channel.send(musicbot.note('fail', `You're not in a voice channel~`));
      if (!suffix) return msg.channel.send(musicbot.note('fail', 'No video specified!'));
      const queue = musicbot.getQueue(msg.guild.id);
      if (queue.songs.length >= musicbot.maxQueueSize && musicbot.maxQueueSize !== 0) return msg.channel.send(musicbot.note('fail', 'Maximum queue size reached!'));

      let searchstring = suffix.trim();
      msg.channel.send(musicbot.note('search', `Searching: \`${searchstring}\``))
        .then(response => {
          musicbot.searcher.search(searchstring, {
              type: 'video'
            })
            .then(searchResult => {
              if (!searchResult.totalResults || searchResult.totalResults === 0) return response.edit(musicbot.note('fail', 'Failed to get search results.'));

              const startTheFun = async (videos, max) => {
                if (msg.channel.permissionsFor(msg.guild.me).has('EMBED_LINKS')) {
                  const embed = new Discord.RichEmbed();
                  embed.setTitle(`Choose Your Video`);
                  embed.setColor(musicbot.embedColor);
                  var index = 0;
                  videos.forEach(function(video) {
                    index++;
                    embed.addField(`${index} (${video.channelTitle})`, `[${musicbot.note('font', video.title)}](${video.url})`, musicbot.inlineEmbeds);
                  });
                  embed.setFooter(`Search by: ${msg.author.username}`, msg.author.displayAvatarURL);
                  msg.channel.send({
                    embed
                  })
                  .then(firstMsg => {
                    var filter = null;
                    if (max === 0) {
                      filter = m => m.author.id === msg.author.id &&
                      m.content.includes('1') ||
                      m.content.trim() === (`cancel`);
                    } else if (max === 1) {
                      filter = m => m.author.id === msg.author.id &&
                      m.content.includes('1') ||
                      m.content.includes('2') ||
                      m.content.trim() === (`cancel`);
                    } else if (max === 2) {
                      filter = m => m.author.id === msg.author.id &&
                      m.content.includes('1') ||
                      m.content.includes('2') ||
                      m.content.includes('3') ||
                      m.content.trim() === (`cancel`);
                    } else if (max === 3) {
                      filter = m => m.author.id === msg.author.id &&
                      m.content.includes('1') ||
                      m.content.includes('2') ||
                      m.content.includes('3') ||
                      m.content.includes('4') ||
                      m.content.trim() === (`cancel`);
                    } else if (max === 4) {
                      filter = m => m.author.id === msg.author.id &&
                      m.content.includes('1') ||
                      m.content.includes('2') ||
                      m.content.includes('3') ||
                      m.content.includes('4') ||
                      m.content.includes('5') ||
                      m.content.trim() === (`cancel`);
                    } else if (max === 5) {
                      filter = m => m.author.id === msg.author.id &&
                      m.content.includes('1') ||
                      m.content.includes('2') ||
                      m.content.includes('3') ||
                      m.content.includes('4') ||
                      m.content.includes('5') ||
                      m.content.includes('6') ||
                      m.content.trim() === (`cancel`);
                    } else if (max === 6) {
                      filter = m => m.author.id === msg.author.id &&
                      m.content.includes('1') ||
                      m.content.includes('2') ||
                      m.content.includes('3') ||
                      m.content.includes('4') ||
                      m.content.includes('5') ||
                      m.content.includes('6') ||
                      m.content.includes('7') ||
                      m.content.trim() === (`cancel`);
                    } else if (max === 7) {
                      filter = m => m.author.id === msg.author.id &&
                      m.content.includes('1') ||
                      m.content.includes('2') ||
                      m.content.includes('3') ||
                      m.content.includes('4') ||
                      m.content.includes('5') ||
                      m.content.includes('6') ||
                      m.content.includes('7') ||
                      m.content.includes('8') ||
                      m.content.trim() === (`cancel`);
                    } else if (max === 8) {
                      filter = m => m.author.id === msg.author.id &&
                      m.content.includes('1') ||
                      m.content.includes('2') ||
                      m.content.includes('3') ||
                      m.content.includes('4') ||
                      m.content.includes('5') ||
                      m.content.includes('6') ||
                      m.content.includes('7') ||
                      m.content.includes('8') ||
                      m.content.includes('9') ||
                      m.content.trim() === (`cancel`);
                    } else if (max === 9) {
                      filter = m => m.author.id === msg.author.id &&
                      m.content.includes('1') ||
                      m.content.includes('2') ||
                      m.content.includes('3') ||
                      m.content.includes('4') ||
                      m.content.includes('5') ||
                      m.content.includes('6') ||
                      m.content.includes('7') ||
                      m.content.includes('8') ||
                      m.content.includes('9') ||
                      m.content.includes('10') ||
                      m.content.trim() === (`cancel`);
                    }
                    msg.channel.awaitMessages(filter, {
                      max: 1,
                      time: 60000,
                      errors: ['time']
                    })
                    .then(collected => {
                      const newColl = Array.from(collected);
                      const mcon = newColl[0][1].content;

                      if (mcon === "cancel") return firstMsg.edit(musicbot.note('note', 'Searching canceled.'));
                      const song_number = parseInt(mcon) - 1;
                      if (song_number >= 0) {
                        firstMsg.delete();

                        videos[song_number].requester == msg.author.id;
                        videos[song_number].position = queue.songs.length ? queue.songs.length : 0;
                        var embed = new Discord.RichEmbed();
                        embed.setAuthor('Adding To Queue', client.user.avatarURL);
                        var songTitle = videos[song_number].title.replace(/\\/g, '\\\\')
                        .replace(/\`/g, '\\`')
                        .replace(/\*/g, '\\*')
                        .replace(/_/g, '\\_')
                        .replace(/~/g, '\\~')
                        .replace(/`/g, '\\`');
                        embed.setColor(musicbot.embedColor);
                        embed.addField(videos[song_number].channelTitle, `[${songTitle}](${videos[song_number].url})`, musicbot.inlineEmbeds);
                        embed.addField("Queued On", videos[song_number].queuedOn, musicbot.inlineEmbeds);
                        if (!musicbot.bigPicture) embed.setThumbnail(`https://img.youtube.com/vi/${videos[song_number].id}/maxresdefault.jpg`);
                        if (musicbot.bigPicture) embed.setImage(`https://img.youtube.com/vi/${videos[song_number].id}/maxresdefault.jpg`);
                        const resMem = client.users.get(videos[song_number].requester);
                        if (musicbot.requesterName && resMem) embed.setFooter(`Requested by ${client.users.get(videos[song_number].requester).username}`, videos[song_number].requesterAvatarURL);
                        if (musicbot.requesterName && !resMem) embed.setFooter(`Requested by \`UnknownUser (ID: ${videos[song_number].requester})\``, videos[song_number].requesterAvatarURL);
                        msg.channel.send({
                          embed
                        }).then(() => {
                          queue.songs.push(videos[song_number]);
                          if (queue.songs.length === 1 || !client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id)) musicbot.executeQueue(msg, queue);
                        })
                        .catch(console.log);
                      };
                    })
                    .catch(collected => {
                      if (collected.toString()
                      .match(/error|Error|TypeError|RangeError|Uncaught/)) return firstMsg.edit(`\`\`\`xl\nSearching canceled. ${collected}\n\`\`\``);
                      return firstMsg.edit(`\`\`\`xl\nSearching canceled.\n\`\`\``);
                    });
                  })
                } else {
                  const vids = videos.map((video, index) => (
                    `**${index + 1}:** __${video.title.replace(/\\/g, '\\\\').replace(/\`/g, '\\`').replace(/\*/g, '\\*').replace(/_/g, '\\_').replace(/~/g, '\\~').replace(/`/g, '\\`')}__`
                  )).join('\n\n');
                  msg.channel.send(`\`\`\`\n= Pick Your Video =\n${vids}\n\n= Say Cancel To Cancel =`).then(firstMsg => {
                    var filter = null;
                    if (max === 0) {
                      filter = m => m.author.id === msg.author.id &&
                      m.content.includes('1') ||
                      m.content.trim() === (`cancel`);
                    } else if (max === 1) {
                      filter = m => m.author.id === msg.author.id &&
                      m.content.includes('1') ||
                      m.content.includes('2') ||
                      m.content.trim() === (`cancel`);
                    } else if (max === 2) {
                      filter = m => m.author.id === msg.author.id &&
                      m.content.includes('1') ||
                      m.content.includes('2') ||
                      m.content.includes('3') ||
                      m.content.trim() === (`cancel`);
                    } else if (max === 3) {
                      filter = m => m.author.id === msg.author.id &&
                      m.content.includes('1') ||
                      m.content.includes('2') ||
                      m.content.includes('3') ||
                      m.content.includes('4') ||
                      m.content.trim() === (`cancel`);
                    } else if (max === 4) {
                      filter = m => m.author.id === msg.author.id &&
                      m.content.includes('1') ||
                      m.content.includes('2') ||
                      m.content.includes('3') ||
                      m.content.includes('4') ||
                      m.content.includes('5') ||
                      m.content.trim() === (`cancel`);
                    } else if (max === 5) {
                      filter = m => m.author.id === msg.author.id &&
                      m.content.includes('1') ||
                      m.content.includes('2') ||
                      m.content.includes('3') ||
                      m.content.includes('4') ||
                      m.content.includes('5') ||
                      m.content.includes('6') ||
                      m.content.trim() === (`cancel`);
                    } else if (max === 6) {
                      filter = m => m.author.id === msg.author.id &&
                      m.content.includes('1') ||
                      m.content.includes('2') ||
                      m.content.includes('3') ||
                      m.content.includes('4') ||
                      m.content.includes('5') ||
                      m.content.includes('6') ||
                      m.content.includes('7') ||
                      m.content.trim() === (`cancel`);
                    } else if (max === 7) {
                      filter = m => m.author.id === msg.author.id &&
                      m.content.includes('1') ||
                      m.content.includes('2') ||
                      m.content.includes('3') ||
                      m.content.includes('4') ||
                      m.content.includes('5') ||
                      m.content.includes('6') ||
                      m.content.includes('7') ||
                      m.content.includes('8') ||
                      m.content.trim() === (`cancel`);
                    } else if (max === 8) {
                      filter = m => m.author.id === msg.author.id &&
                      m.content.includes('1') ||
                      m.content.includes('2') ||
                      m.content.includes('3') ||
                      m.content.includes('4') ||
                      m.content.includes('5') ||
                      m.content.includes('6') ||
                      m.content.includes('7') ||
                      m.content.includes('8') ||
                      m.content.includes('9') ||
                      m.content.trim() === (`cancel`);
                    } else if (max === 9) {
                      filter = m => m.author.id === msg.author.id &&
                      m.content.includes('1') ||
                      m.content.includes('2') ||
                      m.content.includes('3') ||
                      m.content.includes('4') ||
                      m.content.includes('5') ||
                      m.content.includes('6') ||
                      m.content.includes('7') ||
                      m.content.includes('8') ||
                      m.content.includes('9') ||
                      m.content.includes('10') ||
                      m.content.trim() === (`cancel`);
                    }
                    msg.channel.awaitMessages(filter, {
                      max: 1,
                      time: 60000,
                      errors: ['time']
                    })
                    .then(collected => {
                      const newColl = Array.from(collected);
                      const mcon = newColl[0][1].content;

                      if (mcon === "cancel") return firstMsg.edit(musicbot.note('note', 'Searching canceled.'));
                      const song_number = parseInt(mcon) - 1;
                      if (song_number >= 0) {
                        firstMsg.delete();

                        videos[song_number].requester == msg.author.id;
                        videos[song_number].position = queue.songs.length ? queue.songs.length : 0;
                        var embed = new Discord.RichEmbed();
                        embed.setAuthor('Adding To Queue', client.user.avatarURL);
                        var songTitle = videos[song_number].title.replace(/\\/g, '\\\\')
                        .replace(/\`/g, '\\`')
                        .replace(/\*/g, '\\*')
                        .replace(/_/g, '\\_')
                        .replace(/~/g, '\\~')
                        .replace(/`/g, '\\`');
                        embed.setColor(musicbot.embedColor);
                        embed.addField(videos[song_number].channelTitle, `[${songTitle}](${videos[song_number].url})`, musicbot.inlineEmbeds);
                        embed.addField("Queued On", videos[song_number].queuedOn, musicbot.inlineEmbeds);
                        if (!musicbot.bigPicture) embed.setThumbnail(`https://img.youtube.com/vi/${videos[song_number].id}/maxresdefault.jpg`);
                        if (musicbot.bigPicture) embed.setImage(`https://img.youtube.com/vi/${videos[song_number].id}/maxresdefault.jpg`);
                        const resMem = client.users.get(videos[song_number].requester);
                        if (musicbot.requesterName && resMem) embed.setFooter(`Requested by ${client.users.get(videos[song_number].requester).username}`, videos[song_number].requesterAvatarURL);
                        if (musicbot.requesterName && !resMem) embed.setFooter(`Requested by \`UnknownUser (ID: ${videos[song_number].requester})\``, videos[song_number].requesterAvatarURL);
                        msg.channel.send({
                          embed
                        }).then(() => {
                          queue.songs.push(videos[song_number]);
                          if (queue.songs.length === 1 || !client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id)) musicbot.executeQueue(msg, queue);
                        })
                        .catch(console.log);
                      };
                    })
                    .catch(collected => {
                      if (collected.toString()
                      .match(/error|Error|TypeError|RangeError|Uncaught/)) return firstMsg.edit(`\`\`\`xl\nSearching canceled. ${collected}\n\`\`\``);
                      return firstMsg.edit(`\`\`\`xl\nSearching canceled.\n\`\`\``);
                    });
                  })
                }
              };

              const max = searchResult.totalResults >= 10 ? 9 : searchResult.totalResults - 1;
              var videos = [];
              for (var i = 0; i < 99; i++) {
                var result = searchResult.currentPage[i];
                result.requester = msg.author.id;
                if (musicbot.requesterName) result.requesterAvatarURL = msg.author.displayAvatarURL;
                result.channelURL = `https://www.youtube.com/channel/${result.channelId}`;
                result.queuedOn = new Date().toLocaleDateString(musicbot.dateLocal, { weekday: 'long', hour: 'numeric' });
                videos.push(result);
                if (i === max) {
                  i = 101;
                  startTheFun(videos, max);
                }
              };
            });
        })
        .catch(console.log);
    };

    musicbot.volumeFunction = (msg, suffix, args) => {
      const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
      if (voiceConnection === null) return msg.channel.send(musicbot.note('fail', 'No music is being played.'));
      if (!musicbot.canAdjust(msg.member, musicbot.queues.get(msg.guild.id))) return msg.channel.send(musicbot.note('fail', `Only admins or DJ's may change volume.`));
      const dispatcher = voiceConnection.player.dispatcher;

      if (!suffix) return msg.channel.send(musicbot.note('fail', 'No volume specified.'));
      suffix = parseInt(suffix);
      if (suffix > 200 || suffix <= 0) return msg.channel.send(musicbot.note('fail', 'Volume out of range, must be within 1 to 200'));

      dispatcher.setVolume((suffix / 100));
      musicbot.queues.get(msg.guild.id).volume = suffix;
      msg.channel.send(musicbot.note('note', `Volume changed to ${suffix}%.`));
    };

    musicbot.clearFunction = (msg, suffix, args) => {
      if (!musicbot.queues.has(msg.guild.id)) return msg.channel.send(musicbot.note("fail", "No queue found for this server."));
      if (!musicbot.isAdmin(msg.member)) return msg.channel.send(musicbot.note("fail", `Only Admins or people with the ${musicbot.djRole} can clear queues.`));
      musicbot.emptyQueue(msg.guild.id).then(res => {
        msg.channel.send(musicbot.note("note", "Queue cleared."));
        const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
        if (voiceConnection !== null) {
          const dispatcher = voiceConnection.player.dispatcher;
          if (!dispatcher || dispatcher === null) {
            if (musicbot.logging) return console.log(new Error(`dispatcher null on skip cmd [${msg.guild.name}] [${msg.author.username}]`));
            return msg.channel.send(musicbot.note("fail", "Something went wrong."));
          };
          if (voiceConnection.paused) dispatcher.end();
          dispatcher.end();
        }
      }).catch(res => {
        console.error(new Error(`[clearCmd] [${msg.guild.id}] ${res}`))
        return msg.channel.send(musicbot.note("fail", "Something went wrong clearing the queue."));
      })
    };

    musicbot.removeFunction = (msg, suffix, args) => {
      if (!musicbot.queues.has(msg.guild.id)) return msg.channel.send(musicbot.note('fail', `No queue for this server found!`));
      if (!suffix)  return msg.channel.send(musicbot.note("fail", "No video position given."));
      if (parseInt(suffix - 1) == 0) return msg.channel.send(musicbot.note("fail", "You cannot clear the currently playing music."));
      let test = musicbot.queues.get(msg.guild.id).songs.find(x => x.position == parseInt(suffix - 1));
      if (test) {
        if (test.requester !== msg.author.id && !musicbot.isAdmin(msg.member)) return msg.channel.send(musicbot.note("fail", "You cannot remove that item."));
        let newq = musicbot.queues.get(msg.guild.id).songs.filter(s => s !== test);
        musicbot.updatePositions(newq, msg.guild.id).then(res => {
          musicbot.queues.get(msg.guild.id).songs = res;
          msg.channel.send(musicbot.note("note", `Removed:  \`${test.title.replace(/`/g, "'")}\``));
        })
      } else {
        msg.channel.send(musicbot.note("fail", "Couldn't find that video or something went wrong."));
      }
    };

    musicbot.loopFunction = (msg, suffix, args) => {
      if (!musicbot.queues.has(msg.guild.id)) return msg.channel.send(musicbot.note('fail', `No queue for this server found!`));
      if (musicbot.queues.get(msg.guild.id).loop == "none" || musicbot.queues.get(msg.guild.id).loop == null) {
        musicbot.queues.get(msg.guild.id).loop = "song";
        msg.channel.send(musicbot.note('note', 'Looping single enabled! :repeat_one:'));
      } else if (musicbot.queues.get(msg.guild.id).loop == "song") {
        musicbot.queues.get(msg.guild.id).loop = "queue";
        msg.channel.send(musicbot.note('note', 'Looping queue enabled! :repeat:'));
      } else if (musicbot.queues.get(msg.guild.id).loop == "queue") {
        musicbot.queues.get(msg.guild.id).loop = "none";
        msg.channel.send(musicbot.note('note', 'Looping disabled! :arrow_forward:'));
        const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
        const dispatcher = voiceConnection.player.dispatcher;
        let wasPaused = dispatcher.paused;
        if (wasPaused) dispatcher.pause();
        let newq = musicbot.queues.get(msg.guild.id).songs.slice(musicbot.queues.get(msg.guild.id).last.position - 1);
        if (newq !== musicbot.queues.get(msg.guild.id).songs) musicbot.updatePositions(newq, msg.guild.id).then(res => { musicbot.queues.get(msg.guild.id).songs = res; })
        if (wasPaused) dispatcher.resume();
      }
    };

    musicbot.loadCommand = (obj) => {
      return new Promise((resolve, reject) => {
        let props = {
          enabled: obj.enabled,
          run: obj.run,
          alt: obj.alt,
          help: obj.help,
          name: obj.name,
          exclude: obj.exclude,
          masked: obj.masked
        };
        if (props.enabled == undefined || null) props.enabled = true;
        if (obj.alt.length > 0) {
          obj.alt.forEach((a) => {
            musicbot.aliases.set(a, props);
          })
        };
        musicbot.commands.set(obj.name, props);
        musicbot.commandsArray.push(props);
        if (musicbot.logging) console.log(`[MUSIC_LOADCMD] Loaded ${obj.name}`);
        resolve(musicbot.commands.get(obj.name));
      });
    }

    musicbot.executeQueue = (msg, queue) => {
      if (queue.songs.length <= 0) {
        msg.channel.send(musicbot.note('note', 'Playback finished~'));
        musicbot.queues.set(msg.guild.id, {songs: [], last: null, loop: "none", id: msg.guild.id, volume: musicbot.defVolume});
        if (musicbot.musicPresence) musicbot.updatePresence(musicbot.queues.get(msg.guild.id), msg.client, musicbot.clearPresence).catch((res) => { console.warn(`[MUSIC] Problem updating MusicPresence`); });
        const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
        if (voiceConnection !== null) return voiceConnection.disconnect();
      };

      new Promise((resolve, reject) => {
          const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
          if (voiceConnection === null) {
            if (msg.member.voiceChannel && msg.member.voiceChannel.joinable) {
              msg.member.voiceChannel.join()
                .then(connection => {
                  resolve(connection);
                })
                .catch((error) => {
                  console.log(error);
                });
            } else if (!msg.member.voiceChannel.joinable || msg.member.voiceChannel.full) {
              msg.channel.send(musicbot.note('fail', 'I do not have permission to join your voice channel!'))
              reject();
            } else {
              musicbot.emptyQueue(msg.guild.id).then(() => {
                reject();
              })
            }
          } else {
            resolve(voiceConnection);
          }
        }).then(connection => {
          let video;
          if (!queue.last) {
            video = queue.songs[0];
          } else {
            if (queue.loop == "queue") {
              video = queue.songs.find(s => s.position == queue.last.position + 1);
              if (!video || video && !video.url) video = queue.songs[0];
            } else if (queue.loop == "single") {
              video = queue.last;
            } else {
              video = queue.songs.find(s => s.position == queue.last.position + 1);
            };
          }
          if (!video) {
            video = musicbot.queues.get(msg.guild.id).songs ? musicbot.queues.get(msg.guild.id).songs[0] : false;
            if (!video) {
              msg.channel.send(musicbot.note('note', 'Playback finished!'));
              musicbot.emptyQueue(msg.guild.id);
              const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
              if (voiceConnection !== null) return voiceConnection.disconnect();
            }
          }

          if (musicbot.messageNewSong == true && queue.last && musicbot.queues.get(msg.guild.id).loop !== "song") {
            let req = client.users.get(video.requester);
            if (msg.channel.permissionsFor(msg.guild.me).has('EMBED_LINKS')) {
              const embed = new Discord.RichEmbed()
              .setTitle("Now Playing", `${req !== null ? req.displayAvatarURL : null}`)
              .setThumbnail(`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`)
              .setDescription(`[${video.title.replace(/\\/g, '\\\\').replace(/\`/g, '\\`').replace(/\*/g, '\\*').replace(/_/g, '\\_').replace(/~/g, '\\~').replace(/`/g, '\\`')}](${video.url}) by [${video.channelTitle}](${video.channelURL})`)
              .setColor(musicbot.embedColor)
              .setFooter(`Requested by ${req !== null ? req.username : "Unknown User"}`, `${req !== null ? req.displayAvatarURL : null}`);
              msg.channel.send({embed});
            } else {
              msg.channel.send(musicbot.note("note", `\`${video.title.replace(/`/g, "''")}\` by \`${video.channelURL.replace(/`/g, "''")}\``))
            }
          }

          try {
            musicbot.setLast(msg.guild.id, video).then(() => {
              if (musicbot.musicPresence) musicbot.updatePresence(musicbot.queues.get(msg.guild.id), msg.client, musicbot.clearPresence).catch((res) => { console.warn(`[MUSIC] Problem updating MusicPresence`); });
            });

            let dispatcher = connection.playStream(ytdl(video.url, {
              filter: 'audioonly'
            }), {
              volume: (musicbot.queues.get(msg.guild.id).volume / 100)
            })

            connection.on('error', (error) => {
              console.error(error);
              if (msg && msg.channel) msg.channel.send(musicbot.note('fail', `Something went wrong with the connection. Retrying queue...`));
              musicbot.executeQueue(msg, musicbot.queues.get(msg.guild.id));
            });

            dispatcher.on('error', (error) => {
              console.error(error);
              if (msg && msg.channel) msg.channel.send(musicbot.note('fail', `Something went wrong while playing music. Retrying queue...`));
              musicbot.executeQueue(msg, musicbot.queues.get(msg.guild.id));
            });

            dispatcher.on('end', () => {
              setTimeout(() => {
                let loop = musicbot.queues.get(msg.guild.id).loop;
                if (musicbot.queues.get(msg.guild.id).songs.length > 0) {
                  if (loop == "none" || loop == null) {
                    musicbot.queues.get(msg.guild.id).songs.shift();
                    musicbot.updatePositions(musicbot.queues.get(msg.guild.id).songs, msg.guild.id).then(res => {
                      musicbot.queues.get(msg.guild.id).songs = res;
                      musicbot.executeQueue(msg, musicbot.queues.get(msg.guild.id));
                    }).catch(() => { console.error(new Error("something went wrong moving the queue")); });
                  } else if (loop == "queue" || loop == "song") {
                    musicbot.executeQueue(msg, musicbot.queues.get(msg.guild.id));
                  };
                } else if (musicbot.queues.get(msg.guild.id).songs.length <= 0) {
                  if (msg && msg.channel) msg.channel.send(musicbot.note('note', 'Playback finished.'));
                  musicbot.queues.set(msg.guild.id, {songs: [], last: null, loop: "none", id: msg.guild.id, volume: musicbot.defVolume});
                  if (musicbot.musicPresence) musicbot.updatePresence(musicbot.queues.get(msg.guild.id), msg.client, musicbot.clearPresence).catch((res) => { console.warn(`[MUSIC] Problem updating MusicPresence`); });
                  const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
                  if (voiceConnection !== null) return voiceConnection.disconnect();
                }
              }, 1250);
            });
          } catch (error) {
            console.log(error);
          }
        })
        .catch((error) => {
          console.log(error);
        });

    }

    musicbot.note = (type, text) => {
      if (type === 'wrap') {
        let ntext = text
        .replace(/`/g, '`' + String.fromCharCode(8203))
        .replace(/@/g, '@' + String.fromCharCode(8203))
        .replace(client.token, 'REMOVED');
        return '```\n' + ntext + '\n```';
      } else if (type === 'note') {
        return ':musical_note: | ' + text.replace(/`/g, '`' + String.fromCharCode(8203));
      } else if (type === 'search') {
        return ':mag: | ' + text.replace(/`/g, '`' + String.fromCharCode(8203));
      } else if (type === 'fail') {
        return ':no_entry_sign: | ' + text.replace(/`/g, '`' + String.fromCharCode(8203));
      } else if (type === 'font') {
        return text.replace(/`/g, '`' + String.fromCharCode(8203))
        .replace(/@/g, '@' + String.fromCharCode(8203))
        .replace(/\\/g, '\\\\')
        .replace(/\*/g, '\\*')
        .replace(/_/g, '\\_')
        .replace(/~/g, '\\~')
        .replace(/`/g, '\\`');
      } else {
        console.error(new Error(`${type} was an invalid type`));
      }
    };

    musicbot.loadCommands = async () => {
      try {
        await musicbot.loadCommand(musicbot.play);
        await musicbot.loadCommand(musicbot.remove);
        await musicbot.loadCommand(musicbot.help);
        await musicbot.loadCommand(musicbot.skip);
        await musicbot.loadCommand(musicbot.leave);
        await musicbot.loadCommand(musicbot.search);
        await musicbot.loadCommand(musicbot.pause);
        await musicbot.loadCommand(musicbot.resume);
        await musicbot.loadCommand(musicbot.volume);
        await musicbot.loadCommand(musicbot.queue);
        await musicbot.loadCommand(musicbot.loop);
        await musicbot.loadCommand(musicbot.clearqueue);
        await musicbot.loadCommand(musicbot.np);
      } catch (e) {
        console.error(new Error(e));
      };
    }
    musicbot.loadCommands();

    Object.defineProperty(Array.prototype, 'musicArraySort', {value: function(n) {
      return Array.from(Array(Math.ceil(this.length/n)), (_,i)=>this.slice(i*n,i*n+n));
    }});


  } catch (e) {
    console.error(e);
  };
}

client.login(config.token);
