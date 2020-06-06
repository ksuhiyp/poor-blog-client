import { TestBed } from '@angular/core/testing';

import { UpdateArticleDeactivateGuard } from './update-article-deactivate.guard';

describe('UpdateArticleDeactivateGuard', () => {
  let guard: UpdateArticleDeactivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UpdateArticleDeactivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
