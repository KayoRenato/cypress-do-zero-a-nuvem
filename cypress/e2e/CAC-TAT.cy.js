import "../support/commands";

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação ", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("EX. 01 - preenche os campos obrigatórios e envia o formulário", () => {
    cy.get("#firstName").type("Kayo");
    cy.get("#lastName").type("Renato");
    cy.get("#email").type("kayorenatocontato@gmail.com");
    cy.get("#open-text-area").type(
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      { delay: 0 }
    );
    cy.get(".button").click();
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
    cy.get(".button").click();
    cy.get(".error");
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
    cy.get(".button").click();
    cy.get(".error");
  });

  it("Ex. 5 - preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName").type("Kayo").should("not.have.value", "");
    cy.get("#firstName").clear().should("have.value", "");
    cy.get("#lastName").type("Renato").should("not.have.value", "");
    cy.get("#lastName").clear().should("have.value", "");
    cy.get("#email")
      .type("kayorenatocontatogmail.com")
      .should("not.have.value", "");
    cy.get("#email").clear().should("have.value", "");
    cy.get("#phone").type("274897238947").should("not.have.value", "");
    cy.get("#phone").clear().should("have.value", "");
    cy.get("#phone").should("have.value", "");
  });

  it("Ex. 6 - exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.get(".button").click();
    cy.get(".error > strong").should(
      "have.text",
      "Valide os campos obrigatórios!"
    );
  });

  it("Ex. 7 - envia o formuário com sucesso usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit({
      firstName: "Kayo",
      lastName: "Renato",
      email: "kayorenatocontato@gmail.com",
      textArea: "Este é um teste com campos obrigatórios preenchidos.",
    });
  });

  it.only("Ex. 8 - envia o formuário com sucesso usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit({
      firstName: "Kayo",
      lastName: "Renato",
      email: "kayorenatocontato@gmail.com",
      textArea: "Este é um teste com campos obrigatórios preenchidos.",
    });
  });
});
