const { BlogPost, Category, PostCategory, User } = require('../database/models');
const authService = require('./authServices');

const postService = {
  categoryExist: (categoryIds, listCategory) => {
    const verifyCategory = categoryIds.some((element) => listCategory
      .some((element2) => element === element2.id));

    return verifyCategory;
  },
 
  fieldsfilled: (title, content, categoryIds) => {
    const validation = !title || !content || !categoryIds;

    return validation;
  },

  findById: async (id) => {
    const listPostCategory = await BlogPost
      .findAll({ where: { id }, include: [{ model: Category, as: 'blogpost' }] });
    
    return listPostCategory;
  },

  createPostCategory: async (arrayPostCategory) => {
    await PostCategory.create(arrayPostCategory[0]);
    await PostCategory.create(arrayPostCategory[1]);
  },

  createBlogPost: async (idPost, userId, title, content) => {
    const create = await BlogPost.create({ idPost, userId, title, content });
    return create;
  },

  validData: async (title, content, categoryIds) => {
    const listCategory = await Category
      .findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });

    const validate = postService.fieldsfilled(title, content, categoryIds);
    if (validate) {
      const error = new Error('Some required fields are missing');
      error.name = 'ValidationError';
      throw error;
    }

    const ExistCategory = postService.categoryExist(categoryIds, listCategory);

    if (!ExistCategory) {
      const error = new Error('"categoryIds" not found');
      error.name = 'ValidationError';
      throw error;
    }
  },

  registrationCategory: async (authorization, title, content, categoryIds) => {
    const { data: email } = authService.authToken(authorization);

    const allPost = await BlogPost.findAll();
    const idUser = await User.findAll({ where: { email: email.email } });

    await BlogPost.create({
      idPost: allPost.length + 1,
      userId: idUser[0].id,
      title,
      content,
    });

    const idPost = await BlogPost.findOne({ where: { id: allPost.length + 1 } });

    const createPost = categoryIds.reduce((start, end) => 
      start.concat({ categoriesId: end, postId: idPost.id }), []);

    await PostCategory.bulkCreate(createPost);

    const listPostCategory = await BlogPost
      .findAll({ where: { id: allPost.length + 1 }, 
        include: [{ model: Category, as: 'blogpost' }] });

    return listPostCategory;
  },

  listBlogPostAllInformation: async () => {
    const listBlogPost = await BlogPost
      .findAll({
        include: [
        { model: User, 
        as: 'user', 
        attributes: { exclude: ['password'] } },
        { 
        model: Category, 
        as: 'categories' }],
        attributes: { exclude: ['createdAt, updatedAt'] },
      });
    return listBlogPost;
  },
};

module.exports = postService;