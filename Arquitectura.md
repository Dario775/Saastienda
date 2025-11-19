```mermaid
sequenceDiagram
    participant User as Cliente
    participant App as Frontend (React/Vue)
    participant API as Backend (API Gateway)
    participant DB as Base de Datos

    User->>App: Clic en "Crear Tienda"
    App->>API: POST /tiendas (Datos iniciales)
    activate API
    API->>DB: INSERT nueva_tienda
    activate DB
    DB-->>API: ID de la tienda
    deactivate DB
    API-->>App: 201 Creado (ID de la tienda)
    deactivate API
    App->>User: Tienda creada. Redirigir a Configuración.