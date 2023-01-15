/// <reference types="Cypress" />
import jsonBody from '../../fixtures/jsonBody/user.json'

describe('Create User Test cases', () => {
  let data

  before(
    'load settings.josn data from fixtures folder data so that it can be used throughout',
    () => {
      cy.fixture('settings').then((fixtureData) => {
        data = fixtureData
        jsonBody.craeteUser.email = `${Math.random().toString(36).slice(9)}${
          jsonBody.craeteUser.email
        }`
        jsonBody.craeteUser.name = `${Math.random().toString(36).slice(9)}${
          jsonBody.craeteUser.name
        }`
      })
    }
  )

  it('POST user', () => {
    cy.request({
      method: 'POST',
      url: `${data.baseURL}${data.path.getAllUsers}`,
      headers: {
        authorization: `Bearer ${data.token}`,
      },
      body: jsonBody.craeteUser,
    }).then((res) => {
      expect(res.status).to.be.eq(201)
      expect(res.body.id).to.be.not.null
      expect(res.body.email).to.be.contain(jsonBody.craeteUser.email)
      expect(res.body.name).to.be.contain(jsonBody.craeteUser.name)
      cy.log(res.body.id)
      cy.log(res.body.name)
      cy.log(res.body.email)
    })
  })
})
