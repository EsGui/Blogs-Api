const { BlogPost, Category, PostCategory } = require('../database/models');

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
};

module.exports = postService;