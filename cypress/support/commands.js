Cypress.Commands.add(
  "fillMandatoryFieldsAndSubmit",
  ({ firstName, lastName, email, textArea }) => {
    cy.get("#firstName").type(firstName);
    cy.get("#lastName").type(lastName);
    cy.get("#email").type(email);
    cy.get("#open-text-area").type(textArea, { delay: 0 });
    cy.enviar()
    cy.get(".success > strong").should(
      "contain",
      "Mensagem enviada com sucesso."
    );
  }
);

Cypress.Commands.add("enviar", () => {
  cy.contains('Enviar').click();
});
