#!/bin/bash
# Script de launcher para rodar o redimensionador principal dentro de um Xterm personalizado.

# Define o nome do script principal (que conterá o código de redimensionamento e dialog)
SCRIPT_PRINCIPAL="$HOME/.local/share/nautilus/scripts/redimen_tui.sh"

# Verifica se o script principal existe (boa prática)
if [ ! -f "$SCRIPT_PRINCIPAL" ]; then
    zenity --error --text="Erro: O script principal ($SCRIPT_PRINCIPAL) não foi encontrado."
    exit 1
fi

# Define as variáveis do Nautilus para o script interno
# O Xterm precisa ser chamado com o script principal e os argumentos necessários.
# Passamos o nome dos arquivos selecionados via variáveis de ambiente.
export ARQS_SELECIONADOS="$NAUTILUS_SCRIPT_SELECTED_FILE_PATHS"

# Comando para abrir o Xterm formatado e executar o script principal
xterm -T "Redimensiona Imagens TUI" \
      -geometry 100x30 \
      -bg darkred \
      -fg lightgray \
      -fn "7x13" \
      -e "$SCRIPT_PRINCIPAL"

exit 0
