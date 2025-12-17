#!/bin/bash
function LeEntrada
{
if ! [[ -t 0 ]]    # Testa se  file descriptor 0 (entrada
                   #+ primária) está aberto no terminal
then
   echo -n "$(< /dev/stdin)" | 
      xclip -selection c && \
          echo "Copiando para clipboard"
else
   if [[ -z "$@" ]]  # Cadê (o)s parâmetro(s)
   then
      echo "Uso:
      $0 ARQ - Manda arquivo ARQ p/ clipboard
      CMD | $0 - Manda saída de CMD p/ clipboard" >&2
      return 1
   fi
   # Então parâmetro passado foi um arquivo
   if [[ ! -f "$@" ]]
   then
      echo  Arquivo $@ não existe
      return 1
   else
      xclip -i -selection clipboard "$@"
      echo "Arquivo "$@" copiado para clipboard"
   fi
fi
}

# (Conteúdo da função LeEntrada...)

# Chamada da função com os parâmetros passados ao script
LeEntrada "$@"
