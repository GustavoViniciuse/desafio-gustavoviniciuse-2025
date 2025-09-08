# Desafio Abrigo de Animais

Este projeto é a solução para o **Desafio do Abrigo de Animais**, desenvolvido como parte do processo seletivo da StartDB 2025. O objetivo do desafio é criar um sistema em JavaScript que ajuda a encontrar pessoas adequadas para adotar animais de um abrigo, com base em suas preferências de brinquedos e regras específicas.

## 📖 Sobre o Projeto

O **Abrigo de Animais** é um sistema que recebe listas de brinquedos preferidos por duas pessoas e uma lista de animais a serem considerados para adoção. Com base nas regras do desafio, o sistema decide se cada animal será adotado por uma das pessoas ou permanecerá no abrigo. As principais funcionalidades incluem:

- Validação de animais e brinquedos.
- Verificação da ordem dos brinquedos preferidos pelos animais.
- Atribuição dos animais a pessoas ou ao abrigo, respeitando restrições como limite de adoções e empates.
- Ordenação alfabética dos resultados (exceto para jabutis, que ficam no final).

O código foi implementado em JavaScript, utilizando uma estrutura orientada a objetos, com a classe `AbrigoAnimais` como núcleo da lógica. O projeto inclui testes automatizados com Jest para validar a solução.

### Regras do Desafio
1. Um animal é adotado pela pessoa que fornecer **todos os seus brinquedos favoritos na ordem exata**.
2. Brinquedos extras podem ser intercalados, desde que a ordem dos brinquedos favoritos seja mantida.
3. Gatos não dividem brinquedos (se ambas as pessoas atenderem às condições, o animal fica no abrigo).
4. Cada pessoa pode adotar no máximo **três animais**.
5. O jabuti "Loco" aceita seus brinquedos em qualquer ordem, desde que outro animal já tenha sido adotado.
6. Entradas inválidas (animais ou brinquedos desconhecidos/duplicados) geram erros.
7. A saída é uma lista ordenada alfabeticamente (exceto jabutis, que vão por último) com o destino de cada animal.

### Animais e Brinquedos
| Animal | Tipo   | Brinquedos Favoritos        |
|--------|--------|-----------------------------|
| Rex    | Cão    | RATO, BOLA                  |
| Mimi   | Gato   | BOLA, LASER                 |
| Fofo   | Gato   | BOLA, RATO, LASER           |
| Zero   | Gato   | RATO, BOLA                  |
| Bola   | Cão    | CAIXA, NOVELO               |
| Bebe   | Cão    | LASER, RATO, BOLA           |
| Loco   | Jabuti | SKATE, RATO                 |

## 🚀 Como Funciona

O código está implementado no arquivo `src/abrigo-animais.js`, que contém a classe `AbrigoAnimais`. O método principal, `encontraPessoas`, recebe três parâmetros de texto (brinquedos da pessoa 1, brinquedos da pessoa 2 e lista de animais) e retorna um objeto com:
- `lista`: Array com strings no formato `nome animal - destino` (pessoa 1, pessoa 2 ou abrigo).
- `erro`: Mensagem de erro, se houver (ex.: "Animal inválido" ou "Brinquedo inválido").

### Estrutura do Código
- **Validação**: Verifica se os animais e brinquedos são válidos (existentes e sem duplicatas).
- **Cálculo de Sequência**: O método `contemSequencia` calcula quantos brinquedos de um animal aparecem na ordem correta na lista de uma pessoa.
- **Atribuição**: Cada animal é atribuído com base nas regras:
  - Se ambas as pessoas fornecem a sequência completa, o animal fica no abrigo (gatos não dividem).
  - Se apenas uma pessoa fornece a sequência completa e tem vagas (máximo 3), ela adota.
  - Jabuti "Loco" só é adotado se outro animal já foi adotado e há vagas.
- **Ordenação**: Os animais são ordenados alfabeticamente, com jabutis no final.

## 🛠️ Como Baixar e Rodar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão recomendada: LTS)
- [Git](https://git-scm.com/) instalado
- Um editor de código (ex.: VS Code)

### Passos para Configuração
1. **Clone o repositório**:
   ```bash
   git clone https://github.com/gustavoviniciuse/teste-startdb-js.git
   cd teste-startdb-js
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Execute os testes**:
   ```bash
   npm test
   ```

   Isso rodará os testes definidos em `src/abrigo-animais.test.js` usando o Jest. Os testes cobrem cenários como:
   - Validação de animais inválidos.
   - Atribuição correta de animais com base nas preferências de brinquedos.
   - Casos com brinquedos intercalados.

### Exemplo de Testes
```javascript
test('Deve encontrar pessoa para um animal', () => {
  const resultado = new AbrigoAnimais().encontraPessoas(
    'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo'
  );
  expect(resultado.lista[0]).toBe('Fofo - abrigo');
  expect(resultado.lista[1]).toBe('Rex - pessoa 1');
  expect(resultado.erro).toBeFalsy();
});
```

Para criar mais testes, edite o arquivo `src/abrigo-animais.test.js`. Consulte a [documentação do Jest](https://jestjs.io/docs/getting-started) para mais detalhes.

## ✅ Status do Desafio
O desafio foi **concluído com sucesso**! Todos os testes fornecidos no arquivo `abrigo-animais.test.js` passam corretamente, e a lógica atende às regras especificadas:
- Validação de entradas (animais e brinquedos).
- Atribuição correta de animais com base nas sequências de brinquedos.
- Ordenação alfabética (com jabutis no final).
- Tratamento de casos especiais, como o jabuti "Loco" e empates.

### Cobertura de Testes
Os testes fornecidos cobrem a maioria dos cenários, mas algumas linhas relacionadas ao jabuti "Loco" não são executadas, pois ele não está nos casos de teste. Para maior confiabilidade, você pode adicionar testes adicionais, como:
- Testar o comportamento do "Loco" com outro animal adotado.
- Testar o limite de 3 adoções por pessoa.
- Testar duplicatas em brinquedos ou animais.


## 📬 Como Contribuir ou Testar
1. Faça um fork do repositório e clone para sua máquina.
2. Adicione novos testes em `src/abrigo-animais.test.js` para explorar outros cenários.
3. Envie um pull request com suas melhorias ou sugestões.

Se encontrar problemas ou tiver dúvidas, crie uma issue no repositório!

## 📜 Licença
Este projeto é apenas para fins de avaliação do desafio e não possui uma licença específica.

---

**Desenvolvido por Gustavo Vinicius Elias Souza Silva**  
