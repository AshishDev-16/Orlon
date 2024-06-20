import { Client } from '@planetscale/database'
import { PrismaPlanetScale } from '@prisma/adapter-planetscale'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import { fetch as undiciFetch } from 'undici'

const runtime = "edge";

dotenv.config()
const connectionString = `${process.env.DATABASE_URL}`

const client = new Client({ url: connectionString, fetch: undiciFetch })
const adapter = new PrismaPlanetScale(client)
const prisma = new PrismaClient({ adapter })

async function main() {
  const posts = await prisma.userApiLimit.findMany()
  console.log(posts)
}