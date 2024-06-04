# Comment lancer le site web en local :   

## Installations
Afin de pouvoir lancer le site web en local il est nécessaire d'avoir les logiciels suivants : 

Pour la partie React : 

1) node js 
```
sudo apt installer nodejs
```
2) npm

```
sudo apt install npm 
```
Pour la partie Flask (python)

3) poetry (ou un autre env python)
```
curl -sSL https://install.python-poetry.org | python3 -
```
ou 
```
pipx install poetry
```
   
5) Matlab
pour que la librairie python matlabengine fonctionne il faut nécessairement avoir dans le .bashrc : 
```
export DYLD_LIBRARY_PATH=<path_vers_matlab_bin>
```
J'ai codé avec matlab R2022b, j'éspere que cela ne posera pas de soucis 


## Lancement

1) Cloner le repo github : 
```
git clone https://github.com/antonin-tarrade/Project-TAV.git
```

2) Depuis un terminal se placer dans `tav-app`:
```
cd Project-Tav
cd tav-app
```
3) Lancer les commandes : 
```
npm install
npm start
```
4) dans un autre terminal se placer dans `backend`
```
cd backend
```
5) lancez le script run.py :  
Si on utilise poetry :  
```
poetry run python -m run
```
Sinon juste :
```
python run.py
```

Si tous ce passe bien, la partie react sera deployé sur le port `localhost:3000` et la partie backend sur le port `localhost:5000`

Il suffit alors d'aller sur http://localhost:3000 et un joli site de TAV apparait (on espere)

PS : si lancé depuis firefox c'est possible qu'il ne soit pas aussi joli que prévu