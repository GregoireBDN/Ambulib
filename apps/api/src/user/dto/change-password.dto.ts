import { IsString, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Mot de passe actuel',
    example: 'AncienMotDePasse123!',
  })
  @IsString()
  currentPassword: string;

  @ApiProperty({
    description:
      'Nouveau mot de passe (minimum 8 caractères avec majuscule, chiffre et caractère spécial)',
    example: 'NouveauMotDePasse456!',
    minLength: 8,
  })
  @IsString()
  @MinLength(8, {
    message: 'Le mot de passe doit contenir au moins 8 caractères',
  })
  @Matches(/[a-zA-Z]/, {
    message: 'Le mot de passe doit contenir au moins une lettre',
  })
  @Matches(/[A-Z]/, {
    message: 'Le mot de passe doit contenir au moins une majuscule',
  })
  @Matches(/\d/, {
    message: 'Le mot de passe doit contenir au moins un chiffre',
  })
  @Matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, {
    message:
      'Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*...)',
  })
  newPassword: string;
}
