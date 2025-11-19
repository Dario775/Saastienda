# Arquitectura del Sistema SaaS

## I. Visión del Producto
### 1.1 Resumen Ejecutivo
Plataforma SaaS para la creación y gestión de tiendas en línea, diseñada para emprendedores y PYMEs que buscan una solución robusta, escalable y fácil de usar.

### 1.2 Alcance del Proyecto
- Gestión de inventario y productos.
- Procesamiento de órdenes y pagos.
- Personalización de tiendas (temas).
- Panel de administración para dueños de tiendas.

### 1.3 Usuarios Objetivo
- **Comerciantes**: Dueños de negocios que venden productos.
- **Clientes Finales**: Compradores en las tiendas.
- **Administradores del Sistema**: Personal de soporte y mantenimiento del SaaS.

### 1.4 Roadmap
- **Fase 1**: MVP (Gestión básica de productos y órdenes).
- **Fase 2**: Integración de pasarelas de pago y envíos.
- **Fase 3**: Marketplace de temas y plugins.

---

## II. Arquitectura Técnica

### 2.1 Diagramas de Arquitectura

#### Diagrama de Secuencia: Creación de Tienda
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
```

#### Diagrama Entidad-Relación (ER)
```mermaid
erDiagram
    USUARIOS {
        int id PK
        string nombre
        string email
        string password_hash
    }
    TIENDAS {
        int id PK
        string nombre
        string url_slug
        int fk_usuario_dueno FK
    }
    PRODUCTOS {
        int id PK
        string nombre
        float precio
        int stock
        int fk_tienda FK
    }
    ORDENES {
        int id PK
        datetime fecha
        float total
        int fk_tienda FK
        int fk_usuario_cliente FK
    }
    USUARIOS ||--o{ TIENDAS : "es dueño de"
    TIENDAS ||--o{ PRODUCTOS : "vende"
    TIENDAS ||--o{ ORDENES : "recibe"
    USUARIOS ||--o{ ORDENES : "realiza"
```

### 2.2 Stack Tecnológico
- **Frontend**: React / Vue.js
- **Backend**: Node.js / Python
- **Base de Datos**: PostgreSQL / MySQL
- **Infraestructura**: AWS / Google Cloud
# Arquitectura del Sistema SaaS

## I. Visión del Producto
### 1.1 Resumen Ejecutivo
Plataforma SaaS para la creación y gestión de tiendas en línea, diseñada para emprendedores y PYMEs que buscan una solución robusta, escalable y fácil de usar.

### 1.2 Alcance del Proyecto
- Gestión de inventario y productos.
- Procesamiento de órdenes y pagos.
- Personalización de tiendas (temas).
- Panel de administración para dueños de tiendas.

### 1.3 Usuarios Objetivo
- **Comerciantes**: Dueños de negocios que venden productos.
- **Clientes Finales**: Compradores en las tiendas.
- **Administradores del Sistema**: Personal de soporte y mantenimiento del SaaS.

### 1.4 Roadmap
- **Fase 1**: MVP (Gestión básica de productos y órdenes).
- **Fase 2**: Integración de pasarelas de pago y envíos.
- **Fase 3**: Marketplace de temas y plugins.

---

## II. Arquitectura Técnica

### 2.1 Diagramas de Arquitectura

#### Diagrama de Secuencia: Creación de Tienda
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
```

#### Diagrama Entidad-Relación (ER)
```mermaid
erDiagram
    USUARIOS {
        int id PK
        string nombre
        string email
        string password_hash
    }
    TIENDAS {
        int id PK
        string nombre
        string url_slug
        int fk_usuario_dueno FK
    }
    PRODUCTOS {
        int id PK
        string nombre
        float precio
        int stock
        int fk_tienda FK
    }
    ORDENES {
        int id PK
        datetime fecha
        float total
        int fk_tienda FK
        int fk_usuario_cliente FK
    }
    USUARIOS ||--o{ TIENDAS : "es dueño de"
    TIENDAS ||--o{ PRODUCTOS : "vende"
    TIENDAS ||--o{ ORDENES : "recibe"
    USUARIOS ||--o{ ORDENES : "realiza"
```

### 2.2 Stack Tecnológico (Propuesta CTO)

Para garantizar escalabilidad, rendimiento y mantenibilidad a largo plazo, se ha seleccionado la siguiente pila tecnológica moderna:

#### Frontend: **Next.js (React)**
- **Justificación**: Framework líder para React que ofrece Server-Side Rendering (SSR) y Static Site Generation (SSG) nativos, cruciales para el SEO de las tiendas de los clientes. Su ecosistema (Vercel) facilita el despliegue y la optimización de imágenes.

## III. Documentación de API

### 3.1 Estándares
- RESTful API
- Formato JSON para peticiones y respuestas.
- Autenticación vía JWT (JSON Web Tokens).

### 3.2 Referencia Detallada
Para ver la especificación completa de los endpoints, incluyendo parámetros y ejemplos de respuesta, consulta la [Referencia de API](./API_Reference.md).

### 3.3 Endpoints Principales (Resumen)
- **Tiendas**: Gestión de tiendas y configuraciones.
- **Productos**: CRUD de inventario.
- **Ordenes**: Procesamiento de compras.

---

## IV. Guías de Operación y Despliegue

### 4.1 Proceso de Despliegue (5 Pasos)

Este pipeline asegura una entrega continua, escalable y confiable del SaaS.

#### 1. Empaquetado (Packaging)
Utilizamos **Docker** para contenerizar todos los microservicios (API, Frontend, Workers).
- **Dockerfile**: Cada servicio tiene su propio Dockerfile optimizado (ej. Multi-stage builds para reducir tamaño).
- **Inmutabilidad**: Las imágenes generadas son inmutables y contienen todas las dependencias necesarias.

#### 2. Registro (Registry)
Las imágenes construidas se almacenan en un registro privado seguro.
- **Herramientas**: Docker Hub (Plan Pro) o Google Container Registry (GCR).
- **Versioning**: Se utiliza Semantic Versioning (v1.0.0) y tags de commit (sha-12345) para trazabilidad.

#### 3. Orquestación (Orchestration)
**Kubernetes (K8s)** gestiona el ciclo de vida de los contenedores en producción.
- **Cluster**: Nodos gestionados (EKS/GKE) para alta disponibilidad.
- **Servicios**:
    - `Deployment`: Para aplicaciones stateless (API, Frontend).
    - `StatefulSet`: Para bases de datos (si no se usa DB gestionada).
    - `Ingress`: Para enrutamiento de tráfico externo y terminación SSL.

#### 4. CI/CD (Integración y Despliegue Continuo)
Automatización completa mediante **GitHub Actions**.
- **CI**: Al hacer push, se ejecutan tests unitarios y linter. Si pasan, se construye la imagen Docker.
- **CD**: Al mergear a `main`, se despliega automáticamente a Staging. El paso a Producción requiere aprobación manual.

#### 5. Monitoreo y Observabilidad
Visibilidad completa del estado del sistema.
- **Métricas**: **Prometheus** recolecta métricas de infraestructura y negocio.
- **Visualización**: **Grafana** para dashboards en tiempo real (CPU, Memoria, Request/sec).
- **Alerting**: Reglas configuradas para notificar latencias altas o caídas de pods.

## 2.1 Pila Tecnológica (Tech Stack) Justificada
Pila Tecnológica (Tech Stack) Justificada
Para garantizar la escalabilidad, el rendimiento y la mantenibilidad a largo plazo de nuestro SaaS, propongo la siguiente arquitectura tecnológica:

Frontend: Next.js (React)
Justificación: Next.js es el estándar de la industria para aplicaciones React de producción. Ofrece Server-Side Rendering (SSR) y Static Site Generation (SSG) de forma nativa, lo cual es crítico para el SEO de las tiendas de nuestros clientes y para tiempos de carga inicial rápidos (Core Web Vitals). Su ecosistema robusto y la facilidad de despliegue en el borde (Edge) aseguran una experiencia de usuario premium.
Backend: NestJS (Node.js)
Justificación: NestJS proporciona una arquitectura modular y estructurada (inspirada en Angular) sobre Node.js, ideal para construir microservicios escalables. Su soporte de primera clase para TypeScript reduce errores en tiempo de desarrollo y facilita el mantenimiento de una base de código compleja. Además, su sistema de inyección de dependencias y decoradores estandariza el desarrollo entre diferentes equipos.
Base de Datos Principal: PostgreSQL
Justificación: PostgreSQL es la base de datos relacional de código abierto más avanzada. Su conformidad con ACID garantiza la integridad de los datos transaccionales (pedidos, pagos, inventario), lo cual es no negociable en e-commerce. Su capacidad para manejar datos no estructurados con JSONB nos da la flexibilidad de una base de datos NoSQL para atributos de productos dinámicos sin perder la robustez relacional.
Mensajería y Caching: Redis & RabbitMQ
Redis (Caching): Implementaremos Redis para almacenar en caché sesiones de usuario, carritos de compra y respuestas de API frecuentes. Esto reduce drásticamente la carga en la base de datos principal y proporciona respuestas en milisegundos.
RabbitMQ (Mensajería): Utilizaremos RabbitMQ como broker de mensajería para desacoplar nuestros microservicios. Esto permite el procesamiento asíncrono de tareas pesadas (ej. generación de facturas, envío de emails, actualizaciones de stock masivas), asegurando que la interfaz de usuario permanezca receptiva incluso durante picos de tráfico.