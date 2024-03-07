import { PostService } from './../services/post.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  postData;
  constructor(
    private authService: AuthService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.postService.loadData().subscribe((val) => {
      console.log(val);

      val.forEach((el) => {
        const data = el.data;
        this.postData = data;
        console.log(this.postData);
      });
    });
  }
  logOut() {
    this.authService.logOut();
  }
}
