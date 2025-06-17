const Level = require('../../models/Level');
const {
  MessageFlags,
  ApplicationCommandOptionType
} = require('discord.js');

module.exports = {
    name: 'testdate',
    description: 'Sets your test date',
    options: [
        {
            name: 'test',
            description: 'SAT/ACT',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
            { name: 'SAT', value: 'SAT' },
            { name: 'ACT', value: 'ACT' },
            ],
        },
        {
          name: 'date',
          description: 'MM/DD/YY',
          type: ApplicationCommandOptionType.String,
          required: true,
        },
    ],

    callback: async (client, interaction) => {
        await interaction.deferReply({flags: MessageFlags.Ephemeral});

        const query = {
            userId: interaction.user.id,
            username: interaction.user.username,
            guildId: interaction.guild.id,
        };

        const level = await Level.findOne(query);

        if (!level) {
              // Create new level if it doesn't exist
              level = new Level({
                userId: targetUser.id,
                username: targetUser.username,
                guildId: interaction.guild.id,
              });
            }

        level.test = interaction.options.getString("test");
        level.testDate = interaction.options.getString("date");
        await level.save()
        
        console.log(interaction.options.getString("test"), interaction.options.getString("date"));


        interaction.editReply({
            content: `Test: ${level.test}\nDate: ${level.testDate}`,
            flags: MessageFlags.Ephemeral
        }
    );
  },
};