from unidecode import unidecode
import json

with open('list.txt', 'r', encoding='utf-8') as arquivo:
    names = []

    for linha in arquivo:
        if linha.strip() == "":
            continue
        names.append(linha.strip())

email = []
first = []
for i in names:
    first_name, last_name = i.split(" ")[0], i.split(" ")[-1]
    first_name_formatted = unidecode(first_name).lower()
    last_name_formatted = unidecode(last_name).lower()
    email_formatted = f"{first_name_formatted}.{last_name_formatted}@colegiomarconi.g12.br"

    email.append(email_formatted)
    first.append(first_name_formatted)

data = {"email": email, "name": first}

with open("./api/data.json", "w", encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False)
