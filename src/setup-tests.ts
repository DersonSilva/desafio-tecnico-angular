import '@analogjs/vite-plugin-angular/setup-vitest';
import 'zone.js';
import 'zone.js/testing';
import { beforeAll } from 'vitest';

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

beforeAll(() => {
  getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
});
