import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CvsService } from 'src/cvs/cvs.service';
import { Cv } from 'src/cvs/entities/cv.entity';
import { CvsModule } from 'src/cvs/cvs.module';
import { Skill } from 'src/skills/entities/skill.entity';
import { SkillsService } from 'src/skills/skills.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, CvsService, SkillsService],
  imports: [TypeOrmModule.forFeature([User, Cv, Skill])],
  exports: [UsersService, TypeOrmModule]
})
export class UsersModule {}
