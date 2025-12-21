#!/bin/bash
#
# Para saber se tem dado na entrada primária
#

if [[ -t 0 ]]
then
    if (($# == 0))
    then
        echo "Não tem dados em stdin nem parâmetros" >&2
        # Define Meio para uso na linha final, mesmo sem dados
        Meio="por passagem de parâmetros"
    else
        # Se tiver parâmetros, mas não for pipe, é passagem de parâmetros.
        Meio="por passagem de parâmetros"
    fi
else
    # 1. Entrada via pipe/redirecionamento (stdin)
    Params=$(cat -)
    
    # 2. CORREÇÃO: Remove aspas duplas para criar múltiplos argumentos.
    set -- $Params
    
    Meio="pela entrada primária (stdin)"
fi

echo -e "Recebi $Meio os seguintes dados:\n$@"
