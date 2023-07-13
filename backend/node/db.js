const { Pool } = require('pg');

const pool = new Pool({
  user: 'jossue',
  password: 'jossue2002',
  host: '172.17.0.2',
  database: 'proyecto',
  port: 5432,
});

// Crear un post
const createPost = async (titulo, contenido) => {
  const query = 'INSERT INTO posts (titulo, contenido, created_at) VALUES ($1, $2, NOW()) RETURNING *';
  const values = [titulo, contenido];
  try {
    const result = await pool.query(query, values);
    console.log('Post creado exitosamente');
    return result.rows[0];
  } catch (error) {
    console.error('Error al crear el post:', error);
    throw error;
  }
};

// Modificar un post
const updatePost = async (id_posts, titulo, contenido) => {
  const query = 'UPDATE posts SET titulo = $1, contenido = $2 WHERE id_posts = $3 RETURNING *';
  const values = [titulo, contenido, id_posts];

  try {
    const result = await pool.query(query, values);
    console.log('Post actualizado exitosamente');
    return result.rows[0];
  } catch (error) {
    console.error('Error al modificar el post:', error);
    throw error;
  }
};

// Eliminar un post
const deletePost = async (id_posts) => {
  const query = 'DELETE FROM posts WHERE id_posts = $1';
  const values = [id_posts];

  try {
    await pool.query(query, values);
    console.log('Post eliminado exitosamente');
  } catch (error) {
    console.error('Error al eliminar el post:', error);
    throw error;
  }
};

// Obtener todos los posts
const getPosts = async () => {
  const query = 'SELECT * FROM posts';
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error al obtener los posts:', error);
    throw error;
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPosts,
};

/*module.exports = {
  getUsers,
};*/