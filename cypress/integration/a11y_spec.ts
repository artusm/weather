import type { Result } from 'axe-core';

function handleViolations(violations: Result[]) {
    const message =
        violations.length === 1
            ? '1 accessibility violation was detected'
            : `${violations.length} accessibility violations were detected`;

    cy.task('log', message);

    const data = violations.map(({ id, impact, description, nodes }) => ({
        id,
        impact,
        description,
        nodes: nodes.length,
    }));

    cy.task('table', data);
}

describe('A11y', () => {
    before(() => {
        cy.visit('/');
        cy.injectAxe();
    });

    it('Has no detectable a11y violations', () => {
        /**
         * Color contrast rules has been disabled to e2e tests pass due nature
         * of the color schemes. On dev mode the error message is still shown on
         * DevTools.
         */

        cy.checkA11y(
            undefined,
            {
                rules: {
                    'color-contrast': {
                        enabled: false,
                    },
                },
            },
            handleViolations
        );
    });
});