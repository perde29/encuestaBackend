import { hash } from 'bcrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AppRoles } from 'src/app.roles';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 180 })
  email: string;

  @Column({
    //++type: 'enum',
    enum: AppRoles,
    array: true, // importante para que sea lista de enums
    type: 'simple-json',
    default: JSON.stringify([AppRoles.ROL_USUARIO]),
  })
  roles: AppRoles[];

  @Column({ type: 'varchar', length: 255, nullable: false, select: false })
  password: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await hash(this.password, 10);
  }
}
