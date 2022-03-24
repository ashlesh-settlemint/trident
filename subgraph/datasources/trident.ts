import { ipfs, json, JSONValueKind, log } from "@graphprotocol/graph-ts";
import {
  Batching,
  Gfi,
  GfiOutput,
  Loomshed,
  Pellet, ProcessHouse, SizingInput,
  SizingStorage,
  SupplyOrder,
  WarpInput
} from "../../generated/schema";
import {
  AddPelletEvent,
  BatchingEvent, DyeingInputEvent,
  DyeingOutputEvent, ExitPelletEvent, FinishedFabricInputEvent,
  FinishedFabricOutputEvent, GfiOutputEvent, IssueNewPelletEvent, LoadPelletEvent,
  LoadRollEvent,
  LoadWarperBeamEvent,
  LoadWeaverBeamEvent,
  LoomOutputEvent, MercerizingInputEvent, MercerizingOutputEvent, PrintingInputEvent, PrintingOutputEvent, SingingPtrInputEvent, SingingPtrOutputEvent, SizingOutputEvent,
  SizingStorageEvent,
  WarpingOutputEvent
} from "../../generated/trident/Trident";

export function handleAddPellet(event: AddPelletEvent): void {
  const pellet = new Pellet(event.params.pelletId);
  const pelletBytes = ipfs.cat(event.params.pelletDetailsCid);

  if (pelletBytes) {
    const pelletDetails = json.try_fromBytes(pelletBytes);

    if (
      pelletDetails.isOk &&
      pelletDetails.value.kind == JSONValueKind.OBJECT
    ) {
      const pelletMetadata = pelletDetails.value.toObject();

      const materialInfo = pelletMetadata.get("materialInfo");
      pellet.materialInfo = materialInfo ? materialInfo.toString() : "null";

      const materialType = pelletMetadata.get("materialType");
      pellet.materialType = materialType ? materialType.toString() : "null";

      const netWeight = pelletMetadata.get("netWeight");
      pellet.netWeight = netWeight ? netWeight.toString() : "null";

      const grossWeight = pelletMetadata.get("grossWeight");
      pellet.grossWeight = grossWeight ? grossWeight.toString() : "null";

      const coneQuantity = pelletMetadata.get("coneQuantity");
      pellet.coneQuantity = coneQuantity ? coneQuantity.toString() : "null";

      const serialNumber = pelletMetadata.get("serialNumber");
      pellet.serialNumber = serialNumber ? serialNumber.toString() : "null";

      const entryTimestamp = pelletMetadata.get("entryTimestamp");
      pellet.entryTimestamp = entryTimestamp
        ? entryTimestamp.toString()
        : "null";

      const lotNumber = pelletMetadata.get("lotNumber");
      pellet.lotNumber = lotNumber ? lotNumber.toString() : "null";

      const unloadingTimestamp = pelletMetadata.get("unloadingTimestamp");
      pellet.unloadingTimestamp = unloadingTimestamp
        ? unloadingTimestamp.toString()
        : "null";

      const binNumber = pelletMetadata.get("binNumber");
      pellet.binNumber = binNumber ? binNumber.toString() : "null";

      const entryEmpId = pelletMetadata.get("entryEmpId");
      pellet.entryEmpId = entryEmpId ? entryEmpId.toString() : "null";
    }
  }
  pellet.save();
}

export function handleExitPellet(event: ExitPelletEvent): void {
  let pellet = Pellet.load(event.params.pelletId);
  const supplyOrder = new SupplyOrder(event.params.soId);

  if (pellet === null) {
    pellet = new Pellet(event.params.pelletId);
  }

  const pelletBytes = ipfs.cat(event.params.pelletExitCid);

  if (pelletBytes) {
    const pelletDetails = json.try_fromBytes(pelletBytes);

    if (
      pelletDetails.isOk &&
      pelletDetails.value.kind == JSONValueKind.OBJECT
    ) {
      const pelletMetadata = pelletDetails.value.toObject();

      const exitTimestamp = pelletMetadata.get("exitTimestamp");
      pellet.exitTimestamp = exitTimestamp ? exitTimestamp.toString() : "null";

      const exitEmpId = pelletMetadata.get("exitEmpId");
      pellet.exitEmpId = exitEmpId ? exitEmpId.toString() : "null";

      const prepPo = pelletMetadata.get("prepPo");
      supplyOrder.prepPo = prepPo ? prepPo.toString() : "null";

      const loomPo = pelletMetadata.get("loomPo");
      supplyOrder.loomPo = loomPo ? loomPo.toString() : "null";

      const soId = pelletMetadata.get("soId");
      pellet.soId = soId ? soId.toString() : "null";
    }
  }

  supplyOrder.save();
  pellet.save();
}

