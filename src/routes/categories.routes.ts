import { Router } from 'express';

import CreateCategoryService from '../services/CreateCategoryService';
import ListCategoriesService from '../services/ListCategoriesService';
import SelectUserCategoriesService from '../services/SelectUserCategoriesService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const categoriesRouter = Router();

categoriesRouter.use(ensureAuthenticated);

categoriesRouter.get('/', async (request, response) => {
  const listCategories = new ListCategoriesService();

  const categories = await listCategories.execute();

  return response.json(categories);
});

categoriesRouter.post('/', async (request, response) => {
  try {
    const { name, image_url } = request.body;

    const createCategory = new CreateCategoryService();

    const category = await createCategory.execute({
      name,
      image_url,
    });

    return response.json(category);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

categoriesRouter.put('/', async (request, response) => {
  const { id } = request.user;
  const { categories } = request.body;

  const selectUserCategories = new SelectUserCategoriesService();

  const result = await selectUserCategories.execute({
    id,
    categories,
  });

  return response.json(result);
});

export default categoriesRouter;
