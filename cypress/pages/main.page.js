const runThisProjectBtn = 'button';
const addBtn = '.btn-primary';
const dropboxSelector = '.dropbox.ng-isolate-scope';
const previewInfo = '.list-group-item';
const nameFromTable = 'tbody > :nth-child(1) > .ng-binding';

export class MainPage{

    getRunThisProjectBtn(){
        return cy.get(runThisProjectBtn);
    }

    clickRunThisProjectBtn(){
        this.getRunThisProjectBtn().click();
    }

    openMainPage(){
        cy.visit('/');
        this.clickRunThisProjectBtn();
    }

    getAddBtn(){
        return cy.get(addBtn);
    }

    clickAddBtn(){
        this.getAddBtn().click();
    }

    getDropboxSelector(){
        return dropboxSelector;
    }

    uploadCertificate(path){
        cy.fixture(path, 'binary')
          .then(Cypress.Blob.binaryStringToBlob)
          .then(fileContent => {
            const testFile = new File([fileContent], path, { type: 'application/x-x509-ca-cert' });
            const dataTransfer = new DataTransfer();
      dataTransfer.items.add(testFile);

      cy.get(this.getDropboxSelector())
        .then(dropbox => {
          const event = new DragEvent('drop', {
            dataTransfer,
            bubbles: true,
            cancelable: true
          });
          dropbox[0].dispatchEvent(event);
        });
    });
    }

    getPreviewInfo(){
        return cy.get(previewInfo).invoke('text').then(text => {
            return text.trim();
        });
    }

    getNameFromTable(){
        return cy.get(nameFromTable).invoke('text').then(text => {
            return text.trim();
        });
    }
}