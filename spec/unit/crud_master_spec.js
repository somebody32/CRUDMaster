describe 'CRUDMaster'

	it 'should respond to CRUD methods'
		CRUDMaster.should.respond_to 'show'
		CRUDMaster.should.respond_to 'create'
		CRUDMaster.should.respond_to 'update'
		CRUDMaster.should.respond_to 'destroy'
	end
	
	before_each
    mock_request().and_return('{ "foo" : "bar" }', 'application/json');
  end

	describe 'show action'	
	  it 'should correctly show object with specified id and return it'	    
	    CRUDMaster.show("post", 3).foo.should.eql "bar"	
	  end
	
	  it 'should correctly show object with specified id and handle custom success callback'
	    var baz = {}	    
	    CRUDMaster.show("post", 3, { onSuccess: function(response) { baz =  response.foo + "!" } })
	    baz.should.eql "bar!"
	  end
	  
	  it 'should throw an error if request is unsuccessful'
	    unmock_request()
	    CRUDMaster.show("post", 3).should.throw_error
	  end
	
	  it 'should throw an error if request is unsuccessful and handle custom error callback'
	    unmock_request()
	    var error = false
	    CRUDMaster.show("post", 3, {onError: function(response) { error = true }})
	    error.should.be_true
	  end
	end
	
	describe 'create action'
	  it 'should correctly send data'
	    CRUDMaster.create('post', { data: { title: "cool story" }})
	  end
	end
end