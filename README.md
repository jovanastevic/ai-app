# Actual Intelligence (AI) - Semesterprojekt

## TODO:
- Kurzbeschreibung des Projekts [] - Verena
- Presentation Layer - UML [X] - Sadi
- Presentation Layer - Mockups [] - Verena
- Business Layer - UML (inkl Navigabilität, Kardinalität und Zugriffsmodifier) [] - Sadi
- Data Layer - ER Diagramm [X] - Jovana - check vor Abgabe


### Frontend Aufgaben:
- Bei "/create-prompt" Combobox enthardcoden [] - Jovana
- Websocket Oberfläche [] - Jovana
- Authentication Login und Logout [] - Sadi
- Prompts löschen und neue einbauen weil "test test" is oag schirch [] - maybe Verena
- Code Kommentare einbauen [] - Sadi & Jovana

### Backend Aufgaben:
- Alles was mit Admin zu tun hat raus aus dem Code [] - Sadi
- Eine Ding mit if true return true fixen [] - Sadi
- Typos fixen: 
  - https://github.com/jovanastevic/ai-app/blob/b33e54c64da1503873d63ce7cabbeff74aecdea8/ai-server/src/controller/CategoryController.ts#L39 []
- Auth vlt umändern idk, /logout muss glaub auch da sein [] - Sadi
- Swagger UI für API Dokumentation für extra Punkte [] - ka mal schauen
- Catagories nur eine Get Route [] - Sadi
- Chat Doku richtig stellen /ChatroomController Überarbeiten [] - Sadi

### Fehlermeldungen:
- Wenn keine Prompts, soll kein Error sein, sondern einfach "Keine Prompts vorhanden" oder so anzeigen
- 404 Error testen
- beim Eingeben von Login/Register Data sollte auch eine Fehlermeldung kommen, wenn die Daten falsch sind, z.B. "Falscher Benutzername oder Passwort"
- Beim Erstellen eines Prompts sollte auch eine Fehlermeldung kommen, wenn die Daten falsch sind, z.B. "Ungültige Eingabe"
- checken ob alle HTTP Codes richtig bzw sinnvoll sind [] - Alle bitte