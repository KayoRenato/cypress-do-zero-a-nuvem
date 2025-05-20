import "../support/commands";

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("Verifica o título da aplicação ", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  context("Exercicios Extras", () => {
    it("EX. 01 - preenche os campos obrigatórios e envia o formulário", () => {
      cy.get("#firstName").type("Kayo");
      cy.get("#lastName").type("Renato");
      cy.get("#email").type("kayorenatocontato@gmail.com");
      cy.get("#open-text-area").type(
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        { delay: 0 }
      );
      cy.enviar();
      cy.get(".success > strong").should(
        "contain",
        "Mensagem enviada com sucesso."
      );
    });

    it("Ex. 2 - exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
      cy.get("#firstName").type("Kayo");
      cy.get("#lastName").type("Renato");
      cy.get("#email").type("kayorenatocontatogmail.com");
      cy.get("#open-text-area").type(
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        { delay: 0 }
      );
      cy.enviar();
      cy.get(".error").should("be.visible");
    });

    it("Ex. 3 - exibe mensagem de erro ao submeter o formulário com um telefone com formatação inválida", () => {
      cy.get("#phone").type("kld;k;als").should("have.value", "");
    });

    it("Ex. 4 - exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
      cy.get("#firstName").type("Kayo");
      cy.get("#lastName").type("Renato");
      cy.get("#email").type("kayorenatocontatogmail.com");
      cy.get("#phone-checkbox").click();
      cy.get("#open-text-area").type(
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        { delay: 0 }
      );
      cy.enviar();
      cy.get(".error").should("be.visible");
    });

    it("Ex. 5 - preenche e limpa os campos nome, sobrenome, email e telefone", () => {
      cy.get("#firstName")
        .type("Kayo")
        .should("have.value", "Kayo")
        .clear()
        .should("have.value", "");
      cy.get("#lastName")
        .type("Renato")
        .should("have.value", "Renato")
        .clear()
        .should("have.value", "");
      cy.get("#email")
        .type("kayorenatocontatogmail.com")
        .should("have.value", "kayorenatocontatogmail.com")
        .clear()
        .should("have.value", "");
      cy.get("#phone")
        .type("274897238947")
        .should("have.value", "274897238947")
        .clear()
        .should("have.value", "");
    });

    it("Ex. 6 - exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
      cy.enviar();
      cy.get(".error > strong").should(
        "have.text",
        "Valide os campos obrigatórios!"
      );
    });

    it("Ex. 7 - envia o formuário com sucesso usando um comando customizado", () => {
      const data = {
        firstName: "Kayo",
        lastName: "Renato",
        email: "kayorenatocontato@gmail.com",
        textArea: "Este é um teste com campos obrigatórios preenchidos.",
      };

      cy.fillMandatoryFieldsAndSubmit(data);
      cy.fillMandatoryFieldsAndSubmit();

      cy.enviar();
      cy.get(".success > strong").should(
        "contain",
        "Mensagem enviada com sucesso."
      );
    });

    it("Ex. 8 - envia o formuário com sucesso usando um comando customizado", () => {
      cy.fillMandatoryFieldsAndSubmit({
        firstName: "Kayo",
        lastName: "Renato",
        email: "kayorenatocontato@gmail.com",
        textArea: "Este é um teste com campos obrigatórios preenchidos.",
      });
    });

    it("Ex. 9 - envia o formuário com sucesso usando dados do cypress.env", () => {
      cy.fillMandatoryFieldsAndSubmit({
        firstName: Cypress.env("firstName"),
        lastName: Cypress.env("lastName"),
        email: Cypress.env("email"),
        textArea: Cypress.env("textArea"),
      });
    });
  });
});
