#!/bin/bash

# Define a variável para capturar a linha de erro.
# Nota: Esta variável só é confiável dentro desta função.
LINHA_ERRO=0

# Define a função especial que o Bash chama quando um comando falha
function command_not_found_handle
{
    # 1. Armazena o erro e o comando que falhou
    local CMD_FALHO="$1"
    LINHA_ERRO=${BASH_LINENO[0]}

    # 2. Imprime o diagnóstico (usando apenas echo, um built-in)
    echo "--- DETECTADO ERRO ---"
    echo "Script: $0"
    echo "Linha: $LINHA_ERRO"
    echo "Comando incorreto: '$CMD_FALHO'"
    echo "------------------------"
    
    # 3. Retorna um código de erro (built-in).
    # Isso fará com que o script principal falhe na linha do erro.
    return 127
}

# --------------------------------------------------
# Corpo do Script
# --------------------------------------------------

echo "Script começou a execução..."

# Esta linha deve ser executada normalmente
echo "Este comando existe."

# Esta linha vai falhar e chamar command_not_found_handle
eco "Este comando não existe" # LINHA QUE CAUSA O ERRO

# A linha abaixo é alcançada APENAS se o 'return' falhar em interromper
# Se o 'return' for bem-sucedido, o script principal falha aqui.
if [ $? -ne 0 ]; then
    echo "ERRO FATAL. Encerrando o script."
    exit 1
fi

# Esta linha NUNCA deve ser executada
echo "Fim. (NUNCA DEVERIA VER ISSO)"
