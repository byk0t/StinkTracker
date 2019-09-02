/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStink = `query GetStink($id: ID!) {
  getStink(id: $id) {
    id
    value
    lat
    lng
    smell
    wind
    comment
  }
}
`;
export const listStinks = `query ListStinks(
  $filter: ModelStinkFilterInput
  $limit: Int
  $nextToken: String
) {
  listStinks(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      value
      lat
      lng
      smell
      wind
      comment
    }
    nextToken
  }
}
`;
