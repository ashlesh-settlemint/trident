import { ipfs, json, JSONValueKind } from '@graphprotocol/graph-ts';
import { Pellet, SupplyOrder } from '../../generated/schema';
import { AddPelletEvent, ExitPelletEvent } from '../../generated/trident/Trident';

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

// export function handleExitPellet(event: ExitPelletEvent): void {
//   let pellet = Pellet.load(event.params.pelletId);
//   if(pellet === null) {
//     pellet = new Pellet(event.params.pelletId);
//   }
//   const supplyOrder = new SupplyOrder(event.params.soId);
//   const pelletBytes = ipfs.cat(event.params.pelletExitCid);

//   if(pelletBytes) {
//     const pelletDetails = json.try_fromBytes(pelletBytes);

//     if (pelletDetails.isOk && pelletDetails.value.kind == JSONValueKind.OBJECT) {
//       const pelletMetadata = pelletDetails.value.toObject();

//       const materialInfo = pelletMetadata.get('materialInfo');
//       pellet.materialInfo = materialInfo ? materialInfo.toString() : 'null';

//       const materialType = pelletMetadata.get('materialType');
//       pellet.materialType = materialType ? materialType.toString() : 'null';

//       const netWeight = pelletMetadata.get('netWeight');
//       pellet.netWeight = netWeight ? netWeight.toString() : 'null';

//       const grossWeight = pelletMetadata.get('grossWeight');
//       pellet.grossWeight = grossWeight ? grossWeight.toString() : 'null';

//       const coneQuantity = pelletMetadata.get('coneQuantity');
//       pellet.coneQuantity = coneQuantity ? coneQuantity.toString() : 'null';

//       const serialNumber = pelletMetadata.get('serialNumber');
//       pellet.serialNumber = serialNumber ? serialNumber.toString() : 'null';

//       const entryTimestamp = pelletMetadata.get('entryTimestamp');
//       pellet.entryTimestamp = entryTimestamp ? entryTimestamp.toString() : 'null';

//       const lotNumber = pelletMetadata.get('lotNumber');
//       pellet.lotNumber = lotNumber ? lotNumber.toString() : 'null';

//       const unloadingTimestamp = pelletMetadata.get('unloadingTimestamp');
//       pellet.unloadingTimestamp = unloadingTimestamp ? unloadingTimestamp.toString() : 'null';

//       const binNumber = pelletMetadata.get('binNumber');
//       pellet.binNumber = binNumber ? binNumber.toString() : 'null';

//       const entryEmpId = pelletMetadata.get('entryEmpId');
//       pellet.entryEmpId = entryEmpId ? entryEmpId.toString() : 'null';
//     }
//   }
//   pellet.save();
// }



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

      supplyOrder.save();

      const soId = pelletMetadata.get('soId');
      pellet.soId = soId ? soId.toString() : 'null';
    }
  }

  pellet.save();
}
