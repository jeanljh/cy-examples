///<reference types="cypress"/>
import mainPage from "../pages/main.page";
import data from "../fixtures/data.json";

describe("test suite", () => {
  beforeEach(() => {
    cy.visit("task.html");
  });

  it("test dropdown", () => {
    mainPage.dropdown
      .find("option:selected")
      .should("have.value", "option1");
    mainPage.dropdown.select("option2");
    mainPage.dropdown
      .find("option:selected")
      .should("have.value", "option2");
  });
  
  it("test upload image", () => {
    mainPage.img.should("not.exist");
    mainPage.inputImg.selectFile(data.pathImage);
    mainPage.img.should("exist");
  });
  
  it("test open new tab", () => {
    cy.window().then((win) => {
      cy.stub(win, "open").as("tab");
    });
    mainPage.btnOpenTab.click();
    cy.get("@tab").should("be.calledWith", "https://easygenerator.com");
  });
  
  it("test invoke an alert modal - custom alert text", () => {
    cy.window().then((win) => {
      cy.stub(win, "alert").as("alert");
    });
    cy.task("readFile", data.pathAlertText).then((text) => {
      mainPage.btnAlert
        .invoke("attr", "onclick", `window.alert("${text}")`)
        .click();
      cy.get("@alert").should("have.been.calledOnceWith", text);
    });
  });

  it("test invoke an alert modal - no name | default alert text", () => {
    mainPage.btnAlert.click();
    cy.on("window:alert", (text) => {
      expect(text).to.eq(
        "Hello , share this practice page and share your knowledge"
      );
    });
  });

  it("test invoke an alert modal - name | default alert text", () => {
    mainPage.inputName.type(data.name);
    mainPage.btnAlert.click();
    cy.on("window:alert", (text) => {
      expect(text).to.eq(
        `Hello ${data.name}, share this practice page and share your knowledge`
      );
    });
  });

  it("test invoke a confirm modal - no name | default alert text | confirm", () => {
    mainPage.btnConfirm.click();
    cy.on("window:confirm", (text) => {
      expect(text).to.eq("Hello , Are you sure you want to confirm?");
      return true;
    });
  });

  it("test invoke a confirm modal - no name | default alert text | cancel", () => {
    mainPage.btnConfirm.click();
    cy.on("window:confirm", (text) => {
      expect(text).to.eq("Hello , Are you sure you want to confirm?");
      return false;
    });
  });

  it("test invoke a confirm modal - name | default alert text | confirm", () => {
    mainPage.inputName.type(data.name);
    mainPage.btnConfirm.click();
    cy.on("window:confirm", (text) => {
      expect(text).to.eq(`Hello ${data.name}, Are you sure you want to confirm?`);
      return true;
    });
  });

  it("test invoke a confirm modal - name | default alert text | cancel", () => {
    mainPage.inputName.type(data.name);
    mainPage.btnConfirm.click();
    cy.on("window:confirm", (text) => {
      expect(text).to.eq(`Hello ${data.name}, Are you sure you want to confirm?`);
      return false;
    });
  });
  
  it("test show/hide the input", () => {
    mainPage.btnHide.click();
    mainPage.inputDisplayed.should("not.be.visible");
    mainPage.btnShow.click();
    mainPage.inputDisplayed.should("be.visible");
  });
  
  it("test mouse hover", () => {
    mainPage.btnMouseHover.trigger("mouseover");
    mainPage.aTop.click();
    cy.window().its("scrollY").should("eq", 0);
    cy.intercept("GET", "task.html").as(
      "html"
    );
    mainPage.aReload.click();
    cy.wait("@html").its("response.statusCode").should("eq", 200);
  });
  
  it("test - iframe", () => {
    mainPage.iframeBody
    mainPage.divLangBar.click({ force: true })
    mainPage.liLang.click({ force: true })
    cy.wait(2000)
    mainPage.divTopLinks.each((e, i) => {
      expect(e.text().trim()).to.eq(data.topLinks[i])
    })
  });
});