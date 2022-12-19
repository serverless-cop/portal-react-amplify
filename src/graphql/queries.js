/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAccount = /* GraphQL */ `
  query GetAccount($id: ID!) {
    getAccount(id: $id) {
      id
      organization
      status
      users {
        items {
          id
          name
          lastName
          jobTitle
          email
          phone
          activated
          createdAt
          updatedAt
          accountUsersId
        }
        nextToken
      }
      voucherId
      createdAt
      updatedAt
    }
  }
`;
export const listAccounts = /* GraphQL */ `
  query ListAccounts(
    $filter: ModelAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        organization
        status
        users {
          nextToken
        }
        voucherId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      lastName
      jobTitle
      email
      phone
      activated
      account {
        id
        organization
        status
        users {
          nextToken
        }
        voucherId
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      accountUsersId
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        lastName
        jobTitle
        email
        phone
        activated
        account {
          id
          organization
          status
          voucherId
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        accountUsersId
      }
      nextToken
    }
  }
`;
export const getVoucher = /* GraphQL */ `
  query GetVoucher($id: ID!) {
    getVoucher(id: $id) {
      id
      code
      used
      accountId
      expiration
      createdAt
      updatedAt
    }
  }
`;
export const listVouchers = /* GraphQL */ `
  query ListVouchers(
    $filter: ModelVoucherFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVouchers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        code
        used
        accountId
        expiration
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
