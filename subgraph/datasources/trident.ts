import { ipfs, json, JSONValueKind, log } from '@graphprotocol/graph-ts';
import { Pellet, SupplyOrder, WarpInput, WarperOutputBeam } from '../../generated/schema';
import { AddPelletEvent, ExitPelletEvent, LoadPelletEvent } from '../../generated/trident/Trident';

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

  let pelletIds = warpInput.pelletIds
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
