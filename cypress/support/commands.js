Cypress.Commands.add(
  "fillMandatoryFieldsAndSubmit",
  (
    data = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      textArea: "Texto padrão de envio de mensagem",
    }
  ) => {
    cy.get("#firstName").clear().type(data.firstName);
    cy.get("#lastName").clear().type(data.lastName);
    cy.get("#email").clear().type(data.email, {log: false});
    cy.get("#open-text-area").clear().type(data.textArea, { delay: 0 });
    // cy.enviar()
  }
);

Cypress.Commands.add("enviar", () => {
  cy.contains("button", "Enviar").click();
});
