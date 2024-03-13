import type {Request, Response} from 'express'
import { prisma } from '../../lib/prisma';
import { hash } from 'bcrypt';

export async function createUser(req: Request, res: Response) {
  const { name, username, password } = req.body;
  const findUsername = await prisma.user.findUnique({
    where: {
      username
    }
  })
  
  if(findUsername){
    return res.status(400).json({ error: 'Username already in use'})
  }
  
  const hash_password = await hash(password, 8)
  const user = await prisma.user.create({
    data: {
      name,
      username,
      password: hash_password
    }
  })
  return res.json( user )
}