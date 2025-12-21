#!/bin/bash

Uso ()
{
    echo "    $Coment" >&2
    echo "    Uso: $0 -f -C -u parâmetro" >&2
    exit 1
}

i=0 # Inicializar i (necessário para $((++i)))
# 2. CORREÇÃO: Usar $# para verificar se há QUALQUER argumento, não apenas 0
# Se não houver argumentos, o getopts irá parar imediatamente, o que está ok.

# A verificação abaixo é válida, mas 'getopts' pode ser suficiente.
# Se você quiser garantir que sempre haja argumentos:
# (( $# == 0 )) && { Coment="Faltou parâmetro"; Uso; }

printf "%29s%10s%10s%10s%10s\n" Comentário Passada Char OPTARG OPTIND
while getopts ":fu:C" VAR
do
    case $VAR in
        f) Coment="Achei a opção -f"
           ;;
        u) Coment="Achei a opção -u $OPTARG"
           ;;
        C) Coment="Achei a opção -C"
           ;;
        # Note que a chamada Uso na opção \? é quem encerrará o script
        \?) Coment="Achei uma opção inválida -$OPTARG"
            Uso # Chama a função que imprime a mensagem e sai
            ;;
        # O OPTARG aqui é o nome da opção que faltou o argumento
        :) Coment="Faltou argumento da opção -$OPTARG"
            Uso
    esac
    # A função Uso já chama exit, então essa linha só será executada se for uma opção válida
    printf "%30s%10s%10s%10s%10s\n" "$Coment" $((++i)) "$VAR" \
    "$OPTARG" "$OPTIND"
done
