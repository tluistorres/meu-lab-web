#!/bin/bash
if [[ -p /dev/stdin ]]; then
    echo "[[ -p /dev/stdin ]] é verdadeiro"
else
   echo "[[ -p /dev/stdin ]] é falso"
fi # !stdin
if [[ ! -t 0 ]]; then
    echo "[[ ! -t 0 ]] é verdadeiro"
else
    echo "[[ ! -t 0 ]] é falso"
fi
  
