const Sequelize = require('sequelize');

module.exports = function ensureIncludes(includes = []) {
  if (!(includes instanceof Array)) {
    includes = [includes];
  }

  includes = includes.map((include) => {
    if (typeof include === 'string') {
      include = this.Model.associations[include];
    }
    if (include instanceof Sequelize.Association) {
      return {
        model: include.target,
        as: include.as
      };
    }
    if (include instanceof Sequelize.Model) {
      return {
        model: include,
        as: include.name
      };
    }
    if (include && include.association instanceof Sequelize.Association) {
      return {
        model: include.association.target,
        as: include.association.as
      };
    }
    if (include && include.model instanceof Sequelize.Model) {
      return {
        model: include.model,
        as: include.as || include.model.name
      };
    }

    throw new Error(`${include} is not a valid association`);
  });

  const shouldReload = includes.some(include => !this[include.as]);
  if (!shouldReload) {
    return Promise.resolve(this);
  }
  return this.reload({ include: includes });
};
