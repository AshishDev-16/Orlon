
import { PrismaClient } from '@prisma/client/edge'
import dotenv from 'dotenv'


const runtime = "edge";

dotenv.config()
const prisma = new PrismaClient()
async function main() {
  const posts = await prisma.userApiLimit.findMany()
  console.log(posts)
}
export default main()