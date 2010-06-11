describe 'CRUDModel'
  before_each
    model = new CRUDModel("post") 
    mock_request().and_return('{ "foo" : "bar" }', 'application/json')
  end


	it 'should respond to CRUD methods'
		model.should.respond_to 'show'
		model.should.respond_to 'create'
		model.should.respond_to 'update'
		model.should.respond_to 'destroy'
	end
	
	it 'should store resource link'
	  model.resource_link.should.eql "/posts/"
	end

	describe 'show action'	
	  it 'should correctly show object with specified id and return it'	    
	    model.show(3).foo.should.eql "bar"	
	  end
	
    it 'should correctly show object with specified id and handle custom success callback'
      var baz = {}     
      model.show(3, { onSuccess: function(response) { baz =  response.foo + "!" } })
      baz.should.eql "bar!"
    end
      
    it 'should throw an error if request is unsuccessful'
      unmock_request()
      model.show(3).should.throw_error
    end
    
    it 'should throw an error if request is unsuccessful and handle custom error callback'
      unmock_request()
      var error = false
      model.show(3, { onError: function(response) { error = true } })
      error.should.be_true
    end
  end
end