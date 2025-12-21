#!/bin/bash
# O prg serve para contar a quantidade de cada anilha teria de usar
#+ para fazer um cabeamento

# Verifica se foram fornecidos exatamente 2 argumentos
(($# != 2)) && {
    echo "Uso: $0 <Número Inicial> <Número Final>"
    exit 1

# 1. Processamento e Limpeza da String
Tudo=$(echo {$1..$2})
Tudo=${Tudo// /}

# 2. Loop para Contar Algarismos
for ((i=0; i<${#Tudo}; i++))
do
    Algarismo[${Tudo:i:1}]=$((Algarismo[${Tudo:i:1}] + 1))
done

# 3. Loop para Imprimir Resultados
for ((i=0; i<=9; i++))
do
    printf "Algarismo %d = %2d\n" \
    "$i" "${Algarismo[$i]:-0}"
done
