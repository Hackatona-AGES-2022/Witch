import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CLIENT_JWT_STRATEGY_NAME } from '../../strategies/client/client-jwt.strategy'

@Injectable()
export class ClientJwtAuthGuard extends AuthGuard(CLIENT_JWT_STRATEGY_NAME) {}
