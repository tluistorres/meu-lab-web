#!/bin/bash
# Simula um tail
# $1 --> Arquivo
#+ $2 --> Qtd linha (padrão 10)

Qtd=${2:-10}        # Se $2 não for informado Qtd=10
mapfile -t Vet < "$1"
printf '%s\n' "${Vet[@]: -$Qtd}" # CORRIGIDO: Usando $Qtd para o offset
