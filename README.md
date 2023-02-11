# moja-wspolnota

sudo apt install python3-django


#PYTHON
1. Upewnij się, że aplikacja jest uruchamiana za pomocą polecenia "flask run" w dirze python, a nie jako zwykły skrypt Python.

2. Upewnij się, że masz ustawioną zmienną środowiskową FLASK_APP na nazwę pliku z aplikacją Flask. Możesz to zrobić, wpisując polecenie:
export FLASK_APP=nazwa_pliku.py 
w terminalu przed uruchomieniem aplikacji.

3. Upewnij się, że masz zainstalowane wszystkie wymagane biblioteki. Możesz to sprawdzić, porównując zawartość pliku requirements.txt z zainstalowanymi bibliotekami. Możesz też spróbować ponownie zainstalować wszystkie biblioteki, używając polecenia pip install -r requirements.txt.

4. Aby zainstalować wymagane biblioteki python, wykonaj polecenie w folderze moja-wspolnota/python:
sudo pip install -r requirements.txt 
