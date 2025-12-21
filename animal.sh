#!/bin/bash
# Separa animais domésticos  e selvagens
declare -A Animais
Animais[cavalo]=doméstico
Animais[zebra]=selvagem
Animais[gato]=doméstico
Animais[tigre]=selvagem
Animais[urso]=selvagem

# Vetores Dom e Sel devem ser declarados antes de serem usados como arrays vazios
declare -a Sel Dom

# 1. Separação dos Animais
for Animal in "${!Animais[@]}"
do
    if [[ "${Animais[$Animal]}" == selvagem ]]
    then 
        Sel+=("$Animal")  # Adição moderna de elemento a array
    else
        Dom+=("$Animal")  # Adição moderna de elemento a array
    fi
done

# 2. Determinação do Maior Vetor
# Maior = número de elementos do array maior
Maior=$((${#Dom[@]} > ${#Sel[@]} ? ${#Dom[@]} : ${#Sel[@]}))

# 3. Impressão na Tela
clear
tput bold; printf "%-15s%-15s\n" Domésticos Selvagens; tput sgr0

for ((i=0; i<$Maior; i++))
do # <--- Sintaxe Corrigida: Usando 'do'
    # Verifica e imprime o elemento Dom, ou espaço vazio se o índice não existir
    tput cup $[1+i] 0; echo "${Dom[i]:-}" 
    
    # Verifica e imprime o elemento Sel, ou espaço vazio se o índice não existir
    tput cup $[1+i] 14; echo "${Sel[i]:-}"
done # <--- Sintaxe Corrigida: Usando 'done'
