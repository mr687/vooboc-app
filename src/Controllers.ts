import { Request, Response } from 'express'
import { InteractionType, InteractionResponseType, MessageFlags, APIInteraction } from 'discord-api-types/v10'
import { ErrorType } from './Error'
import { getCommand } from './Commands'
import Env from './Env'
import { replyEphemeralMessage } from './Util'

export function NewInteractions (req: Request, res: Response) {
    const interaction = req.body as APIInteraction
    const { type, data, member } = interaction

    if (type === InteractionType.Ping) {
        res.json({
            type: InteractionResponseType.Pong
        })
    }

    else if (type === InteractionType.ApplicationCommand) {
        const command = getCommand(data.name)

        if (command) {
            if (command.adminOnly && member?.user.id !== Env.discord.adminId) {
                res.json(replyEphemeralMessage('You are not allowed to use this command!'))                
            } else {
                command.handler(res, interaction)
            }
        }
    }

    else {
        throw { status: ErrorType.BAD_REQUEST, message: 'Invalid interaction type' }
    }
}