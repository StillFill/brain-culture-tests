Feature: Gerenciamento

  @cadastrarProdutor
  Scenario: Cadastrar produtor
    Given Usuário está na tela de gerenciamento
    And Usuário seleciona criar um novo produtor
    Then Deve ser possivel preencher os dados de produtor e salvar

  @atualizarProdutor
  Scenario: Atualizar produtor
    Given Usuário está na tela de gerenciamento
    And Usuário seleciona um produtor já existente
    And Usuário deseja editar o produtor
    And Deve ser possivel preencher os dados de produtor e salvar

  @removerProdutor
  Scenario: Remover produtor
    Given Usuário está na tela de gerenciamento
    And Usuário seleciona um produtor já existente
    Then Deve ser possivel remover um produtor

  @cadastrarProdutorIncorretoArea
  Scenario: Cadastrar produtor Incorretamente
    Given Usuário está na tela de gerenciamento
    And Usuário seleciona criar um novo produtor
    Then Deve ver mensagem de erro ao preencher os dados com as áreas incorretas

  @cadastrarProdutorIncorretoDocumento
  Scenario: Cadastrar produtor Incorretamente
    Given Usuário está na tela de gerenciamento
    And Usuário seleciona criar um novo produtor
    Then Deve ver mensagem de erro ao preencher os dados com o documento incorreto
