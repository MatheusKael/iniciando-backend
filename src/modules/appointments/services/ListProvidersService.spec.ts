import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;
describe('ListProvider', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider
    );
  });
  it('should be able to list all providers', async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@example.com',
      name: 'user',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      email: 'user2@example.com',
      name: 'user2',
      password: '123456',
    });
    const loggedUser = await fakeUsersRepository.create({
      email: 'user3@example.com',
      name: 'user3',
      password: '123456',
    });

    const providers = await listProviders.execute({ user_id: loggedUser.id });

    expect(providers).toEqual([user, user2]);
  });
});
