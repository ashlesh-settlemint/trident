import { ipfs, json, JSONValueKind, log } from '@graphprotocol/graph-ts';
import { Loomshed, Pellet, SizingInput, SizingStorage, SupplyOrder, WarpInput } from '../../generated/schema';
import {
  AddPelletEvent,
  ExitPelletEvent,
  LoadPelletEvent,
  LoadWarperBeamEvent, LoadWeaverBeamEvent, LoomOutputEvent, SizingOutputEvent,
  SizingStorageEvent,
  WarpingOutputEvent
} from '../../generated/trident/Trident';

export function handleAddPellet(event: AddPelletEvent): void {
  const pellet = new Pellet(event.params.pelletId);
  const pelletBytes = ipfs.cat(event.params.pelletDetailsCid);

  if(pelletBytes) {
    const pelletDetails = json.try_fromBytes(pelletBytes);

    if (pelletDetails.isOk && pelletDetails.value.kind == JSONValueKind.OBJECT) {
      const pelletMetadata = pelletDetails.value.toObject();

      const materialInfo = pelletMetadata.get('materialInfo');
      pellet.materialInfo = materialInfo ? materialInfo.toString() : 'null';

      const materialType = pelletMetadata.get('materialType');
      pellet.materialType = materialType ? materialType.toString() : 'null';

      const netWeight = pelletMetadata.get('netWeight');
      pellet.netWeight = netWeight ? netWeight.toString() : 'null';

      const grossWeight = pelletMetadata.get('grossWeight');
      pellet.grossWeight = grossWeight ? grossWeight.toString() : 'null';

      const coneQuantity = pelletMetadata.get('coneQuantity');
      pellet.coneQuantity = coneQuantity ? coneQuantity.toString() : 'null';

      const serialNumber = pelletMetadata.get('serialNumber');
      pellet.serialNumber = serialNumber ? serialNumber.toString() : 'null';

      const entryTimestamp = pelletMetadata.get('entryTimestamp');
      pellet.entryTimestamp = entryTimestamp ? entryTimestamp.toString() : 'null';

      const lotNumber = pelletMetadata.get('lotNumber');
      pellet.lotNumber = lotNumber ? lotNumber.toString() : 'null';

      const unloadingTimestamp = pelletMetadata.get('unloadingTimestamp');
      pellet.unloadingTimestamp = unloadingTimestamp ? unloadingTimestamp.toString() : 'null';

      const binNumber = pelletMetadata.get('binNumber');
      pellet.binNumber = binNumber ? binNumber.toString() : 'null';

      const entryEmpId = pelletMetadata.get('entryEmpId');
      pellet.entryEmpId = entryEmpId ? entryEmpId.toString() : 'null';
    }
  }
  pellet.save();
}

export function handleExitPellet(event: ExitPelletEvent): void {
  let pellet = Pellet.load(event.params.pelletId);
  const supplyOrder = new SupplyOrder(event.params.soId);

  if(pellet === null) {
    pellet = new Pellet(event.params.pelletId);
  }

  const pelletBytes = ipfs.cat(event.params.pelletExitCid);

  if(pelletBytes) {
    const pelletDetails = json.try_fromBytes(pelletBytes);

    if (pelletDetails.isOk && pelletDetails.value.kind == JSONValueKind.OBJECT) {
      const pelletMetadata = pelletDetails.value.toObject();

      const exitTimestamp = pelletMetadata.get('exitTimestamp');
      pellet.exitTimestamp = exitTimestamp ? exitTimestamp.toString() : 'null';

      const exitEmpId = pelletMetadata.get('exitEmpId');
      pellet.exitEmpId = exitEmpId ? exitEmpId.toString() : 'null';


      const prepPo = pelletMetadata.get('prepPo');
      supplyOrder.prepPo = prepPo ? prepPo.toString() : 'null';

      const loomPo = pelletMetadata.get('loomPo');
      supplyOrder.loomPo = loomPo ? loomPo.toString() : 'null';


      const soId = pelletMetadata.get('soId');
      pellet.soId = soId ? soId.toString() : 'null';
    }
  }

  supplyOrder.save();
  pellet.save();
}

