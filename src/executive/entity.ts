import { Column, Entity, OneToOne, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import Company from '../company/entity';
import ExecutiveType from '../executiveType/entity';

@Entity()
class Executive {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public email: string;

    //Executive owns the relationship. It has one ExecutiveType.
    @OneToOne(() => ExecutiveType, {
        eager: true
    })
    @JoinColumn()
    public executiveType: ExecutiveType;

    //Many Executive can be related to one Company
    @ManyToOne(() => Company, (company: Company) => company.executives)
    public company: Company;
}

export default Executive;