Feature: Gerenciamento

  @cadastrarProdutor
  Scenario: Cadastrar produtor
    Given Usuário está na tela de gerenciamento
    Then Deve ser possivel cadastrar um novo produtor

  @removerProdutor
  Scenario: Remover produtor
    Given Usuário está na tela de gerenciamento
    Then Deve ser possivel remover um produtor
