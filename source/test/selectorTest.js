import { describe, it } from 'mocha';
import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

use(chaiHttp);
describe('Test TL-QA-Selector endpoints', () => {
  it('It return 404 for unexisting endpoint', async () => {
    const res = await request(app)
      .get('/notfound');
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('erorr');
    expect(res.body.error).to.have.property('status')
      .to.be.equal(404);
    expect(res.body.error).to.have.property(message)
      .to.be.equal('Not found');
  });
});