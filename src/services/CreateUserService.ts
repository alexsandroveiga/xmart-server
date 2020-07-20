import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
  type: 'business' | 'personal';
}

class CreateUserService {
  public async execute({ email, password, type }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw Error('E-mail address is already in use.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      email,
      password: hashedPassword,
      type,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
