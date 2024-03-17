/* eslint-disable max-len */
/* eslint-disable jest/expect-expect */

/**
 * - Rehister spec / scenario
 *   - should display Register page correctly
 *   - should display input note error and button register disable when name, email and password is empty
 *   - should display input note error and button Register disable when name less than 3 character
 *   - should display input note error and button Register disable when name greater than 50 character
 *   - should display input note error and button Register disable when email is not valid pattern
 *   - should display input note error and button Register disable when password less than 6 character
 *   - should display input note error and button Register disable when password greater than 15 character
 *   - should display toast error when email already exist
 *   - should display toast success when register is success
 *   - should display login pgae when register is success
 */

describe('Register spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register');
  });

  it('should display register page correctly', () => {
    cy.get('input[type="text"]').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button').contains(/^Register$/).should('be.visible');
  });

  it(
    'should display input note error and button register disable when name, email and password is empty',
    () => {
      cy.get('button').contains(/^Register$/).click();

      cy.get('p').contains('Nama harus diisi').should('be.visible');
      cy.get('p').contains('Email harus diisi').should('be.visible');
      cy.get('p').contains('Password harus diisi').should('be.visible');
      cy.get('button').should('be.disabled');
    },
  );

  it('should display input note error and button Register disable when name less than 3 character', () => {
    cy.get('input[type="text"]').type('an');
    cy.get('form').submit();

    cy.get('p').contains('Nama minimal 3 karakter').should('be.visible');
    cy.get('p').contains('Email harus diisi').should('be.visible');
    cy.get('p').contains('Password harus diisi').should('be.visible');
    cy.get('button').should('be.disabled');
  });

  it(
    'should display input note error and button Register disable when name greater than 50 character',
    () => {
      cy.get('input[type="text"]').type('dummy-name-user-for-testing-end-to-end-with-cypress');
      cy.get('form').submit();

      cy.get('p').contains('Nama maksimal 50 karakter').should('be.visible');
      cy.get('p').contains('Email harus diisi').should('be.visible');
      cy.get('p').contains('Password harus diisi').should('be.visible');
      cy.get('button').should('be.disabled');
    },
  );

  it('should display input note error and button Register disable when email is not valid pattern', () => {
    cy.get('input[type="email"]').type('testuser@mail.i');
    cy.get('form').submit();

    cy.get('p').contains('Password harus diisi').should('be.visible');
    cy.get('button').should('be.disabled');
  });

  it('should display input note error and button Register disable when password less than 6 character', () => {
    cy.get('input[type="password"]').type('12345');
    cy.get('form').submit();

    cy.get('p').contains('Email harus diisi').should('be.visible');
    cy.get('p').contains('Password minimal 6 karakter').should('be.visible');
    cy.get('button').should('be.disabled');
  });

  it(
    'should display input note error and button Register disable when password greater than 15 character',
    () => {
      cy.get('input[type="password"]').type('1234567890abcdef');
      cy.get('form').submit();

      cy.get('p').contains('Email harus diisi').should('be.visible');
      cy.get('p').contains('Password maksimal 15 karakter').should('be.visible');
      cy.get('button').should('be.disabled');
    },
  );

  it('should display toast error when email already exist', () => {
    cy.get('input[type="text"]').type('neneng');
    cy.get('input[type="email"]').type('nenenk@mail.id');
    cy.get('input[type="password"]').type('12345678');

    cy.get('form').submit();

    cy.get('div.Toastify__toast--error').should('be.visible');
  });

  it('should display toast success when register is successfull', () => {
    cy.get('input[type="text"]').type('testuser');
    cy.get('input[type="email"]').type(`testuser-${+new Date()}@mail.com`);
    cy.get('input[type="password"]').type('12345678');
    cy.get('form').submit();

    cy.get('div.Toastify__toast--success').should('be.visible');
  });

  it('should display login page when register is successfull', () => {
    cy.get('input[type="text"]').type('testuser');
    cy.get('input[type="email"]').type(`testuser-${+new Date()}@mail.com`);
    cy.get('input[type="password"]').type('12345678');
    cy.get('form').submit();

    cy.url().should('eq', 'http://localhost:3000/login');
  });
});
