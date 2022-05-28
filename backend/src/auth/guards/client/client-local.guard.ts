import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CLIENT_LOCAL_STRATEGY_NAME } from '../../strategies/client/client-local.strategy'

@Injectable()
export class ClientLocalGuard extends AuthGuard(CLIENT_LOCAL_STRATEGY_NAME) {}
