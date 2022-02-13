import { UserStore, User } from '../user';
import Client from '../../config';

const user = new UserStore();

describe('Authentication Module', () => {
  describe('Test methods exists', () => {
    it('should have an Authenticate User method', () => {
      expect(user.auth).toBeDefined();
    });
  });
});
