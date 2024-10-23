import { expect } from 'chai';
import sinon from 'sinon';
import { userController } from '../controllers/user.controllers.js';
import { userDao } from '../daos/mongodb/user.dao.js';
//import { mailService } from '../services/mail.services.js'
//import { smsService } from '../services/sms.services.js';
import jwt from 'jsonwebtoken';

describe('UserController', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
    sinon.restore(); 
  });

  describe('getAll', () => {
    it('debería devolver una lista de usuarios', async () => {
      sinon.stub(userDao, 'getAllUsers').resolves([{ name: 'John Doe' }]);

      await userController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sinon.match.array)).to.be.true;
    });

    it('debería devolver un error si falla la obtención de usuarios', async () => {
      sinon.stub(userDao, 'getAllUsers').rejects(new Error('Error de base de datos'));

      await userController.getAll(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith(sinon.match.object)).to.be.true;
    });
  });

  describe('activate', () => {
    it('debería activar un usuario con un token válido', async () => {
      const token = jwt.sign({ email: 'test@example.com' }, 'secret');
      req.params = { token };
      sinon.stub(jwt, 'verify').returns({ email: 'test@example.com' });
      sinon.stub(userDao, 'getUserByEmail').resolves({ isActive: false });
      sinon.stub(userDao, 'updateUserById').resolves();

      await userController.activate(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: 'Usuario activado exitosamente' })).to.be.true;
    });

    it('debería devolver un error si el token es inválido', async () => {
      req.params = { token: 'invalidToken' };
      sinon.stub(jwt, 'verify').throws(new Error('Token inválido'));

      await userController.activate(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith(sinon.match.object)).to.be.true;
    });

    it('debería devolver un error si el usuario no se encuentra', async () => {
      const token = jwt.sign({ email: 'test@example.com' }, 'secret');
      req.params = { token };
      sinon.stub(jwt, 'verify').returns({ email: 'test@example.com' });
      sinon.stub(userDao, 'getUserByEmail').resolves(null);

      await userController.activate(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith(sinon.match.object)).to.be.true;
    });
  });
});
