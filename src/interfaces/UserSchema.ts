export interface UserSchema {
	username: string
	firstName: string
	lastName: string
	password: string
	createdAt: Date
	updatedAt: Date
	avatar?: string
}
