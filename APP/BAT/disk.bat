@echo off
REM Deleta o arquivo disk.txt se ele existir
if exist disk.txt del disk.txt

REM Comando para obter informações sobre os discos instalados e gravar em disk.txt
wmic diskdrive get caption,size /format:csv | findstr /r /v "^$" > disk.txt