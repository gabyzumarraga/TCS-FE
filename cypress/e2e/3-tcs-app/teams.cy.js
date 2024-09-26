Cypress.Commands.add('login', (username, password) => {
  cy.visit('https://tcs-fe-jet.vercel.app/auth/login')
  cy.get('#ultimatixLogin').type(username)
  cy.get('#passwordLogin').type(password)
  cy.get('#btnLogin').click()
  cy.wait(500)
})

describe('Ingreso a la pantalla de grupos de trabajo desde un usuario administrador', () => {

  // Ingreso con usuario admin
  beforeEach(() => {
    cy.login('9999999', 'Tcs@2022!')
  });

  it('Test 1: Pagina de grupos de trabajo es accesible', () => {
    cy.get('#btnTeams').click()
  });

  it('Test 2: El titulo es correcto y la lista de los grupos de trabajo se visualiza', () => {
    cy.get('#btnTeams').click()
    cy.get('#teamsTitle').should('have.text', 'Grupos de trabajo')
    cy.get('#tableEquipos tr').should('have.length.at.least', 1)
  });

});

describe('Intento de ingreso a la pantalla de grupos de trabajo desde un usuario no administrador', () => {

  // Ingreso con usuario no admin
  beforeEach(() => {
    cy.login('9999999', 'Tcs@2022!')
  });

  it('Test 1: Pagina de grupos de trabajo no es accesible', () => {
    cy.request({
        url: 'http://localhost:4200/pages/dashboard/teams',
        followRedirect: false,
        failOnStatusCode: false
    }).then((resp) => {
        expect(resp.status).to.eq(403)
    })
  });

});

describe('Agregar nuevo grupo de trabajo', () => {

  // Ingreso con usuario admin
  beforeEach(() => {
    cy.login('9999999', 'Tcs@2022!')
  });

  const teamName = 'TCS Project'
  const teamLeader = 'Wilman Remache'
  const teamTech = 'Mauricio Bayas'
  const teamDescription = 'Aplicativo para uso administrativo de TCS.'

  it('Test 1: Agregar un nuevo grupo de trabajo de tipo "Proyecto"', () => {
    const teamType = 'Proyecto'

    cy.get('#btnTeams').click()
    cy.wait(1000)
    cy.get('#tableEquipos tr')
      .then(listing => {
        const itemcount = Cypress.$(listing).length

        cy.get('#addTeam').click()
        cy.get('#floatingTeamName').type(teamName)
        cy.get('#floatingTeamType').select(teamType)
        cy.get('#floatingTeamLeader').type(teamLeader)
        cy.get('#floatingTeamTech').type(teamTech)
        cy.get('#floatingTeamDesc').type(teamDescription)
        cy.get('#btnSave').click()
        cy.contains('Éxito')
        cy.contains('OK').click()
        cy.get('#tableEquipos tr').should('have.length', (itemcount + 1))
      });

  });

  it('Test 2: Agregar un nuevo grupo de trabajo de tipo "Celula"', () => {
    const teamType = 'Célula'

    cy.get('#btnTeams').click()
    cy.wait(1000)
    cy.get('#tableEquipos tr')
      .then(listing => {
        const itemcount = Cypress.$(listing).length

        cy.get('#addTeam').click()
        cy.get('#floatingTeamName').type(teamName)
        cy.get('#floatingTeamType').select(teamType)
        cy.get('#floatingTeamLeader').type(teamLeader)
        cy.get('#floatingTeamTech').type(teamTech)
        cy.get('#floatingTeamDesc').type(teamDescription)
        cy.get('#btnSave').click()
        cy.contains('Éxito')
        cy.contains('OK').click()
        cy.get('#tableEquipos tr').should('have.length', (itemcount + 1))
      });
  });

  it('Test 3: Agregar un nuevo grupo de trabajo de tipo "Tribu"', () => {
    const teamType = 'Tribu'

    cy.get('#btnTeams').click()
    cy.wait(1000)
    cy.get('#tableEquipos tr')
      .then(listing => {
        const itemcount = Cypress.$(listing).length

        cy.get('#addTeam').click()
        cy.get('#floatingTeamName').type(teamName)
        cy.get('#floatingTeamType').select(teamType)
        cy.get('#floatingTeamLeader').type(teamLeader)
        cy.get('#floatingTeamTech').type(teamTech)
        cy.get('#floatingTeamDesc').type(teamDescription)
        cy.get('#btnSave').click()
        cy.contains('Éxito')
        cy.contains('OK').click()
        cy.get('#tableEquipos tr').should('have.length', (itemcount + 1))
      });
  });

});

