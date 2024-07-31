/// <reference types="Cypress"/>

describe("tasks page", () => {
  it("should render the main image", () => {
    cy.visit("http://localhost:5173/");
    cy.get(".main-header").find("img");
    // cy.get(".main-header img");  also works
  });
  it("should render the main title", () => {
    cy.visit("http://localhost:5173/");
    cy.get("h1").should("exist");
    cy.get("h1").should("length", 1);
    cy.get("h1").contains("My Cypress Course Tasks");
  });
});
