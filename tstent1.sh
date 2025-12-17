if [[ -p /dev/stdin ]]; then
    echo "[[ -p /dev/stdin ]] é verdadeiro
        Recebi $(cat -)"
else
   echo "[[ -p /dev/stdin ]] é falso"
fi

