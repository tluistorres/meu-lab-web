#!/bin/bash

# Adiciona todas as mudanças
git add .

# Pede para você digitar a mensagem do commit
echo "Digite a mensagem do commit (ou aperte Enter para 'Update Geral'):"
read mensagem

if [ -z "$mensagem" ]; then
    mensagem="Update Geral"
fi

# Faz o commit
git commit -m "$mensagem"

# Envia para o GitHub
git push origin main

echo "--------------------------------------"
echo "🚀 Tudo pronto! Site atualizado."
echo "--------------------------------------"
