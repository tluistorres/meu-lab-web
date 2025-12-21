if [[ ! -t 0 ]]; then
    echo "[[ ! -t 0 ]] é verdadeiro
        Recebi $(cat -)"
else
   echo "[[ ! -t 0 ]] é falso"
fi
