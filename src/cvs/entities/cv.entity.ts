import { Skill } from "../../skills/entities/skill.entity";
import { User } from "../../users/entities/user.entity";
import { TimeStampedEntity } from "../../../timestamped/timpestamped.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany } from "typeorm";

@Entity("cvs") 
export class Cv extends TimeStampedEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, (user) => user.cvs)
    user: User;

    @ManyToMany(
        () => Skill,
        (skill) => skill.cvs,
        { cascade: true, onUpdate: "CASCADE", onDelete: "CASCADE" }
    )
    @JoinTable({ name: "cvs_skills" })
    skills?: Skill[];
    

    @Column({ type: "varchar", length: 64 })
    name: string;

    @Column({ type: "varchar", length: 26 })
    firstname: string;

    @Column({ type: "int" })
    age: number;

    @Column({ type: "varchar", length: 26 })
    cin: string;

    @Column({ type: "varchar", length: 64 })
    job: string;

    @Column({ type: "varchar", length: 26 })
    path: string;
}
