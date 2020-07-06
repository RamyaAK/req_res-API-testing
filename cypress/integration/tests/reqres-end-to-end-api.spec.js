describe('REST API End to End Automation', () => {
    it('GET, Get all the Users Test API', () => {
        cy.request('/api/users?page=2').then((response) => {
            expect(response.status).equals(200)
    })
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
});