export function handleLoadPellet(event: LoadPelletEvent): void {
  const compositeKey = `${event.params.soId}::${event.params.creelMachineId}`;
  let warpInput = WarpInput.load(compositeKey);

  log.debug('console compositeKey {}', [event.params.pelletId]);

  if(warpInput === null) {
    warpInput = new WarpInput(compositeKey);
  }
  const pelletId = event.params.pelletId;
  // warpInput.pelletIds.push(pelletId ? pelletId : 'null');

  const pelletIds = warpInput.pelletIds
  pelletIds.push(pelletId ? pelletId : 'null')
  warpInput.pelletIds = pelletIds
  warpInput.save()

  const warpInputBytes = ipfs.cat(event.params.warpMachineLoadingCid);

  if(warpInputBytes) {
    const warpInputDetails = json.try_fromBytes(warpInputBytes);

    if (warpInputDetails.isOk && warpInputDetails.value.kind == JSONValueKind.OBJECT) {
      const warpInputMetadata = warpInputDetails.value.toObject();

      // const pelletId = warpInputMetadata.get('pelletId');
      // warpInput.pelletIds.push(pelletId ? pelletId.toString() : 'null');

      // log.debug('console pelletIds {}', [pelletId ? pelletId.toString() : 'null']);

      const soId = warpInputMetadata.get('soId');
      warpInput.soId = soId ? soId.toString() : 'null';

      const creelMachineId = warpInputMetadata.get('creelMachineId');
      warpInput.creelMachineId = creelMachineId ? creelMachineId.toString() : 'null';


      const prepPoId = warpInputMetadata.get('prepPoId');
      warpInput.prepPoId = prepPoId ? prepPoId.toString() : 'null';

      const loadEmpId = warpInputMetadata.get('loadEmpId');
      warpInput.loadEmpId = loadEmpId ? loadEmpId.toString() : 'null';

      const loadTimestamp = warpInputMetadata.get('loadTimestamp');
      warpInput.loadTimestamp = loadTimestamp ? loadTimestamp.toString() : 'null';
    }
  }

  warpInput.save();
}

export function handleWarpingOutput(event: WarpingOutputEvent): void {
  const compositeKey = `${event.params.soId}::${event.params.creelMachineId}`;
  let warpInput = WarpInput.load(compositeKey);

  log.debug('console compositeKey1 {}', [event.params.creelMachineId]);

  if(warpInput === null) {
    warpInput = new WarpInput(compositeKey);
  }

  const warpBeamId = event.params.warpBeamId;

  const warperBeamIds = warpInput.warperBeamIds;
  warperBeamIds.push(warpBeamId ? warpBeamId : 'null')
  warpInput.warperBeamIds = warperBeamIds
  // warpInput.save()

  const warpInputBytes = ipfs.cat(event.params.warpMachineOutputCid);

  if(warpInputBytes) {
    const warpInputDetails = json.try_fromBytes(warpInputBytes);

    if (warpInputDetails.isOk && warpInputDetails.value.kind == JSONValueKind.OBJECT) {
      const warpInputMetadata = warpInputDetails.value.toObject();

      const outputEmpId = warpInputMetadata.get('outputEmpId');
      warpInput.outputEmpId = outputEmpId ? outputEmpId.toString() : 'null';

      const outputTimestamp = warpInputMetadata.get('outputTimestamp');
      warpInput.outputTimestamp = outputTimestamp ? outputTimestamp.toString() : 'null';
    }
  }

  warpInput.save();
}

