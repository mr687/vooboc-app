import { getCommandsJSON } from "./Commands"
import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types/v10"
import Env from "./Env"

const rest = new REST({ version: '10' }).setToken(Env.discord.token as string)

;(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

		await rest.put(
            Routes.applicationGuildCommands(Env.discord.clientId as string, Env.discord.guildTestId as string),
            { body: getCommandsJSON() }
        )

		console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error)
    }

})()