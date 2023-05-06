import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { Skill } from './entities/skill.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from 'src/cvs/entities/cv.entity';

@Module({
  controllers: [SkillsController],
  providers: [SkillsService],
  imports: [TypeOrmModule.forFeature([Skill, Cv])],
  exports: [SkillsService, TypeOrmModule]
})
export class SkillsModule {}
 