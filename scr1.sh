#!/bin/bash
# scr1.sh 

echo "Começo com as seguintes variáveis:"
echo "1ª passada do scr1.sh"
echo "\$Var1 tem -$Var1-"
echo "\$Var2 tem -$Var2-"
echo "E passando a execução para o filho"
echo ""

echo "Vou alterar \$Var2 fazendo Var2=\$(scr2.sh)"

# 1. Executa scr2.sh e captura o stdout na variável Var2
Var2=$(scr2.sh)

# 2. Exibe o resultado após a substituição de comando
echo "\$Var1 tem -$Var1-"
echo "\$Var2 tem -$Var2-    <- Escrito por scr1.sh"
