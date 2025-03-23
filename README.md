# Instalación y funcionalidad del proyecto

## ⚡️ Inicializar los proyectos

### Versiones proyectos:
- Angular versión utilizada: "19.1.5" 
- Node versión utilizada: "20.15.0" 


### Pasos para inicializar el proyecto:
1. **- Instalar los paquetes necesarios mediante el siguiente comando (Tanto en el Frontend como en el Backend):**
   ```bash
   npm install
2. **- Iniciar ambiente angular:**
   ```bash
   ng serve -o
2. **- En el backend archivo config y database ingresar las credenciales proporcionadas:**
   ```javascript
    // Ingresar credenciales en config.js
    export const {
    PORT = 3000,
    HASH_NIVEL = 10,
    JWT_SECRET = 'palabrasecretapruebafavoritajunior',
    API_USER='',// ingresar id cliente
    API_PASS='', // ingresar clave secreta
    API_SANDBOX='' //ingresar api de transacciones
  
    } = process.env
    ''''''''''''''''''''''''''''''''''''''''''''''''''
    // Ingresar credenciales propias en database.js
    import mysql from 'mysql2/promise';

    export const pool = mysql.createPool({
    host: 'xxxx', // entorno local
    user: 'xxxx', // Usuario de MySQL
   // password: en caso de tener
    database: 'prueba_db', //ingrese el nombre de la base de datos
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
    });
3. **- Iniciar ambiente en nodejs:**
   ```bash
   npm run dev

## ⚡️ Evidencias de la funcionalidad
### Al ingresar a la aplicación lo primero que se muestra es el login:
![1](https://github.com/user-attachments/assets/ed8bd525-70b7-4bb3-bca8-c518346b24e0)
### Validación al tratar de iniciar sesión sin usuario:
![2](https://github.com/user-attachments/assets/364f8ebe-6d7e-44e5-b026-ba2674735d35)
### Validación al tratar de iniciar sesión sin contraseña:
![3](https://github.com/user-attachments/assets/8d87d5f1-c7a7-4c7a-b388-45a4035a43ba)
### Validación al tratar de iniciar sesión con un usuario incorrecto:
![4](https://github.com/user-attachments/assets/8255a527-1399-4d5a-aa85-7da2f26323c9)
### Validación al tratar de iniciar sesión con un password incorrecto:
![5](https://github.com/user-attachments/assets/26743bb4-d1c0-4cbb-b9d1-4aadc89de248)
### Vista principal de pagos, donde se observa el botón implementado:
![6](https://github.com/user-attachments/assets/21027469-af8c-4c6e-bd5e-3fb868810e15)
### Modal que se muestra al dar click en el botón de pago:
![7](https://github.com/user-attachments/assets/6238f598-c730-4242-b906-8d3ceb351bf6)
### Ingreso de datos para generar la transacción:
![8](https://github.com/user-attachments/assets/4bc3e948-185c-452a-9c3a-4d94f93f3b4d)
### Generando transacción:
![9](https://github.com/user-attachments/assets/a5a01614-a385-4ff6-9020-f22a85bd1710)
### Ingreso de codigo para validar la transacción:
![10](https://github.com/user-attachments/assets/ec0dec07-6369-4212-a60a-766f1401e227)
### Pago realizado correctamente:
![11](https://github.com/user-attachments/assets/83d89160-efbe-4361-9d18-874b40f91f51)
### Verificación del response con la transacción:
![12](https://github.com/user-attachments/assets/0703c58a-ff89-455b-ab05-54ef7b209fda)
### Verificar el id de la transacción:
![13](https://github.com/user-attachments/assets/8d976da3-e4e2-4efc-8a56-e40cc4dd3e3c)
### En la vista de transacciones verificar que se haya guardado en la base de datos:
![14](https://github.com/user-attachments/assets/7defca98-a7ab-4704-ad9b-64938406289c)
### Al hacer click en el boton de Detalle, se observa los datos de la transacción realizada:
![16](https://github.com/user-attachments/assets/e86df105-adb1-4822-9420-be68cc39a28b)
### Las transacciones estan guardadas por cada usuario:
![17](https://github.com/user-attachments/assets/e98c2af1-f63c-4996-ad73-64a9728612ca)
### Transacción realizada por otro usuario:
![18](https://github.com/user-attachments/assets/3e81971c-2f77-46c4-a0ca-1b323cb8c7cf)











  
   
  
   
