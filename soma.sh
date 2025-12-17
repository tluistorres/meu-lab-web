#!/bin/bash
# soma.sh - Script para somar uma lista de números inteiros
# Uso: ./soma.sh N1 N2 [N3 ...]

# --- TRATAMENTO DE ERROS ---
if (($# < 2)); then
    echo "Erro: Mínimo de 2 números (parcelas) é necessário." >&2
    echo "Uso: $0 N1 N2 [N3 ...]" >&2
    exit 1
fi

# --- CÁLCULO DA SOMA ---

# 1. Constrói a string de soma: substitui espaços por '+' nos argumentos.
# Exemplo: Se $@ for "10 5 20", SomaString se torna "10+5+20".
SomaString=$(echo "$@" | tr ' ' '+')

# 2. Executa o cálculo aritmético com a string construída.
Resultado=$(($SomaString))

# --- SAÍDA ---
echo "A soma de $@ é: $Resultado"

# Retorna 0 (sucesso)
exit 0
