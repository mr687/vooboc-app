import tweetnacl from 'tweetnacl'
import Env from './Env'
import { Request, Response } from 'express'
import { APIInteraction, APIInteractionResponse, InteractionResponseType, MessageFlags } from 'discord-api-types/v10'

export const validateDiscordSignature = (req: Request) => {
    const stringify = JSON.stringify
    const bufferFrom = Buffer.from

    const signature = req.get('X-Signature-Ed25519') as string
    const timestamp = parseInt(req.get('X-Signature-Timestamp') as string)
    const bodyString = stringify(req.body)

    const isVerified = tweetnacl.sign.detached.verify(
        bufferFrom(timestamp + bodyString),
        bufferFrom(signature, 'hex'),
        bufferFrom(Env.discord.publicKey as string, 'hex')
    )

    return isVerified
}

export const replyMessage = (message: string, ephemeral: boolean = false): APIInteractionResponse => {
    return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
            content: message,
            flags: ephemeral ? MessageFlags.Ephemeral : undefined
        }
    }
}

export const replyEphemeralMessage = (message: string): APIInteractionResponse => {
    return replyMessage(message, true)
}