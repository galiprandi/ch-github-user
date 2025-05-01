describe("GitHub Users Directory", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://api.github.com/users/**", {
      fixture: "github-user.json",
    }).as("getUser");

    cy.intercept("GET", "https://api.github.com/users/**/repos", {
      fixture: "github-repos.json",
    }).as("getRepos");
  });

  it("should display home page with search functionality", () => {
    cy.visit("/");

    // Verify home page elements
    cy.get('input[placeholder="Search users"]').should("be.visible");

    // Perform a search
    cy.get('input[placeholder="Search users"]').type("octocat");
    cy.get('input[placeholder="Search users"]').type("{enter}");

    // Verify search results
    cy.get("table").should("be.visible");
    cy.get("table").should("contain", "octocat");
  });

  it("should be handle not found search results", () => {
    const query = "------NOT_FOUND------";
    cy.visit("/");

    // Perform a search
    cy.get('input[placeholder="Search users"]').type(query);
    cy.get('input[placeholder="Search users"]').type("{enter}");

    // Verify search results
    cy.contains(`No users found for "${query}".`);
  });

  it("should display user details page", () => {
    cy.visit("/users/octocat");

    // Verify user details page
    cy.url().should("include", "/users/octocat");
    cy.get("h2").should("contain", "The Octocat");
    cy.get(".grid").should("be.visible");
    cy.get("img").should("be.visible");
    cy.get("ul").should("be.visible");
    cy.get("ul").should("contain", "GitHub");
    cy.get("ul").should("contain", "San Francisco");
  });

  it("should display user repositories page", () => {
    cy.visit("/users/octocat/repos");

    // Verifica la URL y el nombre del usuario
    cy.url().should("include", "/users/octocat/repos");
    cy.get("h1").should("contain", "The Octocat");

    // Verifica la tabla de repositorios y sus datos principales
    cy.get("table").should("be.visible");
    cy.get("table").should("have.length.greaterThan", 0);
    cy.get("table").should("contain", "Hello-World");
    cy.get("table").should("contain", "My first repository on GitHub.");
    cy.get("table").should("contain", "542");
  });
});
