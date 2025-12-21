#!/bin/bash

# Habilita Expansão de Padrões Estendidos para +()
shopt -s extglob

function LimpaTexto
{
    # Recebe: $1 - A string a ser limpa
    
    # 1. Limpa à Esquerda (remove o prefixo mais longo de whitespace)
    local LimpoEsq="${1##+([[:space:]])}"
    
    # 2. Limpa à Direita (remove o sufixo mais longo de whitespace)
    local LimpoCompleto="${LimpoEsq%%+([[:space:]])}"
    
    # Imprime o resultado final
    echo "$LimpoCompleto"
}

# Exporta a função para sub-shells
export -f LimpaTexto

# ------------------------------------------------------------------
# CHAMADA DE TESTE (Adicione ao final do script para testar)
# ------------------------------------------------------------------
# echo "--- $(LimpaTexto "      Olá Mundo!   	   ") ---"
