# Implementación de autenticación con tokens JWT y fecha de expiración en Node.js con Express.js

## Descripción general

Este proyecto implementa un sistema de autenticación simple utilizando tokens JSON Web Token (JWT) en una aplicación Node.js con Express.js. La funcionalidad clave es la expiración de tokens para mejorar la seguridad del sistema.

### Implementación de la autenticación

El proyecto utiliza las siguientes rutas para la autenticación:

- **POST /login:** Esta ruta acepta un nombre de usuario y una contraseña en el cuerpo de la solicitud. Si las credenciales coinciden con las credenciales codificadas (user y password), se genera un token JWT con una vida útil de 30 minutos e incluye el nombre de usuario en el payload. El token se devuelve en la respuesta.

- **GET /verify:** Esta ruta verifica la validez de un token JWT proporcionado en el encabezado Authorization de la solicitud. Si el token es válido y no ha expirado, la ruta devuelve un mensaje de éxito que incluye el nombre de usuario decodificado del payload. Si el token está ausente, es inválido o ha expirado, la ruta devuelve un mensaje de error con el código de estado HTTP apropiado.

### Manejo de la expiración de tokens

La expiración de los tokens se implementa utilizando la opción expiresIn en la función jwt.sign(). Esta opción establece el tiempo en segundos durante el cual el token será válido. En este caso, se establece en 1800 segundos (30 minutos).

Cuando un usuario se autentica correctamente y se genera un token JWT, la fecha de expiración se calcula sumando el tiempo de expiración (1800 segundos) a la fecha y hora actual. Esta fecha de expiración se incluye en el payload del token.

Al verificar un token JWT, se decodifica el payload y se extrae la fecha de expiración. Si la fecha de expiración ha pasado, el token se considera inválido y se devuelve un mensaje de error.

### Ruta de verificación de tokens

La ruta GET /verify se utiliza para verificar la validez de un token JWT proporcionado en el encabezado Authorization de la solicitud. La ruta decodifica el token, extrae la fecha de expiración y verifica si el token ha expirado. Si el token es válido y no ha expirado, la ruta devuelve un mensaje de éxito que incluye el nombre de usuario decodificado del payload. Si el token está ausente, es inválido o ha expirado, la ruta devuelve un mensaje de error con el código de estado HTTP apropiado.

### Consideraciones de seguridad

Tenga en cuenta que esta es una implementación básica con fines educativos. En un entorno de producción, se deben tener en cuenta las siguientes prácticas de seguridad:

- **Almacenamiento seguro de la clave secreta:** La variable de entorno KEY actualmente almacena la clave secreta utilizada para firmar y verificar tokens. En producción, nunca almacene la clave secreta directamente en el código fuente o en un archivo de configuración accesible desde el entorno de ejecución. Considere utilizar un administrador de secretos dedicado para almacenar la clave de forma segura.
- **Uso de HTTPS:** La comunicación entre el cliente y el servidor debe realizarse a través de HTTPS para garantizar el cifrado de datos, incluida la transmisión de tokens JWT.
- **Manejo de errores robusto:** La implementación actual devuelve mensajes de error genéricos en caso de errores de autenticación. En producción, se recomienda proporcionar mensajes de error más específicos para ayudar en la depuración, pero evitando filtrar información sensible.

#### Pruebas

Puede utilizar herramientas como Postman o Thunder Client para probar los endpoints de autenticación:

1. **Endpoint POST /login:** Envíe una solicitud POST con el cuerpo {"username": "user", "password": "password"}. Si las credenciales son correctas, recibirá un token JWT en la respuesta.
2. **Endpoint GET /verify:** Incluya el token obtenido en el paso anterior en el encabezado Authorization de una solicitud GET a /verify. Si el token es válido, recibirá un mensaje de éxito con el nombre de usuario decodificado.
