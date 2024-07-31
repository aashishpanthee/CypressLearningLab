/// <reference types="Cypress"/>

describe("Contact page", () => {
  it("should submit the form", () => {
    cy.visit("http://localhost:5173/about");
    cy.get('[data-cy="contact-input-message"]').type(
      "I am trying to type something in this message section"
    );
    cy.get("[data-cy='contact-input-name']").type("Aashish Panthee");
    cy.get("[data-cy='contact-input-email']").type(
      "wakeupbrother070@gmail.com"
    );
    cy.get("[data-cy='contact-btn-submit']").should(
      "not.have.attr",
      "disabled"
    );
    cy.get("[data-cy='contact-btn-submit']").click();
    cy.get("[data-cy='contact-btn-submit']").contains("Sending...");
    cy.get("[data-cy='contact-btn-submit']").should("have.attr", "disabled");
  });
});
