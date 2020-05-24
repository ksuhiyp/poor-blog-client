import { TestBed } from '@angular/core/testing';

import { ArticleResolver } from './article-resolver.service';

describe('ArticleResolverService', () => {
  let service: ArticleResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
