export interface UserSchema {
	username: string
	displayName: string
	password: string
	createdAt: Date
	updatedAt: Date
	avatar?: string
}
