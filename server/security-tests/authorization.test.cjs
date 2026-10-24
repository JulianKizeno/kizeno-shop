const test = require('node:test');
const assert = require('node:assert/strict');
const { load, response, router } = require('./helpers.cjs');
const auth = require('../middleware/authorization');
test('anonymous users cannot reach administrator mutations', () => {
  const res = response(); let entered = false;
  auth.requireAdmin({}, res, () => { entered = true; });
  assert.equal(res.code, 401); assert.equal(entered, false);
});
test('authenticated CLIENT is forbidden and ADMIN is admitted', () => {
  for (const role of ['CLIENT', 'ADMIN']) {
    const res = response(); let entered = false;
    auth.requireAdmin({ user: { role }, isAuthenticated: () => true }, res, () => { entered = true; });
    assert.equal(entered, role === 'ADMIN'); assert.equal(res.code, role === 'ADMIN' ? 200 : 403);
  }
});
test('every product mutation has administrator authorization', () => {
  const routes = router();
  load('routes/products.routes.js', { express: { Router: () => routes }, '../middleware/authorization': auth, '../models/product.model': {} });
  const mutations = routes.routes.filter(route => route.method === 'post');
  assert.equal(mutations.length, 3);
  for (const route of mutations) assert.equal(route.args[1], auth.requireAdmin);
});
test('changing the cart owner ID is rejected before querying the database', () => {
  const routes = router(); let queried = false;
  load('routes/cart.routes.js', { express: { Router: () => routes }, '../middleware/authorization': auth,
    '../models/cart.model': { find() { queried = true; throw Error('must not query'); } } });
  const route = routes.routes.find(route => route.method === 'get');
  assert.equal(route.args[1], auth.requireAuth);
  const res = response(); route.args[2]({ user: { _id: 'alice', role: 'CLIENT' }, params: { id: 'bob' } }, res, () => {});
  assert.equal(res.code, 403); assert.equal(queried, false);
});
test('product updates drop operators and protected fields', async () => {
  const routes = router(); let update;
  load('routes/products.routes.js', { express: { Router: () => routes }, '../middleware/authorization': auth,
    '../models/product.model': { findByIdAndUpdate(id, changes, options) {
      update = { id, changes, options }; return Promise.resolve({ name: 'valid' });
    } } });
  const route = routes.routes.find(route => route.args[0] === '/:id/update');
  route.args[2]({ params: { id: 'product' }, body: { name: 'valid', price: 3, role: 'ADMIN', _id: 'other', $unset: { price: '' } } }, response(), () => {});
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(JSON.stringify(update.changes), JSON.stringify({ $set: { name: 'valid', price: 3 } }));
  assert.equal(update.options.runValidators, true);
});

test('login and session responses omit password hashes', () => {
  const routes = router();
  const user = { _id: 'alice', username: 'alice', email: 'alice@example.test', role: 'CLIENT', password: 'secret-hash' };
  load('routes/auth.routes.js', { express: { Router: () => routes }, bcrypt: {}, '../models/user.model': {},
    passport: { authenticate(name, callback) { return (req, res, next) => callback(null, user); } } });
  const login = routes.routes.find(route => route.method === 'post' && route.args[0] === '/login');
  const res = response(); login.args[1]({ login(value, callback) { callback(); } }, res, () => {});
  assert.equal(res.code, 200); assert.equal(res.body.password, undefined); assert.equal(res.body.username, 'alice');
  const session = routes.routes.find(route => route.method === 'get' && route.args[0] === '/loggedin');
  const current = response(); session.args[1]({ isAuthenticated: () => true, user }, current, () => {});
  assert.equal(current.body.password, undefined); assert.equal(current.body._id, 'alice');
});
