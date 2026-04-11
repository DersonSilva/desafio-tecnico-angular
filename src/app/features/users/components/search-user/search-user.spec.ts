import { render } from '@testing-library/angular';
import { describe, it, expect, vi } from 'vitest';
import { SearchUserComponent } from './search-user';
import '../../../../../setup-tests';

describe('SearchUserComponent', () => {
  // ✅ 1. cria componente
  it('should create', async () => {
    const { fixture } = await render(SearchUserComponent);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });

  // ✅ 2. emite valor ao digitar
  it('should emit search value', async () => {
    const { fixture } = await render(SearchUserComponent);
    const component = fixture.componentInstance;

    const spy = vi.spyOn(component.searchChange, 'emit');

    component.searchControl.setValue('bruno');

    // espera debounce
    await new Promise((r) => setTimeout(r, 350));

    expect(spy).toHaveBeenCalledWith('bruno');
  });

  // ✅ 3. emite string vazia quando null
  it('should emit empty string when value is null', async () => {
    const { fixture } = await render(SearchUserComponent);
    const component = fixture.componentInstance;

    const spy = vi.spyOn(component.searchChange, 'emit');

    component.searchControl.setValue(null);

    await new Promise((r) => setTimeout(r, 350));

    expect(spy).toHaveBeenCalledWith('');
  });
});
