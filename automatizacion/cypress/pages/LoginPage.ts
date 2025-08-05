// cypress/pages/LoginPage.ts

export class LoginPage {
  visit(): void {
    cy.visit('https://www.selaski.com/public/reports/shared?token=21b8140da2164226f7d1ab0626547985903b')
  }

  ingresarPin(pin: string): void {
    const digits = pin.split('');
    cy.get('#digit1').type(digits[0])
    cy.get('#digit2').type(digits[1])
    cy.get('#digit3').type(digits[2])
    cy.get('#digit4').type(digits[3])
  }

  hacerClickEnIngresar(): void {
    cy.get('form > button').click()
  }

  validarMensajeError(): void {
    cy.get('form > p').should('contain.text', 'Código incorrecto')
  }

  validarMensajeBloqueo(): void {
    cy.contains('Has excedido el número de intentos permitidos').should('be.visible')
  }

  validarIngresoExitoso(): void {
    cy.contains('Filtros').should('be.visible')
  }

  validarPantallaCarga(): void {
    cy.contains('Cargando...').should('be.visible')
  }
}
