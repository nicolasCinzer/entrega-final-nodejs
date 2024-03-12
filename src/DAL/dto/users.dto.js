export class UsersDTO {
  constructor(
    {
      _id,
      first_name,
      last_name,
      email,
      age,
      password,
      cart,
      role = 'user',
      isGithub = false,
      documents,
      acceptable_premium,
      temp_token,
      last_connection
    },
    from
  ) {
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.role = role

    if (from === 'view') {
      return
    }

    this.age = age
    this.cart = cart._id

    if (from === 'request') {
      this.password = password
      this.isGithub = isGithub
      this.temp_token = temp_token
    }

    if (from === 'response') {
      this.documents = documents
      this.acceptable_premium = acceptable_premium
      this.id = _id
      this.user_initials = `${first_name[0]}${last_name[0]}`
      this.full_name = `${first_name} ${last_name}`
      this.last_connection = last_connection
    }
  }

  static request = user => {
    return new UsersDTO(user, 'request')
  }

  static response = user => {
    return new UsersDTO(user, 'response')
  }

  static view = user => {
    return new UsersDTO(user, 'view')
  }
}
