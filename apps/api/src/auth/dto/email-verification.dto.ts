import { IsEmail, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendVerificationCodeDto {
  @ApiProperty({
    description: 'Adresse email pour laquelle envoyer le code de vérification',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Veuillez saisir une adresse email valide' })
  email: string;
}

export class VerifyCodeDto {
  @ApiProperty({
    description: 'Adresse email à vérifier',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Veuillez saisir une adresse email valide' })
  email: string;

  @ApiProperty({
    description: 'Code de vérification à 6 chiffres',
    example: '123456',
    minLength: 6,
    maxLength: 6,
  })
  @IsString({ message: 'Le code doit être une chaîne de caractères' })
  @Length(6, 6, { message: 'Le code doit contenir exactement 6 caractères' })
  @Matches(/^\d{6}$/, { message: 'Le code doit contenir uniquement des chiffres' })
  code: string;
}