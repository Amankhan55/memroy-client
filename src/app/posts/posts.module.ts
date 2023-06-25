import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/post/post.component';
import { SharedModule } from '../shared/shared.module';
import { PostFormComponent } from './components/post-form/post-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PostsComponent, PostComponent, PostFormComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    PostsRoutingModule,
    SharedModule,
  ],
})
export class PostsModule {}
