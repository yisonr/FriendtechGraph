import {
  OwnershipTransferred as OwnershipTransferredEvent,
  Trade as TradeEvent,
} from "../generated/FriendtechSharesV1/FriendtechSharesV1"
import { OwnershipTransferred, Trade, Protocol, Subject, Holder } from "../generated/schema"
import { BigDecimal, crypto, BigInt, Bytes, Address } from '@graphprotocol/graph-ts'

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.toHexString()
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

// export function createProtocol(protocol: Protocol): Protocol {
//   return protocol as Protocol
// }

export function getOrCreateSubject(subjectId: string): Subject {
  let subject = Subject.load(subjectId)
  if (subject != null) {
    return subject
  }

  subject = new Subject(subjectId)
  subject.holdersCount = 0
  subject.keySupply = BigInt.zero()
  subject.save()
  return subject
}


export function getOrCreateHolder(holderId: string, subject: Subject): Holder {
  let holder = Holder.load(holderId)
  if (holder != null) {
    return holder
  }

  holder = new Holder(holderId)
  holder.subject = subject.id
  holder.count = BigInt.zero()
  holder.save()
  return holder
}

export function handleTrade(event: TradeEvent): void {
  let trade = new Trade(
    event.transaction.hash.toHexString()
  )
  trade.trader = event.params.trader
  trade.subject = event.params.subject
  trade.isBuy = event.params.isBuy
  trade.shareAmount = event.params.shareAmount
  trade.ethAmount = event.params.ethAmount
  trade.protocolEthAmount = event.params.protocolEthAmount
  trade.subjectEthAmount = event.params.subjectEthAmount
  trade.supply = event.params.supply

  trade.blockNumber = event.block.number
  trade.blockTimestamp = event.block.timestamp
  trade.transactionHash = event.transaction.hash
  trade.save()

  // subject
  let subjectId = event.params.subject.toHex()
  let subject = getOrCreateSubject(subjectId)
  subject.holdersCount = trade.isBuy? subject.holdersCount+1: subject.holdersCount-1
  subject.keySupply = trade.supply
  subject.save()
  
  // holder
  let holderId = event.params.trader.toHex()
  let holder = getOrCreateHolder(holderId, subject)
  if (trade.isBuy) {
	holder.holdingsTotal =  holder.holdingsTotal.plus(trade.shareAmount)
  } else {
	holder.holdingsTotal =  holder.holdingsTotal.minus(trade.shareAmount)
  }
  holder.save()
}
