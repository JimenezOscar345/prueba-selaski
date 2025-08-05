import { LoginPage } from '../pages/LoginPage'

const loginPage = new LoginPage()

describe('Login + Inicio del Filtro de Embarque', () => {
  it('Debe autenticar, filtrar por embarque y validar resultados', () => {
    // LOGIN
    loginPage.visit()

    cy.get('body').then(($body) => {
      const texto = $body.text()

      if (texto.includes('Has excedido el número de intentos permitidos')) {
        loginPage.validarMensajeBloqueo()
        throw new Error('Acceso bloqueado: Has excedido el número de intentos permitidos')
      } else {
        loginPage.ingresarPin('5569')
        loginPage.hacerClickEnIngresar()

        cy.get('body').then(($b) => {
          const t = $b.text()

          if (t.includes('Código incorrecto')) {
            loginPage.validarMensajeError()
            throw new Error('PIN incorrecto')
          } else {
            loginPage.validarPantallaCarga()
            loginPage.validarIngresoExitoso()

            // Esperar que cargue la tabla principal
            cy.get(
              '#table-results-container > div.sticky.left-0.flex.first-column > app-molecule-table-first-element-list > div > app-atom-table-header > div',
              { timeout: 15000 }
            ).should('be.visible')

            // Hacer clic en el botón "Filtros"
            cy.get(
              '#orders-container > app-organism-filters-tags > span > app-atom-filter-tab > div',
              { timeout: 10000 }
            ).should('be.visible').click()

            // Esperar a que aparezca el título de la sección
            cy.get('#orders-container > span > h1', { timeout: 10000 }).should('be.visible')

            // Seleccionar "Embarque" y buscar "Prueba 1"
            cy.window().then((win) => {
              const embarque = win.document.querySelector(
                '#orders-container > app-organism-filters-tags > div > app-molecule-filters-list > div > app-molecule-general-search-select > div > div > span:nth-child(1) > span > p'
              );
              if (embarque) {
                embarque.click();
              } else {
                throw new Error('No se encontró el elemento "Embarque"');
              }
              
              cy.get(
                '#orders-container > app-organism-filters-tags > div > app-molecule-filters-list > div > app-molecule-general-search-select > div > span > input',
                { timeout: 10000 }
              ).should('be.visible').type('Prueba 1{enter}')
            })

            // Validar que cargue la tabla con resultados
            cy.get(
              '#table-results-container > div.sticky.left-0.flex.first-column > app-molecule-table-first-element-list > div > app-atom-table-header > div',
              { timeout: 10000 }
            ).should('be.visible')

           cy.contains(/prueba 1-01/i).should('be.visible')
          cy.contains(/prueba 1-02/i).should('be.visible')

            // Validar que ETA no esté vacío
            cy.get('app-atom-eta-etd-date span p:visible')
              .invoke('text')
              .then((text) => {
                if (!text.trim()) {
                  throw new Error('ETA está vacío');
                }
              })

            // Validar que Puerto Destino no esté vacío
            cy.get('app-atom-double-line-report span h5:visible')
              .invoke('text')
              .then((text) => {
                if (!text.trim()) {
                  throw new Error(' Puerto Destino está vacío');
                }
              })
          }
        })
      }
    })
  })
})