export function handleLoadPellet(event: LoadPelletEvent): void {
  const compositeKey = `${event.params.soId}::${event.params.creelMachineId}`;
  let warpInput = WarpInput.load(compositeKey);

  log.debug("console compositeKey {}", [event.params.pelletId]);

  if (warpInput === null) {
    warpInput = new WarpInput(compositeKey);
  }
  const pelletId = event.params.pelletId;
  // warpInput.pelletIds.push(pelletId ? pelletId : 'null');

  const pelletIds = warpInput.pelletIds;
  pelletIds.push(pelletId ? pelletId : "null");
  warpInput.pelletIds = pelletIds;
  warpInput.save();

  const warpInputBytes = ipfs.cat(event.params.warpMachineLoadingCid);

  if (warpInputBytes) {
    const warpInputDetails = json.try_fromBytes(warpInputBytes);

    if (
      warpInputDetails.isOk &&
      warpInputDetails.value.kind == JSONValueKind.OBJECT
    ) {
      const warpInputMetadata = warpInputDetails.value.toObject();

      const soId = warpInputMetadata.get("soId");
      warpInput.soId = soId ? soId.toString() : "null";

      const creelMachineId = warpInputMetadata.get("creelMachineId");
      warpInput.creelMachineId = creelMachineId
        ? creelMachineId.toString()
        : "null";

      const prepPoId = warpInputMetadata.get("prepPoId");
      warpInput.prepPoId = prepPoId ? prepPoId.toString() : "null";

      const loadEmpId = warpInputMetadata.get("loadEmpId");
      const loadEmpIdString = loadEmpId ? loadEmpId.toString() : "null";
      const loadEmpIds = warpInput.loadEmpIds;
      loadEmpIds.push(loadEmpIdString ? loadEmpIdString : "null");
      warpInput.loadEmpIds = loadEmpIds;

      const loadTimestamp = warpInputMetadata.get("loadTimestamp");
      const loadTimestampString = loadTimestamp ? loadTimestamp.toString() : "null";
      const loadTimestamps = warpInput.loadTimestamps;
      loadTimestamps.push(loadTimestampString ? loadTimestampString : "null");
      warpInput.loadTimestamps = loadTimestamps;
    }
  }

  warpInput.save();
}

export function handleWarpingOutput(event: WarpingOutputEvent): void {
  const compositeKey = `${event.params.soId}::${event.params.creelMachineId}`;
  let warpInput = WarpInput.load(compositeKey);

  log.debug("console compositeKey1 {}", [event.params.creelMachineId]);

  if (warpInput === null) {
    warpInput = new WarpInput(compositeKey);
  }

  const warpBeamId = event.params.warpBeamId;

  const warperBeamIds = warpInput.warperBeamIds;
  warperBeamIds.push(warpBeamId ? warpBeamId : "null");
  warpInput.warperBeamIds = warperBeamIds;
  // warpInput.save()

  const warpInputBytes = ipfs.cat(event.params.warpMachineOutputCid);

  if (warpInputBytes) {
    const warpInputDetails = json.try_fromBytes(warpInputBytes);

    if (
      warpInputDetails.isOk &&
      warpInputDetails.value.kind == JSONValueKind.OBJECT
    ) {
      const warpInputMetadata = warpInputDetails.value.toObject();

      const outputEmpId = warpInputMetadata.get("outputEmpId");
      warpInput.outputEmpId = outputEmpId ? outputEmpId.toString() : "null";

      const outputTimestamp = warpInputMetadata.get("outputTimestamp");
      warpInput.outputTimestamp = outputTimestamp
        ? outputTimestamp.toString()
        : "null";
    }
  }

  warpInput.save();
}

export function handleLoadWarperBeam(event: LoadWarperBeamEvent): void {
  const compositeKey = `${event.params.soId}::${event.params.sizingMachineId}`;
  let sizingInput = SizingInput.load(compositeKey);

  if (sizingInput === null) {
    sizingInput = new SizingInput(compositeKey);
  }
  const warperBeamId = event.params.warperBeamId;

  const warperBeamIds = sizingInput.warperBeamIds;
  warperBeamIds.push(warperBeamId ? warperBeamId : "null");
  sizingInput.warperBeamIds = warperBeamIds;
  sizingInput.save();

  const sizingInputBytes = ipfs.cat(event.params.sizingMachineLoadingCid);

  if (sizingInputBytes) {
    const sizingInputDetails = json.try_fromBytes(sizingInputBytes);

    if (
      sizingInputDetails.isOk &&
      sizingInputDetails.value.kind == JSONValueKind.OBJECT
    ) {
      const sizingInputMetadata = sizingInputDetails.value.toObject();

      const soId = sizingInputMetadata.get("soId");
      sizingInput.soId = soId ? soId.toString() : "null";

      const sizingMachineId = sizingInputMetadata.get("sizingMachineId");
      sizingInput.sizingMachineId = sizingMachineId
        ? sizingMachineId.toString()
        : "null";

      const prepPoId = sizingInputMetadata.get("prepPoId");
      sizingInput.prepPoId = prepPoId ? prepPoId.toString() : "null";

      const loadEmpId = sizingInputMetadata.get("loadEmpId");
      const loadEmpIdString = loadEmpId ? loadEmpId.toString() : "null";
      const loadEmpIds = sizingInput.loadEmpIds;
      loadEmpIds.push(loadEmpIdString ? loadEmpIdString : "null");
      sizingInput.loadEmpIds = loadEmpIds;

      const loadTimestamp = sizingInputMetadata.get("loadTimestamp");
      const loadTimestampString = loadTimestamp ? loadTimestamp.toString() : "null";
      const loadTimestamps = sizingInput.loadTimestamps;
      loadTimestamps.push(loadTimestampString ? loadTimestampString : "null");
      sizingInput.loadTimestamps = loadTimestamps;
    }
  }

  sizingInput.save();
}

