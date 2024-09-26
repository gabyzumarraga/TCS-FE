Cypress.Commands.add('register', (name, lastname) => {

    cy.visit('https://tcs-fe.vercel.app/auth/register')
    cy.get('#name').type(name)
    cy.get('#lastname').type(lastname)
    cy.get('#btnLogin').click()
    // cy.url().should('contain', '/pages')
    cy.wait(1000)
})
beforeEach(() => {
    cy.visit('https://tcs-fe.vercel.app/auth/register')
    cy.wait(2000)
})

it('Test 1 Registro Correcto', () => {
    
    
    cy.get('[placeholder="Nombres"]').type('Jose')
    cy.get('[placeholder="Apellidos"]').type('Delgado')
    cy.get('[placeholder="Teléfono"]').click({force: true}).type('0987378025')
    cy.get('[placeholder="Correo electrónico"]').type('josedelgado@tcs.com')
    cy.get('[placeholder="Ultimatix"]').type('2248610')
    cy.get('[placeholder="Contraseña"]').type('joseTCS123*')
    cy.get('.btn').click();

  });
 
  it('Test 2 Registro Ultimatrix Incorrecto', () => {
   
    cy.get('[placeholder="Nombres"]').type('Jose')
    cy.get('[placeholder="Apellidos"]').type('Delgado')
    cy.get('[placeholder="Teléfono"]').click({force: true}).type('0987375484')
    cy.get('[placeholder="Correo electrónico"]').type('josedelgado@tcs.com')
    cy.get('[placeholder="Ultimatix"]').type('32168')
    cy.get('[class="form-text text-danger float-start"]').should('have.text',' Ingresa un número de ultimatix válido. ')
    
    cy.get('[placeholder="Contraseña"]').type('joseTCS123*')
   
    cy.get('.btn').click();
    

  });
 
  it('Test 3 Registro Contraseña Incorrecto', () => {
   
    cy.get('[placeholder="Nombres"]').type('Jose')
    cy.get('[placeholder="Apellidos"]').type('Delgado')
    cy.get('[placeholder="Teléfono"]').click({force: true}).type('0987375484')
    cy.get('[placeholder="Correo electrónico"]').type('josedelgado@tcs.com')
    cy.get('[placeholder="Ultimatix"]').type('32168687')
    cy.get('[placeholder="Contraseña"]').type('joseTCS123')
    cy.get('[class="form-text text-danger float-start"]').should('have.text',' Ingresa una contraseña válida.  report')
    cy.get('.btn').click();
    

  });

  it('Test 4 Registro Correo Incorrecto', () => {
   
    cy.get('[placeholder="Nombres"]').type('Jose')
    cy.get('[placeholder="Apellidos"]').type('Delgado')
    cy.get('[placeholder="Teléfono"]').click({force: true}).type('0987375484')
    cy.get('[placeholder="Correo electrónico"]').type('josedelgado@tcs')
    cy.get('[class="form-text text-danger float-start"]').should('have.text',' Ingresa una dirección de correo electrónico válida. ')
    cy.get('[placeholder="Ultimatix"]').type('32168687')
    cy.get('[placeholder="Contraseña"]').type('joseTCS123*')
    cy.get('.btn').click();
    

  });
 
  it('Test 5 Registro Telefono Incorrecto', () => {
   
    cy.get('[placeholder="Nombres"]').type('Jose')
    cy.get('[placeholder="Apellidos"]').type('Delgado')
    cy.get('[placeholder="Teléfono"]').click({force: true}).type('098484')
    cy.get('[placeholder="Correo electrónico"]').type('josedelgado@tcs.com')
    cy.get('[placeholder="Ultimatix"]').type('32168687')
    cy.get('[placeholder="Contraseña"]').type('joseTCS123*')
    cy.get('.btn').click();
    cy.get('[class="form-text text-danger text-start"]').should('have.text',' Ingresa un número de teléfono válido. ')  
    

  });

  it('Test 6 Registro en Blanco', () => {
   

    cy.get('.btn').click();
    cy.get('[class="form-text text-danger float-start"]').should('have.text',' Ingresa tus nombres.  Ingresa tus apellidos.  Ingresa un correo electrónico.  Ingresa tu número de ultimatix.  Ingresa una contraseña. ')
    
    

  });
 
 