import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../service/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  postsData: any[] = [];
  currentPage: number = 0;
  numberOfPages: number = 0;
  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.getPostsData();

    this.postsService.refreshPostEvent.subscribe((data: boolean) => {
      if (data) {
        this.getPostsData();
      }
    });
  }

  getPostsData() {
    this.postsService.getPosts().subscribe((res: any) => {
      this.postsData = res.data;
      this.currentPage = res.currentPage;
      this.numberOfPages = res.numberOfPages;
    });
  }
}
