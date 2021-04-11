import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import CloudProvider from '../cloudProvider/entity';
import Executive from '../executive/entity';

@Entity()
class Company {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public website: string;

    //Company has many Executive and many Executive belongs to one Company
    @OneToMany(() => Executive, (executive: Executive) => executive.company, {
        eager: true
    })
    public executives: Executive[];

    //Company has many CloudProviders and vice-versa.
    @ManyToMany(() => CloudProvider, {
        eager: true
    })
    @JoinTable()
    public cloudProviders: CloudProvider;

}

export default Company;