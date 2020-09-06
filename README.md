# MERNTask-React-App
Aplicación realizadas utilizando Node con express para el servidor para el backend, como Base de Datos utilizamos MongoDB, para el frontal utilizamos React.

# Levantar la App primero levantamos el Backend

````
    yarn dev (para desarrollo)
````

# Levantamos el Frontal

`````
    yarn start
`````

# Dependencias en el FrontEnd

``````
        "axios": "^0.20.0",
        "react": "^16.13.1",
        "react-dom": "^16.13.1",
        "react-router-dom": "^5.2.0",
        "react-scripts": "3.4.3",
        "react-transition-group": "^4.4.1"
``````

# Dependencias en el BackEnd

``````  
        "bcryptjs": "^2.4.3",
        "cors": "^2.8.5",
        "dotenv": "^8.2.0",
        "express": "^4.17.1",
        "express-validator": "^6.6.1",
        "jsonwebtoken": "^8.5.1",
        "mongoose": "^5.10.2"
``````

# Modelo de datos utilizado en Mongo

``````
    Proyecto:{
        nombre,
        creador,
        registro
    }

    Tareas:{
        nombre,
        estado,
        registro
        proyecto
    }

    Usuarios:{
        nombre,
        email,
        password,
        registro
    }
``````





