#!/bin/bash
# Abre o local atual do Nautilus com privilégios de root,
# usando o esquema de URI admin:// (funciona em Nautilus/GNOME modernos).

# 1. Verifica se o URI do diretório atual foi fornecido
if [ -z "$NAUTILUS_SCRIPT_CURRENT_URI" ]; then
    # Se for executado fora do Nautilus, abre a raiz do sistema
    PASTA_ADMIN="admin:///"
else
    # 2. Converte o URI Nautilus para o formato admin://
    # Exemplo: file:///home/user/ -> admin:///home/user/
    PASTA_ADMIN=$(echo "$NAUTILUS_SCRIPT_CURRENT_URI" | sed 's/^file:\/\//admin:\/\//')
fi

# 3. Abre o Nautilus no local com privilégios de administrador
nautilus --new-window "$PASTA_ADMIN"
