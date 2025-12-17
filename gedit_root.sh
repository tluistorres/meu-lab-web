#!/bin/bash
# Executa o editor de texto gedit com privilégios de root (administrador).
# Usa o pkexec, que lida com a autenticação gráfica de forma segura.

# Verifica se o arquivo a ser editado foi selecionado pelo Nautilus.
# NAUTILUS_SCRIPT_SELECTED_FILE_PATHS é uma variável do ambiente Nautilus.

# O PolicyKit (pkexec) pedirá a senha graficamente.
# É importante que o editor seja chamado sem '&' se for o único comando.
# Usamos aspas duplas para lidar corretamente com nomes de arquivos com espaços.

pkexec gedit "$NAUTILUS_SCRIPT_SELECTED_FILE_PATHS"

# Nota: Se NAUTILUS_SCRIPT_SELECTED_FILE_PATHS estiver vazio (nenhum arquivo selecionado), 
# o gedit será aberto sem nenhum arquivo.
