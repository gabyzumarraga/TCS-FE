Cypress.Commands.add('recover', (name, lastname) => {

    cy.visit('https://tcs-fe.vercel.app/auth/login')
    cy.get('#name').type(name)
    cy.get('#lastname').type(lastname)
    cy.get('#btnLogin').click()
    // cy.url().should('contain', '/pages')
    cy.wait(1000)
})
beforeEach(() => {
    cy.visit('https://tcs-fe.vercel.app/auth/login')
    cy.wait(2000)
})

it('Test 1 Cambio de Contraseña Correcto', () => {
    
    cy.get('[placeholder="Ultimatix"]').type('2248610')
    cy.get('[placeholder="Nueva contraseña"]').type('joseTCS123*')
    cy.get('[placeholder="Código de respaldo"]').type('123456')
    cy.get ('[class="row mb-4"]').click();
    cy.get('[class="swal2-confirm swal2-styled"]').click()
    cy.get('[buttonname="Cambiar contraseña"]').click();

  });

  it('Test 2 Cambio de Contraseña Ultimatrix Incorrecto', () => {
    
    cy.get('[placeholder="Ultimatix"]').type('0')
    cy.get('[placeholder="Nueva contraseña"]').type('joseTCS123*')
    cy.get('[placeholder="Código de respaldo"]').type('123456')
    cy.get('[buttonname="Cambiar contraseña"]').click();
    cy.get('#swal2-title').should('have.text','¡Error!');
  });

  it('Test 3 Cambio de Contraseña, Contraseña Incorrecta', () => {
    
    cy.get('[placeholder="Ultimatix"]').type('2248610')
    cy.get('[placeholder="Nueva contraseña"]').type('joseTCS')
    cy.get('[placeholder="Código de respaldo"]').type('123456')
    cy.get('[buttonname="Cambiar contraseña"]').click();
    cy.get('#swal2-title').should('have.text','¡Error!');
   

  });

  it('Test 4 Cambio de Contraseña, Sin Codigo de Respaldo Incorrecta', () => {
    
    cy.get('[placeholder="Ultimatix"]').type('2248610')
    cy.get('[placeholder="Nueva contraseña"]').type('joseTCS*')
    cy.get('[placeholder="Código de respaldo"]')
    cy.get('[buttonname="Cambiar contraseña"]').click();
    cy.get('[class="form-text text-danger float-start"]').should('have.text',' Ingresa tu código de respaldo. ')
    cy.get ('[class="row mb-4"]').click();
    cy.get('[class="swal2-confirm swal2-styled"]').click()
   
  });

  it('Test 5 En blanco', () => {
    
    
    cy.get('[buttonname="Cambiar contraseña"]').click();
    cy.get('[class="form-text text-danger float-start"]').should('have.text',' Ingresa tu número de Ultimatix.  Ingresa una contraseña.  Ingresa tu código de respaldo. ')
    

  });
  


