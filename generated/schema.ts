// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

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

export class Account extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Account entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Account entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Account", id.toString(), this);
    }
  }

  static load(id: string): Account | null {
    return changetype<Account | null>(store.get("Account", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get asOwnable(): string | null {
    let value = this.get("asOwnable");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set asOwnable(value: string | null) {
    if (!value) {
      this.unset("asOwnable");
    } else {
      this.set("asOwnable", Value.fromString(<string>value));
    }
  }

  get ownerOf(): Array<string> {
    let value = this.get("ownerOf");
    return value!.toStringArray();
  }

  set ownerOf(value: Array<string>) {
    this.set("ownerOf", Value.fromStringArray(value));
  }

  get ownershipTransferred(): Array<string> {
    let value = this.get("ownershipTransferred");
    return value!.toStringArray();
  }

  set ownershipTransferred(value: Array<string>) {
    this.set("ownershipTransferred", Value.fromStringArray(value));
  }

  get events(): Array<string> {
    let value = this.get("events");
    return value!.toStringArray();
  }

  set events(value: Array<string>) {
    this.set("events", Value.fromStringArray(value));
  }
}

export class Ownable extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("asAccount", Value.fromString(""));
    this.set("owner", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Ownable entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Ownable entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Ownable", id.toString(), this);
    }
  }

  static load(id: string): Ownable | null {
    return changetype<Ownable | null>(store.get("Ownable", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get asAccount(): string {
    let value = this.get("asAccount");
    return value!.toString();
  }

  set asAccount(value: string) {
    this.set("asAccount", Value.fromString(value));
  }

  get owner(): string {
    let value = this.get("owner");
    return value!.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }

  get ownershipTransferred(): Array<string> {
    let value = this.get("ownershipTransferred");
    return value!.toStringArray();
  }

  set ownershipTransferred(value: Array<string>) {
    this.set("ownershipTransferred", Value.fromStringArray(value));
  }
}

export class OwnershipTransferred extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("emitter", Value.fromString(""));
    this.set("transaction", Value.fromString(""));
    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("contract", Value.fromString(""));
    this.set("owner", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save OwnershipTransferred entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save OwnershipTransferred entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("OwnershipTransferred", id.toString(), this);
    }
  }

  static load(id: string): OwnershipTransferred | null {
    return changetype<OwnershipTransferred | null>(
      store.get("OwnershipTransferred", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get emitter(): string {
    let value = this.get("emitter");
    return value!.toString();
  }

  set emitter(value: string) {
    this.set("emitter", Value.fromString(value));
  }

  get transaction(): string {
    let value = this.get("transaction");
    return value!.toString();
  }

  set transaction(value: string) {
    this.set("transaction", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get contract(): string {
    let value = this.get("contract");
    return value!.toString();
  }

  set contract(value: string) {
    this.set("contract", Value.fromString(value));
  }

  get owner(): string {
    let value = this.get("owner");
    return value!.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }
}

export class SupplyOrder extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save SupplyOrder entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save SupplyOrder entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("SupplyOrder", id.toString(), this);
    }
  }

  static load(id: string): SupplyOrder | null {
    return changetype<SupplyOrder | null>(store.get("SupplyOrder", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get prepPo(): string | null {
    let value = this.get("prepPo");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set prepPo(value: string | null) {
    if (!value) {
      this.unset("prepPo");
    } else {
      this.set("prepPo", Value.fromString(<string>value));
    }
  }

  get loomPo(): string | null {
    let value = this.get("loomPo");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set loomPo(value: string | null) {
    if (!value) {
      this.unset("loomPo");
    } else {
      this.set("loomPo", Value.fromString(<string>value));
    }
  }

  get pelletIds(): Array<string> {
    let value = this.get("pelletIds");
    return value!.toStringArray();
  }

  set pelletIds(value: Array<string>) {
    this.set("pelletIds", Value.fromStringArray(value));
  }

  get warpInputs(): Array<string> {
    let value = this.get("warpInputs");
    return value!.toStringArray();
  }

  set warpInputs(value: Array<string>) {
    this.set("warpInputs", Value.fromStringArray(value));
  }

  get sizingInputs(): Array<string> {
    let value = this.get("sizingInputs");
    return value!.toStringArray();
  }

  set sizingInputs(value: Array<string>) {
    this.set("sizingInputs", Value.fromStringArray(value));
  }
}

export class Pellet extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Pellet entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Pellet entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Pellet", id.toString(), this);
    }
  }

  static load(id: string): Pellet | null {
    return changetype<Pellet | null>(store.get("Pellet", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get materialInfo(): string | null {
    let value = this.get("materialInfo");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set materialInfo(value: string | null) {
    if (!value) {
      this.unset("materialInfo");
    } else {
      this.set("materialInfo", Value.fromString(<string>value));
    }
  }

  get materialType(): string | null {
    let value = this.get("materialType");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set materialType(value: string | null) {
    if (!value) {
      this.unset("materialType");
    } else {
      this.set("materialType", Value.fromString(<string>value));
    }
  }

  get netWeight(): string | null {
    let value = this.get("netWeight");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set netWeight(value: string | null) {
    if (!value) {
      this.unset("netWeight");
    } else {
      this.set("netWeight", Value.fromString(<string>value));
    }
  }

  get grossWeight(): string | null {
    let value = this.get("grossWeight");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set grossWeight(value: string | null) {
    if (!value) {
      this.unset("grossWeight");
    } else {
      this.set("grossWeight", Value.fromString(<string>value));
    }
  }

  get coneQuantity(): string | null {
    let value = this.get("coneQuantity");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set coneQuantity(value: string | null) {
    if (!value) {
      this.unset("coneQuantity");
    } else {
      this.set("coneQuantity", Value.fromString(<string>value));
    }
  }

  get serialNumber(): string | null {
    let value = this.get("serialNumber");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set serialNumber(value: string | null) {
    if (!value) {
      this.unset("serialNumber");
    } else {
      this.set("serialNumber", Value.fromString(<string>value));
    }
  }

  get lotNumber(): string | null {
    let value = this.get("lotNumber");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set lotNumber(value: string | null) {
    if (!value) {
      this.unset("lotNumber");
    } else {
      this.set("lotNumber", Value.fromString(<string>value));
    }
  }

  get unloadingTimestamp(): string | null {
    let value = this.get("unloadingTimestamp");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set unloadingTimestamp(value: string | null) {
    if (!value) {
      this.unset("unloadingTimestamp");
    } else {
      this.set("unloadingTimestamp", Value.fromString(<string>value));
    }
  }

  get binNumber(): string | null {
    let value = this.get("binNumber");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set binNumber(value: string | null) {
    if (!value) {
      this.unset("binNumber");
    } else {
      this.set("binNumber", Value.fromString(<string>value));
    }
  }

  get entryTimestamp(): string | null {
    let value = this.get("entryTimestamp");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set entryTimestamp(value: string | null) {
    if (!value) {
      this.unset("entryTimestamp");
    } else {
      this.set("entryTimestamp", Value.fromString(<string>value));
    }
  }

  get entryEmpId(): string | null {
    let value = this.get("entryEmpId");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set entryEmpId(value: string | null) {
    if (!value) {
      this.unset("entryEmpId");
    } else {
      this.set("entryEmpId", Value.fromString(<string>value));
    }
  }

  get exitTimestamp(): string | null {
    let value = this.get("exitTimestamp");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set exitTimestamp(value: string | null) {
    if (!value) {
      this.unset("exitTimestamp");
    } else {
      this.set("exitTimestamp", Value.fromString(<string>value));
    }
  }

  get exitEmpId(): string | null {
    let value = this.get("exitEmpId");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set exitEmpId(value: string | null) {
    if (!value) {
      this.unset("exitEmpId");
    } else {
      this.set("exitEmpId", Value.fromString(<string>value));
    }
  }

  get soId(): string | null {
    let value = this.get("soId");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set soId(value: string | null) {
    if (!value) {
      this.unset("soId");
    } else {
      this.set("soId", Value.fromString(<string>value));
    }
  }
}

export class WarpInput extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("creelMachineId", Value.fromString(""));
    this.set("prepPoId", Value.fromString(""));
    this.set("loadEmpId", Value.fromString(""));
    this.set("loadTimestamp", Value.fromString(""));
    this.set("outputEmpId", Value.fromString(""));
    this.set("outputTimestamp", Value.fromString(""));
    this.set("pelletIds", Value.fromStringArray(new Array(0)));
    this.set("warperBeamIds", Value.fromStringArray(new Array(0)));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save WarpInput entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save WarpInput entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("WarpInput", id.toString(), this);
    }
  }

  static load(id: string): WarpInput | null {
    return changetype<WarpInput | null>(store.get("WarpInput", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get soId(): string | null {
    let value = this.get("soId");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set soId(value: string | null) {
    if (!value) {
      this.unset("soId");
    } else {
      this.set("soId", Value.fromString(<string>value));
    }
  }

  get creelMachineId(): string {
    let value = this.get("creelMachineId");
    return value!.toString();
  }

  set creelMachineId(value: string) {
    this.set("creelMachineId", Value.fromString(value));
  }

  get prepPoId(): string {
    let value = this.get("prepPoId");
    return value!.toString();
  }

  set prepPoId(value: string) {
    this.set("prepPoId", Value.fromString(value));
  }

  get loadEmpId(): string {
    let value = this.get("loadEmpId");
    return value!.toString();
  }

  set loadEmpId(value: string) {
    this.set("loadEmpId", Value.fromString(value));
  }

  get loadTimestamp(): string {
    let value = this.get("loadTimestamp");
    return value!.toString();
  }

  set loadTimestamp(value: string) {
    this.set("loadTimestamp", Value.fromString(value));
  }

  get outputEmpId(): string {
    let value = this.get("outputEmpId");
    return value!.toString();
  }

  set outputEmpId(value: string) {
    this.set("outputEmpId", Value.fromString(value));
  }

  get outputTimestamp(): string {
    let value = this.get("outputTimestamp");
    return value!.toString();
  }

  set outputTimestamp(value: string) {
    this.set("outputTimestamp", Value.fromString(value));
  }

  get pelletIds(): Array<string> {
    let value = this.get("pelletIds");
    return value!.toStringArray();
  }

  set pelletIds(value: Array<string>) {
    this.set("pelletIds", Value.fromStringArray(value));
  }

  get warperBeamIds(): Array<string> {
    let value = this.get("warperBeamIds");
    return value!.toStringArray();
  }

  set warperBeamIds(value: Array<string>) {
    this.set("warperBeamIds", Value.fromStringArray(value));
  }
}

export class SizingInput extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("sizingMachineId", Value.fromString(""));
    this.set("prepPoId", Value.fromString(""));
    this.set("loadEmpId", Value.fromString(""));
    this.set("loadTimestamp", Value.fromString(""));
    this.set("outputEmpId", Value.fromString(""));
    this.set("outputTimestamp", Value.fromString(""));
    this.set("warperBeamIds", Value.fromStringArray(new Array(0)));
    this.set("weaverBeamIds", Value.fromStringArray(new Array(0)));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save SizingInput entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save SizingInput entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("SizingInput", id.toString(), this);
    }
  }

  static load(id: string): SizingInput | null {
    return changetype<SizingInput | null>(store.get("SizingInput", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get soId(): string | null {
    let value = this.get("soId");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set soId(value: string | null) {
    if (!value) {
      this.unset("soId");
    } else {
      this.set("soId", Value.fromString(<string>value));
    }
  }

  get sizingMachineId(): string {
    let value = this.get("sizingMachineId");
    return value!.toString();
  }

  set sizingMachineId(value: string) {
    this.set("sizingMachineId", Value.fromString(value));
  }

  get prepPoId(): string {
    let value = this.get("prepPoId");
    return value!.toString();
  }

  set prepPoId(value: string) {
    this.set("prepPoId", Value.fromString(value));
  }

  get loadEmpId(): string {
    let value = this.get("loadEmpId");
    return value!.toString();
  }

  set loadEmpId(value: string) {
    this.set("loadEmpId", Value.fromString(value));
  }

  get loadTimestamp(): string {
    let value = this.get("loadTimestamp");
    return value!.toString();
  }

  set loadTimestamp(value: string) {
    this.set("loadTimestamp", Value.fromString(value));
  }

  get outputEmpId(): string {
    let value = this.get("outputEmpId");
    return value!.toString();
  }

  set outputEmpId(value: string) {
    this.set("outputEmpId", Value.fromString(value));
  }

  get outputTimestamp(): string {
    let value = this.get("outputTimestamp");
    return value!.toString();
  }

  set outputTimestamp(value: string) {
    this.set("outputTimestamp", Value.fromString(value));
  }

  get warperBeamIds(): Array<string> {
    let value = this.get("warperBeamIds");
    return value!.toStringArray();
  }

  set warperBeamIds(value: Array<string>) {
    this.set("warperBeamIds", Value.fromStringArray(value));
  }

  get weaverBeamIds(): Array<string> {
    let value = this.get("weaverBeamIds");
    return value!.toStringArray();
  }

  set weaverBeamIds(value: Array<string>) {
    this.set("weaverBeamIds", Value.fromStringArray(value));
  }
}

export class SizingStorage extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("soId", Value.fromString(""));
    this.set("binId", Value.fromString(""));
    this.set("empId", Value.fromString(""));
    this.set("timestamp", Value.fromString(""));
    this.set("prepPoId", Value.fromString(""));
    this.set("weaverBeamIds", Value.fromStringArray(new Array(0)));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save SizingStorage entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save SizingStorage entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("SizingStorage", id.toString(), this);
    }
  }

  static load(id: string): SizingStorage | null {
    return changetype<SizingStorage | null>(store.get("SizingStorage", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get soId(): string {
    let value = this.get("soId");
    return value!.toString();
  }

  set soId(value: string) {
    this.set("soId", Value.fromString(value));
  }

  get binId(): string {
    let value = this.get("binId");
    return value!.toString();
  }

  set binId(value: string) {
    this.set("binId", Value.fromString(value));
  }

  get empId(): string {
    let value = this.get("empId");
    return value!.toString();
  }

  set empId(value: string) {
    this.set("empId", Value.fromString(value));
  }

  get timestamp(): string {
    let value = this.get("timestamp");
    return value!.toString();
  }

  set timestamp(value: string) {
    this.set("timestamp", Value.fromString(value));
  }

  get prepPoId(): string {
    let value = this.get("prepPoId");
    return value!.toString();
  }

  set prepPoId(value: string) {
    this.set("prepPoId", Value.fromString(value));
  }

  get weaverBeamIds(): Array<string> {
    let value = this.get("weaverBeamIds");
    return value!.toStringArray();
  }

  set weaverBeamIds(value: Array<string>) {
    this.set("weaverBeamIds", Value.fromStringArray(value));
  }
}

export class Loomshed extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("loomMachineId", Value.fromString(""));
    this.set("loomPoId", Value.fromString(""));
    this.set("loadEmpId", Value.fromString(""));
    this.set("loadTimestamp", Value.fromString(""));
    this.set("outputEmpId", Value.fromString(""));
    this.set("outputTimestamp", Value.fromString(""));
    this.set("weaverBeamIds", Value.fromStringArray(new Array(0)));
    this.set("pelletIds", Value.fromStringArray(new Array(0)));
    this.set("rollIds", Value.fromStringArray(new Array(0)));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Loomshed entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Loomshed entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Loomshed", id.toString(), this);
    }
  }

  static load(id: string): Loomshed | null {
    return changetype<Loomshed | null>(store.get("Loomshed", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get soId(): string | null {
    let value = this.get("soId");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set soId(value: string | null) {
    if (!value) {
      this.unset("soId");
    } else {
      this.set("soId", Value.fromString(<string>value));
    }
  }

  get loomMachineId(): string {
    let value = this.get("loomMachineId");
    return value!.toString();
  }

  set loomMachineId(value: string) {
    this.set("loomMachineId", Value.fromString(value));
  }

  get loomPoId(): string {
    let value = this.get("loomPoId");
    return value!.toString();
  }

  set loomPoId(value: string) {
    this.set("loomPoId", Value.fromString(value));
  }

  get loadEmpId(): string {
    let value = this.get("loadEmpId");
    return value!.toString();
  }

  set loadEmpId(value: string) {
    this.set("loadEmpId", Value.fromString(value));
  }

  get loadTimestamp(): string {
    let value = this.get("loadTimestamp");
    return value!.toString();
  }

  set loadTimestamp(value: string) {
    this.set("loadTimestamp", Value.fromString(value));
  }

  get outputEmpId(): string {
    let value = this.get("outputEmpId");
    return value!.toString();
  }

  set outputEmpId(value: string) {
    this.set("outputEmpId", Value.fromString(value));
  }

  get outputTimestamp(): string {
    let value = this.get("outputTimestamp");
    return value!.toString();
  }

  set outputTimestamp(value: string) {
    this.set("outputTimestamp", Value.fromString(value));
  }

  get weaverBeamIds(): Array<string> {
    let value = this.get("weaverBeamIds");
    return value!.toStringArray();
  }

  set weaverBeamIds(value: Array<string>) {
    this.set("weaverBeamIds", Value.fromStringArray(value));
  }

  get pelletIds(): Array<string> {
    let value = this.get("pelletIds");
    return value!.toStringArray();
  }

  set pelletIds(value: Array<string>) {
    this.set("pelletIds", Value.fromStringArray(value));
  }

  get rollIds(): Array<string> {
    let value = this.get("rollIds");
    return value!.toStringArray();
  }

  set rollIds(value: Array<string>) {
    this.set("rollIds", Value.fromStringArray(value));
  }
}

export class Transaction extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("blockNumber", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Transaction entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Transaction entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Transaction", id.toString(), this);
    }
  }

  static load(id: string): Transaction | null {
    return changetype<Transaction | null>(store.get("Transaction", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value!.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get events(): Array<string> {
    let value = this.get("events");
    return value!.toStringArray();
  }

  set events(value: Array<string>) {
    this.set("events", Value.fromStringArray(value));
  }
}
