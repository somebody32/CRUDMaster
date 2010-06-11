var CRUDMaster = function() {

  // Private STATIC methods
  function make_request(resource_link, method, params) {
    var r = {}
    var params = params || {}
    var success_cb = params.onSuccess || function(response) { r = response }
    var error_cb   = params.onError   || function(response) { throw "CRUDMaster error" }

    $.ajax({
      url: resource_link,
      dataType: 'json',
      type: method,
      data: params.data,
      success: function(response) { success_cb(response) },
      error:   function(response) { error_cb  (response) }
    })
    return(r)
  }

  function resource_link(resource_name, id) {
    var id = id || "";
    var plural = 's';

    if (resource_name.search(/!$/) >= 0){
      resource_name = resource_name.replace(/!$/, ''); 
      plural = '';
    }

    return('/' + resource_name + plural + '/' + id);
  }

  // Public STATIC Methods
  return {
    show:     function(resource_name, id, params) { return(make_request(resource_link(resource_name, id), "GET",    params)) },
    create:   function(resource_name, params)     { return(make_request(resource_link(resource_name),     "POST",   params)) },
    update:   function(resource_name, id, params) { return(make_request(resource_link(resource_name, id), "PUT",    params)) },
    destroy:  function(resource_name, id, params) { return(make_request(resource_link(resource_name, id), "DELETE", params)) },
  }

}();

function CRUDModel(resource_name) {
  this.resource_name = resource_name
}

CRUDModel.prototype = {
  show:     function(id, params) { return(CRUDMaster.show    (this.resource_name, id, params)) },
  create:   function(params)     { return(CRUDMaster.create  (this.resource_name, params))     },
  update:   function(id, params) { return(CRUDMaster.update  (this.resource_name, id, params)) },
  destroy:  function(id, params) { return(CRUDMaster.destroy (this.resource_name, id, params)) }
}