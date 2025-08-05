# Automatización Cypress - Validación Embarques Selaski

Este proyecto fue creado con Cypress para automatizar el flujo de autenticación y filtrado de embarques en la plataforma de reportes de Selaski.

## ¿Qué hace el test?

- Ingresa a la plataforma por medio de un token público.
- Inserta automáticamente el PIN de acceso.
- Valida si el PIN es correcto o si el acceso está bloqueado.
- Si el acceso es exitoso, verifica que la página de filtros se cargue correctamente.
- Selecciona el filtro de tipo "Embarque".
- Escribe el término `Prueba 1` y realiza la búsqueda.
- Espera a que se cargue la tabla de resultados.
- Verifica que existan los embarques `Prueba 1-01` y `Prueba 1-02`.
- En caso de que falte alguno, marca el test como fallido.

## Estructura del código

- `cypress/e2e/login.spec.cy.ts`: contiene el test principal que hace todo el flujo completo.
- `cypress/pages/LoginPage.ts`: contiene los métodos reutilizables para interactuar con la pantalla de login.

## Cómo correrlo

1. Clonar el repositorio.
2. Instalar dependencias:
   ```bash
   npm install
