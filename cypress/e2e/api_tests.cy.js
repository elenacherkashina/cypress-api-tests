describe('Reqres API Tests', () => {
    it('GET list of users - page 2', () => {
      cy.request('/api/users?page=2').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.have.length(6);
      });
    });
  
  
    it('GET single user - not found', () => {
      cy.request({
        method: 'GET',
        url: '/api/users/23',
        headers: {
            'x-api-key': 'reqres-free-v1'
          },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });

    it('POST create user', () => {
      cy.request({
        method: 'POST',
        url: '/api/users',
        headers: {
          'x-api-key': 'reqres-free-v1',
          'Content-Type': 'application/json'
        },
        body: {
          name: 'Eve',
          job: 'QA Lead'
        }
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('createdAt');
      });
    });
  });