export function handleSizingOutput(event: SizingOutputEvent): void {
  const compositeKey = `${event.params.soId}::${event.params.sizingMachineId}`;
  let sizingInput = SizingInput.load(compositeKey);

  if (sizingInput === null) {
    sizingInput = new SizingInput(compositeKey);
  }

  const weaverBeamId = event.params.weaverBeamId;

  const weaverBeamIds = sizingInput.weaverBeamIds;
  weaverBeamIds.push(weaverBeamId ? weaverBeamId : "null");
  sizingInput.weaverBeamIds = weaverBeamIds;

  const sizingInputBytes = ipfs.cat(event.params.sizingMachineOutputCid);

  if (sizingInputBytes) {
    const sizingInputDetails = json.try_fromBytes(sizingInputBytes);

    if (
      sizingInputDetails.isOk &&
      sizingInputDetails.value.kind == JSONValueKind.OBJECT
    ) {
      const sizingInputMetadata = sizingInputDetails.value.toObject();

      const outputEmpId = sizingInputMetadata.get("outputEmpId");
      sizingInput.outputEmpId = outputEmpId ? outputEmpId.toString() : "null";

      const outputTimestamp = sizingInputMetadata.get("outputTimestamp");
      sizingInput.outputTimestamp = outputTimestamp
        ? outputTimestamp.toString()
        : "null";
    }
  }

  sizingInput.save();
}

export function handleIssueNewPellet(event: IssueNewPelletEvent): void {
  let pellet = Pellet.load(event.params.pelletId);

  if(pellet === null) {
    pellet = new Pellet(event.params.pelletId);
  }

  pellet.loomSectionPellet = true;
  pellet.save();
}

export function handleSizingStorage(event: SizingStorageEvent): void {
  const binId = `${event.params.binId}`;
  let sizingStorage = SizingStorage.load(binId);

  if (sizingStorage === null) {
    sizingStorage = new SizingStorage(binId);
  }

  const weaverBeamId = event.params.weaverBeamId;

  const weaverBeamIds = sizingStorage.weaverBeamIds;
  weaverBeamIds.push(weaverBeamId ? weaverBeamId : "null");
  sizingStorage.weaverBeamIds = weaverBeamIds;

  const sizingStorageBytes = ipfs.cat(event.params.sizingStorageCid);

  if (sizingStorageBytes) {
    const sizingStorageDetails = json.try_fromBytes(sizingStorageBytes);

    if (
      sizingStorageDetails.isOk &&
      sizingStorageDetails.value.kind == JSONValueKind.OBJECT
    ) {
      const sizingStorageMetadata = sizingStorageDetails.value.toObject();

      const soId = sizingStorageMetadata.get("soId");
      sizingStorage.soId = soId ? soId.toString() : "null";

      const binId = sizingStorageMetadata.get("binId");
      sizingStorage.binId = binId ? binId.toString() : "null";

      const empId = sizingStorageMetadata.get("empId");
      const empIdString = empId ? empId.toString() : "null";
      const empIds = sizingStorage.empIds;
      empIds.push(empIdString ? empIdString : "null");
      sizingStorage.empIds = empIds;

      const timestamp = sizingStorageMetadata.get("timestamp");
      const timestampString = timestamp ? timestamp.toString() : "null";
      const timestamps = sizingStorage.timestamps;
      timestamps.push(timestampString ? timestampString : "null");
      sizingStorage.timestamps = timestamps;

      const prepPoId = sizingStorageMetadata.get("prepPoId");
      sizingStorage.prepPoId = prepPoId ? prepPoId.toString() : "null";
    }
  }

  sizingStorage.save();
}

export function handleLoadWeaverBeam(event: LoadWeaverBeamEvent): void {
  const compositeKey = `${event.params.soId}::${event.params.loomMachineId}`;
  let loomshed = Loomshed.load(compositeKey);

  if (loomshed === null) {
    loomshed = new Loomshed(compositeKey);
  }
  const weaverBeamId = event.params.weaverBeamId;
  const pelletId = event.params.pelletId;

  const weaverBeamIds = loomshed.weaverBeamIds;
  let flag = true;
  for (let i = 0; i < weaverBeamIds.length; i++) {
    if (weaverBeamIds[i] == weaverBeamId) {
      flag = false;
    }
  }

  if (flag) {
    weaverBeamIds.push(weaverBeamId ? weaverBeamId : "null");
    loomshed.weaverBeamIds = weaverBeamIds;
  }

  const pelletIds = loomshed.pelletIds;
  pelletIds.push(pelletId ? pelletId : "null");
  loomshed.pelletIds = pelletIds;

  loomshed.save();

  const loomshedBytes = ipfs.cat(event.params.loomMachineLoadingCid);

  if (loomshedBytes) {
    const loomshedDetails = json.try_fromBytes(loomshedBytes);

    if (
      loomshedDetails.isOk &&
      loomshedDetails.value.kind == JSONValueKind.OBJECT
    ) {
      const loomshedMetadata = loomshedDetails.value.toObject();

      const soId = loomshedMetadata.get("soId");
      loomshed.soId = soId ? soId.toString() : "null";

      const loomMachineId = loomshedMetadata.get("loomMachineId");
      loomshed.loomMachineId = loomMachineId
        ? loomMachineId.toString()
        : "null";

      const loomPoId = loomshedMetadata.get("loomPoId");
      loomshed.loomPoId = loomPoId ? loomPoId.toString() : "null";

      const loadEmpId = loomshedMetadata.get("loadEmpId");
      const loadEmpIdString = loadEmpId ? loadEmpId.toString() : "null";
      const loadEmpIds = loomshed.loadEmpIds;
      loadEmpIds.push(loadEmpIdString ? loadEmpIdString : "null");
      loomshed.loadEmpIds = loadEmpIds;

      const loadTimestamp = loomshedMetadata.get("loadTimestamp");
      const loadTimestampString = loadTimestamp ? loadTimestamp.toString() : "null";
      const loadTimestamps = loomshed.loadTimestamps;
      loadTimestamps.push(loadTimestampString ? loadTimestampString : "null");
      loomshed.loadTimestamps = loadTimestamps;

    }
  }

  loomshed.save();
}

