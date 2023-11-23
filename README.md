# pg
proyecto de grado

# REQUISITOS
-> node version 20.5.1
-> npm version 9.8.0

# INSTALACION
----- linea de comandos (terminal)
_> git clone git@github.com:hectorjcv/pg.git
_> cd server
_> npm install
... esperar que instale
_> cd ../client
_> npm install
... esperar que instale

# CREAR CONNECION A LA BASE DE DATOS
_>  cd server
    crear un archivo llamado .env
    DATABASE_URL='mysql://{usuario}:{contraseña}@{host}/{base_de_datos}'
    DATABASE_URL='mysql://root:@localhost/alcaldia_inventario'
_>  npm prisma migrate dev
    ... cuando solicite un nombre le dan init
    ... esperar que cree la migración

# CREAR DIRECTOS    
    editar los campos { name, lastname, ci, email }
    dentro del archivo ./server/src/routes/init.ts
    luego de editar el archivo
_>  npm run dev
    abrir navegador y e ir a la url http://localhost:3001/init/set/admin
