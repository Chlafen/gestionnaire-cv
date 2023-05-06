import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  create(createSkillDto: CreateSkillDto) {
    return this.skillRepository.findOne({
      where: {
        designation: createSkillDto.designation
      }
    }).then(skill => {
      if(skill){
        throw new ConflictException("Skill already exists");
      }
      const newSkill = this.skillRepository.create(createSkillDto);
      return this.skillRepository.save(newSkill);
    });

  }

  findAll(limit: number) {
    return this.skillRepository.find({
      order: {
        created_at: "DESC"
      },
      take: limit? limit: 10
    });
  }

  findOne(id: string) {
    return this.skillRepository.findOne({
      where: {
        id: id
      }
    }).then(skill => {
      if(!skill){
        throw new NotFoundException("Skill not found");
      }
      return skill;
    });
  }

  update(id: string, updateSkillDto: UpdateSkillDto) {
    return this.skillRepository.update({
      id: id
    }, updateSkillDto).then(updateResult => {
      if(updateResult.affected === 0){
        throw new NotFoundException("Skill not found");
      }
      return this.skillRepository.findOne({
        where: {
          id: id
        }
      });
    });
  }

  remove(id: string) {
    return this.skillRepository.delete({
      id: id
    });
    
  }
}