export function handleLoomOutput(event: LoomOutputEvent): void {
  const compositeKey = `${event.params.soId}::${event.params.loomMachineId}`;
  let loomshed = Loomshed.load(compositeKey);

  if (loomshed === null) {
    loomshed = new Loomshed(compositeKey);
  }

  const rollId = event.params.rollId;

  const rollIds = loomshed.rollIds;
  rollIds.push(rollId ? rollId : "null");
  loomshed.rollIds = rollIds;

  const loomshedBytes = ipfs.cat(event.params.loomMachineOutputCid);

  if (loomshedBytes) {
    const loomshedDetails = json.try_fromBytes(loomshedBytes);

    if (
      loomshedDetails.isOk &&
      loomshedDetails.value.kind == JSONValueKind.OBJECT
    ) {
      const loomshedMetadata = loomshedDetails.value.toObject();

      const outputEmpId = loomshedMetadata.get("outputEmpId");
      loomshed.outputEmpId = outputEmpId ? outputEmpId.toString() : "null";

      const outputTimestamp = loomshedMetadata.get("outputTimestamp");
      loomshed.outputTimestamp = outputTimestamp
        ? outputTimestamp.toString()
        : "null";
    }
  }

  loomshed.save();
}

export function handleLoadRoll(event: LoadRollEvent): void {
  const compositeKey = `${event.params.soId}::${event.params.gfiMachineId}`;
  let gfi = Gfi.load(compositeKey);

  if (gfi === null) {
    gfi = new Gfi(compositeKey);
  }
  const rollId = event.params.rollId;

  const rollIds = gfi.rollIds;
  rollIds.push(rollId ? rollId : "null");
  gfi.rollIds = rollIds;

  const gfiBytes = ipfs.cat(event.params.gfiMachineLoadingCid);

  if (gfiBytes) {
    const gfiDetails = json.try_fromBytes(gfiBytes);

    if (gfiDetails.isOk && gfiDetails.value.kind == JSONValueKind.OBJECT) {
      const gfiMetadata = gfiDetails.value.toObject();

      const soId = gfiMetadata.get("soId");
      gfi.soId = soId ? soId.toString() : "null";

      const gfiMachineId = gfiMetadata.get("gfiMachineId");
      gfi.gfiMachineId = gfiMachineId ? gfiMachineId.toString() : "null";

      const loadEmpId = gfiMetadata.get("loadEmpId");
      const loadEmpIdString = loadEmpId ? loadEmpId.toString() : "null";
      const loadEmpIds = gfi.loadEmpIds;
      loadEmpIds.push(loadEmpIdString ? loadEmpIdString : "null");
      gfi.loadEmpIds = loadEmpIds;

      const loadTimestamp = gfiMetadata.get("loadTimestamp");
      const loadTimestampString = loadTimestamp ? loadTimestamp.toString() : "null";
      const loadTimestamps = gfi.loadTimestamps;
      loadTimestamps.push(loadTimestampString ? loadTimestampString : "null");
      gfi.loadTimestamps = loadTimestamps;

    }
  }

  gfi.save();
}

export function handleGfiOutput(event: GfiOutputEvent): void {
  const compositeKey = `${event.params.soId}::${event.params.gfiMachineId}`;
  let gfi = Gfi.load(compositeKey);

  if (gfi === null) {
    gfi = new Gfi(compositeKey);
  }

  const newRollId = event.params.newRollId;

  const newRollIds = gfi.newRollIds;
  newRollIds.push(newRollId ? newRollId : "null");
  gfi.newRollIds = newRollIds;

  // GfiOutput Entity
  const gfiOutputCompositeKey = `${event.params.soId}::${event.params.newRollId}`;

  log.debug("console gfiOutput key {}", [gfiOutputCompositeKey]);

  let gfiOutput = GfiOutput.load(gfiOutputCompositeKey);
  if (gfiOutput === null) {
    gfiOutput = new GfiOutput(gfiOutputCompositeKey);
  }

  const gfiBytes = ipfs.cat(event.params.gfiMachineOutputCid);

  if (gfiBytes) {
    const gfiDetails = json.try_fromBytes(gfiBytes);

    if (gfiDetails.isOk && gfiDetails.value.kind == JSONValueKind.OBJECT) {
      const gfiMetadata = gfiDetails.value.toObject();

      const outputEmpId = gfiMetadata.get("outputEmpId");
      gfi.outputEmpId = outputEmpId ? outputEmpId.toString() : "null";

      const outputTimestamp = gfiMetadata.get("outputTimestamp");
      gfi.outputTimestamp = outputTimestamp
        ? outputTimestamp.toString()
        : "null";

      const newRollId = gfiMetadata.get("newRollId");
      gfiOutput.newRollId = newRollId ? newRollId.toString() : "null";

      const oldRollId = gfiMetadata.get("oldRollId");
      gfiOutput.oldRollId = oldRollId ? oldRollId.toString() : "null";

      const soId = gfiMetadata.get("soId");
      gfiOutput.soId = soId ? soId.toString() : "null";
    }
  }

  gfi.save();
  gfiOutput.save();
}

