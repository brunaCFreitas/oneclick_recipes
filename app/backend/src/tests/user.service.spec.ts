import { expect } from 'chai';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiAsPromised = require('chai-as-promised');
import * as bcrypt from 'bcryptjs';
import * as jwt from '../utils/auth';
import UserModel from '../database/models/User.model';
import 'mocha';
import UserService from '../services/User.service';

chai.use(chaiAsPromised);

describe('UserService', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('login', () => {
    it('deve lançar HttpException com status 401 se o usuário não existir', async () => {
      const email = 'test@example.com';
      const password = 'password';
      // @ts-ignore
      sinon.stub(UserModel, 'findOne').returns(null);

      expect(UserService.login({ email, password }))
        .to.be.rejectedWith('Invalid email or password');
    });

    it('deve lançar HttpException com status 401 se a senha for inválida', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const user = { id: 1, username: 'testuser', password: 'hashedpassword' };
      // @ts-ignore
      sinon.stub(UserModel, 'findOne').returns(user);

      expect(UserService.login({ email, password }))
        .to.eventually.be.rejectedWith('Invalid email or password');
    });

    it('deve retornar um objeto com token e nome de usuário se o login for bem-sucedido', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const user = { id: 1, username: 'testuser', password: 'hashedpassword', email };
      const token = 'testtoken';
      // @ts-ignore
      sinon.stub(UserModel, 'findOne').returns(user);
      // @ts-ignore
      sinon.stub(bcrypt, 'compare').returns(true);
      // @ts-ignore
      sinon.stub(jwt, 'createToken').returns(token);

      const result = await UserService.login({ email, password });

      expect(result).to.deep.equal({
        token,
        email,
      });
    });
  });

  describe('register', () => {
    const email = 'email@email.com';
    const  username = 'user';
    const password = 'password';

    const user = {
      id: 1,
      username,
      email,
      password,
    };

    it('deve chamar a função getByEmail', async () => {
      const findOne = sinon.stub(UserModel, 'findOne');
      
      await UserService.getUserByemail('');
  
      expect(findOne.calledWith()).to.be.true;
    });

    it('deve retornar o token e o nome do usuário', async () => {
      sinon.stub(UserService, 'getUserByemail').resolves(null);
      // @ts-ignore
      sinon.stub(UserModel, 'create').resolves(user);
      sinon.stub(jwt, 'createToken').returns('token');

      expect(await UserService.register({email, password, username}))
        .to.be.deep.equal({token: 'token', email});
    });

    it('deve retornar um erro caso o email já esteja cadastrado', async () => {
      // @ts-ignore
      sinon.stub(UserService, 'getUserByemail').resolves({email});

      expect(UserService.register({email, password, username}))
        .to.be.rejectedWith('Email already registered');
    })
  })
});
