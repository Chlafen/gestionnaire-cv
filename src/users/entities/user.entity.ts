import { Cv } from "../..//cvs/entities/cv.entity";
import { TimeStampedEntity } from "../../../timestamped/timpestamped.entity";
import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";

@Entity("users")
export class User extends TimeStampedEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column({ type: "varchar", length: 64 })
    username: string;
    
    @Exclude()
    @Column({ type: "varchar", length: 26 })
    password: string;

    @Column({ type: "varchar", length: 64 })
    email: string;

    @OneToMany(() => Cv, (cv) => cv.user,
    { cascade: true, onUpdate: "CASCADE", onDelete: "CASCADE"})
    @JoinTable()
    cvs: Cv[];

}
