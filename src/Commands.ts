import { SlashCommandBuilder } from '@discordjs/builders'
import { Response } from 'express'
import { APIInteraction } from 'discord-api-types/v10'
import { replyEphemeralMessage } from './Util'
import BotServer from './BotServer'
import Env from './Env'

interface CommandCollection {
    [name: string]: {
        slash: SlashCommandBuilder,
        adminOnly?: boolean,
        handler: (res: Response, interaction: APIInteraction) => void,
    }
}

const commands: CommandCollection = {
    PING_COMMAND: {
        slash: new SlashCommandBuilder()
            .setName('ping')
            .setDescription('Send a ping to the bot'),
        handler: (res: Response, _: APIInteraction) => {
            res.json(replyEphemeralMessage('Pong!'))
        }
    },
    START_COMMAND: {
        slash: new SlashCommandBuilder()
            .setName('start')
            .setDescription('Start the Vooka server!'),
        handler: async (res: Response, _: APIInteraction) => {
            try {
                res.json(replyEphemeralMessage('Vooka server started!. Please wait for a few minutes for the bot to be ready.'))
                const botServer = new BotServer()
                botServer.startVm(Env.vmId as string)

            } catch (error) {
                console.log(error)
            }
        }
    },
    STOP_COMMAND: {
        slash: new SlashCommandBuilder()
            .setName('stop')
            .setDescription('Stop the Vooka server!'),
        adminOnly: true,
        handler: async (res: Response, _: APIInteraction) => {
            
            try {
                res.json(replyEphemeralMessage('Vooka server will be stopped in a few minutes.'))
                const botServer = new BotServer()
                botServer.stopVm(Env.vmId as string)
            } catch (error) {
                console.log(error)
            }

        }
    },
    STATUS_COMMAND: {
        slash: new SlashCommandBuilder()
            .setName('status')
            .setDescription('Vooka server status!'),
        handler: async (res: Response, _: APIInteraction) => {
            try {
                const botServer = new BotServer()
                const response = await botServer.getVm(Env.vmId as string)
                res.json(replyEphemeralMessage(`Vooka server status: ${response.status}`))
            } catch (error) {
                console.log(error)
            }
        }
    }
}

export const getCommandsJSON = () => {
    const commandsJSON: any[] = []
    Object.values(commands).forEach((command) => {
        commandsJSON.push(command.slash.toJSON())
    })
    return commandsJSON
}

export const getCommand = (name: string) => {
    name = name.toUpperCase() + '_COMMAND'
    return commands[name] || null
}