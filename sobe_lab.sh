#!/bin/bash
echo "Limpando ambiente..."
rm -f index.html
echo "Criando nova página com data atual..."
echo "<html><body><h1>Lab do Luis</h1><p>Ultima atualizacao: $(date)</p></body></html>" > index.html
echo "Subindo servidor na porta 9000..."
http-server -p 9000
