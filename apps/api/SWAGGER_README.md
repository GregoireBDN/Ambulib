# Documentation Swagger - API Ambulib

## 🚀 Accès à la documentation

Une fois l'API démarrée, la documentation Swagger est accessible à l'adresse :

```
http://localhost:3001/api/docs
```

## 📋 Fonctionnalités disponibles

### 🔐 Authentification (Tag: auth)

#### Inscription

- **POST** `/auth/signup`
- Crée un nouveau compte utilisateur
- Body: `SignupDto` (prénom, nom, email, mot de passe, informations optionnelles)

#### Connexion

- **POST** `/auth/signin`
- Authentifie un utilisateur avec email/mot de passe
- Body: `SigninDto` (email, mot de passe)

#### Connexion Google

- **GET** `/auth/google/login`
- Redirige vers l'authentification Google OAuth

#### Rafraîchissement de token

- **POST** `/auth/refresh`
- Utilise le refresh token pour obtenir un nouveau token d'accès
- Body: `RefreshTokenDto` (refreshToken)

#### Compléter le profil

- **PATCH** `/auth/complete-profile`
- Met à jour les informations du profil utilisateur
- Requiert authentification JWT
- Body: `CompleteProfileDto` (informations optionnelles)

#### Déconnexion

- **POST** `/auth/signout`
- Déconnecte l'utilisateur et invalide ses tokens
- Requiert authentification JWT

#### Endpoint protégé

- **GET** `/auth/protected`
- Endpoint de test pour vérifier l'authentification
- Requiert authentification JWT et rôles ADMIN ou DRIVER

### 👥 Utilisateurs (Tag: users)

_À venir - Le contrôleur utilisateur sera documenté ici_

### 🏥 Santé (Tag: health)

#### Vérification de l'état

- **GET** `/`
- Vérifie que l'API fonctionne correctement
- Retourne un message de confirmation

## 🔑 Authentification

### JWT Bearer Token

Pour les endpoints protégés, utilisez l'authentification Bearer Token :

1. Connectez-vous via `/auth/signin` ou `/auth/signup`
2. Récupérez le `accessToken` de la réponse
3. Utilisez le token dans l'en-tête Authorization : `Bearer <token>`

### Exemple d'utilisation

```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
     http://localhost:3001/auth/protected
```

## 📝 DTOs (Data Transfer Objects)

### SignupDto

```typescript
{
  firstName: string;           // Prénom (requis)
  lastName: string;            // Nom de famille (requis)
  email: string;               // Email (requis, format valide)
  password: string;            // Mot de passe (requis)
  age?: string;                // Âge (optionnel)
  phoneNumber?: string;        // Téléphone (optionnel)
  address?: string;            // Adresse (optionnel)
  city?: string;               // Ville (optionnel)
  postalCode?: string;         // Code postal (optionnel)
  authProvider?: AuthProvider; // Fournisseur d'auth (optionnel)
  isProfileComplete?: boolean; // Profil complet (optionnel)
}
```

### SigninDto

```typescript
{
  email: string; // Email (requis)
  password: string; // Mot de passe (requis)
}
```

### AuthResponseDto

```typescript
{
  id: number; // ID utilisateur
  firstName: string; // Prénom
  lastName: string; // Nom de famille
  email: string; // Email
  role: string; // Rôle (ADMIN, DRIVER, etc.)
  accessToken: string; // Token JWT d'accès
  refreshToken: string; // Token de rafraîchissement
  isProfileComplete: boolean; // Profil complet
}
```

## 🛠️ Développement

### Ajouter de nouveaux endpoints

1. **Créer les DTOs** dans le dossier approprié avec les décorateurs `@ApiProperty`
2. **Documenter le contrôleur** avec `@ApiTags`, `@ApiOperation`, `@ApiResponse`
3. **Ajouter l'authentification** si nécessaire avec `@ApiBearerAuth('JWT-auth')`

### Exemple d'ajout d'endpoint

```typescript
@ApiTags('users')
@Controller('users')
export class UserController {
  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un utilisateur par ID' })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur trouvé',
    type: UserDto,
  })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  @ApiBearerAuth('JWT-auth')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
```

## 🔧 Configuration

La configuration Swagger se trouve dans `src/main.ts` :

```typescript
const config = new DocumentBuilder()
  .setTitle('Ambulib API')
  .setDescription("API pour l'application Ambulib")
  .setVersion('1.0')
  .addBearerAuth(/* configuration JWT */)
  .addTag('auth', "Endpoints d'authentification")
  .addTag('users', 'Gestion des utilisateurs')
  .addTag('health', "Vérification de l'état de l'API")
  .build();
```

> >

## 📚 Ressources

- [Documentation NestJS Swagger](https://docs.nestjs.com/openapi/introduction)
- [Documentation Swagger UI](https://swagger.io/tools/swagger-ui/)
- [Spécification OpenAPI](https://swagger.io/specification/)
