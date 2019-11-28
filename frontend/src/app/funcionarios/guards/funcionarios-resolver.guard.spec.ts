import { TestBed, async, inject } from '@angular/core/testing';

import { FuncionariosResolverGuard } from './funcionarios-resolver.guard';

describe('FuncionariosResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FuncionariosResolverGuard]
    });
  });

  it('should ...', inject([FuncionariosResolverGuard], (guard: FuncionariosResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
