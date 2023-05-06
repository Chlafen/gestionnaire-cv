import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { Repository } from 'typeorm';
import { randFirstName, randJobTitle, randNumber, randText, randFullName } from '@ngneat/falso';
import { SkillsService } from 'src/skills/skills.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CvsService {
  constructor(
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
    @Inject(SkillsService)
    private readonly skillService: SkillsService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService
    ) {}
  

  create(userId:string, createCvDto: CreateCvDto): Promise<Cv> {
    // check if the user exists
    return this.userService.findOne(userId).then(user => {
      if(!user){
        throw new Error("User not found");
      }
      // create the cv
      const cv = this.cvRepository.create(createCvDto);
      cv.user = user;
      return this.cvRepository.save(cv);
    });
  }

  findAll(userId: string, limit: number): Promise<Cv[]> {
    return this.cvRepository.find({
      where: {
        user: {
          id: userId
        }
      },
      relations: {
        skills: true
      },
      take: limit? limit: 10
    });
  }

  findOne(id: string): Promise<Cv> {
    return this.cvRepository.findOne({
      where: {
        id: id
      },
      relations: {
        user: true,
        skills: true
      }
    }).then(cv => {
      if(!cv){
        throw new Error("Cv not found");
      }
      return cv;
    });
  }

  update(id: string, updateCvDto: UpdateCvDto) {
    return this.cvRepository.update(id, updateCvDto);
  }

  addSkill(id: string, skillId: string) {
    return this.cvRepository.findOne({
      where:{id:id},
      relations: {
        skills: true
      }
    }).then(cv => {
      if(!cv){
        throw new Error("Cv not found");
      }
      return this.skillService.findOne(skillId).then(skill => {
        if(!skill){
          throw new Error("Skill not found");
        }
        if(cv.skills.find(s => s.id === skill.id)){
          return cv;
        }
        cv.skills.push(skill);
        return this.cvRepository.save(cv);
      });
    });
  }

  removeSkill(cvid: string, skillId: string){
    console.log("removeSkill");
    
    return this.cvRepository.findOne({
      where:{id:cvid},
      relations: {
        skills: true
      }
    }).then(cv => {
      if(!cv){
        throw new Error("Cv not found");
      }
      return this.skillService.findOne(skillId).then(skill => {
        if(!skill){
          return cv;
        }
        console.log("removing skill", skillId, "from cv", cvid);
        cv.skills = cv.skills.filter(s => s.id !== skill.id);
        return this.cvRepository.save(cv);

      });
    });
  }

  remove(id: string) {
    return this.cvRepository.delete(id);
  }
}
