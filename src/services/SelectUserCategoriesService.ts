import { getRepository } from 'typeorm';

import User from '../models/User';
import Category from '../models/Category';

interface Request {
  id: string;
  categories: string[];
}

class SelectUserCategoriesService {
  public async execute({ id, categories }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    const categoriesRepository = getRepository(Category);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new Error('Invalid user id');
    }

    const findCategories = await categoriesRepository.findByIds(categories);

    if (!findCategories) {
      throw new Error('Invalid categories ids');
    }

    user.categories = findCategories;

    await usersRepository.save(user);

    return user;
  }
}

export default SelectUserCategoriesService;
