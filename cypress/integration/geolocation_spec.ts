describe('Geolocation', () => {
    Cypress.browser.isHeaded &&
    it('should show error message on geolocation error', () => {
        cy.visit('/', {
            onBeforeLoad(window) {
                cy.stub(
                    window.navigator.geolocation,
                    'getCurrentPosition'
                ).callsFake((callback, error) => {
                    return error({ code: 1 });
                });
            },
        });

        cy.get('[data-qa="weather-error"]').should('exist');
    });
});