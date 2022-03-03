// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Loom extends ethereum.Event {
  get params(): Loom__Params {
    return new Loom__Params(this);
  }
}

export class Loom__Params {
  _event: Loom;

  constructor(event: Loom) {
    this._event = event;
  }

  get soId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get loomshedCid(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Trident__getSoDetailsResultValue0Struct extends ethereum.Tuple {
  get soId(): string {
    return this[0].toString();
  }

  get prepPo(): string {
    return this[1].toString();
  }

  get pelletsCid(): string {
    return this[2].toString();
  }

  get warpingCid(): string {
    return this[3].toString();
  }

  get sizingCid(): string {
    return this[4].toString();
  }

  get loomshedCid(): string {
    return this[5].toString();
  }

  get fabricIds(): string {
    return this[6].toString();
  }
}

export class Trident extends ethereum.SmartContract {
  static bind(address: Address): Trident {
    return new Trident("Trident", address);
  }

  getSoDetails(soId: string): Trident__getSoDetailsResultValue0Struct {
    let result = super.call(
      "getSoDetails",
      "getSoDetails(string):((string,string,string,string,string,string,string))",
      [ethereum.Value.fromString(soId)]
    );

    return changetype<Trident__getSoDetailsResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_getSoDetails(
    soId: string
  ): ethereum.CallResult<Trident__getSoDetailsResultValue0Struct> {
    let result = super.tryCall(
      "getSoDetails",
      "getSoDetails(string):((string,string,string,string,string,string,string))",
      [ethereum.Value.fromString(soId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<Trident__getSoDetailsResultValue0Struct>(value[0].toTuple())
    );
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class AddPelletsToWarpMachineCall extends ethereum.Call {
  get inputs(): AddPelletsToWarpMachineCall__Inputs {
    return new AddPelletsToWarpMachineCall__Inputs(this);
  }

  get outputs(): AddPelletsToWarpMachineCall__Outputs {
    return new AddPelletsToWarpMachineCall__Outputs(this);
  }
}

export class AddPelletsToWarpMachineCall__Inputs {
  _call: AddPelletsToWarpMachineCall;

  constructor(call: AddPelletsToWarpMachineCall) {
    this._call = call;
  }

  get soId(): string {
    return this._call.inputValues[0].value.toString();
  }

  get warperBeamId(): string {
    return this._call.inputValues[1].value.toString();
  }

  get warpingCid(): string {
    return this._call.inputValues[2].value.toString();
  }

  get pelletIds(): Array<string> {
    return this._call.inputValues[3].value.toStringArray();
  }
}

export class AddPelletsToWarpMachineCall__Outputs {
  _call: AddPelletsToWarpMachineCall;

  constructor(call: AddPelletsToWarpMachineCall) {
    this._call = call;
  }
}

export class AddWarperBeamsToSizingMachineCall extends ethereum.Call {
  get inputs(): AddWarperBeamsToSizingMachineCall__Inputs {
    return new AddWarperBeamsToSizingMachineCall__Inputs(this);
  }

  get outputs(): AddWarperBeamsToSizingMachineCall__Outputs {
    return new AddWarperBeamsToSizingMachineCall__Outputs(this);
  }
}

export class AddWarperBeamsToSizingMachineCall__Inputs {
  _call: AddWarperBeamsToSizingMachineCall;

  constructor(call: AddWarperBeamsToSizingMachineCall) {
    this._call = call;
  }

  get soId(): string {
    return this._call.inputValues[0].value.toString();
  }

  get sizingCid(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class AddWarperBeamsToSizingMachineCall__Outputs {
  _call: AddWarperBeamsToSizingMachineCall;

  constructor(call: AddWarperBeamsToSizingMachineCall) {
    this._call = call;
  }
}

export class AddWeaverBeamsToLoomMachineCall extends ethereum.Call {
  get inputs(): AddWeaverBeamsToLoomMachineCall__Inputs {
    return new AddWeaverBeamsToLoomMachineCall__Inputs(this);
  }

  get outputs(): AddWeaverBeamsToLoomMachineCall__Outputs {
    return new AddWeaverBeamsToLoomMachineCall__Outputs(this);
  }
}

export class AddWeaverBeamsToLoomMachineCall__Inputs {
  _call: AddWeaverBeamsToLoomMachineCall;

  constructor(call: AddWeaverBeamsToLoomMachineCall) {
    this._call = call;
  }

  get soId(): string {
    return this._call.inputValues[0].value.toString();
  }

  get loomshedCid(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class AddWeaverBeamsToLoomMachineCall__Outputs {
  _call: AddWeaverBeamsToLoomMachineCall;

  constructor(call: AddWeaverBeamsToLoomMachineCall) {
    this._call = call;
  }
}

export class MovePelletsFromWarehouseCall extends ethereum.Call {
  get inputs(): MovePelletsFromWarehouseCall__Inputs {
    return new MovePelletsFromWarehouseCall__Inputs(this);
  }

  get outputs(): MovePelletsFromWarehouseCall__Outputs {
    return new MovePelletsFromWarehouseCall__Outputs(this);
  }
}

export class MovePelletsFromWarehouseCall__Inputs {
  _call: MovePelletsFromWarehouseCall;

  constructor(call: MovePelletsFromWarehouseCall) {
    this._call = call;
  }

  get pelletIds(): Array<string> {
    return this._call.inputValues[0].value.toStringArray();
  }

  get exitPoint(): string {
    return this._call.inputValues[1].value.toString();
  }

  get exitTimestamp(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class MovePelletsFromWarehouseCall__Outputs {
  _call: MovePelletsFromWarehouseCall;

  constructor(call: MovePelletsFromWarehouseCall) {
    this._call = call;
  }
}

export class MoveWarperBeamsFromWarpingUnitCall extends ethereum.Call {
  get inputs(): MoveWarperBeamsFromWarpingUnitCall__Inputs {
    return new MoveWarperBeamsFromWarpingUnitCall__Inputs(this);
  }

  get outputs(): MoveWarperBeamsFromWarpingUnitCall__Outputs {
    return new MoveWarperBeamsFromWarpingUnitCall__Outputs(this);
  }
}

export class MoveWarperBeamsFromWarpingUnitCall__Inputs {
  _call: MoveWarperBeamsFromWarpingUnitCall;

  constructor(call: MoveWarperBeamsFromWarpingUnitCall) {
    this._call = call;
  }

  get warperBeamIds(): Array<string> {
    return this._call.inputValues[0].value.toStringArray();
  }
}

export class MoveWarperBeamsFromWarpingUnitCall__Outputs {
  _call: MoveWarperBeamsFromWarpingUnitCall;

  constructor(call: MoveWarperBeamsFromWarpingUnitCall) {
    this._call = call;
  }
}

export class MoveWarperBeamsToWarpingCall extends ethereum.Call {
  get inputs(): MoveWarperBeamsToWarpingCall__Inputs {
    return new MoveWarperBeamsToWarpingCall__Inputs(this);
  }

  get outputs(): MoveWarperBeamsToWarpingCall__Outputs {
    return new MoveWarperBeamsToWarpingCall__Outputs(this);
  }
}

export class MoveWarperBeamsToWarpingCall__Inputs {
  _call: MoveWarperBeamsToWarpingCall;

  constructor(call: MoveWarperBeamsToWarpingCall) {
    this._call = call;
  }

  get warperBeamId(): Array<string> {
    return this._call.inputValues[0].value.toStringArray();
  }
}

export class MoveWarperBeamsToWarpingCall__Outputs {
  _call: MoveWarperBeamsToWarpingCall;

  constructor(call: MoveWarperBeamsToWarpingCall) {
    this._call = call;
  }
}

export class MoveWeaverBeamsFromSizingUnitCall extends ethereum.Call {
  get inputs(): MoveWeaverBeamsFromSizingUnitCall__Inputs {
    return new MoveWeaverBeamsFromSizingUnitCall__Inputs(this);
  }

  get outputs(): MoveWeaverBeamsFromSizingUnitCall__Outputs {
    return new MoveWeaverBeamsFromSizingUnitCall__Outputs(this);
  }
}

export class MoveWeaverBeamsFromSizingUnitCall__Inputs {
  _call: MoveWeaverBeamsFromSizingUnitCall;

  constructor(call: MoveWeaverBeamsFromSizingUnitCall) {
    this._call = call;
  }

  get weaverBeamIds(): Array<string> {
    return this._call.inputValues[0].value.toStringArray();
  }
}

export class MoveWeaverBeamsFromSizingUnitCall__Outputs {
  _call: MoveWeaverBeamsFromSizingUnitCall;

  constructor(call: MoveWeaverBeamsFromSizingUnitCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}
