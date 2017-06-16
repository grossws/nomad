import Ember from 'ember';
import RESTAdapter from 'ember-data/adapters/rest';

const { isArray, typeOf } = Ember;

export default RESTAdapter.extend({
  namespace: 'v1',

  // uses plural
  findAll() {
    return this._super(...arguments).then(data => {
      data.forEach(transformKeys);
      return data;
    });
  },

  // uses plural
  findMany() {
    return this._super(...arguments).then(data => {
      data.forEach(transformKeys);
      return data;
    });
  },

  // uses singular
  findRecord() {
    return this._super(...arguments).then(data => {
      transformKeys(data);
      return data;
    });
  },
});

// An in-place transformation from CamelCase to snake_case
function transformKeys(object) {
  Object.keys(object).forEach(key => {
    const newKey = key.underscore();

    if (key !== newKey) {
      object[newKey] = object[key];
      delete object[key];
    }

    if (isArray(object[newKey])) {
      object[newKey].forEach(transformKeys);
    } else if (typeOf(object[newKey]) === 'object') {
      transformKeys(object[newKey]);
    }
  });
}
