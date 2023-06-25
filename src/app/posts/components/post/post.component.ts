import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedService } from 'src/app/shared/services/shared.service';
import { PostsService } from '../../service/posts.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  isAuthenticated: boolean = false;
  imagePath: any;
  userDetails: any;
  liked: boolean = false;
  likeArray: any[] = [];
  @Input() post: any;

  constructor(
    private _sanitizer: DomSanitizer,
    private postService: PostsService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(
      this.post.selectedFile
    );

    this.authService.isAuthenticated.subscribe((data: boolean) => {
      this.isAuthenticated = data;
      if (this.isAuthenticated) {
        this.userDetails = this.authService.getUserDetails();
        this.likeArray = this.post?.likes;
        if (
          this.post.likes.includes(this.userDetails._id) ||
          this.post.likes.includes(this.userDetails.id)
        ) {
          this.liked = true;
        } else {
          this.liked = false;
        }
      }
    });
  }

  editPost() {
    this.postService.editPostEvent.next(this.post);
  }

  deletePost() {
    this.postService.deletePost(this.post._id).subscribe((res: any) => {
      this.postService.refreshPostEvent.next(true);
    });
  }

  likePost() {
    this.postService.likePost(this.post._id).subscribe((res: any) => {
      this.post = res;
      this.likeArray = this.post?.likes;
      if (
        this.post.likes.includes(this.userDetails._id) ||
        this.post.likes.includes(this.userDetails.id)
      ) {
        this.liked = true;
      } else {
        this.liked = false;
      }
    });
  }
}
