#!/bin/bash
# Recebe parâmetros via stdin ou argumento, os coloca em coluna numerando-os

# 1. TRATAMENTO DA ENTRADA
if (($# == 0)); then 
    Parms=$(cat -)
    set -- $Parms 
fi

# Calcula a largura necessária para a numeração:
LARGURA_STR="$#"
LARGURA=${#LARGURA_STR} 

# 2. PROCESSO PRINCIPAL (Loop e Impressão Direta)
# Cria um grupo de comandos (subshell) e direciona toda a saída para 'pr'.
{
    for ((i = 1; i <= $#; i++)); do
        # CORREÇÃO: Usamos um espaço simples (' ') em vez de tabulação ('\t')
        # para separar o número da letra, garantindo que o 'pr' veja a letra.
        printf "%0${LARGURA}i %s\n" "$i" "${!i}"
    done
} | pr -T -8
