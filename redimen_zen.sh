#!/bin/bash
# Redimensiona fotos direto no Nautilus
# Caso o gerenciador de arqs não seja o Nautilus os
#+ nomes das variáveis de sistema deverão ser trocados

IFS=$"\n"         # IFS passa a ser somente o new line

# CORREÇÃO 1: --text em vez de --textn
Tipo=$(zenity --list \
    --title "Redimensiona imagens" \
    --text "Iforme se redimensionamento\n é percentual ou absoluto" \
    --radiolist --column Marque --column "Tipo" \
    true Percentual false Absoluto) || exit 1

if [ "$Tipo" = "Percentual" ]
then
    Val=$(zenity --entry \
        --title "Redimensiona imagens" \
        --text "Informe o percentual de redução" \
        --entry-text 50)% || exit 1 # Concatenando % em $Val
else
    Val=$(zenity --entry \
        --title "Redimensiona imagens" \
        --text "Informe a largura final da imagem" \
        --entry-text 200)x || exit 1
fi

Var=$(zenity --list --title "Redimensiona imagens" \
    --text "Escola uma das opções abaixo" \
    --radiolist --height 215 --width 390 --hide-column 2 \
    --column Marque --column "" --column Opções \
    false 0 "Saída da imagem em outro diretório" \
    false 1 "Saída da imagem com sufixo" \
    true 2 "Saída da imagem sobregravando a inicial") || exit 1

case "$Var" in
    0) 
        # CORREÇÃO 2: --directory em vez de --diretory
        Dir=$(zenity --file-selection \
            --title "Escolha diretório" \
            --directory) || exit 1 ;;
    1) 
        Suf=$(zenity --entry \
            --title "Redimensiona imagens" \
            --text "Informe o sufixo dos arquivos" \
            --entry-text _redim) || exit 1;;
    2) 
        # A opção 2 (sobregravar) é a mais fácil. Executa mogrify e sai.
        # Usa a variável de ambiente do Nautilus diretamente.
        mogrify --resize "$Val" $NAUTILUS_SCRIPT_SELECTED_FILE_PATHS
        exit 0 ;; # Saída limpa
esac

# O vetor de arquivos selecionados é a variável de ambiente do Nautilus
Arqs_selecionados="$NAUTILUS_SCRIPT_SELECTED_FILE_PATHS"

# A contagem de arquivos é o número de linhas na string (já que o IFS é \n)
Arqs=$(echo "$Arqs_selecionados" | wc -l)
i=0 # Inicializa contador para a barra de progresso

# No for a seguir:
for Arq in $Arqs_selecionados
do
    echo $((++i * 100 / Arqs))
    echo "# Redimensionando $(basename "$Arq")"
    sleep 1 # Reduzido para testar mais rápido
    
    # A conversão precisa do caminho completo do arquivo selecionado ($Arq)
    if [ "$Var" -eq 0 ]
    then
        # Opção 0: Salvar em outro diretório
        # $Dir: diretório destino. ${Arq##*/}: apenas o nome do arquivo.
        convert "$Arq" -resize "$Val" "$Dir/${Arq##*/}"
    else
        # Opção 1: Salvar com sufixo
        # ${Arq%%.*}: nome do arquivo sem extensão. ${Arq##*.}: apenas a extensão.
        # CORREÇÃO 3: Uso de $Arq, aspas e sintaxe Bash correta
        convert "$Arq" -resize "$Val" "${Arq%%.*}$Suf.${Arq##*.}"
    fi
done | zenity --progress \
    --title "Aguarde. Em redimensionamento" \
    --auto-close --auto-kill

exit 0
