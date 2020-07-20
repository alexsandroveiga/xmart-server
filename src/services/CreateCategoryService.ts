import { getRepository } from 'typeorm';

import Category from '../models/Category';

interface Request {
  name: string;
  image_url: string;
}

class CreateCategoryService {
  public async execute({ name, image_url }: Request): Promise<Category> {
    const categoriesRepository = getRepository(Category);

    const slug = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/([^\w]+|\s+)/g, '-')
      .replace(/\-\-+/g, '-')
      .replace(/(^-+|-+$)/, '')
      .toLowerCase();

    const checkCategoryExists = await categoriesRepository.findOne({
      where: { slug },
    });

    if (checkCategoryExists) {
      throw new Error('Category already exists.');
    }

    const category = categoriesRepository.create({
      name,
      slug,
      image_url,
    });

    await categoriesRepository.save(category);

    return category;
  }
}

export default CreateCategoryService;
