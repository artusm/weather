describe('Theme switcher', () => {
    before(() => {
        cy.visit('/');
    });

    it('should change theme', () => {
        cy.get('[data-theme]').should('have.attr', 'data-theme', 'nightowl');
        cy.get('[data-qa="theme-switcher"]').click();
        cy.get('[data-qa="theme-snazzy').click();
        cy.get('[data-theme]').should('have.attr', 'data-theme', 'snazzy');
    });
});