describe('REST API Automation', () => {

  beforeEach(() => {
      // before each test
      cy.visit('/')
   });

  it('GET, Get all the Users Test API', () => {
      cy.request('/api/users?page=2').then((response) => {
          expect(response.status).equals(200)
  })
  });
  
  it('POST, CREATE a new User Test API', () => {
  
      let userDetails = {
          "name": "ramya",
          "job": "sdet"
      }
  
      cy.request('POST','/api/users',userDetails).then((response) => {
          expect(response.status).equals(201)
          expect(response.body.name).equals('ramya')
  })
  });
  
  it('PUT, Updates User details Test API', () => {
  
      let userDetails = {
          "name": "rashmi",
          "job": "software developer"
      }
  
      cy.request('PUT','/api/users/2',userDetails).then((response) => {
          expect(response.status).equals(200)
          expect(response.body.name).equals('rashmi')
          expect(response.body.job).equals('software developer')
  })
  });
  
  it('PATCH, Update job of a User details Test API', () => {
  
      let userDetails = {
          "name": "rashmi",
          "job": "Web Developer"
      }
  
      cy.request('PATCH','/api/users/2',userDetails).then((response) => {
          expect(response.status).equals(200)
          expect(response.body.job).equals('Web Developer')
  })
  });
  
  it('DELETE, Delete a User Test API', () => {
  
      cy.request('DELETE','/api/users/2').then((response) => {
          expect(response.status).equals(204)
  })
  });

  it('returns a JSON data and verifies its headers', () => {
      cy.request('//api/users')
        .its('headers')
        .its('content-type')
        .should('include', 'application/json');
    });
  
  it('loads all the Users', () => {
      cy.api({ url: '/api/users?page=2' }).then((res) => {
        expect(res.status).to.equal(200);
      });
    });
  
  
    it('should add a new User successfully', () => {
      let userDetails = {
          "name": "ramya",
          "job": "sdet"
      }
      cy.api({
        method: 'POST',
        url: '/api/users',
        body: userDetails
      }).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body.name).to.equal('ramya');
        expect(response.body.job).to.equal('sdet');
      });
    });
  
    it('NOT FOUND, should throw User Not Found 404 error code', () => {
      cy.api({ url: '/api/users/23' }).then((res) => {
        expect(res.status).to.equal(404);
      });
    });

    it('should return a resource List data successfully', () => {
      cy.api({
        method: 'GET',
        url: '/api/unknown'
      }).then((response) => {
        expect(response.status).to.equal(200);

        expect(response.body.data[0].id).to.equal(1);
      });
    });

});
