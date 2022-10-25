# Running the backend

* Start the VM: `pipenv shell`
* Exit the VM: `exit` [(Not with `deactivate`)](https://stackoverflow.com/a/51075851/9603039)
* `cd backend`
* `python manage.py runserver` 
* go to http://localhost:8000/
* make sure you have the `DATABASE_NAME`, `DATABASE_USER` and `DATABASE_PASS` in `backend/.env`.
  
* Make migration `python manage.py makemigrations churchy` or
* apply the changes to the DB `python3 manage.py migrate churchy`

Interacting with API

* Go to admin dashboard `http://localhost:8000/admin` 
* View all places of prayer `http://localhost:8000/api/churchy/`
* View single place `http://localhost:8000/api/churchy/1/` 

DB interactions 
* connect to the DB: `cd backend`, `\psql -d DATABASE_NAME` 
* username and password are in .env

### Troubleshooting 
* After restarting the computer, I've encountered the following error when running the server:
    ```shell
    connection = Database.connect(**conn_params)
  File "/Users/justynazygmunt/.virtualenvs/churchy-ZLeFWcU6/lib/python3.9/site-packages/psycopg2/__init__.py", line 122, in connect
    conn = _connect(dsn, connection_factory=connection_factory, **kwasync)
    django.db.utils.OperationalError: connection to server at "127.0.0.1", port 5432 failed: Connection refused
	Is the server running on that host and accepting TCP/IP connections?```
This issue is related to broken `postgresql` - see the output of `brew services list` 
```shell
➜  churchy git:(main) ✗ brew services list
Name          Status     User File
mysql         none
postgresql    error  256 root ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
postgresql@11 none
postgresql@13 none
rabbitmq      none
unbound       none
```

In order to fix it, run `rm /usr/local/var/postgres/postmaster.pid` and then `brew services restart postgresql` (maybe with `sudo`).