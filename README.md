- Fetch all heroes

`http -v -a user:password http://localhost:8080/heroes`

- Fetch single heroe

`http -v -a user:password http://localhost:8080/heroes/2`

- Creating hero

`http -v -a user:password POST http://localhost:8080/heroes name=Hombukar`

- Updating hero

`http -v -a user:password PUT http://localhost:8080/heroes/4 name=Tomby`

- Deleting hero

`http -v -a user:password DELETE http://localhost:8080/heroes/2`
