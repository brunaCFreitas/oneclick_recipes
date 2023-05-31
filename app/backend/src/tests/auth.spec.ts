import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
const { expect } = chai;
// @ts-ignore
import chaiAsPromised = require('chai-as-promised');
import * as jwt from '../utils/auth';
import * as Token from 'jsonwebtoken';

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('Auth functions', () => {

  afterEach(() => {
    Sinon.restore();
  });

  describe('createToken', () => {
    it('Deve retornar um token', () => {
      // @ts-ignore
      Sinon.stub(Token, 'sign').returns('token');

      expect(jwt.createToken(1)).to.be.equal('token');
    });
  });

  describe('decodeToken', () => {
    it('Deve retornar um objeto com id', () => {
      const data = {
        id: 1,
      };

      // @ts-ignore
      Sinon.stub(Token, 'verify').returns(data);

      expect(jwt.decodeToken('token')).to.be.equal(data);
    });
  });

  describe('verifyToken', () => {
    it('Deve retornar um objeto com id', () => {
      const data = {
        id: 1,
      };

      // @ts-ignore
      Sinon.stub(Token, 'verify').returns(data);

      expect(jwt.verifyToken('token')).to.be.equal(data);
    });
  });
});