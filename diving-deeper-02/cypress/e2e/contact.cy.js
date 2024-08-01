/// <reference types="Cypress"/>

describe("Contact page", () => {
  it("should submit the form", () => {
    cy.visit("http://localhost:5173/about");
    cy.get('[data-cy="contact-input-message"]').type(
      "I am trying to type something in this message section"
    );
    cy.get("[data-cy='contact-input-name']").type("Aashish Panthee");
    cy.get("[data-cy='contact-btn-submit']").then((el) => {
      expect(el.attr("disabled")).to.be.undefined;
      expect(el.text()).to.eq("Send Message");
    });
    cy.get("[data-cy='contact-input-email']").type(
      "wakeupbrother070@gmail.com{enter}"
    );
    cy.get("[data-cy='contact-btn-submit']").as("submitBtn"); // aliasing the submit button to use it later
    cy.get("@submitBtn").click();
    cy.get("@submitBtn").contains("Sending...").and("have.attr", "disabled"); // and is used to chain multiple assertions and readability is also improved. so it is being used at last instead of using should.
  });

  it("should validate the form", () => {
    cy.visit("http://localhost:5173/about");
    cy.get("[data-cy='contact-btn-submit']").click();
    cy.get("[data-cy='contact-btn-submit']").then((el) => {
      expect(el).to.not.have.attr("disabled");
      expect(el.text()).to.not.eq("Sending...");
    });
    cy.get("[data-cy='contact-btn-submit']").contains("Send Message");

    cy.get('[data-cy="contact-input-message"]').as("messageInput");
    cy.get("@messageInput").focus().blur();
    cy.get("@messageInput")
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/);

    cy.get('[data-cy="contact-input-name"]').as("nameInput");
    cy.get("@nameInput").focus().blur();
    cy.get("@nameInput")
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/);

    cy.get('[data-cy="contact-input-email"]').as("emailInput");
    cy.get("@emailInput").focus().blur();
    cy.get("@emailInput")
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/);
  });
});
