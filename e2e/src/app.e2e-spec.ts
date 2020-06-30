import {browser} from 'protractor';

import {AppPage} from './app.po';

const expectedText = 'CRUD Application for Project Administration';
const expectedTitle = 'angular9-crud-projects';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeAll(() => {
    browser.get('');
  });

  beforeEach(() => {
    page = new AppPage();
  });

  it(`has title '${expectedTitle}'`, () => {
    expect(browser.getTitle()).toContain(expectedTitle);
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toContain(expectedText);
  });
});
