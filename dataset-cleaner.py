import json
import ast

# Função para corrigir o campo autor
def fix_author(authors):
    return [author.strip() for author in authors.split(',')]

# Função para corrigir campos que são listas mas estão como strings
def fix_list_field(field):
    if isinstance(field, str):
        try:
            return ast.literal_eval(field.replace('"', '\\"').replace("'", '"'))
        except:
            return field
    return field

# Função para limpar e corrigir os dados do dataset
def clean_dataset(data):
    for book in data:
        # Corrigir o campo author
        if "author" in book:
            book["author"] = fix_author(book["author"])
        
        # Corrigir os campos que são listas mas estão como strings
        list_fields = ["genres", "characters", "awards", "ratingsByStars", "setting"]
        for field in list_fields:
            if field in book:
                book[field] = fix_list_field(book[field])
        
        # Corrigir o campo bookId (remover caracteres inválidos)
        if "bookId" in book:
            book["bookId"] = book["bookId"].replace(" ", "_").replace(".", "_")
    
    return data

# Função para remover terminadores de linha incomuns
def remove_unusual_line_terminators(text):
    return text.replace('\u2028', '').replace('\u2029', '')

# Função principal para ler, limpar e salvar o arquivo JSON
def process_json_file(input_file, output_file):
    # Ler o arquivo JSON
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Limpar e corrigir o dataset
    cleaned_data = clean_dataset(data)
    
    # Converter os dados limpos para string JSON
    json_data = json.dumps(cleaned_data, ensure_ascii=False, indent=4)
    
    # Remover terminadores de linha incomuns
    clean_json_data = remove_unusual_line_terminators(json_data)
    
    # Salvar o dataset corrigido em um novo arquivo JSON
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(clean_json_data)

# Exemplo de uso
input_file = 'datasetInconsistente.json'  # Substitua pelo caminho do seu arquivo de entrada
output_file = 'dataset.json'  # Substitua pelo caminho do seu arquivo de saída
process_json_file(input_file, output_file)

print("Arquivo JSON corrigido e salvo com sucesso!")
