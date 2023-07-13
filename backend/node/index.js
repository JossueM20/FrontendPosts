const express = require('express');
const db = require('./db');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(cors({origin: 'http://localhost:4200'}));


app.get('/', (req, res) => {
    res.send("Hello World")
})


app.post('/posts', async (req, res) => {
  const {titulo, contenido} = req.body;
  try {
    const createdPost = await db.createPost(titulo, contenido);
    res.status(201).json(createdPost);
  } catch (error) {
    console.error('Error al crear el post:', error);
    res.status(500).json({ error: 'Error al crear el post' });
  }
});

app.put('/posts/:id_posts', async (req, res) => {
  const { id_posts } = req.params;
  const { titulo, contenido} = req.body;

  try {
    const updatedPost = await db.updatePost(id_posts, titulo, contenido);
    res.json(updatedPost);
  } catch (error) {
    console.error('Error al modificar el post:', error);
    res.status(500).json({ error: 'Error al modificar el post' });
  }
});

// Eliminar un post
app.delete('/posts/:id_posts', async (req, res) => {
  const { id_posts } = req.params;

  try {
    await db.deletePost(id_posts);
    res.sendStatus(204);
  } catch (error) {
    console.error('Error al eliminar el post:', error);
    res.status(500).json({ error: 'Error al eliminar el post' });
  }
});

app.get('/posts', async (req, res) => {
  try {
    const posts = await db.getPosts();
    res.json(posts);
  } catch (error) {
    console.error('Error al obtener los posts:', error);
    res.status(500).json({ error: 'Error al obtener los posts' });
  }
});


app.listen(3000, () => {
    console.log("Listening on Port 3000")
})