export function handleBatching(event: BatchingEvent): void {
  const lotId = event.params.lotId;
  let batch = Batching.load(lotId);

  if (batch === null) {
    batch = new Batching(lotId);
  }

  const batchBytes = ipfs.cat(event.params.batchingCid);

  if (batchBytes) {
    const batchDetails = json.try_fromBytes(batchBytes);

    if (batchDetails.isOk && batchDetails.value.kind == JSONValueKind.OBJECT) {
      const batchMetadata = batchDetails.value.toObject();

      const lotId = batchMetadata.get("lotId");
      batch.lotId = lotId ? lotId.toString() : "null";

      const machineId = batchMetadata.get("machineId");
      batch.machineId = machineId ? machineId.toString() : "null";

      const empId = batchMetadata.get("empId");
      batch.empId = empId ? empId.toString() : "null";

      const timestamp = batchMetadata.get("timestamp");
      batch.timestamp = timestamp ? timestamp.toString() : "null";

      const length = batchMetadata.get("length");
      batch.length = length ? length.toString() : "null";

      const aFrame = batchMetadata.get("aFrame");
      batch.aFrame = aFrame ? aFrame.toString() : "null";

      const fabricRollIds = batchMetadata.get("fabricRollIds");
      const rolls = fabricRollIds ? fabricRollIds.toArray() : [];

      for (let i = 0; i < rolls.length; i++) {
        const fabricDetail = rolls[i].toObject();

        const rollIdJsonValue = fabricDetail.get("rollId");
        const rollId = rollIdJsonValue ? rollIdJsonValue.toString() : "null";

        const soIdJsonValue = fabricDetail.get("soId");
        const soId = soIdJsonValue ? soIdJsonValue.toString() : "null";

        const compositeKey = `${soId}::${rollId}`;

        log.debug("console {}", [compositeKey]);

        let gfiOutput = GfiOutput.load(compositeKey);

        if (gfiOutput === null) {
          log.debug("console inside", []);
          gfiOutput = new GfiOutput(compositeKey);
        }



        const lotId = batchMetadata.get("lotId");
        gfiOutput.lotId = lotId ? lotId.toString() : "null";
        const test = lotId ? lotId.toString() : "null";
        log.debug('console lotId {}', [test]);

        // batch.gfiOutputId = compositeKey;

        // }
        batch.save();
        gfiOutput.save();
      }
    }
  }
}

export function handleSingingPtrInput(event: SingingPtrInputEvent): void {
  let processHouse = ProcessHouse.load(event.params.lotId);

  if(processHouse === null) {
    processHouse = new ProcessHouse(event.params.lotId);
  }

  const cidBytes = ipfs.cat(event.params.singingPtrInputCid);
    log.debug('console 000',[]);

  if (cidBytes) {
    log.debug('console 111',[]);
    const ipfsDetails = json.try_fromBytes(cidBytes);

    if (ipfsDetails.isOk && ipfsDetails.value.kind == JSONValueKind.OBJECT) {
    log.debug('console 222',[]);

      const ipfsMetadata = ipfsDetails.value.toObject();

      const lotId = ipfsMetadata.get("lotId");
      processHouse.lotId = lotId ? lotId.toString() : "null";

      log.debug('console lotId {}', [lotId ? lotId.toString() : "null"]);

      const singingPtrInputMachineId = ipfsMetadata.get("singingPtrInputMachineId");
      processHouse.singingPtrInputMachineId = singingPtrInputMachineId ? singingPtrInputMachineId.toString() : "null";

      log.debug('console lotId {}', [singingPtrInputMachineId ? singingPtrInputMachineId.toString() : "null"]);

      const singingPtrInputAframe = ipfsMetadata.get("singingPtrInputAframe");
      processHouse.singingPtrInputAframe = singingPtrInputAframe ? singingPtrInputAframe.toString() : "null";

      const singingPtrInputTimestamp = ipfsMetadata.get("singingPtrInputTimestamp");
      processHouse.singingPtrInputTimestamp = singingPtrInputTimestamp ? singingPtrInputTimestamp.toString() : "null";

      const singingPtrInputEmpId = ipfsMetadata.get("singingPtrInputEmpId");
      processHouse.singingPtrInputEmpId = singingPtrInputEmpId ? singingPtrInputEmpId.toString() : "null";
    }
  }
  processHouse.save();
}

export function handleSingingPtrOutput(event: SingingPtrOutputEvent): void {
  let processHouse = ProcessHouse.load(event.params.lotId);

  if(processHouse === null) {
    processHouse = new ProcessHouse(event.params.lotId);
  }

  const cidBytes = ipfs.cat(event.params.singingPtrOutputCid);
    log.debug('console 000',[]);

  if (cidBytes) {
    log.debug('console 111',[]);
    const ipfsDetails = json.try_fromBytes(cidBytes);

    if (ipfsDetails.isOk && ipfsDetails.value.kind == JSONValueKind.OBJECT) {
    log.debug('console 222',[]);

      const ipfsMetadata = ipfsDetails.value.toObject();

      const lotId = ipfsMetadata.get("lotId");
      processHouse.lotId = lotId ? lotId.toString() : "null";

      log.debug('console lotId {}', [lotId ? lotId.toString() : "null"]);

      const singingPtrOutputMachineId = ipfsMetadata.get("singingPtrOutputMachineId");
      processHouse.singingPtrOutputMachineId = singingPtrOutputMachineId ? singingPtrOutputMachineId.toString() : "null";

      log.debug('console lotId {}', [singingPtrOutputMachineId ? singingPtrOutputMachineId.toString() : "null"]);

      const singingPtrOutputAframe = ipfsMetadata.get("singingPtrOutputAframe");
      processHouse.singingPtrOutputAframe = singingPtrOutputAframe ? singingPtrOutputAframe.toString() : "null";

      const singingPtrOutputTimestamp = ipfsMetadata.get("singingPtrOutputTimestamp");
      processHouse.singingPtrOutputTimestamp = singingPtrOutputTimestamp ? singingPtrOutputTimestamp.toString() : "null";

      const singingPtrOutputEmpId = ipfsMetadata.get("singingPtrOutputEmpId");
      processHouse.singingPtrOutputEmpId = singingPtrOutputEmpId ? singingPtrOutputEmpId.toString() : "null";
    }
  }
  processHouse.save();
}

