describe("App", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("#container", "Ready to create an app?");
  });
});
