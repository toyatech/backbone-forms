var Types = ['String', 'Number', 'Date', 'Buffer', 'Boolean', 'Object', 'ObjectId', 'Array', 'Function'];

var PathModel = Backbone.Model.extend({
  schema: {
    name: { type: 'Text' },
    type: { type: 'Select', options: Types },
  }
});

var SchemaModel = Backbone.Model.extend({
  schema: {
    name: { type: 'Text' },
    paths: { type: 'List', itemType: 'NestedModel', model: PathModel, itemToString: function(path) { return path.name } }
  }
});

var schema = new SchemaModel();

var form = new Backbone.Form({
  model: schema,
  tabsets: [
    { title: 'Paths', fields: [ 'paths' ] }
  ]
}).render();

$('#form').append(form.el);
