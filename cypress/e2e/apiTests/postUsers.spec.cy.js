import jsonBody from '../../fixtures/jsonBody/user.json'

describe('Create User Test cases', () => {
  let data

  before(
    'load settings.josn data from fixtures folder data so that it can be used throughout',
    () => {
      // loading part
      cy.fixture('settings').then((fixtureData) => {
        data = fixtureData
        //Creating randomness for the POST call JSON Body
        jsonBody.craeteUser.email = `${Math.random().toString(36).slice(9)}${
          jsonBody.craeteUser.email
        }`
        jsonBody.craeteUser.name = `${Math.random().toString(36).slice(9)}${
          jsonBody.craeteUser.name
        }`
      })
    }
  )

  it('POST user and then again GET the newly created user', () => {
    var userId // declared user ID to use further
    // first POST CALL
    cy.request({
      method: 'POST',
      url: `${data.baseURL}${data.path.getAllUsers}`,
      headers: {
        authorization: `Bearer ${data.token}`,
      },
      body: jsonBody.craeteUser,
    })
      // POST CALL RESULT VALIDATION
      .then((res) => {
        cy.log(JSON.stringify(res))
        expect(res.status).to.be.eq(201)
        expect(res.body.id).to.be.not.null
        expect(res.body.email).to.be.contain(jsonBody.craeteUser.email)
        expect(res.body.name).to.be.contain(jsonBody.craeteUser.name)
        cy.log(res.body.id)
        cy.log(res.body.name)
        cy.log(res.body.email)
        userId = res.body.id
      })
      // again GET CALL
      .then(() => {
        cy.log('USER ID : ', userId)
        cy.request({
          method: 'GET',
          url: `${data.baseURL}${data.path.getAllUsers}/${userId}`,
          headers: {
            authorization: `Bearer ${data.token}`,
          },
        })
          // GET CALL VALIDATION
          .then((res) => {
            cy.log('RESULT -> STATUS CODE : ', res.status)
            expect(res.status).to.be.eq(200)
            expect(res.body.email).to.be.eq(jsonBody.craeteUser.email)
            expect(res.body.name).to.be.eq(jsonBody.craeteUser.name)
          })
      })
  })
  it('test logging', () => { 
    cy.log("testing")
  })
})
