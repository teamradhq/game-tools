describe('hourglass timer', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.get('button[title="Start"]').as('StartButton');
    cy.get('button[title="Pause"]').as('PauseButton');
    cy.get('button[title="Flip"]').as('FlipButton');
    cy.get('button[title="Reset"]').as('ResetButton');

    cy.get('[data-testid="timeInput-minutes"]').as('MinutesInput');
    cy.get('[data-testid="timeInput-seconds"]').as('SecondsInput');
    cy.get('[data-testid="timeOptions-showTime"]').as('ShowTime');
  });

  it('should initialise controls', () => {
    cy.get('@StartButton').should('not.be.disabled');
    cy.get('@PauseButton').should('be.disabled');
    cy.get('@FlipButton').should('be.disabled');
    cy.get('@ResetButton').should('be.disabled');

    cy.get('@MinutesInput').should('not.be.disabled');
    cy.get('@SecondsInput').should('not.be.disabled');
    cy.get('@ShowTime').should('be.checked');
  });

  it('should set a time', () => {
    cy.get('input[type="text"]').eq(0).clear();
    cy.get('input[type="text"]').eq(1).clear();
    cy.get('@MinutesInput').type('1');
    cy.get('@SecondsInput').type('30');
    cy.contains('1:30');
  });

  it('should start the timer', () => {
    cy.get('@StartButton').click();
    cy.get('@StartButton').should('be.disabled');
    cy.get('@PauseButton').should('not.be.disabled');
    cy.get('@FlipButton').should('not.be.disabled');
    cy.get('@ResetButton').should('be.disabled');

    cy.get('@MinutesInput').should('be.disabled');
    cy.get('@SecondsInput').should('be.disabled');
    cy.get('@ShowTime').should('not.be.disabled');
    cy.contains('0:10').should('not.exist');
  });

  it('should hide the time', () => {
    cy.contains('0:10');
    cy.get('@ShowTime').click();
    cy.get('@StartButton').click();
    cy.contains('0:10').should('not.exist');
  });

  it('should pause the timer', () => {
    cy.contains('0:10');

    cy.get('@StartButton').click();
    cy.get('@ResetButton').should('be.disabled');
    cy.contains('0:09');
    cy.contains('0:08');

    cy.get('@PauseButton').click();
    cy.get('@StartButton').should('not.be.disabled');
    cy.get('@PauseButton').should('be.disabled');
    cy.get('@FlipButton').should('not.be.disabled');
    cy.get('@ResetButton').should('not.be.disabled');

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1250);
    cy.contains('0:08');
    cy.get('@StartButton').click();
    cy.contains('0:07');
  });

  it('should flip the timer', () => {
    cy.get('@StartButton').click();
    cy.get('@FlipButton').click();
    cy.contains('0:00');
  });

  it('should flip the timer while paused', () => {
    cy.get('@StartButton').click();
    cy.contains('0:09');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get('@PauseButton').click();
    cy.get('@FlipButton').click();
    cy.contains('0:01');
  });

  it('should run the timer', () => {
    Cypress._.times(8, () => {
      cy.get('.mantine-NumberInput-control').eq(3).click();
    });
    cy.contains('0:02');
    cy.get('@StartButton').click();
    cy.contains('0:01');
    cy.contains('0:00');

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1100);
    cy.get('@StartButton').should('be.disabled');
    cy.get('@PauseButton').should('be.disabled');
    cy.get('@FlipButton').should('be.disabled');
    cy.get('@ResetButton').should('not.be.disabled');
  });
});
