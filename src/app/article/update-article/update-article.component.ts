import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.scss'],
})
export class UpdateArticleComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private articleService: ArticleService) {}
  articleId: number;
  ngOnInit(): void {
    this.articleService.getArticle()
  }
}
