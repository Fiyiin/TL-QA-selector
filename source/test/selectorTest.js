import '@babel/polyfill';
import { describe, it } from 'mocha';
import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

use(chaiHttp);
describe('Test TL-QA-Selector endpoints', () => {
  it('It return 404 for unexisting endpoint', async () => {
    const res = await request(app)
      .get('/notfound');
    expect(res).to.have.status(404);
    expect(res.body.error).to.have.property('status')
      .to.be.equal(404);
    expect(res.body.error).to.have.property('message')
      .to.be.equal('Not found');
  });
  /*
    it('Should register a team and the team members', async () => {
      const data = {
        teamName: 'ivy',
        members: ['Joyce', 'Kayode', 'Jude', 'Fiyin', 'Kossy', 'Jesse', 'Innocent'],
      };
      const res = await request(app)
        .post('/api/v1/team')
        .send(data);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('status')
        .to.be.equal(201);
      expect(res.body).to.have.property('data');
    });
  */
  it('should get the team lead and 2 QAs', async () => {
    const res = await request(app)
      .get('/api/v1/generate/ivy');
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('status')
      .to.be.equal(200);
    expect(res.body).to.have.property('data');
  });
});
