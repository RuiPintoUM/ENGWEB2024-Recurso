# Teste 2024

## Passos para importação dos dados

1. Fiz download do json
2. Através do script `dataset-cleaner.py` o dataset dado (datasetInconsistente.json) foi corrigido dando origem ao dataset.json
3. Trocar o nome do campo do identificador, neste caso `bookid` para `_id`
4. Executar o container que já conta com o mongo import


### Resultado

```bash
mongo-seed-1  | 2024-06-06T14:59:17.214+0000	20000 document(s) imported successfully. 0 document(s) failed to import.
```

## Backend

O backend foi desenvolvido conforme o enunciado.


## Frontend

No `http://localhost:16001` pode ser encontrada a tabela pedida com o **número de contratos** na base de dados, sendo isso a metainformação que foi escolhida.

Na página individual de um contrato é possível ver todos os campos do contrato. 

É possível voltar à página principal clicando no logo. Isto é possível em todas as páginas do site.

# Aplicação completa

Para rodar a aplicação basta correr o comando:

```bash
docker compose up --build -d
```

(O backend está disponível em `http://localhost:16216` e o frontend em `http://localhost:16017`. ) apagar