export function handleLoadWarperBeam(event: LoadWarperBeamEvent): void {
  const compositeKey = `${event.params.soId}::${event.params.sizingMachineId}`;
  let sizingInput = SizingInput.load(compositeKey);

  if(sizingInput === null) {
    sizingInput = new SizingInput(compositeKey);
  }
  const warperBeamId = event.params.warperBeamId;

  const warperBeamIds = sizingInput.warperBeamIds
  warperBeamIds.push(warperBeamId ? warperBeamId : 'null')
  sizingInput.warperBeamIds = warperBeamIds
  sizingInput.save()

  const sizingInputBytes = ipfs.cat(event.params.sizingMachineLoadingCid);

  if(sizingInputBytes) {
    const sizingInputDetails = json.try_fromBytes(sizingInputBytes);

    if (sizingInputDetails.isOk && sizingInputDetails.value.kind == JSONValueKind.OBJECT) {
      const sizingInputMetadata = sizingInputDetails.value.toObject();


      const soId = sizingInputMetadata.get('soId');
      sizingInput.soId = soId ? soId.toString() : 'null';

      const sizingMachineId = sizingInputMetadata.get('sizingMachineId');
      sizingInput.sizingMachineId = sizingMachineId ? sizingMachineId.toString() : 'null';


      const prepPoId = sizingInputMetadata.get('prepPoId');
      sizingInput.prepPoId = prepPoId ? prepPoId.toString() : 'null';

      const loadEmpId = sizingInputMetadata.get('loadEmpId');
      sizingInput.loadEmpId = loadEmpId ? loadEmpId.toString() : 'null';

      const loadTimestamp = sizingInputMetadata.get('loadTimestamp');
      sizingInput.loadTimestamp = loadTimestamp ? loadTimestamp.toString() : 'null';
    }
  }

  sizingInput.save();
}

export function handleSizingOutput(event: SizingOutputEvent): void {
  const compositeKey = `${event.params.soId}::${event.params.sizingMachineId}`;
  let sizingInput = SizingInput.load(compositeKey);

  if(sizingInput === null) {
    sizingInput = new SizingInput(compositeKey);
  }

  const weaverBeamId = event.params.weaverBeamId;

  const weaverBeamIds = sizingInput.weaverBeamIds;
  weaverBeamIds.push(weaverBeamId ? weaverBeamId : 'null');
  sizingInput.weaverBeamIds = weaverBeamIds;

  const sizingInputBytes = ipfs.cat(event.params.sizingMachineOutputCid);

  if(sizingInputBytes) {
    const sizingInputDetails = json.try_fromBytes(sizingInputBytes);

    if (sizingInputDetails.isOk && sizingInputDetails.value.kind == JSONValueKind.OBJECT) {
      const sizingInputMetadata = sizingInputDetails.value.toObject();

      const outputEmpId = sizingInputMetadata.get('outputEmpId');
      sizingInput.outputEmpId = outputEmpId ? outputEmpId.toString() : 'null';

      const outputTimestamp = sizingInputMetadata.get('outputTimestamp');
      sizingInput.outputTimestamp = outputTimestamp ? outputTimestamp.toString() : 'null';
    }
  }

  sizingInput.save();
}

export function handleSizingStorage(event: SizingStorageEvent): void {
  const binId = `${event.params.binId}`;
  let sizingStorage = SizingStorage.load(binId);

  if(sizingStorage === null) {
    sizingStorage = new SizingStorage(binId);
  }

  const weaverBeamId = event.params.weaverBeamId;

  const weaverBeamIds = sizingStorage.weaverBeamIds;
  weaverBeamIds.push(weaverBeamId ? weaverBeamId : 'null');
  sizingStorage.weaverBeamIds = weaverBeamIds;

  const sizingStorageBytes = ipfs.cat(event.params.sizingStorageCid);

  if(sizingStorageBytes) {
    const sizingStorageDetails = json.try_fromBytes(sizingStorageBytes);

    if (sizingStorageDetails.isOk && sizingStorageDetails.value.kind == JSONValueKind.OBJECT) {
      const sizingStorageMetadata = sizingStorageDetails.value.toObject();

      const soId = sizingStorageMetadata.get('soId');
      sizingStorage.soId = soId ? soId.toString() : 'null';

      const binId = sizingStorageMetadata.get('binId');
      sizingStorage.binId = binId ? binId.toString() : 'null';

      const empId = sizingStorageMetadata.get('empId');
      sizingStorage.empId = empId ? empId.toString() : 'null';

      const timestamp = sizingStorageMetadata.get('timestamp');
      sizingStorage.timestamp = timestamp ? timestamp.toString() : 'null';

      const prepPoId = sizingStorageMetadata.get('prepPoId');
      sizingStorage.prepPoId = prepPoId ? prepPoId.toString() : 'null';
    }
  }

  sizingStorage.save();
}

