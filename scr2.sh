# Conteúdo do scr2.sh
#!/bin/bash
Var1="Só com source"
Var2="Valor do filho"
echo "scr2.sh mudou as variáveis para:
\$Var1 tem -$Var1-     <- Escrito por scr2.sh" >/dev/tty
echo $Var2
