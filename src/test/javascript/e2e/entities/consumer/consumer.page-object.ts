import { element, by, ElementFinder } from 'protractor';

export class ConsumerComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-consumer div table .btn-danger'));
  title = element.all(by.css('jhi-consumer div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getText();
  }
}

export class ConsumerUpdatePage {
  pageTitle = element(by.id('jhi-consumer-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  firstnameInput = element(by.id('field_firstname'));
  lastnameInput = element(by.id('field_lastname'));
  phoneNumberInput = element(by.id('field_phoneNumber'));
  dateOfBirthInput = element(by.id('field_dateOfBirth'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setFirstnameInput(firstname: string): Promise<void> {
    await this.firstnameInput.sendKeys(firstname);
  }

  async getFirstnameInput(): Promise<string> {
    return await this.firstnameInput.getAttribute('value');
  }

  async setLastnameInput(lastname: string): Promise<void> {
    await this.lastnameInput.sendKeys(lastname);
  }

  async getLastnameInput(): Promise<string> {
    return await this.lastnameInput.getAttribute('value');
  }

  async setPhoneNumberInput(phoneNumber: string): Promise<void> {
    await this.phoneNumberInput.sendKeys(phoneNumber);
  }

  async getPhoneNumberInput(): Promise<string> {
    return await this.phoneNumberInput.getAttribute('value');
  }

  async setDateOfBirthInput(dateOfBirth: string): Promise<void> {
    await this.dateOfBirthInput.sendKeys(dateOfBirth);
  }

  async getDateOfBirthInput(): Promise<string> {
    return await this.dateOfBirthInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ConsumerDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-consumer-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-consumer'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
