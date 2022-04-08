import bcrypt from 'bcrypt';
import { getRepository, Not } from 'typeorm';
import { CreateUserDto, EditUserDto } from '@dtos/users.dto';
import { UserEntity } from '@entity/users.entity';
import { HttpException } from '@exceptions/HttpException';
import { User, UserType } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import moment from 'moment';

class UserService {
  public users = UserEntity;

  public async findAllUser(): Promise<User[]> {
    const userRepository = getRepository(this.users);
    const users = await userRepository.find({
      relations: ['foodEntries'],
    });

    const format = 'DD-MM-YYYY';
    const yesterdayEnd = moment().subtract(1, 'd').endOf('day');
    const date7DaysAgo = moment().subtract(7, 'd').startOf('day');
    const perDayObj = {};
    const daysBetween = yesterdayEnd.diff(date7DaysAgo, 'days') + 1;
    for (let i = 0; i < daysBetween; i++) {
      const endDate = moment(yesterdayEnd);
      const day = endDate.subtract(i, 'd').format(format);
      perDayObj[day] = 0;
    }

    return users.map(user => {
      if (user.userType === UserType.ADMIN) {
        delete user.foodEntries;
        return {
          ...user,
          avgCalories: 'N/A',
        };
      }

      const caloriesPerDay = user.foodEntries
        .filter(foodEntry => {
          return moment(foodEntry.date).isBetween(date7DaysAgo, yesterdayEnd);
        })
        .reduce((acc, foodEntry) => {
          const key = moment(foodEntry.date).format(format);
          if (acc[key] === null || acc[key] === undefined) {
            acc[key] = foodEntry.calories;
          }
          acc[key] += foodEntry.calories;
          return acc;
        }, Object.assign({}, perDayObj));
      const totalCalories = Object.keys(caloriesPerDay).reduce((acc, key) => {
        acc += caloriesPerDay[key];
        return acc;
      }, 0);

      delete user.foodEntries;
      return {
        ...user,
        avgCalories: Math.floor(totalCalories / Object.keys(caloriesPerDay).length),
      };
    });
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
