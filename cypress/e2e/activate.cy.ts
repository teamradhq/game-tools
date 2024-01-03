describe('app activation', () => {
  it('should load the page', () => {
    cy.visit('/');
    cy.contains('Game Tools');
  });
});
