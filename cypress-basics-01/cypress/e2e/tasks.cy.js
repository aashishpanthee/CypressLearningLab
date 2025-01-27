/// <reference types = "Cypress"/>

describe("tasks management", () => {
  it("should open and close the new task modal", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Add Task").click();
    cy.get(".backdrop").click({ force: true });
    cy.get(".backdrop").should("not.exist");
    cy.get("modal").should("not.exist");
    cy.contains("Add Task").click();
    cy.contains("Cancel").click();
    cy.get(".backdrop").should("not.exist");
    cy.get(".modal").should("not.exist");
  });

  it("should create a new task", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Add Task").click();
    cy.get("#title").type("New Task");
    cy.get("#summary").type("Some description");
    cy.get(".modal").contains("Add Task").click();
    cy.get(".backdrop").should("not.exist");
    cy.get(".modal").should("not.exist");
    cy.get(".task-list .task").should("have.length", 1);
    cy.get(".task-list .task h2").contains("New Task");
    cy.get(".task-list .task p").contains("Some description");
  });

  it("should validate user input", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Add Task").click();
    cy.get(".modal").contains("Add Task").click();
    cy.get(".modal").contains("Please provide values");
  });

  it("should filter tasks", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#task-control").contains("Add Task").click();
    cy.get("#title").type("New Task");
    cy.get("#summary").type("Some description");
    cy.get("#category").select("urgent");
    cy.get(".modal").contains("Add Task").click();
    cy.get(".task-list .task").should("have.length", 1);
    cy.get("#task-control #filter").select("moderate");
    cy.get(".task-list .task").should("have.length", 0);
    cy.get("#filter").select("urgent");
    cy.get(".task-list .task").should("have.length", 1);
    cy.get("#filter").select("all");
    cy.get(".task-list .task").should("have.length", 1);
  });

  it("should add multiple tasks", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#task-control").contains("Add Task").click();
    cy.get("#title").type("New Task");
    cy.get("#summary").type("Some description");
    cy.get(".modal").contains("Add Task").click();
    cy.get(".task").should("have.length", 1);

    cy.get("#task-control").contains("Add Task").click();
    cy.get("#title").type("Second New Task");
    cy.get("#summary").type("Some new description");
    cy.get(".modal").contains("Add Task").click();
    cy.get(".task").should("have.length", 2);
    cy.get(".task").eq(0).contains("New Task");
    cy.get(".task").eq(1).contains("Second New Task");
  });
});
