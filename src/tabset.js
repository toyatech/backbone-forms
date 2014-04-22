
//==================================================================================================
//TABSET
//==================================================================================================

Form.Tabset = Backbone.View.extend({

  /**
   * Constructor
   *
   * Valid tabset schemas:
   *   ['field1', 'field2']
   *   { title: 'title', fields: ['field1', 'field2'] }
   *
   * @param {String[]|Object[]} options.schema      Tabset schema
   * @param {Object} options.fields           Form fields
   */
  initialize: function(options) {
    options = options || {};

    //Dependencies
    if (!Form.Tabset.TabsetAdapter) throw new Error('A TabsetAdapter is required');

    //Create the full tabset schema, merging defaults etc.
    var schema = this.schema = this.createSchema(options.schema);

    //Store the fields for this tabset
    this.fields = _.pick(options.fields, schema.fields);
    
    //Override defaults
    //TODO: Allow default template to be overidden
    //this.template = options.template || schema.template || this.template || this.constructor.template;
  },

  /**
   * Creates the full tabset schema, normalising, merging defaults etc.
   *
   * @param {String[]|Object[]} schema
   *
   * @return {Object}
   */
  createSchema: function(schema) {
    //Normalise to object
    if (_.isArray(schema)) {
      schema = { fields: schema };
    }

    return schema;
  },

  /**
   * Returns the field for a given index
   *
   * @param {Number} index
   *
   * @return {Field}
   */
  getFieldAt: function(index) {
    var key = this.schema.fields[index];

    return this.fields[key];
  },

  /**
   * Returns data to pass to template
   *
   * @return {Object}
   */
  templateData: function() {
    return this.schema;
  },

  /**
   * Renders the tabset and fields
   *
   * @return {Tabset} this
   */
  render: function() {
    var schema = this.schema,
        fields = this.fields,
        $ = Backbone.$;

    //Render tabset
    var $tabset = $('<div class="tabset"></div>');//$($.trim(this.template(_.result(this, 'templateData'))));

    _.each(fields, function(field) {

    });

    //Render fields
    //$fieldset.find('[data-fields]').add($fieldset).each(function(i, el) {
    //  var $container = $(el),
    //      selection = $container.attr('data-fields');

    //  if (_.isUndefined(selection)) return;

    //  _.each(fields, function(field) {
    //    $container.append(field.render().el);
    //  });
    //});

    this.setElement($tabset);

    return this;
  },

  /**
   * Remove embedded views then self
   */
  remove: function() {
    _.each(this.fields, function(field) {
      field.remove();
    });

    Backbone.View.prototype.remove.call(this);
  }
  
}, {

  //The tabset adapter that creates and manges the tabset.
  //Defaults to BootstrapModal (http://github.com/toyatech/backbone.bootstrap-model)
  //Can be replaced with another apdater that implements the same interface.
  TabsetAdapter: Backbone.BootstrapTabset

});
