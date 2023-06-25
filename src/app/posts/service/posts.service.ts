import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  refreshPostEvent = new BehaviorSubject(false);
  editPostEvent = new BehaviorSubject({});

  constructor(private http: HttpClient) {}

  getPosts() {
    let url = `http://localhost:5000/posts`;
    return this.http.get(url);
  }

  createPost(payload: any) {
    let url = `http://localhost:5000/posts`;
    return this.http.post(url, payload);
  }

  updatePost(payload: any, id: any) {
    let url = `http://localhost:5000/posts/${id}`;
    return this.http.patch(url, payload);
  }

  deletePost(id: any) {
    let url = `http://localhost:5000/posts/${id}`;
    return this.http.delete(url);
  }

  likePost(id: any) {
    let url = `http://localhost:5000/posts/${id}/likePost`;
    return this.http.patch(url, {});
  }
}
