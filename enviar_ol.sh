#!/bin/bash

# --- CORREÇÃO: Definição das variáveis de ambiente e arquivo de entrada ---

# Linha 4 (aproximadamente): Define o nome do arquivo de dados a ser lido
ARQUIVO_ENTRADA="ArqOLs" 

# Linha 5: Define a variável SITE que é usada no corpo do e-mail
SITE="seu_site_aqui" 

# Garante que o script pare se o arquivo não existir (boa prática)
if [ ! -f "$ARQUIVO_ENTRADA" ]; then
    echo "Erro: Arquivo '$ARQUIVO_ENTRADA' não encontrado."
    exit 1
fi

# --- Início do loop ---

# O novo loop lê 2 campos: OL (Nome do Arquivo) e Destinatario (E-mail completo)
while read OL Destinatario
do
    # Verifica se o campo Destinatario foi lido (evita linhas vazias no ArqOLs)
    if [ -z "$Destinatario" ]; then
        continue
    fi
    
    # LINHA 27 CORRIGIDA: Usa 'cat' para salvar o e-mail em um arquivo
    cat > "email_$Destinatario.txt" << "FimMail"
Ref. Transferência de Arquivos

Informamos que:
O processamento de $(date '+%d/%b/%y às %R Hr') disponibilizou o arquivo $OL.z 
no seu diretório de saída (/prd4/staout/$SITE) do $(uname -n).

Lembramos que a política de backup não inclui arquivos transitórios como o citado acima. 
É portanto fundamental a presteza em capturá-lo para sua filial, o que pode ser feito 
utilizando o programa pegapack.sh, que está disponível no diretório /dsv/ftp/pub de durjcv01.

Saudações.
FimMail
done < "$ARQUIVO_ENTRADA"
