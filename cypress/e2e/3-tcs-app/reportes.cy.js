Cypress.Commands.add('login', (username, password) => {
    cy.visit('http://localhost:4200/')
    cy.get('#ultimatixLogin').type(username)
    cy.get('#passwordLogin').type(password)
    cy.get('#btnLogin').click()
    cy.wait(1000)
  });
  
describe('Test Pantalla Asignaciones', () => {

    beforeEach(() => {
      cy.login('2254001', 'Tcs.@2022')
      cy.get('app-button > #btnAssets').click();
      cy.get(':nth-child(4) > a').click()  
      cy.wait(2000)
    });

    it('Test 1: La ventana de Reportes es Accesible', () => {
      cy.get('#undefined').should("have.text","Reportes");
      cy.get(':nth-child(2) > app-subtitle > .row > .col-md-auto > h1').should("have.text","Activos");
    });

    it('Test 2: Reporte de Activos', () => {
      cy.get(':nth-child(2) > app-subtitle > .row > .col-md-auto > h1').should("have.text","Activos");
      cy.get(':nth-child(2) > app-mat-table > .mat-elevation-z8 > .mat-table > thead > .mat-header-row > .cdk-column-id_ultimatix').should("have.text"," Ultimatix ");
      cy.get('.mat-header-row > .cdk-column-tipo').should("have.text"," Activo ");
      cy.get('.mat-header-row > .cdk-column-edificio').should("have.text"," Edificio ");
      cy.get('.mat-header-row > .cdk-column-codigo_barras').should("have.text"," Código de activo ");
      cy.get('.mat-header-row > .cdk-column-fecha_entrega').should("have.text"," Fecha de adjudicación ");
      cy.get('.mat-header-row > .cdk-column-fecha_devolucion').should("have.text"," Fecha de devolución ");
      cy.get(':nth-child(2) > app-mat-table > .mat-elevation-z8 > .mat-table > thead > .mat-header-row > .cdk-column-estado').should("have.text"," Estado ");
    });

    it('Test 3: Grupo de Trabajo', () => {
      cy.get(':nth-child(3) > app-subtitle > .row > .col-md-auto > h1').should("have.text","Grupos de trabajo");
      cy.get(':nth-child(3) > app-mat-table > .mat-elevation-z8 > .mat-table > thead > .mat-header-row > .cdk-column-nombre_equipo_asi').should("have.text"," Equipo ");
      cy.get(':nth-child(3) > app-mat-table > .mat-elevation-z8 > .mat-table > thead > .mat-header-row > .cdk-column-tipo_equipo_asi').should("have.text"," Tipo ");
      cy.get('.mat-header-row > .cdk-column-descripcion_asi').should("have.text"," Descripcion ");
      cy.get('.mat-header-row > .cdk-column-descripcion_asi').should("have.text"," Descripcion ");
      cy.get('.mat-header-row > .cdk-column-nombre_tecnico').should("have.text"," Líder técnico ");
      cy.get('.mat-header-row > .cdk-column-estado_asi').should("have.text"," Estado ");
    });

    it('Test 4: Asignaciones', () => {
      cy.get(':nth-child(4) > app-subtitle > .row > .col-md-auto > h1').should("have.text","Asignaciones");
      cy.get('.mat-header-row > .cdk-column-ultimatix_asi').should("have.text"," Ultimatix ");
      cy.get(':nth-child(4) > app-mat-table > .mat-elevation-z8 > .mat-table > thead > .mat-header-row > .cdk-column-nombre_equipo_asi').should("have.text"," Equipo ");
      cy.get(':nth-child(4) > app-mat-table > .mat-elevation-z8 > .mat-table > thead > .mat-header-row > .cdk-column-tipo_equipo_asi').should("have.text"," Tipo ");
      cy.get('.mat-header-row > .cdk-column-asignacion').should("have.text"," Asignación (%) ");
      cy.get('.mat-header-row > .cdk-column-fecha_inicio').should("have.text"," Fecha de inicio ");
      cy.get('.mat-header-row > .cdk-column-fecha_fin').should("have.text"," Fecha de finalización ");
      cy.get(':nth-child(4) > app-mat-table > .mat-elevation-z8 > .mat-table > thead > .mat-header-row > .cdk-column-estado').should("have.text"," Estado ");
    });

    it('Test 5: Habilidades', () => {
      cy.get(':nth-child(5) > app-subtitle > .row > .col-md-auto > h1').should("have.text","Habilidades");
      cy.get(':nth-child(5) > app-mat-table > .mat-elevation-z8 > .mat-table > thead > .mat-header-row > .cdk-column-id_ultimatix').should("have.text"," Ultimatix ");
      cy.get('.mat-header-row > .cdk-column-nombres_completos').should("have.text"," Nombre ");
      cy.get('.mat-header-row > .cdk-column-habilidades').should("have.text"," Habilidades Técnicas ");
      cy.get('.mat-header-row > .cdk-column-nivel_habilidad').should("have.text"," Nivel habilidad técnica ");
      cy.get('.mat-header-row > .cdk-column-habilidades_funcionales').should("have.text"," Habilidades Funcionales ");
      cy.get('.mat-header-row > .cdk-column-nivel_habilidad_funcional').should("have.text"," Nivel habilidad funcional ");
      cy.get('.mat-header-row > .cdk-column-aplicaciones').should("have.text"," Aplicaciones ");
      cy.get('.mat-header-row > .cdk-column-nivel_aplicaciones').should("have.text"," Nivel aplicaciones ");
});

});