import dotenv from 'dotenv'

dotenv.config()

export default {
    port: process.env.PORT || 3000,
    vmId: process.env.VM_ID || '',
    discord: {
        clientId: process.env.DC_CLIENT_ID || null,
        publicKey: process.env.DC_PUBLIC_KEY || null,
        clientSecret: process.env.DC_CLIENT_SECRET || null,
        token: process.env.DC_TOKEN || null,
        guildTestId: process.env.DC_GUILD_TEST_ID || null,
        adminId: process.env.DC_ADMIN_ID || null,
    },
    idCloudhost: {
        apiKey: process.env.IDC_API_KEY || null,
    }
}