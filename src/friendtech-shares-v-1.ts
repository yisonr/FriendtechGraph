import {
  OwnershipTransferred as OwnershipTransferredEvent,
  Trade as TradeEvent,
} from "../generated/FriendtechSharesV1/FriendtechSharesV1"
import { OwnershipTransferred, Trade, Protocol, Subject, Holder, SubjectHolder } from "../generated/schemav1"
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

function getOrCreateProtocol(protocolId: string): Protocol {
    let protocol = Protocol.load(protocolId)
    if (protocol == null) {
        protocol = new Protocol(protocolId)
        protocol.userCount = 0
        protocol.protocolRevenue = BigDecimal.fromString('0')
        protocol.accountRevenue = BigDecimal.fromString('0')
        protocol.tradeVolume = BigDecimal.fromString('0')
        protocol.totalTrades = 0
        protocol.save()
    }
    return protocol as Protocol
}

export function getOrCreateSubject(subjectId: string): Subject {
  let subject = Subject.load(subjectId)
  if (subject != null) {
    return subject
  }

  subject = new Subject(subjectId)
  subject.holdersCount = BigInt.zero()
  subject.keySupply = BigInt.zero()
  subject.save()
  return subject
}


export function getOrCreateHolder(holderId: string): Holder {
  let holder = Holder.load(holderId)
  if (holder != null) {
    return holder
  }


  holder = new Holder(holderId)
  holder.holdingsTotal = BigInt.zero()
  holder.save()
  return holder
}

export function getOrCreateSubjectHolder(subject: Subject, holder: Holder): SubjectHolder {
  let id = subject.id.concat(holder.id)
  let sh = SubjectHolder.load(id)
  if (sh != null) {
    return sh
  }

  sh = new SubjectHolder(id)
  sh.subject = subject.id
  sh.holder = holder.id
  sh.count = BigInt.zero()
  sh.save()
  return sh
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

  let protocol = getOrCreateProtocol('1') // Assuming there is only one protocol
  protocol.tradeVolume = protocol.tradeVolume.plus(BigDecimal.fromString(trade.ethAmount.toString()))
  protocol.totalTrades = protocol.totalTrades + 1
  protocol.protocolRevenue = protocol.protocolRevenue.plus(BigDecimal.fromString(trade.protocolEthAmount.toString()))
  protocol.accountRevenue = protocol.accountRevenue.plus(BigDecimal.fromString(trade.subjectEthAmount.toString()))      
  protocol.userCount = protocol.userCount + 1 
  protocol.save()

  // subject
  let subjectId = event.params.subject.toHex()
  let subject = getOrCreateSubject(subjectId)
  subject.keySupply = trade.supply
  subject.save()
  
  // holder
  let holderId = event.params.trader.toHex()
  let holder = getOrCreateHolder(holderId)
  holder.save()

  let subjectHolder = getOrCreateSubjectHolder(subject, holder)
  if (subjectHolder.count == BigInt.zero() ) {
    // 新建的 SubjectHolder
	subjectHolder.count.plus(event.params.shareAmount)
	subjectHolder.save()

	// 添加 subject 的 holdersCount
	subject.holdersCount.plus(BigInt.fromI32(1))
	subject.save()
	return
  } 


  if (event.params.isBuy) {
	subjectHolder.count.plus(event.params.shareAmount)
	subjectHolder.save()
	return 
  } 


  if (subjectHolder.count == event.params.shareAmount) {
	subject.holdersCount.minus(BigInt.fromI32(1))
	subject.save()

	subjectHolder.remove()
	return
  }
  subjectHolder.count.minus(event.params.shareAmount)
  subjectHolder.save()

}
