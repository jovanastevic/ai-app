# Actual Intelligence (AI) - Semesterprojekt WS25


# /login
### POST /login - login
- req: **{username, password}**  
- res: 400 **{message: "Missing fields"}**  
  - 401 **<- Authentication is required**  
  - 200 **{token, generated Token}**

# /user

### GET /user - alle User holen:
- req:{}
- res: 404 **<- Not Found**
  - 500 **<-Database error**
  - 200 **{users: {username, email, profileDescription}, ...}**  

### GET /user/:username - einzelnen User holen:
- req:{}
- res: 404 **<- Not Found**
    - 500 **{message: Database error}**
    - 200 **{username, email, profileDescription}**   
  
### POST /user - neuen User erstellen:
- req:**{username, email, password, profileDescription}**
- res: 409 **<- User already exists**
  - 400 **{message: Wrong input data}**
  - 409 **<- User already exists**
  - 500 **{message: Database error}**
  - 201 **<- User created**

### PUT /user/:username - User updaten:
- req:**{Token, email, profileDescription}**
- res: 404 **<- Not Found**
    - 400 **{message: Wrong input data}**
    - 401 **<- Authentication is required**
    - 500 **{message: Database error}**
    - 200 **<- User updated**

### PUT /user/:username/password - Passwort updaten:
- req:**{Token, oldPassword, newPassword}**
- res: 404 **<- Not Found**
    - 400 **{message: Wrong input data || message: Old password does not match}**
    - 401 **<- Authentication is required**
    - 500 **{message: Database error}**
    - 200 **<- Password updated**

### DELETE /user/:username - User löschen:
- req:**{Token}**
- res: 404 **<- Not Found**
    - 401 **<- Authentication is required**
    - 500 **{message: Database error}**
    - 200 **<- User deleted**

# /category

### Die Get routen sind für die User, der rest für Admins:

### GET /categories - alle Kategorien holen:
- req:{}
- res:404 **<- Not Found**
  - 500 **{message: Database error}**
  - 200 **{categories: {id, name, description}, ...}**

### GET /categories/:id - einzelne Kategorie holen:
- req:{}
- res:404 **<- Not Found**
    - 500 **{message: Database error}**
    - 200 **{id, name, description}**

### POST /categories - neue Kategorie erstellen:
- req:**{Token, name, description}**
- res: 400 **{message: Wrong input data}**
  - 401 **<- Authentication is required**
  - 403 **<- Not Allowed**
  - 409 **<- Category already exists**
  - 500 **{message: Database error}**
  - 201 **<- Category created**

### PUT /categories/:id - Kategorie updaten:
- req:**{Token, name, description}**
- res: 404 **<- Not Found**
    - 400 **{message: Wrong input data}**
    - 401 **<- Authentication is required**
    - 403 **<- Not Allowed**
    - 500 **{message: Database error}**
    - 200 **<- Category updated**

### DELETE /categories/:id - Kategorie löschen:
- req:**{Token}**
- res: 404 **<- Not Found**
    - 401 **<- Authentication is required**
    - 403 **<- Not Allowed**
    - 500 **{message: Database error}**
    - 200 **<- Category deleted**

# /prompt 
### GET /prompts - alle Prompts holen:
- req:{}
- res: 404 **<- Not Found**
  - 500 **{message: Database error}**
  - 200 **{prompts: {id, category_id, userowner, title, description, time_stamp}, ...}**

### GET /prompts/:id - einzelnen Prompt holen:
- req:{}
- res: 404 **<- Not Found**
    - 500 **{message: Database error}**
    - 200 **{id, category_id, userowner, title, description, time_stamp}**

### POST /prompts - neuen Prompt erstellen:
- req:**{Token, category_id, title, description}**
- res: 400 **{message: Wrong input data || Category does not exist}**
  - 401 **<- Authentication is required**
  - 500 **{message: Database error}**
  - 201 **<- Prompt created**

### PUT /prompts/:id - Prompt updaten:
- req:**{Token, title, description}**
- res: 404 **<- Not Found**
    - 400 **{message: Wrong input data}**
    - 401 **<- Authentication is required**
    - 403 **<- Not Allowed**
    - 500 **{message: Database error}**
    - 200 **<- Prompt updated**

### DELETE /prompts/:id - Prompt löschen:
- req:**{Token}**
- res: 404 **<- Not Found**
    - 401 **<- Authentication is required**
    - 403 **<- Not Allowed**
    - 500 **{message: Database error}**
    - 200 **<- Prompt deleted**

# /chats

### GET /chat/:id - einzelnen Chat(Room) holen (ka ob es gebraucht wird):
- req:**{Token}**
- res: 404 **<- Not Found**
    - 401 **<- Authentication is required**
    - 500 **{message: Database error}**
    - 200 **{room: id, name, time_stamp}**
### GET /chat - alle Chats(Rooms) eines Users holen:
- req:**{Token}**
- res: 404 **<- Not Found**
    - 401 **<- Authentication is required**
    - 500 **{message: Database error}**
    - 200 **{result: { id, name, time_stamp}, ...}**
### GET chat/:id/messages - alle Nachrichten eines Chats holen:
- req:**{Token}**
- res: 404 **<- Not Found**
    - 401 **<- Authentication is required**
    - 500 **{message: Database error}**
    - 200 **{result: { user_id, message, time_stamp}, ...}**
### POST /chat - neuen Chat(Room) erstellen:
- req:**{Token,name}**
- res: 
  - 400 **{message: Wrong input data || Conflict in Database}**
  - 401 **<- Authentication is required**
  - 500 **{message: Database error}**
  - 201 **<- Room created and user added to Room**
### DELETE /chat/:id - Chat(Room) löschen:
- req:**{Token}**
- res: 404 **<- Not Found**
    - 401 **<- Authentication is required**
    - 500 **{message: Database error}**
    - 200 **<- Prompt deleted**