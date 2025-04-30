/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
  return loadTemplates([
    // Actor partials.
    'systems/subversion/templates/actor/parts/actor-features.hbs',
    'systems/subversion/templates/actor/parts/actor-items.hbs',
    'systems/subversion/templates/actor/parts/actor-spells.hbs',
    'systems/subversion/templates/actor/parts/actor-effects.hbs',
    'systems/subversion/templates/actor/parts/actor-skills.hbs',
    // Item partials
    'systems/subversion/templates/item/parts/item-effects.hbs',
  ]);
};
