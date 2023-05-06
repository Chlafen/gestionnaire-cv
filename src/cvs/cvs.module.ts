import { Module } from '@nestjs/common';
import { CvsService } from './cvs.service';
import { CvsController } from './cvs.controller';
import { Cv } from './entities/cv.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsService } from 'src/skills/skills.service';
import { UsersService } from 'src/users/users.service';
import { Skill } from 'src/skills/entities/skill.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  controllers: [CvsController],
  providers: [CvsService, SkillsService, UsersService],
  imports: [TypeOrmModule.forFeature([Cv, Skill, User])],
  exports: [CvsService, TypeOrmModule]
})
export class CvsModule {}
