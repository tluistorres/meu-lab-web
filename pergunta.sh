#!/bin/bash
# pergunta.sh - Script de pergunta interativa com controle de terminal

# Definições de posição para fins de demonstração
Lin=5 # Linha de início
Col=0 # Coluna de início

Pergunta ()
{
    # TRATAMENTO DE VARIÁVEIS DE ENTRADA
    # DefVal: Valor padrão (ex: SIM) em caixa alta. Usa o argumento $2.
    DefVal=${2^^} 
    
    # OthVal: Valor alternativo (ex: NAO) em caixa baixa. Usa o argumento $3.
    OthVal=${3,,} 

    # Quest: Constrói o texto do prompt. Ex: "Deseja continuar? [SIM/NAO]"
    Quest="$1? [$DefVal/$OthVal]" 
    Tam=${#Quest} # Captura o tamanho da string de prompt para centralização

    # CÁLCULO DE POSIÇÃO E CONTROLE DE TERMINAL
    Cols=$(tput cols)
    # Move o cursor para centralizar o texto (Lin, Coluna Central)
    tput cup $Lin $(((Cols - Tam) / 2)) 

    # LEITURA DA RESPOSTA
    # O -p não é ideal com tput, mas funciona para demonstração
    read -r -p "$Quest: " SN < /dev/tty 

    # PROCESSAMENTO E VALIDAÇÃO DA RESPOSTA
    SN=${SN:-"$DefVal"} # Se SN estiver vazio, assume DefVal (SIM)
    SN=${SN^^}          # Converte a resposta para CAIXA ALTA

    # Se SN for IGUAL ao valor ALTERNATIVO (NAO), SN = NAO.
    # Caso contrário, SN é forçado a ser o valor PADRÃO (SIM).
    # Este é um tratamento binário.
    if [[ $SN != ${3^^} ]]; then 
        SN="$DefVal"
    else
        SN="${3^^}"
    fi

    # LIMPEZA E RETORNO
    tput cup $Lin 0 # Move o cursor de volta
    tput el         # Apaga a linha da pergunta (erase line)
    return 0
}

# ----------------------------------------------------------------------
# CHAMADA DE TESTE
# ----------------------------------------------------------------------

# Exemplo: Pergunta "Deseja continuar" com default SIM e alternativa NAO
Pergunta "Deseja continuar" "SIM" "NAO"

# Imprime o resultado final (deve ser 'SIM' ou 'NAO')
echo "A resposta final é: $SN"
