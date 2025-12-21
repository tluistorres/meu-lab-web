#!/bin/bash
# remover_func.sh: Remove uma função do shell atual

# Verifica se o nome da função foi passado como argumento
if [ -z "$1" ]; then
    # Usa $0 (nome do script) na mensagem de uso
    echo "Erro: Forneça o nome da função a ser removida." >&2
    echo "Uso: source $0 <NomeDaFuncao>" >&2
    return 1
fi

FUNCAO_ALVO="$1"

# 2. Confirma a existência e remove
if declare -f "$FUNCAO_ALVO" > /dev/null; then
    unset -f "$FUNCAO_ALVO"
    echo "Função '$FUNCAO_ALVO' removida com sucesso."
else
    echo "Erro: Função '$FUNCAO_ALVO' não encontrada no shell atual." >&2
    return 2
fi
