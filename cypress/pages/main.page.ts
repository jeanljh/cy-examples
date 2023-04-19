class MainPage {
  get dropdown() { return cy.get("#dropdown-class-example"); }
  get img() { return cy.get("img"); }
  get inputImg() { return cy.get('input[name="img"]'); }
  get btnOpenTab() { return cy.get("#opentab"); }
  get inputName() { return cy.get("#name"); }
  get btnAlert() { return cy.get("#alertbtn"); }
  get btnConfirm() { return cy.get("#confirmbtn"); }
  get btnHide() { return cy.get("#hide-textbox"); }
  get btnShow() { return cy.get("#show-textbox"); }
  get inputDisplayed() { return cy.get("#displayed-text"); }
  get btnMouseHover() { return cy.get("button.hover-btn"); }
  get aTop() { return cy.contains("a[href]", "Top"); }
  get aReload() { return cy.contains("a[href]", "Reload"); }
  get iframeBody() { return cy.get("#courses-iframe").its("0.contentDocument.body").as("body"); }
  get divLangBar() { return cy.get("@body").find("header div.lang-bar"); }
  get liLang() { return cy.get("@body").find('header li[data-lang="nl"]'); }
  get divTopLinks() { return cy.get("@body").find("div.top-links a"); }
}

export default new MainPage();
