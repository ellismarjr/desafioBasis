import { TestBed, async, inject } from '@angular/core/testing';

import { EmpresaResolverGuard } from './empresa-resolver.guard';

describe('EmpresaResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmpresaResolverGuard]
    });
  });

  it('should ...', inject([EmpresaResolverGuard], (guard: EmpresaResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
