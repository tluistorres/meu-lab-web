#!/bin/bash
function Repete
{
#   Repete um caractere um determinado número de vezes
#+ Recebe:
#+ Tamanho final da cadeia ($1)
#+ e caractere a ser repetido ($2)
    local Var
    # CORREÇÃO: Cria uma string de $1 espaços em Var
    printf -v Var %"$1"s "" 
    # Substitui todos os espaços em Var pelo caractere $2
    echo "${Var// /$2}"
}
function EncheEsq
{
# ... (Função EncheEsq não alterada) ...
    local Var
    local Cadeia=${1// /^}
    printf -v Var %$2s $Cadeia
    Var=${Var// /$3}
    echo "${Var//^/ }"
}

# Verifica se os argumentos foram fornecidos e chama a função Repete
if [ $# -ge 2 ]; then
    # Passamos os argumentos $1 (Tamanho) e $2 (Caractere)
    Repete "$1" "$2"
else
    echo "Uso: $0 <Tamanho> <Caractere>" >&2
fi
