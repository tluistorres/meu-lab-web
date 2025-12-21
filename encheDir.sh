#!/bin/bash
function EncheDir 
{
#  Preenche à direita com caractere especificado
#+ Recebe:
#+ Valor inicial da cadeia ($1),
#+ Tamanho final ($2) e char de preenchimento ($3)
    local Var
    local Cadeia=${1// /^}
    
    # 1. Justifica à esquerda e preenche à direita com espaços
    printf -v Var %-"$2"s "$Cadeia" # Uso de "$Cadeia" mais seguro
    
    # 2. Substitui os espaços de preenchimento pelo caractere desejado
    Var=${Var// /$3}
    
    # 3. Restaura os espaços originais na cadeia e imprime
    echo "${Var//^/ }" 
}

# ----------------------------------------------------------------
# Exemplo de Teste
# ----------------------------------------------------------------
# Para testar este script, adicione a chamada no final:
# EncheDir "NOME" 15 \#
# EncheDir "luis torres" 20 \-
