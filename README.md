# Actual Intelligence (AI) - Semesterprojekt WS25


## /login 

No parameters
Request body

Username and password used to login

{"username": "string",
"password": "string"}

#### Responses:
200 Successfully logged in
{"token": "string"}

400  The server could not understand the request due to invalid syntax. The client should modify the request and try again.
{"message": "string"}

401 User or password wrong

## /user

Doku bei luki

## /community bei uns Category

Die Get routen sind für die User, der rest für Admins


