import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../app';
import UserService from '../services/User.service';
import 'mocha';

const { expect } = chai;

chai.use(chaiHttp);

describe('UserController', () => {
  let chaiHttpResponse: Response;

  afterEach(() => {
    sinon.restore();
  });

  describe('POST /login', () => {
    it('Deve retornar um token passando parametros corretos', async () => {
      sinon.stub(UserService, 'login').resolves({ token: 'token', email: 'email@email.com' });

      chaiHttpResponse = await chai.request(app)
        .post('/users/login')
        .send({
          email: 'email@email.com',
          password: '123456',
        });

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal({ token: 'token', email: 'email@email.com' });
    });

    it('Deve retornar status 400 com parametros faltando', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/users/login')
        .send({
          password: '123456',
        });

      expect(chaiHttpResponse.status).to.be.equal(400);
    })
    
    it('Deve retornar status 401 com parametros incorreto', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/users/login')
        .send({
          email: 'email@email.com',
          password: '12345',
        });

      expect(chaiHttpResponse.status).to.be.equal(401);
    })
  });

  describe('POST /register', () => {
    it('Deve retornar um token passando parametros corretos', async () => {
      sinon.stub(UserService, 'register').resolves({ token: 'token', email: 'email@email.com' });

      chaiHttpResponse = await chai.request(app)
        .post('/users/register')
        .send({
          email: 'email@email.com',
          password: '123456',
          username: 'test'
        });

      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.be.deep.equal({ token: 'token', email: 'email@email.com' });
    });

    it('Deve retornar status 400 com parametros faltando', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/users/register')
        .send({
          password: '123456',
          username: 'test'
        });

      expect(chaiHttpResponse.status).to.be.equal(400);
    })
    
    it('Deve retornar status 401 com parametros incorreto', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/users/register')
        .send({
          email: 'email@email.com',
          password: '12345',
          username: 'test'
        });

      expect(chaiHttpResponse.status).to.be.equal(400);
    })
  });
});
