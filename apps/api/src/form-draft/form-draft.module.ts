import { Module } from '@nestjs/common'
import { FormDraftController } from './form-draft.controller'
import { FormDraftService } from './form-draft.service'

@Module({
  controllers: [FormDraftController],
  providers: [FormDraftService],
})
export class FormDraftModule {}