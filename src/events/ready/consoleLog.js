const {ActivityType} = require('discord.js')

module.exports = (client) => {
    console.log(`${client.user.tag} is online :)`);
    // client.user.setUsername('Acely Test Bot');
    client.user.setActivity({
        name: "Doing",
        type: ActivityType.Custom,
        state: "SAT | ACT Prep"
    })
};
