/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAccount = /* GraphQL */ `
  mutation CreateAccount(
    $input: CreateAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    createAccount(input: $input, condition: $condition) {
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
export const updateAccount = /* GraphQL */ `
  mutation UpdateAccount(
    $input: UpdateAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    updateAccount(input: $input, condition: $condition) {
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
export const deleteAccount = /* GraphQL */ `
  mutation DeleteAccount(
    $input: DeleteAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    deleteAccount(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createVoucher = /* GraphQL */ `
  mutation CreateVoucher(
    $input: CreateVoucherInput!
    $condition: ModelVoucherConditionInput
  ) {
    createVoucher(input: $input, condition: $condition) {
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
export const updateVoucher = /* GraphQL */ `
  mutation UpdateVoucher(
    $input: UpdateVoucherInput!
    $condition: ModelVoucherConditionInput
  ) {
    updateVoucher(input: $input, condition: $condition) {
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
export const deleteVoucher = /* GraphQL */ `
  mutation DeleteVoucher(
    $input: DeleteVoucherInput!
    $condition: ModelVoucherConditionInput
  ) {
    deleteVoucher(input: $input, condition: $condition) {
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
