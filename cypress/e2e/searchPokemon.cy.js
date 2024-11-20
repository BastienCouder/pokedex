describe("Recherche de cartes Pokémon", () => {
  it("Effectue une recherche et affiche les résultats", () => {
    cy.visit("http://localhost:5173");

    cy.contains("button", "Chercher").should("exist");

    cy.get('input[placeholder="Rechercher un Pokémon"]').should("exist");

    cy.get('input[placeholder="Rechercher un Pokémon"]').type("Pikachu");

    cy.contains("button", "Chercher").click();

    cy.get(".grid .group", { timeout: 10000 }).should(
      "have.length.greaterThan",
      0
    );
  });
});
