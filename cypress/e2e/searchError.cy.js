describe('Gestion des recherches infructueuses', () => {
    it('Affiche un message lorsque la recherche échoue', () => {
        cy.visit('http://localhost:5173')

        cy.contains('il n’y a pas de résultat').should('not.exist')

        cy.get('input[placeholder="Rechercher un Pokémon"]').type('xyzzy')
        cy.contains('button', 'Chercher').click()

        cy.contains('il n’y a pas de résultat', { timeout: 50000 }).should(
            'be.visible'
        )
    })
})
