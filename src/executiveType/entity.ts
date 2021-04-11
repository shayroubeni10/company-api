import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class ExecutiveType {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;
}

export default ExecutiveType;