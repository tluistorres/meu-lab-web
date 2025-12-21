#!/bin/bash
# Script principal com interface TUI (Text User Interface) usando dialog.
# Requer: dialog, convert (ImageMagick)

# 1. Variáveis de Configuração e Checagem
DESTINO="$HOME/.local/share/nautilus/scripts/" # Diretório onde este script está
IFS=$'\n' # Garante que os nomes dos arquivos com espaço sejam tratados corretamente
DIALOG=dialog

# Checa se o dialog está instalado
if ! command -v $DIALOG &> /dev/null; then
    echo "Erro: O comando 'dialog' não está instalado."
    echo "Instale com 'sudo apt install dialog'"
    read -n 1 -s -r -p "Pressione qualquer tecla para sair..."
    exit 1
fi

# 2. Coleta de Informações do Redimensionamento (Tipo: Percentual ou Absoluto)
TMPFILE=$(mktemp)

$DIALOG --backtitle "Configuração de Redimensionamento" \
        --radiolist "Escolha o tipo de redimensionamento:" 15 60 2 \
        Percentual "Reduzir/Aumentar por percentual" ON \
        Absoluto "Definir largura e altura absolutas" OFF 2> $TMPFILE

TIPO=$(cat $TMPFILE)

if [ "$TIPO" = "Percentual" ]; then
    $DIALOG --inputbox "Informe o percentual de REDUÇÃO (Ex: 50)" 10 60 "50" 2> $TMPFILE
    VALOR=$(cat $TMPFILE)"%"
else
    $DIALOG --inputbox "Informe a LARGURA final (Ex: 800)" 10 60 "800" 2> $TMPFILE
    VALOR=$(cat $TMPFILE)
fi

# 3. Coleta de Informações do Nome de Saída
$DIALOG --radiolist "Opções de saída de arquivo:" 15 60 3 \
        0 "Saída em outro diretório" OFF \
        1 "Saída com sufixo (Ex: nome_redim.jpg)" ON \
        2 "Sobrescrever arquivo original" OFF 2> $TMPFILE

OPCAO_SAIDA=$(cat $TMPFILE)

if [ "$OPCAO_SAIDA" = "0" ]; then
    $DIALOG --dselect $HOME "Escolha o diretório de saída:" 10 60 2> $TMPFILE
    DIR_SAIDA=$(cat $TMPFILE)
elif [ "$OPCAO_SAIDA" = "1" ]; then
    $DIALOG --inputbox "Informe o sufixo (Ex: _redim)" 10 60 "_redim" 2> $TMPFILE
    SUFIXO=$(cat $TMPFILE)
fi

rm $TMPFILE # Limpeza

# 4. Processamento dos Arquivos
ARQUIVOS="$ARQS_SELECIONADOS" # Variável exportada pelo script launcher
if [ -z "$ARQUIVOS" ]; then
    $DIALOG --msgbox "Nenhum arquivo selecionado. SCRIPT FINALIZADO." 10 40
    exit 0
fi

readarray -t ARQS_ARRAY <<< "$ARQUIVOS" # Converte a string newline-separada em array
NUM_ARQS=${#ARQS_ARRAY[@]}
i=0

# Loop para redimensionamento e barra de progresso (TUI)
(
for ARQ in "${ARQS_ARRAY[@]}"; do
    i=$((i + 1))
    PERCENT=$((i * 100 / NUM_ARQS))

    echo $PERCENT
    echo "XXX"
    echo "Processando ($i de $NUM_ARQS): $(basename "$ARQ")"
    echo "XXX"
    
    ARQ_NOME="${ARQ%%.*}"
    ARQ_EXT="${ARQ##*.}"
    
    # Executa o comando convert (ImageMagick)
    if [ "$OPCAO_SAIDA" = "0" ]; then
        # Opção 0: Salvar em outro diretório
        convert "$ARQ" -resize "$VALOR" "$DIR_SAIDA/$(basename "$ARQ")"
    elif [ "$OPCAO_SAIDA" = "1" ]; then
        # Opção 1: Salvar com sufixo
        convert "$ARQ" -resize "$VALOR" "$ARQ_NOME$SUFIXO.$ARQ_EXT"
    else
        # Opção 2: Sobrescrever (usa mogrify, que é mais eficiente para sobrescrever)
        mogrify -resize "$VALOR" "$ARQ"
    fi
done
) | $DIALOG --title "Progresso" --gauge "Processando imagens..." 10 60 0

# 5. Finalização
$DIALOG --msgbox "Redimensionamento concluído para $NUM_ARQS arquivos." 10 40
exit 0
