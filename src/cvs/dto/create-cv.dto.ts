import { IsString, IsNumber, IsOptional, isString, isNotEmpty, IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateCvDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    firstname: string;

    @IsNumber()
    @IsOptional()
    age: number;

    @IsString()
    @IsOptional()
    cin: string;

    @IsString()
    @IsOptional()
    job: string;

    @IsString()
    @IsOptional()
    path: string;
}
