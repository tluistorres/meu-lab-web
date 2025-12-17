#!/bin/bash

# Versão Bash para replicar a SAÍDA DO C (2, 4)
for (( i=1; i<=5; i++, i++ )); do
    # Quando o corpo do loop executa, i já foi incrementado uma vez
    echo "Números: $i"
done

