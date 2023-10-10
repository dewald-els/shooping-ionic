describe("App", () => {
  it("Visits the app root url", () => {
    cy.visit("/home");
    cy.contains("h1", "Everything Edible");
  });
});
