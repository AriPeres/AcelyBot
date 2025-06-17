const Level = require('../../models/Level');
const {
  MessageFlags
} = require('discord.js');


module.exports = {
    name: 'level',
    description: 'Provides your level and xp',

    callback: async (client, interaction) => {
        await interaction.deferReply({flags: MessageFlags.Ephemeral});

        const query = {
            userId: interaction.user.id,
            username: interaction.user.username,
            guildId: interaction.guild.id,
        };

        const level = await Level.findOne(query);



        interaction.editReply({
            content: `Level: ${level.level}\nXP: ${level.xp}`,
            flags: MessageFlags.Ephemeral
        }
    );
  },
};
