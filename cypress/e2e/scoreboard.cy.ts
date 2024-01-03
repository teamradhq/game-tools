describe('game scoreboard', () => {
  beforeEach(() => {
    cy.visit('/game-scoreboard');
  });

  it('should link to home page', () => {
    cy.hasHomePageLink();
  });
});
