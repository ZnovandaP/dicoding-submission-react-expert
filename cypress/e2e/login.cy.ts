/* eslint-disable max-len */
/* eslint-disable jest/expect-expect */
/**
 * - Login spec
 *   - should display login page correctly
 *   - should display input note error and button login disable when email and password is empty
 *   - should display input note error and button login disable when email is not valid pattern
 *   - should display input note error and button login disable when password less than 6 character
 *   - should display input note error and button login disable when password greater than 15 character
 *   - should display toast error when email or password are wrong
 *   - should display toast success when email or password are correct
 *   - should display homepage when username and password are correct
 */

describe('login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('should display login page correctly', () => {
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should display input note error and button login disable when email and password is empty', () => {
    cy.get('button').contains(/^Login$/).click();

    cy.get('p').contains('Email harus diisi').should('be.visible');
    cy.get('p').contains('Password harus diisi').should('be.visible');
    cy.get('button').should('be.disabled');
  });

  it('should display input note error and button login disable when email is not valid pattern', () => {
    cy.get('input[type="email"]').type('testuser@mail.i');
    cy.get('form').submit();

    cy.get('p').contains('Password harus diisi').should('be.visible');
    cy.get('button').should('be.disabled');
  });

  it('should display input note error and button login disable when password less than 6 character', () => {
    cy.get('input[type="password"]').type('12345');
    cy.get('form').submit();

    cy.get('p').contains('Email harus diisi').should('be.visible');
    cy.get('p').contains('Password minimal 6 karakter').should('be.visible');
    cy.get('button').should('be.disabled');
  });

  it('should display input note error and button login disable when password greater than 15 character', () => {
    cy.get('input[type="password"]').type('1234567890abcdef');
    cy.get('form').submit();

    cy.get('p').contains('Email harus diisi').should('be.visible');
    cy.get('p').contains('Password maksimal 15 karakter').should('be.visible');
    cy.get('button').should('be.disabled');
  });

  it('should display toast error when email or password are wrong', () => {
    cy.get('input[type="password"]').type('12345678');
    cy.get('input[type="email"]').type('testuser@mail.id');
    cy.get('form').submit();

    cy.get('div.Toastify__toast--error').should('be.visible');
  });

  it('should display toast success when email or password are correct', () => {
    cy.get('input[type="email"]').type('nenenk@mail.id');
    cy.get('input[type="password"]').type('12345678');
    cy.get('form').submit();

    cy.get('div.Toastify__toast--success').should('be.visible');
  });

  it('should display homepage when email and password are correct', () => {
    cy.get('input[type="email"]').type('nenenk@mail.id');
    cy.get('input[type="password"]').type('12345678');
    cy.get('form').submit();

    cy.url().should('eq', 'http://localhost:3000/');
  });
});
