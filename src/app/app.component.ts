import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunicatorService } from './shared/services/communicator.service';
import { tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CreateArticleDTO } from './article/article';
import { CreateArticleComponent } from './article/create-article/create-article.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: ActivatedRoute, private communicator: CommunicatorService, private dialog: MatDialog) {}
  title = 'poor-blog-client';
  isOnArticlePost;

  ngOnInit(): void {}

  private renderPostArticleBtn() {
    this.communicator.urlSegmant
      .pipe(
        tap((urlSegmant) => {
          if (urlSegmant[0].path === 'post') {
            this.isOnArticlePost = true;
          } else {
            this.isOnArticlePost = false;
          }
        })
      )
      .subscribe();
  }

  openAddArticleModal() {
    const dialogRef = this.dialog.open(CreateArticleComponent, { width: '400px', data: {} });
  }
}
