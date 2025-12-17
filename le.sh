#!/bin/bash
#  Posiciona e lê um campo. Recebe:
#+     $1 - Linha
#+     $2 - Coluna
#+     $3 - Prompt de leitura
{
    tput cup $1 $2
    read -p "$3" Lido
} > /dev/tty
echo  "$Lido"
