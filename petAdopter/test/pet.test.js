const petRouterTest = require('../node/pet/petRouter')

test('properly get correct species', () => {
    expect(petRouterTest.get('/species')).toEqual('Cats')
})

test('properly get user id', () => {
    expect(petRouterTest.get('/id')).toEqual('625a25110f71b8100624f07c')
})