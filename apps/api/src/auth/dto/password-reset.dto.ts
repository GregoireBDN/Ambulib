import { IsEmail, IsString, MinLength, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({
    description: 'Adresse email pour laquelle demander la réinitialisation du mot de passe',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Veuillez saisir une adresse email valide' })
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Token de réinitialisation reçu par email',
    example: 'clp1a2b3c-d4e5-6789-abcd-ef0123456789',
  })
  @IsString({ message: 'Le token doit être une chaîne de caractères' })
  @IsUUID(4, { message: 'Le token doit être un UUID valide' })
  token: string;

  @ApiProperty({
    description: 'Nouveau mot de passe (minimum 8 caractères)',
    example: 'nouveauMotDePasse123!',
    minLength: 8,
  })
  @IsString({ message: 'Le mot de passe doit être une chaîne de caractères' })
  @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
  newPassword: string;
}