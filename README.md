# OurFootprintCA
Repo for OurFootprint.ca

## Prerequisits:

### Node Package Manager (npm)
You can check if you have npm by running `npm version`
If you don't already have npm, follow the instructions at https://www.npmjs.com/get-npm to install it before continuing.

### Angular
You can run `ng v` to check if you have angular 9 already
If you don't already have the angular 9 CLI, you'll need to run `npm install -g @angular/cli`. 

### Python
You will need a copy of python 3.7. Earlier versions may work.
Additional dependencies are discussed in the later sections of this document.


## Set up the Angular Frontend and the Angular Universal Node server
In the folder `frontend/OurFootprint` run `npm i`.
This will install all of the node dependencies for the project.


## Set up the django server
Note: Make sure you have python version 3.7 as PostgreSQL is not yet supported in Python 3.8. Earlier versions may also work.
### If you are using PyCharm Professional IDE:
1) Open the backend/Ourfootprint folder as project in PyCharm.
2) Set up a new virtual environment. You can do this by going to `File>Settings>Project>Project Interpreter`.
3) Click on the hamburger icon and click on 'Add'. Select the appropriate base interpreter and click OK.
4) Install the django in your new virtual environment:
```
pip install django
```
5) Add a new configuration to run your project. Go to `Edit configurations>+>Django server`.
6) Hit Fix in the bottom right corner.
7) Check `enable django support`
8) Set the project root dropdown to `backend/OurFootprint`
9) Set the settings dropdown to `backend/OurFootprint/OurFootprint/settings.py`
10) Click on the Play icon or `Shift+F10` to start your server.

### If you are not using PyCharm Professional IDE:
1) Set up a new virtual environment for the project (`backend/Ourfootprint`).
2) Install django in the new virtual environment.
3) Run the following comand to start the server:
```
python manage.py runserver
```
(Make sure your virtual environment is activated)


## Set up the database to work with django
1) Download and install PostgreSQL 12 if you haven't already
2) Download and install required packages:
```
pip install psycopg2
pip install djangorestframework
```
If you get an error message that says that 'wheel' is not installed, install wheel:
```
pip install wheel
```
3) Make a password.py file in the `backend/OurFootprint` directory.
Note: This file contains the password required to connect to the database. It is stored as the 'password' variable (string).
```
password = '[password]'
```
4) Run the necessary sql script. This script contains password and is hence not included as a part of the github repo.
```
    DROP DATABASE IF EXISTS sample;
    DROP ROLE ourfootprint;
    CREATE USER OurFootprint WITH PASSWORD '[password]' CREATEDB;
    SET ROLE OurFootprint;
    CREATE DATABASE Sample;
```
5) Migrate the database models:
```
python migrate.py makemigrations
python migrate.py migrate
```
