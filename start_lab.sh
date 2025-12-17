#!/bin/bash

# 1. Limpeza Automática
# Procura se o http-server está rodando e o encerra para liberar a porta
pkill -f http-server 2>/dev/null

echo "======================================"
echo "   LABORATORIO AUTOMATIZADO - LUIS    "
echo "======================================"

# 2. Gerar o Index Atualizado
echo "<html><head><title>Lab do Luis</title></head>" > index.html
echo "<body style='font-family: sans-serif; padding: 20px; background: #ecf0f1;'>" >> index.html
echo "<h1>🚀 Meus Aplicativos</h1>" >> index.html
echo "<p>Sistema atualizado em: $(date)</p><hr><ul>" >> index.html

for arquivo in *.html; do
    if [ "$arquivo" != "index.html" ]; then
        echo "<li style='margin: 10px 0;'><a href='$arquivo' style='text-decoration: none; color: #2980b9; font-weight: bold;'>$arquivo</a></li>" >> index.html
    fi
done

echo "</ul></body></html>" >> index.html
echo "[OK] Menu index.html renovado!"

# 3. Informações e Execução
IP_LOCAL=$(hostname -I | awk '{print $1}')
echo "[INFO] Endereço local: http://localhost:8080"
echo "[INFO] Endereço na rede: http://$IP_LOCAL:8080"
echo "======================================"

http-server -p 8080