export function handleMercerizingInput(event: MercerizingInputEvent): void {
  let processHouse = ProcessHouse.load(event.params.lotId);

  if(processHouse === null) {
    processHouse = new ProcessHouse(event.params.lotId);
  }

  const cidBytes = ipfs.cat(event.params.mercerizingInputCid);
    log.debug('console 000',[]);

  if (cidBytes) {
    log.debug('console 111',[]);
    const ipfsDetails = json.try_fromBytes(cidBytes);

    if (ipfsDetails.isOk && ipfsDetails.value.kind == JSONValueKind.OBJECT) {
    log.debug('console 222',[]);

      const ipfsMetadata = ipfsDetails.value.toObject();

      const lotId = ipfsMetadata.get("lotId");
      processHouse.lotId = lotId ? lotId.toString() : "null";

      log.debug('console lotId {}', [lotId ? lotId.toString() : "null"]);

      const mercerizingInputMachineId = ipfsMetadata.get("mercerizingInputMachineId");
      processHouse.mercerizingInputMachineId = mercerizingInputMachineId ? mercerizingInputMachineId.toString() : "null";

      log.debug('console lotId {}', [mercerizingInputMachineId ? mercerizingInputMachineId.toString() : "null"]);

      const mercerizingInputAframe = ipfsMetadata.get("mercerizingInputAframe");
      processHouse.mercerizingInputAframe = mercerizingInputAframe ? mercerizingInputAframe.toString() : "null";

      const mercerizingInputTimestamp = ipfsMetadata.get("mercerizingInputTimestamp");
      processHouse.mercerizingInputTimestamp = mercerizingInputTimestamp ? mercerizingInputTimestamp.toString() : "null";

      const mercerizingInputEmpId = ipfsMetadata.get("mercerizingInputEmpId");
      processHouse.mercerizingInputEmpId = mercerizingInputEmpId ? mercerizingInputEmpId.toString() : "null";
    }
  }
  processHouse.save();
}

export function handleMercerizingOutput(event: MercerizingOutputEvent): void {
  let processHouse = ProcessHouse.load(event.params.lotId);

  if(processHouse === null) {
    processHouse = new ProcessHouse(event.params.lotId);
  }

  const cidBytes = ipfs.cat(event.params.mercerizingOutputCid);
    log.debug('console 000',[]);

  if (cidBytes) {
    log.debug('console 111',[]);
    const ipfsDetails = json.try_fromBytes(cidBytes);

    if (ipfsDetails.isOk && ipfsDetails.value.kind == JSONValueKind.OBJECT) {
    log.debug('console 222',[]);

      const ipfsMetadata = ipfsDetails.value.toObject();

      const lotId = ipfsMetadata.get("lotId");
      processHouse.lotId = lotId ? lotId.toString() : "null";

      log.debug('console lotId {}', [lotId ? lotId.toString() : "null"]);

      const mercerizingOutputMachineId = ipfsMetadata.get("mercerizingOutputMachineId");
      processHouse.mercerizingOutputMachineId = mercerizingOutputMachineId ? mercerizingOutputMachineId.toString() : "null";

      log.debug('console lotId {}', [mercerizingOutputMachineId ? mercerizingOutputMachineId.toString() : "null"]);

      const mercerizingOutputAframe = ipfsMetadata.get("mercerizingOutputAframe");
      processHouse.mercerizingOutputAframe = mercerizingOutputAframe ? mercerizingOutputAframe.toString() : "null";

      const mercerizingOutputTimestamp = ipfsMetadata.get("mercerizingOutputTimestamp");
      processHouse.mercerizingOutputTimestamp = mercerizingOutputTimestamp ? mercerizingOutputTimestamp.toString() : "null";

      const mercerizingOutputEmpId = ipfsMetadata.get("mercerizingOutputEmpId");
      processHouse.mercerizingOutputEmpId = mercerizingOutputEmpId ? mercerizingOutputEmpId.toString() : "null";
    }
  }
  processHouse.save();
}

