import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: any[]=[];
  newPost: { id_posts: number, titulo: string, contenido: string } = { id_posts: 0, titulo: '', contenido: '' };
  editMode = false; // Por defecto, comenzamos en modo de creación

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getPosts();
    this.resetForm();
  }

  getPosts() {
    this.http.get<any[]>('http://localhost:3000/posts').subscribe(
      (response) => {
        this.posts = response;
      },
      (error) => {
        console.error('Error al obtener los posts:', error);
      }
    );
  }

  getPostById(postId: number){
    return this.http.get<any>(`http://localhost:3000/posts/${postId}`);
  }

  createPost() {
    this.http.post<any>('http://localhost:3000/posts', this.newPost).subscribe(
      (response) => {
        this.posts.push(response);
        this.newPost = { id_posts: 0, titulo: '', contenido: '' };
      },
      (error) => {
        console.error('Error al crear el post:', error);
      }
    );
  }

  /*editPost(postId: any) {
    const updatedPost = {
      titulo: postId.titulo, // Actualiza el título del post según sea necesario
      contenido: postId.contenido // Actualiza el contenido del post según sea necesario
    };

    this.http.put<any>(`http://localhost:3000/posts/${postId}`, updatedPost).subscribe(
      (response) => {
        // Actualiza el post modificado en la lista de posts
        const index = this.posts.findIndex(p => p.id_posts === postId.id_posts);
        this.posts[index] = response;
      },
      (error) => {
        console.error('Error al modificar el post:', error);
      }
    );
  }*/

  editPost(post: any) {
    this.editMode = true;
    this.newPost = {
      id_posts: post.id_posts,
      titulo: post.titulo,
      contenido: post.contenido
    };
  }

  updatePost() {
    const postId = this.newPost.id_posts;
    this.http.put<any>(`http://localhost:3000/posts/${postId}`, this.newPost).subscribe(
      (response) => {
        console.log('Post actualizado exitosamente:', response);
        this.getPosts(); // Actualizar la lista de posts después de la actualización
        this.resetForm();
      },
      (error) => {
        console.error('Error al actualizar el post:', error);
      }
    );
  }

  deletePost(postId: number) {
    this.http.delete(`http://localhost:3000/posts/${postId}`).subscribe(
      () => {
        // Elimina el post de la lista de posts
        this.posts = this.posts.filter(p => p.id_posts !== postId);
      },
      (error) => {
        console.error('Error al eliminar el post:', error);
      }
    );
  }

  resetForm() {
    this.editMode = false;
    this.newPost = {
      id_posts: 0,
      titulo: '',
      contenido: ''
    };
  }

}
