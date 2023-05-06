import { Controller, Get, Post, Body, Patch, Param, Delete, ClassSerializerInterceptor, UseInterceptors, Query } from '@nestjs/common';
import { CvsService } from './cvs.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';

@Controller('cvs')
@UseInterceptors(ClassSerializerInterceptor)
export class CvsController {
  constructor(private readonly cvsService: CvsService) {}
  
  @Post(':userId')
  create(@Body() createCvDto: CreateCvDto, @Param("userId") userId: string) : Promise<Cv>{
    return this.cvsService.create(userId, createCvDto);
  }
  
  @Get('user/:userId')
  findAll(@Param("userId") userId: string, @Query("limit") limit:number): Promise<Cv[]> {
    if( typeof limit === "string"){
      limit = parseInt(limit);
    }
    return this.cvsService.findAll(userId, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cvsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto) {
    return this.cvsService.update(id, updateCvDto);
  }

  @Post(':id/skills/:skillId')
  addSkill(@Param('id') id: string, @Param('skillId') skillId: string) {
    return this.cvsService.addSkill(id, skillId);
  }

  @Patch(':id/skills/:skillId')
  removeSkill(@Param('id') id: string, @Param('skillId') skillId: string, @Body() updateSkillDto: UpdateCvDto) {
    return this.cvsService.removeSkill(id, skillId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cvsService.remove(id);
  }
}
