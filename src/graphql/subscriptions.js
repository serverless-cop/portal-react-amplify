/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAccount = /* GraphQL */ `
  subscription OnCreateAccount {
    onCreateAccount {
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
export const onUpdateAccount = /* GraphQL */ `
  subscription OnUpdateAccount {
    onUpdateAccount {
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
export const onDeleteAccount = /* GraphQL */ `
  subscription OnDeleteAccount {
    onDeleteAccount {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateVoucher = /* GraphQL */ `
  subscription OnCreateVoucher {
    onCreateVoucher {
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
export const onUpdateVoucher = /* GraphQL */ `
  subscription OnUpdateVoucher {
    onUpdateVoucher {
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
export const onDeleteVoucher = /* GraphQL */ `
  subscription OnDeleteVoucher {
    onDeleteVoucher {
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
