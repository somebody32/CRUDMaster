var CRUDMaster = function() {

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
  
  return {
    show:     function(resource_name, id, params, clink) { return(make_request(CRUDMaster.resource_link(resource_name, id, clink), "GET",    params)) },
    create:   function(resource_name, params, clink)     { return(make_request(CRUDMaster.resource_link(resource_name, clink),     "POST",   params)) },
    update:   function(resource_name, id, params, clink) { return(make_request(CRUDMaster.resource_link(resource_name, id, clink), "PUT",    params)) },
    destroy:  function(resource_name, id, params, clink) { return(make_request(CRUDMaster.resource_link(resource_name, id, clink), "DELETE", params)) },
    
    resource_link: function(resource_name, id, clink) {
      var id = id || "";
      if(clink) { return(resource_name + id) }
       
      var plural = 's';

      if (resource_name.search(/!$/) >= 0){
        resource_name = resource_name.replace(/!$/, ''); 
        plural = '';
      }

      return('/' + resource_name + plural + '/' + id);
    }
  }

}();

function CRUDModel(resource_name) {
  this.resource_link = CRUDMaster.resource_link(resource_name)
}

CRUDModel.prototype = {
  show:     function(id, params) { return(CRUDMaster.show    (this.resource_link, id, params, true)) },
  create:   function(params)     { return(CRUDMaster.create  (this.resource_link, params, true))     },
  update:   function(id, params) { return(CRUDMaster.update  (this.resource_link, id, params, true)) },
  destroy:  function(id, params) { return(CRUDMaster.destroy (this.resource_link, id, params, true)) }
}