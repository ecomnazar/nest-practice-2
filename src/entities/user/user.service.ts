import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  availabelFields = ['nameFirst', 'nameLast', 'email', 'gender', 'birthDate'];

  // filter body's fields from available fields list
  private filterFields(body: { [k: string]: any }) {
    const filteredBody: { [k: string]: any } = {};

    Object.keys(body).filter((k) => {
      if (this.availabelFields.includes(k)) {
        filteredBody[k] = body[k];
      }
    });
    return filteredBody;
  }

  // add user
  public async createUser(userData: any) {
    const salt = await genSalt(10);
    const hashedPassword = await hash(userData.password, salt);

    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
    return await this.userRepository.save(user);
  }

  // get all users
  public async getAllUsers() {
    return await this.userRepository.find({
      select: this.availabelFields as any,
    });
  }

  // get user
  public async getUser(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      select: ['birthDate', 'email', 'gender', 'id', 'nameFirst', 'nameLast'],
    });
  }

  // update user data whole
  public async updateUserData(id: number, body: UpdateUserDto) {
    // const { nameFirst, nameLast, email, gender, birthDate } = body;
    return await this.userRepository.update({ id }, this.filterFields(body));
  }

  // delete user by id
  public async deleteUser(id: number) {
    return await this.userRepository.delete(id);
  }
}
