# Clean Architecture Implementation Rules

## Request Flow Pattern

1. **Controller Layer** (`presentation/controllers/`)
   - Receives HTTP request
   - Maps request to DTO
   - Calls appropriate service method
   - Maps service response to DTO
   - Returns HTTP response

2. **DTO Layer** (`presentation/dto/`)
   - Defines data transfer objects
   - Handles validation using class-validator
   - Separates API contract from domain entities

3. **Service Layer** (`core/application/services/`)
   - Implements business logic
   - Uses domain entities
   - Communicates with repository through interface
   - Handles business rules and validations

4. **Domain Layer** (`core/domain/`)
   - Contains business entities
   - Defines repository interfaces
   - Independent of external frameworks
   - Pure business logic

5. **Repository Layer** (`core/infrastructure/repositories/`)
   - Implements repository interfaces
   - Handles data persistence
   - Maps database models to domain entities
   - Uses Prisma client for database operations

## File Structure

```
src/
├── core/
│   ├── domain/
│   │   ├── entities/         # Business entities
│   │   └── repositories/     # Repository interfaces
│   ├── application/
│   │   ├── interfaces/       # Service interfaces
│   │   └── services/         # Service implementations
│   └── infrastructure/
│       ├── repositories/     # Repository implementations
│       └── prisma/          # Prisma configuration
└── presentation/
    ├── controllers/         # HTTP controllers
    └── dto/                # Data transfer objects
```

## Implementation Rules

1. **Entities**
   - Must be pure TypeScript interfaces
   - No dependencies on external libraries
   - Represent core business objects

2. **DTOs**
   - Must use class-validator decorators
   - Separate from domain entities
   - Handle input/output validation

3. **Services**
   - Must implement service interfaces
   - Depend on repository interfaces, not implementations
   - Handle business logic and validations

4. **Repositories**
   - Must implement repository interfaces
   - Handle data mapping between database and domain entities
   - Use Prisma client for database operations

5. **Controllers**
   - Handle HTTP requests/responses
   - Use DTOs for input/output
   - Call appropriate service methods
   - Handle HTTP-specific concerns (status codes, headers, etc.) 