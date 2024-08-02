/// <reference types="Cypress"/>

describe("Auth", () => {
  beforeEach(() => {
    cy.task("seedDatabase");
  });
  // it("should deal with user signup", () => {
  //   cy.visit("/signup");
  //   cy.get("[data-cy='auth-email']").click();
  //   cy.get("[data-cy='auth-email']").type("test4@example.com");
  //   cy.get("[data-cy='auth-password']").type("p@ssw0rd");
  //   cy.get("[data-cy='auth-submit']").click();
  //   cy.location("pathname").should("eq", "/takeaways");
  //   cy.getCookie("__session").its("value").should("not.be.empty");
  // });

  // it("should login", () => {
  //   cy.visit("/login");
  //   cy.get("[data-cy='auth-email']").click();
  //   cy.get("[data-cy='auth-email']").type("test@example.com");
  //   cy.get("[data-cy='auth-password']").type("testpassword");
  //   cy.get("[data-cy='auth-submit']").click();
  //   cy.location("pathname").should("eq", "/takeaways");
  //   cy.getCookie("__session").its("value").should("not.be.empty");
  // });

  // it("should logout", () => {
  //   cy.login();
  //   cy.contains("Logout").click();
  //   cy.location("pathname").should("eq", "/");
  //   cy.getCookie("__session").its("value").should("be.empty");
  // });

  it("should add a new takeaway", () => {
    cy.intercept("POST", "/takeaways/new*", "Success").as("createTakeAways");
    cy.login();
    cy.visit("/takeaways/new");
    cy.get("[data-cy='title']").click();
    cy.get("[data-cy='title']").type("TestTitle1");
    cy.get("[data-cy='body']").type("TestBody1");
    cy.get("[data-cy='create-takeaway']").click();
    cy.wait("@createTakeAways")
      .its("request.body")
      .should("match", /TestTitle1.*TestBody1/);
  });
});
