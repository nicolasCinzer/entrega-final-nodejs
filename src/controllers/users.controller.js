import { usersService } from '../services/users.service.js'
import { success } from '../utils/index.js'

export const switchRole = async (req, res, next) => {
  const { uid } = req.params

  try {
    const user = await usersService.switchRole(uid)

    success({ res, message: 'User role changed successfully!', features: [user] })
  } catch (error) {
    next(error)
  }
}

export const saveDocuments = async (req, res, next) => {
  const { files, params } = req
  const { uid: id } = params

  try {
    const updatedUser = await usersService.updateDocuments({ files, id })

    success({ res, message: 'User documents updated succesfully!', features: [updatedUser] })
  } catch (error) {
    next(error)
  }
}

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await usersService.retrieveAll()

    success({ res, message: `${users.length} Users founded`, features: users })
  } catch (error) {
    next(error)
  }
}

export const deleteInactiveUsers = async (req, res, next) => {
  try {
    const deletedUsers = await usersService.deleteInactiveUser()

    success({ res, message: `${deletedUsers.deletedCount} Users Deleted` })
  } catch (error) {
    next(error)
  }
}
