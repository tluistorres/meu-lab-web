if [[ -s /dev/stdin ]]; then
    echo "[[ -s /dev/stdin ]] é verdadeiro
        Recebi $(cat -)"
else
   echo "[[ -s /dev/stdin ]] é falso"
fi
