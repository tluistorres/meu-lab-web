#!/bin/bash
# Script ajustado para formatar a tela nas linhas e colunas exatas.

# 1. Configuração inicial
clear
declare -a Arqs=() 
IFS=$' \t\n' # Garante o IFS padrão

# a) Escrever "Arquivo:" na Linha 2, Coluna 10
# tput cup (linha, coluna) usa índice 0 para linha. Linha 2 = índice 1. Coluna 10 = índice 9.
tput cup 1 9
echo -n "Arquivo: "

# b) Iniciar loop de leitura de nomes de arquivos
while true; do
    # Move o cursor para a Linha 2, Coluna 19 (10 para "Arquivo:" + 9 caracteres + 1 espaço)
    # Coluna 19 = índice 18
    tput cup 1 18 
    read -r Entrada  # Lê a entrada do usuário na mesma linha

    # 1. Verifica se o campo está vazio (usuário deu ENTER)
    if [ -z "$Entrada" ]; then
        break # Sai do loop
    fi

    # Limpa a linha 3 (erros) e a linha 4 (listagem anterior)
    tput cup 2 0; tput el
    tput cup 3 0; tput el

    # 2. Expansão dos metacaracteres e tratamento de erros
    
    # A expansão é feita pelo shell. Se não encontrar nada, a string de entrada original
    # é retornada (a menos que 'nullglob' esteja ativo).

    Arquivos_Encontrados=()
    # Cria uma cópia da Entrada para iterar; se o 'glob' não encontrar nada,
    # ele expandirá para a própria string.
    for arq in $Entrada; do
        if [ -e "$arq" ]; then
            Arquivos_Encontrados+=("$arq")
        fi
    done

    # 3. Tratamento da mensagem de erro (stderr)
    if [ ${#Arquivos_Encontrados[@]} -eq 0 ]; then
        # Se nenhum arquivo real foi encontrado
        tput cup 2 0
        echo "Erro: Nenhum arquivo encontrado correspondente a '$Entrada'" >&2
        tput el # Limpa o resto da linha
    else
        # c) Listar na Linha 4, Coluna 19 os nomes expandidos
        # Linha 4 = índice 3. Coluna 19 = índice 18.
        tput cup 3 18
        
        # Concatena os nomes dos arquivos para exibição na Linha 4
        printf '%s ' "${Arquivos_Encontrados[@]}"

        # Incluir no vetor Arqs (acumula todos os arquivos encontrados em cada rodada)
        Arqs+=("${Arquivos_Encontrados[@]}")
    fi
done

# Limpa as linhas de formatação antes da listagem final
tput cup 1 0; tput el
tput cup 2 0; tput el
tput cup 3 0; tput el

# Listagem final do vetor Arqs
tput cup 5 0
echo "--- LISTAGEM FINAL DO VETOR Arqs (${#Arqs[@]} arquivos) ---"
printf '%s\n' "${Arqs[@]}"
