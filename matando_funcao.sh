#!/bin/bash

# Habilita a funcionalidade estendida de pattern matching
shopt -s extglob 

function Func
{
# Obtém a hora atual (00 a 23)
    HORA=$(date +%H)
    
# Usa a hora atual para a saudação
    case $HORA in
# Bom dia (00h a 11h)
        0[0-9]|1[01]) echo -n "Bom dia, ";;
        
# Boa tarde (12h a 17h)
        1[2-7]) echo -n "Boa tarde, ";;
        
# Boa noite (18h a 23h)
        *) echo -n "Boa noite, ";;
    esac

# Exibe o nome do usuário com a primeira letra em maiúscula (Ex: Luis)
# A variável $USER é convertida usando ${USER^}
    echo "${USER^}!"
}

# ------------------------------------------------------------------
# NOVO TESTE DE FALHA:
# ------------------------------------------------------------------
# Testamos explicitamente se a função existe usando 'type -t' ou 'declare -f'.
# O comando 'type' retorna 0 se encontrar o nome como função.

if declare -f Func > /dev/null ; then
    echo "Erro lógico: A função Func ainda existe!"
    exit 1
else
    # Se 'declare -f Func' falhou (código de saída != 0), então ela foi removida.
    echo "Teste: A função Func foi removida com sucesso. ($?)"
fi

# Chamada redundante (apenas para ver o código de saída que gera o 0):
Func 2> /dev/null
echo "Código de saída da chamada falha: $?"
