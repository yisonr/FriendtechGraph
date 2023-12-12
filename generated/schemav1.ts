import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class OwnershipTransferred extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save OwnershipTransferred entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type OwnershipTransferred must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("OwnershipTransferred", id.toString(), this);
    }
  }

  static loadInBlock(id: string): OwnershipTransferred | null {
    return changetype<OwnershipTransferred | null>(
      store.get_in_block("OwnershipTransferred", id)
    );
  }

  static load(id: string): OwnershipTransferred | null {
    return changetype<OwnershipTransferred | null>(
      store.get("OwnershipTransferred", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get previousOwner(): Bytes {
    let value = this.get("previousOwner");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set previousOwner(value: Bytes) {
    this.set("previousOwner", Value.fromBytes(value));
  }

  get newOwner(): Bytes {
    let value = this.get("newOwner");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set newOwner(value: Bytes) {
    this.set("newOwner", Value.fromBytes(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }

  get transactionHash(): Bytes {
    let value = this.get("transactionHash");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set transactionHash(value: Bytes) {
    this.set("transactionHash", Value.fromBytes(value));
  }
}

export class Protocol extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Protocol entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Protocol must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Protocol", id.toString(), this);
    }
  }

  static loadInBlock(id: string): Protocol | null {
    return changetype<Protocol | null>(store.get_in_block("Protocol", id));
  }

  static load(id: string): Protocol | null {
    return changetype<Protocol | null>(store.get("Protocol", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get userCount(): i32 {
    let value = this.get("userCount");
    if (!value || value.kind == ValueKind.NULL) {
      return 0;
    } else {
      return value.toI32();
    }
  }

  set userCount(value: i32) {
    this.set("userCount", Value.fromI32(value));
  }

  get protocolRevenue(): BigDecimal {
    let value = this.get("protocolRevenue");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigDecimal();
    }
  }

  set protocolRevenue(value: BigDecimal) {
    this.set("protocolRevenue", Value.fromBigDecimal(value));
  }

  get accountRevenue(): BigDecimal {
    let value = this.get("accountRevenue");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigDecimal();
    }
  }

  set accountRevenue(value: BigDecimal) {
    this.set("accountRevenue", Value.fromBigDecimal(value));
  }

  get tradeVolume(): BigDecimal {
    let value = this.get("tradeVolume");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigDecimal();
    }
  }

  set tradeVolume(value: BigDecimal) {
    this.set("tradeVolume", Value.fromBigDecimal(value));
  }

  get totalTrades(): i32 {
    let value = this.get("totalTrades");
    if (!value || value.kind == ValueKind.NULL) {
      return 0;
    } else {
      return value.toI32();
    }
  }

  set totalTrades(value: i32) {
    this.set("totalTrades", Value.fromI32(value));
  }
}

export class Subject extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Subject entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Subject must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Subject", id.toString(), this);
    }
  }

  remove(): void {
	let id = this.get("id")
	assert(id != null, "Cannot remove Subject entity without an ID");
	if (id) {
		store.remove("Subject", id.toString())
	}
  }

  static loadInBlock(id: string): Subject | null {
    return changetype<Subject | null>(store.get_in_block("Subject", id));
  }

  static load(id: string): Subject | null {
    return changetype<Subject | null>(store.get("Subject", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get holdersCount(): BigInt {
    let value = this.get("holdersCount");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set holdersCount(value: BigInt) {
    this.set("holdersCount", Value.fromBigInt(value));
  }

  get keySupply(): BigInt {
    let value = this.get("keySupply");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set keySupply(value: BigInt) {
    this.set("keySupply", Value.fromBigInt(value));
  }

  get holders(): SubjectHolderLoader {
    return new SubjectHolderLoader(
      "Subject",
      this.get("id")!.toString(),
      "holders"
    );
  }
}

export class Holder extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Holder entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Holder must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Holder", id.toString(), this);
    }
  }

  remove(): void {
	let id = this.get("id")
	assert(id != null, "Cannot remove Holder entity without an ID");
	if (id) {
		store.remove("Holder", id.toString())
	}
  }

  static loadInBlock(id: string): Holder | null {
    return changetype<Holder | null>(store.get_in_block("Holder", id));
  }

  static load(id: string): Holder | null {
    return changetype<Holder | null>(store.get("Holder", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get subjects(): SubjectHolderLoader {
    return new SubjectHolderLoader(
      "Holder",
      this.get("id")!.toString(),
      "subjects"
    );
  }

  get holdingsTotal(): BigInt {
    let value = this.get("holdingsTotal");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set holdingsTotal(value: BigInt) {
    this.set("holdingsTotal", Value.fromBigInt(value));
  }
}

export class SubjectHolder extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save SubjectHolder entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type SubjectHolder must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("SubjectHolder", id.toString(), this);
    }
  }

  remove(): void {
	let id = this.get("id")
	assert(id != null, "Cannot remove SubjectHolder entity without an ID");
	if (id) {
		store.remove("SubjectHolder", id.toString())
	}
  }

  static loadInBlock(id: string): SubjectHolder | null {
    return changetype<SubjectHolder | null>(
      store.get_in_block("SubjectHolder", id)
    );
  }

  static load(id: string): SubjectHolder | null {
    return changetype<SubjectHolder | null>(store.get("SubjectHolder", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get subject(): string {
    let value = this.get("subject");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set subject(value: string) {
    this.set("subject", Value.fromString(value));
  }

  get holder(): string {
    let value = this.get("holder");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set holder(value: string) {
    this.set("holder", Value.fromString(value));
  }

  get count(): BigInt {
    let value = this.get("count");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set count(value: BigInt) {
    this.set("count", Value.fromBigInt(value));
  }
}

export class Trade extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Trade entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Trade must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Trade", id.toString(), this);
    }
  }

  static loadInBlock(id: string): Trade | null {
    return changetype<Trade | null>(store.get_in_block("Trade", id));
  }

  static load(id: string): Trade | null {
    return changetype<Trade | null>(store.get("Trade", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get trader(): Bytes {
    let value = this.get("trader");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set trader(value: Bytes) {
    this.set("trader", Value.fromBytes(value));
  }

  get subject(): Bytes {
    let value = this.get("subject");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set subject(value: Bytes) {
    this.set("subject", Value.fromBytes(value));
  }

  get isBuy(): boolean {
    let value = this.get("isBuy");
    if (!value || value.kind == ValueKind.NULL) {
      return false;
    } else {
      return value.toBoolean();
    }
  }

  set isBuy(value: boolean) {
    this.set("isBuy", Value.fromBoolean(value));
  }

  get shareAmount(): BigInt {
    let value = this.get("shareAmount");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set shareAmount(value: BigInt) {
    this.set("shareAmount", Value.fromBigInt(value));
  }

  get ethAmount(): BigInt {
    let value = this.get("ethAmount");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set ethAmount(value: BigInt) {
    this.set("ethAmount", Value.fromBigInt(value));
  }

  get protocolEthAmount(): BigInt {
    let value = this.get("protocolEthAmount");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set protocolEthAmount(value: BigInt) {
    this.set("protocolEthAmount", Value.fromBigInt(value));
  }

  get subjectEthAmount(): BigInt {
    let value = this.get("subjectEthAmount");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set subjectEthAmount(value: BigInt) {
    this.set("subjectEthAmount", Value.fromBigInt(value));
  }

  get supply(): BigInt {
    let value = this.get("supply");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set supply(value: BigInt) {
    this.set("supply", Value.fromBigInt(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }

  get transactionHash(): Bytes {
    let value = this.get("transactionHash");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set transactionHash(value: Bytes) {
    this.set("transactionHash", Value.fromBytes(value));
  }
}

export class SubjectHolderLoader extends Entity {
  _entity: string;
  _field: string;
  _id: string;

  constructor(entity: string, id: string, field: string) {
    super();
    this._entity = entity;
    this._id = id;
    this._field = field;
  }

  load(): SubjectHolder[] {
    let value = store.loadRelated(this._entity, this._id, this._field);
    return changetype<SubjectHolder[]>(value);
  }
}
