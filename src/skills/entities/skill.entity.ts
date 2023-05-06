import { Cv } from '../../cvs/entities/cv.entity';
import { TimeStampedEntity } from '../../../timestamped/timpestamped.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('skills')
export class Skill extends TimeStampedEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 32 })
    designation: string;ù

    @ManyToMany(
        () => Cv,
        (cv) => cv.skills,
    )
    cvs: Cv[];
}
