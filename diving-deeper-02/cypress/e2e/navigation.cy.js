/// <reference types="Cypress"/>

describe("Home page", () => {
  it("should navigate to the home page", () => {
    cy.visit("http://localhost:5173/");
    cy.get("[data-cy='header-about-link']").click();
    cy.location("pathname").should("eq", "/about");
    cy.go("back");
    cy.location("pathname").should("eq", "/");
    cy.get("[data-cy='header-about-link']").click();
    cy.get("[data-cy='header-home-link']").click();
    cy.location("pathname").should("eq", "/");
  });
});
