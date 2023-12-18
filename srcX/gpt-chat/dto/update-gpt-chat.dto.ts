import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionDto } from './create-gpt-chat.dto';

export class UpdateGptChatDto extends PartialType(CreateQuestionDto) {}
