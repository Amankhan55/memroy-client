import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/auth/auth.service';
import { PostsService } from '../../service/posts.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  title = 'Create a memory';
  isAuthenticated = false;
  postForm!: FormGroup;
  editPostId = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private postService: PostsService
  ) {}

  ngOnInit(): void {
    this.title = 'Create a memory';
    this.authService.isAuthenticated.subscribe((data: boolean) => {
      this.isAuthenticated = data;
      if (this.isAuthenticated) {
        this.createPostForm();
      }
    });

    this.postService.editPostEvent.subscribe((data: any) => {
      if (data.title !== undefined) {
        this.title = 'Edit the memory';
        this.editPostId = data._id;
        this.postForm.patchValue({
          title: data.title,
          message: data.message,
          tags: data.tags.join(','),
          selectedFile: data.selectedFile,
        });
      } else {
        this.title = 'Create a memory';
        this.editPostId = null;
      }
    });
  }

  createPostForm() {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      message: ['', Validators.required],
      tags: ['', Validators.required],
      selectedFile: [null],
    });
  }

  uploadFile(event: any) {
    const element = event.target as HTMLInputElement;
    if (!element.files) return;

    const uploadedfile = element.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(uploadedfile);
    reader.onload = () => {
      this.postForm.patchValue({
        selectedFile: reader.result,
      });
    };
  }

  submitPostForm() {
    if (this.postForm.valid) {
      let payload = this.postForm.value;
      let userDetails = this.authService.getUserDetails();
      payload.name = userDetails.name;
      payload.tags = payload.tags.split(',');

      if (this.title === 'Create a memory') {
        this.postService.createPost(payload).subscribe((res: any) => {
          this.clearPostForm();
          this.postService.refreshPostEvent.next(true);
        });
      } else {
        this.postService
          .updatePost(payload, this.editPostId)
          .subscribe((res: any) => {
            this.clearPostForm();
            this.postService.refreshPostEvent.next(true);
          });
      }
    }
  }

  clearPostForm() {
    this.title = 'Create a memory';
    this.postForm.reset();
    this.postForm.patchValue({ selectedFile: null });
    (document.getElementById('fileId') as HTMLInputElement).value = '';
    this.postService.editPostEvent.next({});
    this.editPostId = null;
  }
}
