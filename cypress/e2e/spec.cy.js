
import { MainPage } from "../pages/main.page.js"

const mainPage = new MainPage();

it('should add a certificate', () => {

  const filePath = "cert.cer"; 

  mainPage.openMainPage();
  mainPage.clickAddBtn();
  mainPage.uploadCertificate(filePath)

  mainPage.getPreviewInfo().then(previewText => {
    mainPage.getNameFromTable().then(tableName => {
      expect(previewText).to.equal(tableName);
    });
  });
});
