import User from '../models/User';

interface CreateUserDTO {
  email: string;
  password: string;
  type: 'business' | 'personal';
}

class UsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  public all(): User[] {
    return this.users;
  }

  public findByEmail(email: string): User | null {
    const findUser = this.users.find(u => u.email === email);

    return findUser || null;
  }

  public create({ email, password, type }: CreateUserDTO): User {
    const user = new User({ email, password, type });

    this.users.push(user);

    return user;
  }
}

export default UsersRepository;
