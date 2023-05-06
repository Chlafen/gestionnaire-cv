import { Injectable } from '@nestjs/common';
import { randEmail, randPassword, randUserName, randFirstName, randJobTitle, randNumber, randText, randFullName} from "@ngneat/falso";
import { CreateCvDto } from './cvs/dto/create-cv.dto';
import { Cv } from './cvs/entities/cv.entity';
import { CreateSkillDto } from './skills/dto/create-skill.dto';
import { Skill } from './skills/entities/skill.entity';
import { CreateUserDto } from './users/dto/create-user.dto';
import { User } from './users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class AppService {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}
  
  async generateFakeData() {

    // check if there is already data in the database
    const usersCount = await this.userRepository.count();
    if(usersCount > 0){
        // drop the database
        return;
    }
    

    const newCvs:CreateCvDto[] = [];
    for(let i = 0; i < 200; ++i){
        newCvs.push({
            name: randFullName(),
            firstname: randFirstName(),
            age: randNumber({min: 18, max: 60}),
            job: randJobTitle(),
            path: randText({charCount: 26}),
            cin: randNumber({min: 10000000, max: 99999999}).toString(),
        })
    }
    const cvs = await this.cvRepository.save(newCvs);

    const newSkills:CreateSkillDto[] = [];
    for(let i = 0; i < 1000; ++i){
        newSkills.push({
            designation: randText({charCount: 10}),
        })
    }
    const skills = await this.skillRepository.save(newSkills);

    const newUsers:CreateUserDto[] = []
    for(let i = 0; i < 100; ++i){
        newUsers.push({
        email: randEmail(),
        password: randPassword(),
        username: randUserName()
        })
    }
    const users = await this.userRepository.save(newUsers);
    
    // assign random cvs to random users
    users.forEach((user, index) => {
        const cvsToAssign =  cvs.slice(index * 2, index * 2 + 2);
        user.cvs = cvsToAssign;
    });

    await this.userRepository.save(users);
    // assign random skills to random cvs
    for(let i = 0; i < 200; ++i){
        const skillsToAssign = skills.slice(i * 5, i * 5 + 5);
        cvs[i].skills = skillsToAssign;
    }
    await this.cvRepository.save(cvs);
}
}
