import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { CustomerSurvey } from './customerSurvey.entity';

@Entity('customer')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  ip: string;

  @Column({ type: 'timestamp', name: 'customer_date' })
  customerDate: Date;

  @Column({ type: 'int', name: 'status' })
  status: number;

  @OneToMany(() => CustomerSurvey, (customerSurvey) => customerSurvey.customer)
  customerSurvey: CustomerSurvey[];

  @ManyToOne(() => Category, (cus) => cus.customer, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
