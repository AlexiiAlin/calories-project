import bcrypt from 'bcrypt';
import { getRepository, Not } from 'typeorm';
import { CreateUserDto, EditUserDto } from '@dtos/users.dto';
import { UserEntity } from '@entity/users.entity';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';

class UserService {
  public users = UserEntity;

  public async findAllUser(): Promise<User[]> {
    const userRepository = getRepository(this.users);
    return await userRepository.find();
  }

  public async findUserById(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const userRepository = getRepository(this.users);
    const findUser: User = await userRepository.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const userRepository = getRepository(this.users);
    const findUser: User = await userRepository.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return await userRepository.save({ ...userData, password: hashedPassword });
  }

  public async updateUser(userId: string, userData: EditUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const userRepository = getRepository(this.users);
    const findUser: User = await userRepository.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "You're not user");

    const findUserEmail = await userRepository.findOne({ where: { email: userData.email, id: Not(userId) } });
    if (findUserEmail) throw new HttpException(409, `The email "${userData.email}" already exists on another user`);

    if (userData.password) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      await userRepository.update(userId, { ...userData, password: hashedPassword });
    } else {
      await userRepository.update(userId, userData);
    }

    return await userRepository.findOne({ where: { id: userId } });
  }

  public async deleteUser(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const userRepository = getRepository(this.users);
    const findUser: User = await userRepository.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "You're not user");

    await userRepository.delete({ id: userId });
    return findUser;
  }
}

export default UserService;
