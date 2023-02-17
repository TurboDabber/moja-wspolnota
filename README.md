# moja-wspolnota
by: Paweł L., Wiktoria G. & Paweł K.
Technologie: Angular, Leaflet, Python - Flask
Aplikacja umożliwia przeglądanie wspólnot na mapie (Leaflet) przez użytkowników nie-zalogowanych, oraz dodawanie nowych centrów dla użytkowników zalogowanych. 
Użytkownik może zarejestrować się przez stronę oraz później zalogować.
Aplikacja zgodna z standardem REST.API, logowanie przebiega przez uzyskanie przez frontend tokena autoryzacyjnego z backendu i przesyłanie go w nagłówku.
![image](https://user-images.githubusercontent.com/43883128/219617222-3a0e7c75-b54f-4e57-8d4f-0916dd279dd6.png)
![image](https://user-images.githubusercontent.com/43883128/219617305-61927a61-5b2c-4317-bcc5-f95b715367d7.png)

![image](https://user-images.githubusercontent.com/43883128/219617395-c822e46c-4d5d-4bcb-b019-193713f52471.png)

#PYTHON
uruchom terminal w moja-wspolnota/python

1. Aby zainstalować wymagane biblioteki python i pythona 3.8.10 64 bit, wykonaj polecenie w folderze moja-wspolnota/python:
sudo pip install -r requirements.txt 

2. Upewnij się, że masz ustawioną zmienną środowiskową FLASK_APP na nazwę pliku z aplikacją Flask. Możesz to zrobić, wpisując polecenie:
export FLASK_APP=nazwa_pliku.py 
w terminalu przed uruchomieniem aplikacji.

3. Upewnij się, że aplikacja jest uruchamiana za pomocą polecenia "flask run" w dirze python, a nie jako zwykły skrypt Python.

#ANGULAR
uruchom terminal w moja-wspolnota/angular/moja-wspolnota

1. Zainstaluj Angualr 15.03 oraz node package manager 8.19.2 oraz node.js v19.3.0

2. zainstaluj wszystko: npm install

3. Uruchom npm start
