import { Inject, Injectable, NotAcceptableException, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CvsService } from 'src/cvs/cvs.service';
import { SkillsService } from 'src/skills/skills.service';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,  
    @Inject(forwardRef(() => CvsService))
    private readonly cvService: CvsService,
    @Inject(SkillsService)
    private readonly skillService: SkillsService
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    // check if the email is already used or the username is already used
    if(this.userRepository.findOne({
      where: [
        {email: createUserDto.email},
        {username: createUserDto.username}
      ]
    })){
      throw new NotAcceptableException("Email or username already used");
    }
    // create the user
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findAll(limit: number) {
    // return all users without their password
    return this.userRepository.find({
      select: ["id", "username", "email"],
      take: limit? limit: 1000
    });

  }

  findOne(id: string): Promise<User>{
    return this.userRepository.findOne({
      where: {
        id: id
      },
      select: ["id", "username", "email"],
      relations:{
        cvs: true,
      },
      join: {
        alias: "user",
        leftJoinAndSelect: {
          "cvs": "user.cvs",
          "skills": "cvs.skills"
        }
      }
    }).then(user => {
      if(!user){
        throw new NotFoundException("User not found")
      }
      return user;
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    // check if the email is already used or the username is already used
    if(this.userRepository.findOne({
      where: [
        {email: updateUserDto.email},
        {username: updateUserDto.username}
      ]
    })){
      throw new NotAcceptableException("Email or username already used");
    }
    // update the user
    return this.userRepository.update(id, updateUserDto);

  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }

  addCv(userid: string, cvId: string){
    return this.userRepository.findOne({
      where: {
        id: userid
      },
      relations: {
        cvs: true
      }
    }).then(user => {
      if(!user){
        throw new NotFoundException("User not found");
      }
      // find the cv
      return this.cvService.findOne(cvId).then(cv => {
        if(!cv){
          throw new NotFoundException("Cv not found");
        }
        // add the cv to the user
        return this.userRepository.createQueryBuilder()
          .relation(User, "cvs")
          .of(user)
          .add(cvId);
      }
      );
    });
  }

  removeCv(userid: string, cvId: string){
    return this.userRepository.findOne({
      where: {
        id: userid
      },
      relations: {
        cvs: true
      }
    }).then(user => {
      if(!user){
        throw new NotFoundException("User not found");
      }
      return this.userRepository.createQueryBuilder()
        .relation(User, "cvs")
        .of(user)
        .remove(cvId);
    });
  }

}
