# Documentación del Proyecto

## Configuración del Entorno (`.env`)

A continuación, se detallan las variables de entorno necesarias para configurar correctamente el proyecto:

### Base de Datos

```env
# database
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=

# jwt  
SECRET_JWT=
JWT_EXPIRES=
```

## Estado Actual del Proyecto

### Pendientes y Observaciones

1. **Documentación con Swagger**:
   - Aunque tengo Swagger instalado y configurado, falta completar la documentación de los endpoints.

2. **JWT (JSON Web Tokens)**:
   - JWT está instalado y configurado, pero falta implementar las `strategies` y `guards` necesarios para proteger las rutas con los decoradores correspondientes.

3. **Manejo de Interfaces y DTOs**:
   - Debido a la rapidez con la que se trabajó, no se implementaron las clases DTO ni las interfaces. Sin embargo, se instalaron `class-validator` y `class-transformer` para validar y transformar los datos entrantes, y se planea usarlos como middleware para asegurar que los datos lleguen correctamente y, en caso contrario, informar el error.

4. **Manejo de Errores**:
   - Quedaron pendientes los manejadores de errores de NestJS en el archivo `main.ts`, así como la implementación de un `filter` de NestJS para manejar excepciones de manera global.

### Implementaciones Realizadas

1. **Modelos Relacionales**:
   - Se crearon los siguientes modelos relacionales:
     - `Usuario -> Wallet -> CryptoWallet -> Crypto`
   - Esto permite manejar adecuadamente la relación entre usuarios, sus wallets y las criptomonedas asociadas.

2. **Transacciones**:
   - Se trabajó con transacciones en casos necesarios, como la creación de usuarios y criptomonedas.
   - Al crear un usuario, se crea automáticamente su wallet y se inicializan las `cryptoWallets` con un valor de 0 para cada criptomoneda.
   - Al crear una criptomoneda, se crean las `cryptoWallets` para todos los usuarios existentes.

### Endpoints Implementados

#### Autenticación

- **POST /auth/signUp**:
  - Body: `{ user, password }`
  - Descripción: Crea un nuevo usuario.

- **POST /auth/signIn**:
  - Body: `{ user, password }`
  - Descripción: Inicia sesión y devuelve un token JWT.

#### Criptomonedas

- **POST /crypto**:
  - Body: `{ name, ticker, buyPrice }`
  - Descripción: Crea una nueva criptomoneda.

- **GET /crypto**:
  - Query: `{ cant, page }`
  - Descripción: Obtiene una lista paginada de criptomonedas.

- **PATCH /crypto/:id**:
  - Param: `<id>`
  - Descripción: Actualiza una criptomoneda existente.

- **DELETE /crypto/:id**:
  - Param: `<id>`
  - Descripción: Elimina una criptomoneda.

#### Wallet

- **PUT /wallet**:
  - Body: `{ id, amount }`
  - Descripción: Actualiza la cantidad de una criptomoneda en la wallet del usuario. **Nota**: El `id` corresponde al `cryptoWallet`.

#### Usuarios

- **GET /users/:id**:
  - Param: `<id>`
  - Descripción: Obtiene la información de un usuario específico.

## Próximos Pasos

1. Completar la documentación con Swagger.
2. Implementar las `strategies` y `guards` para JWT.
3. Crear las clases DTO y las interfaces necesarias.
4. Implementar los manejadores de errores globales en `main.ts` y el `filter` de NestJS.
5. Revisar y limpiar el código para asegurar que todo esté correctamente implementado y documentado.