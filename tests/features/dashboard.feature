Feature: Dashboard

  Scenario: Visualizar dashboard
    Given Usuário está na tela de dashboard
    Then Deve ser possivel visualizar o grafico com titulo '<title>'

    Examples: 
      | title                        |
      | Quantidade total de fazendas |
      | Hectares total de fazendas   |
      | Fazendas por estado          |
      | Culturas                     |
      | Uso de solo                  |
