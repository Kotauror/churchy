## Running the app

* Start the VM: `pipenv shell`
* Exit the VM: `exit` [(Not with `deactivate`)](https://stackoverflow.com/a/51075851/9603039)
* `cd backend`
* `python manage.py runserver` 
* go to http://localhost:8000/
  
* Make migration `python manage.py makemigrations churchy` or
* apply the changes to the DB `python3 manage.py migrate churchy`

Interacting with API

* Go to admin dashboard `http://localhost:8000/admin` 
* View all estates `http://localhost:8000/api/estates/`
* View single estate `http://localhost:8000/api/estates/id` 

DB interactions 
* connect to the DB: `cd backend`, `\psql -d churchy` 
* username and password in .env