import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class CloudProvider {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;
}

export default CloudProvider;