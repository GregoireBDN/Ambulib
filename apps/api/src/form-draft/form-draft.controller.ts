import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Session,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { FormDraftService } from './form-draft.service';
import {
  SaveFormDraftDto,
  FormDraftResponseDto,
  SensitiveFormDataDto,
} from './dto/form-draft.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('form-draft')
export class FormDraftController {
  private readonly logger = new Logger(FormDraftController.name);

  constructor(private readonly formDraftService: FormDraftService) {}

  /**
   * Sauvegarder temporairement des données médicales sensibles
   * POST /form-draft
   */
  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async saveDraft(
    @Body() saveDraftDto: SaveFormDraftDto,
    @Session() session: Record<string, any>,
  ): Promise<FormDraftResponseDto> {
    try {
      // Utiliser l'ID de session Express comme identifiant sécurisé
      const sessionId = session.id || session.sessionID;

      if (!sessionId) {
        this.logger.error('Session ID manquant pour sauvegarde brouillon');
        return {
          success: false,
          message: 'Session invalide',
        };
      }

      const { draftId, expiresAt } = await this.formDraftService.saveDraft(
        sessionId,
        saveDraftDto.sensitiveData,
      );

      this.logger.log(`Brouillon sauvegardé avec succès: ${draftId}`);

      return {
        success: true,
        draftId,
        expiresAt,
        message: 'Données médicales sauvegardées temporairement (30 min)',
      };
    } catch (error) {
      this.logger.error('Erreur sauvegarde brouillon:', error);
      return {
        success: false,
        message: 'Erreur lors de la sauvegarde',
      };
    }
  }

  /**
   * Récupérer un brouillon de données sensibles
   * GET /form-draft/:draftId
   */
  @Public()
  @Get(':draftId')
  async getDraft(
    @Param('draftId') draftId: string,
    @Session() session: Record<string, any>,
  ): Promise<{
    success: boolean;
    data?: SensitiveFormDataDto;
    message?: string;
  }> {
    try {
      const sessionId = session.id || session.sessionID;

      if (!sessionId) {
        return {
          success: false,
          message: 'Session invalide',
        };
      }

      const data = await this.formDraftService.getDraft(draftId, sessionId);

      if (!data) {
        return {
          success: false,
          message: 'Brouillon non trouvé ou expiré',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      this.logger.error('Erreur récupération brouillon:', error);
      return {
        success: false,
        message: 'Erreur lors de la récupération',
      };
    }
  }

  /**
   * Supprimer un brouillon spécifique
   * DELETE /form-draft/:draftId
   */
  @Public()
  @Delete(':draftId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteDraft(
    @Param('draftId') draftId: string,
    @Session() session: Record<string, any>,
  ): Promise<void> {
    try {
      const sessionId = session.id || session.sessionID;

      if (!sessionId) {
        this.logger.warn('Tentative suppression brouillon sans session valide');
        return;
      }

      const deleted = await this.formDraftService.deleteDraft(
        draftId,
        sessionId,
      );

      if (deleted) {
        this.logger.log(`Brouillon supprimé: ${draftId}`);
      } else {
        this.logger.warn(
          `Échec suppression brouillon: ${draftId} (non trouvé ou session incorrecte)`,
        );
      }
    } catch (error) {
      this.logger.error('Erreur suppression brouillon:', error);
    }
  }

  /**
   * Obtenir des statistiques sur les brouillons (pour monitoring admin)
   * GET /form-draft/stats
   */
  @Get('admin/stats')
  async getStats(): Promise<{ total: number; expired: number }> {
    return this.formDraftService.getStats();
  }
}