describe('Intentar agregar un nuevo grupo de trabajo duplicado', () => {

  // Ingreso con usuario admin
  beforeEach(() => {
    cy.login('9999999', 'Tcs@2022!')
  });

  const teamName = 'TCS Project'
  const teamLeader = 'Wilman Remache'
  const teamTech = 'Mauricio Bayas'
  const teamDescription = 'Aplicativo para uso administrativo de TCS.'

  it('Test 1: Intentar agregar un nuevo grupo de trabajo de tipo "Proyecto"', () => {
    const teamType = 'Proyecto'

    cy.get('#btnTeams').click()
    cy.wait(1000)
    cy.get('#tableEquipos tr')
      .then(listing => {
        const itemcount = Cypress.$(listing).length

        cy.get('#addTeam').click()
        cy.get('#floatingTeamName').type(teamName)
        cy.get('#floatingTeamType').select(teamType)
        cy.get('#floatingTeamLeader').type(teamLeader)
        cy.get('#floatingTeamTech').type(teamTech)
        cy.get('#floatingTeamDesc').type(teamDescription)
        cy.get('#btnSave').click()
        cy.contains('Error')
        cy.contains('OK').click()
        cy.get('#tableEquipos tr').should('have.length', (itemcount))
      });

  });

  it('Test 2: Intentar agregar un nuevo grupo de trabajo de tipo "Celula"', () => {
    const teamType = 'Célula'

    cy.get('#btnTeams').click()
    cy.wait(1000)
    cy.get('#tableEquipos tr')
      .then(listing => {
        const itemcount = Cypress.$(listing).length

        cy.get('#addTeam').click()
        cy.get('#floatingTeamName').type(teamName)
        cy.get('#floatingTeamType').select(teamType)
        cy.get('#floatingTeamLeader').type(teamLeader)
        cy.get('#floatingTeamTech').type(teamTech)
        cy.get('#floatingTeamDesc').type(teamDescription)
        cy.get('#btnSave').click()
        cy.contains('Error')
        cy.contains('OK').click()
        cy.get('#tableEquipos tr').should('have.length', (itemcount))
      });
  });

  it('Test 3: Intentar agregar un nuevo grupo de trabajo de tipo "Tribu"', () => {
    const teamType = 'Tribu'

    cy.get('#btnTeams').click()
    cy.wait(1000)
    cy.get('#tableEquipos tr')
      .then(listing => {
        const itemcount = Cypress.$(listing).length

        cy.get('#addTeam').click()
        cy.get('#floatingTeamName').type(teamName)
        cy.get('#floatingTeamType').select(teamType)
        cy.get('#floatingTeamLeader').type(teamLeader)
        cy.get('#floatingTeamTech').type(teamTech)
        cy.get('#floatingTeamDesc').type(teamDescription)
        cy.get('#btnSave').click()
        cy.contains('Error')
        cy.contains('OK').click()
        cy.get('#tableEquipos tr').should('have.length', (itemcount))
      });
  });
});

describe('Editar un grupo de trabajo', () => {

  // Ingreso con usuario admin
  beforeEach(() => {
    cy.login('9999999', 'Tcs@2022!')
  });

  const teamLeader = 'Jimmy Zumarraga'
  const teamTech = 'Dhiraj Bellara'

  it('Test 1: Editar un grupo de trabajo', () => {

    cy.get('#btnTeams').click()
    cy.wait(1000)
    cy.get('#tableEquipos tr')
      .then(listing => {
        const itemcount = Cypress.$(listing).length

        cy.contains('TCS Project').parents('tr').find('button').contains('edit').click()
        cy.get('#floatingTeamName').should('be.disabled')
        cy.get('#floatingTeamType').should('be.disabled')
        cy.get('#floatingTeamLeader').clear().type(teamLeader)
        cy.get('#floatingTeamTech').clear().type(teamTech)
        cy.get('#floatingTeamDesc').should('be.disabled')
        cy.get('#btnSave').click()
        cy.contains('Éxito')
        cy.contains('OK').click()
        cy.get('#tableEquipos tr').should('have.length', (itemcount))

      });
  });
});

describe('Eliminar un grupo de trabajo', () => {

  // Ingreso con usuario admin
  beforeEach(() => {
    cy.login('9999999', 'Tcs@2022!')
  });

  it('Test 1: Eliminar un grupo de trabajo', () => {

    cy.get('#btnTeams').click()
    cy.wait(1000)
    cy.get('#tableEquipos tr')
      .then(listing => {
        const itemcount = Cypress.$(listing).length

        cy.contains('TCS Project').parents('tr').find('button').contains('delete').click()
        cy.contains('Sí').click()
        cy.contains('Éxito')
        cy.contains('OK').click()
        cy.contains('TCS Project').parents('tr').find('button').contains('add_box')
        //cy.contains('TCS Project').parents('tr').contains('No Vigente')
        cy.get('#tableEquipos tr').should('have.length', (itemcount))

      });
  });
});

describe('Restablecer un grupo de trabajo', () => {

  // Ingreso con usuario admin
  beforeEach(() => {
    cy.login('9999999', 'Tcs@2022!')
  });

  it('Test 1: Restablecer un grupo de trabajo', () => {

    cy.get('#btnTeams').click()
    cy.wait(1000)
    cy.get('#tableEquipos tr')
      .then(listing => {
        const itemcount = Cypress.$(listing).length

        cy.contains('TCS Project').parents('tr').find('button').contains('add_box').click()
        cy.contains('Sí').click()
        cy.contains('Éxito')
        cy.contains('OK').click()
        cy.contains('TCS Project').parents('tr').find('button').contains('delete')
        //cy.contains('TCS Project').parents('tr').contains('Vigente')
        cy.get('#tableEquipos tr').should('have.length', (itemcount))

      });
  });
});

