const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  MessageFlags,
  PermissionFlagsBits,
} = require('discord.js');

const cron = require('node-cron');
const Level = require('../../models/Level');
const generateMessages = require('../../utils/generateMessages');

module.exports = (client) => {
    // Run every day at 12:00 PM server time / time of computer bot is run from
    cron.schedule('0 12 * * *', async () => {
        // console.log("sending message");
        const now = new Date();
        const targetDate = new Date(now);
        
        const timeLengths = [1, 7, 30]; // Days away from the test date that we want to send a message to a user

        for (const timeLength of timeLengths) {
            targetDate.setDate(now.getDate() + timeLength); // 1 day

            const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
            const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

            const users = await Level.find({
            testDate: { $gte: startOfDay, $lte: endOfDay },
            });

            for (const user of users) {
            try {
                const guild = await client.guilds.fetch(user.guildId);
                const member = await guild.members.fetch(user.userId);

                const message = generateMessages(user, timeLength);
                // console.log("About to send message");

                await member.send(message);
                

                // await member.send(
                //   `Reminder: Your ${user.test} test is coming up on ${new Date(user.testDate).toLocaleDateString()}. Stay sharp!`
                // );
            } catch (err) {
                console.error(`❌ Could not send reminder to ${user.username}:`, err.message);
            }
        }
    }

  });
};