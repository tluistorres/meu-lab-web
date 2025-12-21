#!/bin/bash

# 1. Resetar OPTIND
OPTIND=1

while getopts :c: Opc
do
    case $Opc in
        c) echo Recebi a opção -c
           echo Parâmetro passado para a opção -c foi $OPTARG
           ;;
        \?) echo Caractere $OPTARG inválido
            exit 1
            ;;
        :) echo precisa de um argumento
            exit 1
            ;;
    esac
done

#    $OPTIND aponta para o índice do primeiro argumento não-opcional (o '/caminho/do/arquivo')
shift $((OPTIND - 1))

# 3. Capturar os argumentos restantes ($@)
ARGs="$@"

# 4. Imprimir os argumentos restantes
echo "Recebi o(s) seguinte(s) extra(s): $ARGs"
