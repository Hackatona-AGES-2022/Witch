import { Address } from '../../../../db/models/address.model'
import { User } from '../../../../db/models/user.model'

export interface ProfileDto extends User {
	addresses: Address[]
}
