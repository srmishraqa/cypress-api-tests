import jsonBody from '../../fixtures/jsonBody/user.json'
//imported faker to randomize data
import { faker } from '@faker-js/faker'

describe('POST USER using Faker', () => {
  let data

  before(
    'load settings.josn data from fixtures folder data so that it can be used throughout',
    () => {
      // loading part
      cy.fixture('settings').then((fixtureData) => {
        data = fixtureData
        cy.log(JSON.stringify(jsonBody.craeteUser))
        // data got randomized using faker.js library
        jsonBody.craeteUser.name = faker.name.firstName()
        jsonBody.craeteUser.email = `${jsonBody.craeteUser.name}${data.emailSuffix}`
        cy.log(JSON.stringify(jsonBody.craeteUser))
      })
    }
  )

  it('POST a single User using Faker.js', () => {
    // cy.log(JSON.stringify(jsonBody.craeteUser))
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
        cy.log(res.body.id)
        cy.log(JSON.stringify(res.body))
      })
  })
})
