#!/bin/bash
# upperconv.sh
# Converte arquivo em maiúscula dando a saída em outro arquivo

# --- 1. VALIDAÇÃO INICIAL ---
if (($# != 2)); then
    echo "Erro: Forneca exatamente 2 nomes de arquivo." >&2
    echo "Uso: $0 <Arq. Minúsculas> <Arq. Maiúsculas>" >&2
    exit 1
fi
# ------------------------------

ARQ_ENTRADA="$1"
ARQ_SAIDA="$2"

# 2. VALIDAÇÃO DE PERMISSÕES
if [ ! -r "$ARQ_ENTRADA" ]; then
    echo "Erro: O arquivo de entrada \"$ARQ_ENTRADA\" nao existe ou nao tem permissao de leitura." >&2
    echo "Uso: $0 <Arq. Minúsculas> <Arq. Maiúsculas>" >&2
    exit 1
fi

# Não validamos -w $2, pois o arquivo de saída pode ser criado.
# Se o diretório não permitir escrita, o exec falhará.

# 3. REDIRECIONAMENTO (Salvando FDs originais)
exec 4<&0  # Salva o stdin original (teclado) para o FD 4
exec < "$ARQ_ENTRADA" # FD 0 (stdin) agora lê do arquivo de entrada

exec 7>&1  # Salva o stdout original (tela) para o FD 7
exec > "$ARQ_SAIDA"  # FD 1 (stdout) agora escreve no arquivo de saída

# -------------------------------------------------------------------
# 4. PROCESSAMENTO CORE
# O 'tr' lê do FD 0 (arquivo de entrada) e escreve no FD 1 (arquivo de saída)
tr a-z A-Z
# ------------------------------------------------------------------

# 5. RESTAURAÇÃO DOS FDs
exec 1>&7 7>&- # Restaura o stdout original (tela) e fecha o FD 7
exec 0<&4 4<&- # Restaura o stdin original (teclado) e fecha o FD 4

# Agora stdout é a tela e stdin é o teclado
echo "\"$ARQ_ENTRADA\" foi escrito para \"$ARQ_SAIDA\" em maiúsculas"
read -n1 -p "Tecle algo para terminar: "