export function handleLoadWeaverBeam(event: LoadWeaverBeamEvent): void {
  const compositeKey = `${event.params.soId}::${event.params.loomMachineId}`;
  let loomshed = Loomshed.load(compositeKey);

  if(loomshed === null) {
    loomshed = new Loomshed(compositeKey);
  }
  const weaverBeamId = event.params.weaverBeamId;
  const pelletId = event.params.pelletId;

  const weaverBeamIds = loomshed.weaverBeamIds;
  let flag = true;
  for(let i=0; i<weaverBeamIds.length; i++) {
    if(weaverBeamIds[i] == weaverBeamId){
      flag = false;
    }
  }

  if(flag) {
    weaverBeamIds.push(weaverBeamId ? weaverBeamId : 'null');
    loomshed.weaverBeamIds = weaverBeamIds;
  }

  const pelletIds = loomshed.pelletIds;
  pelletIds.push(pelletId ? pelletId : 'null');
  loomshed.pelletIds = pelletIds;

  loomshed.save();

  const loomshedBytes = ipfs.cat(event.params.loomMachineLoadingCid);

  if(loomshedBytes) {
    const loomshedDetails = json.try_fromBytes(loomshedBytes);

    if (loomshedDetails.isOk && loomshedDetails.value.kind == JSONValueKind.OBJECT) {
      const loomshedMetadata = loomshedDetails.value.toObject();

      const soId = loomshedMetadata.get('soId');
      loomshed.soId = soId ? soId.toString() : 'null';

      const loomMachineId = loomshedMetadata.get('loomMachineId');
      loomshed.loomMachineId = loomMachineId ? loomMachineId.toString() : 'null';


      const loomPoId = loomshedMetadata.get('loomPoId');
      loomshed.loomPoId = loomPoId ? loomPoId.toString() : 'null';

      const loadEmpId = loomshedMetadata.get('loadEmpId');
      loomshed.loadEmpId = loadEmpId ? loadEmpId.toString() : 'null';

      const loadTimestamp = loomshedMetadata.get('loadTimestamp');
      loomshed.loadTimestamp = loadTimestamp ? loadTimestamp.toString() : 'null';
    }
  }

  loomshed.save();
}

export function handleLoomOutput(event: LoomOutputEvent): void {
  const compositeKey = `${event.params.soId}::${event.params.loomMachineId}`;
  let loomshed = Loomshed.load(compositeKey);

  if(loomshed === null) {
    loomshed = new Loomshed(compositeKey);
  }

  const rollId = event.params.rollId;

  const rollIds = loomshed.rollIds;
  rollIds.push(rollId ? rollId : 'null');
  loomshed.rollIds = rollIds;

  const loomshedBytes = ipfs.cat(event.params.loomMachineOutputCid);

  if(loomshedBytes) {
    const loomshedDetails = json.try_fromBytes(loomshedBytes);

    if (loomshedDetails.isOk && loomshedDetails.value.kind == JSONValueKind.OBJECT) {
      const loomshedMetadata = loomshedDetails.value.toObject();

      const outputEmpId = loomshedMetadata.get('outputEmpId');
      loomshed.outputEmpId = outputEmpId ? outputEmpId.toString() : 'null';

      const outputTimestamp = loomshedMetadata.get('outputTimestamp');
      loomshed.outputTimestamp = outputTimestamp ? outputTimestamp.toString() : 'null';
    }
  }

  loomshed.save();
}