export function handleDyeingInput(event: DyeingInputEvent): void {
  let processHouse = ProcessHouse.load(event.params.lotId);

  if(processHouse === null) {
    processHouse = new ProcessHouse(event.params.lotId);
  }

  const cidBytes = ipfs.cat(event.params.dyeingInputCid);
    log.debug('console 000',[]);

  if (cidBytes) {
    log.debug('console 111',[]);
    const ipfsDetails = json.try_fromBytes(cidBytes);

    if (ipfsDetails.isOk && ipfsDetails.value.kind == JSONValueKind.OBJECT) {
    log.debug('console 222',[]);

      const ipfsMetadata = ipfsDetails.value.toObject();

      const lotId = ipfsMetadata.get("lotId");
      processHouse.lotId = lotId ? lotId.toString() : "null";

      log.debug('console lotId {}', [lotId ? lotId.toString() : "null"]);

      const dyeingInputMachineId = ipfsMetadata.get("dyeingInputMachineId");
      processHouse.dyeingInputMachineId = dyeingInputMachineId ? dyeingInputMachineId.toString() : "null";

      log.debug('console lotId {}', [dyeingInputMachineId ? dyeingInputMachineId.toString() : "null"]);

      const dyeingInputAframe = ipfsMetadata.get("dyeingInputAframe");
      processHouse.dyeingInputAframe = dyeingInputAframe ? dyeingInputAframe.toString() : "null";

      const dyeingInputTimestamp = ipfsMetadata.get("dyeingInputTimestamp");
      processHouse.dyeingInputTimestamp = dyeingInputTimestamp ? dyeingInputTimestamp.toString() : "null";

      const dyeingInputEmpId = ipfsMetadata.get("dyeingInputEmpId");
      processHouse.dyeingInputEmpId = dyeingInputEmpId ? dyeingInputEmpId.toString() : "null";
    }
  }
  processHouse.save();
}

export function handleDyeingOutput(event: DyeingOutputEvent): void {
  let processHouse = ProcessHouse.load(event.params.lotId);

  if(processHouse === null) {
    processHouse = new ProcessHouse(event.params.lotId);
  }

  const cidBytes = ipfs.cat(event.params.dyeingOutputCid);
    log.debug('console 000',[]);

  if (cidBytes) {
    log.debug('console 111',[]);
    const ipfsDetails = json.try_fromBytes(cidBytes);

    if (ipfsDetails.isOk && ipfsDetails.value.kind == JSONValueKind.OBJECT) {
    log.debug('console 222',[]);

      const ipfsMetadata = ipfsDetails.value.toObject();

      const lotId = ipfsMetadata.get("lotId");
      processHouse.lotId = lotId ? lotId.toString() : "null";

      log.debug('console lotId {}', [lotId ? lotId.toString() : "null"]);

      const dyeingOutputMachineId = ipfsMetadata.get("dyeingOutputMachineId");
      processHouse.dyeingOutputMachineId = dyeingOutputMachineId ? dyeingOutputMachineId.toString() : "null";

      log.debug('console lotId {}', [dyeingOutputMachineId ? dyeingOutputMachineId.toString() : "null"]);

      const dyeingOutputAframe = ipfsMetadata.get("dyeingOutputAframe");
      processHouse.dyeingOutputAframe = dyeingOutputAframe ? dyeingOutputAframe.toString() : "null";

      const dyeingOutputTimestamp = ipfsMetadata.get("dyeingOutputTimestamp");
      processHouse.dyeingOutputTimestamp = dyeingOutputTimestamp ? dyeingOutputTimestamp.toString() : "null";

      const dyeingOutputEmpId = ipfsMetadata.get("dyeingOutputEmpId");
      processHouse.dyeingOutputEmpId = dyeingOutputEmpId ? dyeingOutputEmpId.toString() : "null";
    }
  }
  processHouse.save();
}

export function handlePrintingInput(event: PrintingInputEvent): void {
  let processHouse = ProcessHouse.load(event.params.lotId);

  if(processHouse === null) {
    processHouse = new ProcessHouse(event.params.lotId);
  }

  const cidBytes = ipfs.cat(event.params.printingInputCid);
    log.debug('console 000',[]);

  if (cidBytes) {
    log.debug('console 111',[]);
    const ipfsDetails = json.try_fromBytes(cidBytes);

    if (ipfsDetails.isOk && ipfsDetails.value.kind == JSONValueKind.OBJECT) {
    log.debug('console 222',[]);

      const ipfsMetadata = ipfsDetails.value.toObject();

      const lotId = ipfsMetadata.get("lotId");
      processHouse.lotId = lotId ? lotId.toString() : "null";

      log.debug('console lotId {}', [lotId ? lotId.toString() : "null"]);

      const printingInputMachineId = ipfsMetadata.get("printingInputMachineId");
      processHouse.printingInputMachineId = printingInputMachineId ? printingInputMachineId.toString() : "null";

      log.debug('console lotId {}', [printingInputMachineId ? printingInputMachineId.toString() : "null"]);

      const printingInputAframe = ipfsMetadata.get("printingInputAframe");
      processHouse.printingInputAframe = printingInputAframe ? printingInputAframe.toString() : "null";

      const printingInputTimestamp = ipfsMetadata.get("printingInputTimestamp");
      processHouse.printingInputTimestamp = printingInputTimestamp ? printingInputTimestamp.toString() : "null";

      const printingInputEmpId = ipfsMetadata.get("printingInputEmpId");
      processHouse.printingInputEmpId = printingInputEmpId ? printingInputEmpId.toString() : "null";
    }
  }
  processHouse.save();
}

