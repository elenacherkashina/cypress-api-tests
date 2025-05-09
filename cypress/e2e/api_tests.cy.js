describe('Reqres API Tests', () => {
    it('GET list of users - page 2', () => {
      cy.request('/api/users?page=2').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.have.length(6);
      });
    });
  
  
    it('GET single user - not found', () => {
      console.log('ENV VALUE IN CI:', Cypress.env('reqresApiKey'));
      cy.request({
        method: 'GET',
        url: '/api/users/23',
        headers: {
            'x-api-key': Cypress.env('reqresApiKey')
          },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });

    it('POST create user', () => {
      console.log('ENV VALUE IN CI:', Cypress.env('reqresApiKey'));
      cy.request({
        method: 'POST',
        url: '/api/users',
        headers: {
          'x-api-key': Cypress.env('reqresApiKey'),
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