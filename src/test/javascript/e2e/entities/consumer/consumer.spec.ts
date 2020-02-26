import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ConsumerComponentsPage, ConsumerDeleteDialog, ConsumerUpdatePage } from './consumer.page-object';

const expect = chai.expect;

describe('Consumer e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let consumerComponentsPage: ConsumerComponentsPage;
  let consumerUpdatePage: ConsumerUpdatePage;
  let consumerDeleteDialog: ConsumerDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Consumers', async () => {
    await navBarPage.goToEntity('consumer');
    consumerComponentsPage = new ConsumerComponentsPage();
    await browser.wait(ec.visibilityOf(consumerComponentsPage.title), 5000);
    expect(await consumerComponentsPage.getTitle()).to.eq('Consumers');
    await browser.wait(ec.or(ec.visibilityOf(consumerComponentsPage.entities), ec.visibilityOf(consumerComponentsPage.noResult)), 1000);
  });

  it('should load create Consumer page', async () => {
    await consumerComponentsPage.clickOnCreateButton();
    consumerUpdatePage = new ConsumerUpdatePage();
    expect(await consumerUpdatePage.getPageTitle()).to.eq('Create or edit a Consumer');
    await consumerUpdatePage.cancel();
  });

  it('should create and save Consumers', async () => {
    const nbButtonsBeforeCreate = await consumerComponentsPage.countDeleteButtons();

    await consumerComponentsPage.clickOnCreateButton();

    await promise.all([
      consumerUpdatePage.setFirstnameInput('firstname'),
      consumerUpdatePage.setLastnameInput('lastname'),
      consumerUpdatePage.setPhoneNumberInput('phoneNumber'),
      consumerUpdatePage.setDateOfBirthInput('2000-12-31')
    ]);

    expect(await consumerUpdatePage.getFirstnameInput()).to.eq('firstname', 'Expected Firstname value to be equals to firstname');
    expect(await consumerUpdatePage.getLastnameInput()).to.eq('lastname', 'Expected Lastname value to be equals to lastname');
    expect(await consumerUpdatePage.getPhoneNumberInput()).to.eq('phoneNumber', 'Expected PhoneNumber value to be equals to phoneNumber');
    expect(await consumerUpdatePage.getDateOfBirthInput()).to.eq('2000-12-31', 'Expected dateOfBirth value to be equals to 2000-12-31');

    await consumerUpdatePage.save();
    expect(await consumerUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await consumerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Consumer', async () => {
    const nbButtonsBeforeDelete = await consumerComponentsPage.countDeleteButtons();
    await consumerComponentsPage.clickOnLastDeleteButton();

    consumerDeleteDialog = new ConsumerDeleteDialog();
    expect(await consumerDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Consumer?');
    await consumerDeleteDialog.clickOnConfirmButton();

    expect(await consumerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