export function handlePrintingOutput(event: PrintingOutputEvent): void {
  let processHouse = ProcessHouse.load(event.params.lotId);

  if(processHouse === null) {
    processHouse = new ProcessHouse(event.params.lotId);
  }

  const cidBytes = ipfs.cat(event.params.printingOutputCid);
    log.debug('console 000',[]);

  if (cidBytes) {
    log.debug('console 111',[]);
    const ipfsDetails = json.try_fromBytes(cidBytes);

    if (ipfsDetails.isOk && ipfsDetails.value.kind == JSONValueKind.OBJECT) {
    log.debug('console 222',[]);

      const ipfsMetadata = ipfsDetails.value.toObject();

      const lotId = ipfsMetadata.get("lotId");
      processHouse.lotId = lotId ? lotId.toString() : "null";

      log.debug('console lotId {}', [lotId ? lotId.toString() : "null"]);

      const printingOutputMachineId = ipfsMetadata.get("printingOutputMachineId");
      processHouse.printingOutputMachineId = printingOutputMachineId ? printingOutputMachineId.toString() : "null";

      log.debug('console lotId {}', [printingOutputMachineId ? printingOutputMachineId.toString() : "null"]);

      const printingOutputAframe = ipfsMetadata.get("printingOutputAframe");
      processHouse.printingOutputAframe = printingOutputAframe ? printingOutputAframe.toString() : "null";

      const printingOutputTimestamp = ipfsMetadata.get("printingOutputTimestamp");
      processHouse.printingOutputTimestamp = printingOutputTimestamp ? printingOutputTimestamp.toString() : "null";

      const printingOutputEmpId = ipfsMetadata.get("printingOutputEmpId");
      processHouse.printingOutputEmpId = printingOutputEmpId ? printingOutputEmpId.toString() : "null";
    }
  }
  processHouse.save();
}

export function handleFinishedFabricInput(event: FinishedFabricInputEvent): void {
  let processHouse = ProcessHouse.load(event.params.lotId);

  if(processHouse === null) {
    processHouse = new ProcessHouse(event.params.lotId);
  }

  const cidBytes = ipfs.cat(event.params.finishedFabricInputCid);
    log.debug('console 000',[]);

  if (cidBytes) {
    log.debug('console 111',[]);
    const ipfsDetails = json.try_fromBytes(cidBytes);

    if (ipfsDetails.isOk && ipfsDetails.value.kind == JSONValueKind.OBJECT) {
    log.debug('console 222',[]);

      const ipfsMetadata = ipfsDetails.value.toObject();

      const lotId = ipfsMetadata.get("lotId");
      processHouse.lotId = lotId ? lotId.toString() : "null";

      log.debug('console lotId {}', [lotId ? lotId.toString() : "null"]);

      const finishedFabricInputMachineId = ipfsMetadata.get("finishedFabricInputMachineId");
      processHouse.finishedFabricInputMachineId = finishedFabricInputMachineId ? finishedFabricInputMachineId.toString() : "null";

      log.debug('console lotId {}', [finishedFabricInputMachineId ? finishedFabricInputMachineId.toString() : "null"]);

      const finishedFabricInputAframe = ipfsMetadata.get("finishedFabricInputAframe");
      processHouse.finishedFabricInputAframe = finishedFabricInputAframe ? finishedFabricInputAframe.toString() : "null";

      const finishedFabricInputTimestamp = ipfsMetadata.get("finishedFabricInputTimestamp");
      processHouse.finishedFabricInputTimestamp = finishedFabricInputTimestamp ? finishedFabricInputTimestamp.toString() : "null";

      const finishedFabricInputEmpId = ipfsMetadata.get("finishedFabricInputEmpId");
      processHouse.finishedFabricInputEmpId = finishedFabricInputEmpId ? finishedFabricInputEmpId.toString() : "null";
    }
  }
  processHouse.save();
}

export function handleFinishedFabricOutput(event: FinishedFabricOutputEvent): void {
  let processHouse = ProcessHouse.load(event.params.lotId);

  if(processHouse === null) {
    processHouse = new ProcessHouse(event.params.lotId);
  }

  const cidBytes = ipfs.cat(event.params.finishedFabricOutputCid);
    log.debug('console 000',[]);

  if (cidBytes) {
    log.debug('console 111',[]);
    const ipfsDetails = json.try_fromBytes(cidBytes);

    if (ipfsDetails.isOk && ipfsDetails.value.kind == JSONValueKind.OBJECT) {
    log.debug('console 222',[]);

      const ipfsMetadata = ipfsDetails.value.toObject();

      const lotId = ipfsMetadata.get("lotId");
      processHouse.lotId = lotId ? lotId.toString() : "null";

      log.debug('console lotId {}', [lotId ? lotId.toString() : "null"]);

      const finishedFabricOutputMachineId = ipfsMetadata.get("finishedFabricOutputMachineId");
      processHouse.finishedFabricOutputMachineId = finishedFabricOutputMachineId ? finishedFabricOutputMachineId.toString() : "null";

      log.debug('console lotId {}', [finishedFabricOutputMachineId ? finishedFabricOutputMachineId.toString() : "null"]);

      const finishedFabricOutputAframe = ipfsMetadata.get("finishedFabricOutputAframe");
      processHouse.finishedFabricOutputAframe = finishedFabricOutputAframe ? finishedFabricOutputAframe.toString() : "null";

      const finishedFabricOutputTimestamp = ipfsMetadata.get("finishedFabricOutputTimestamp");
      processHouse.finishedFabricOutputTimestamp = finishedFabricOutputTimestamp ? finishedFabricOutputTimestamp.toString() : "null";

      const finishedFabricOutputEmpId = ipfsMetadata.get("finishedFabricOutputEmpId");
      processHouse.finishedFabricOutputEmpId = finishedFabricOutputEmpId ? finishedFabricOutputEmpId.toString() : "null";
    }
  }
  processHouse.save();
}

