import { ipfs, json, JSONValueKind, log } from '@graphprotocol/graph-ts';
import { Loomshed } from '../../generated/schema';
import { Loom as LoomEvent } from '../../generated/trident/Trident';

export function handleLoom(event: LoomEvent): void {
  const id = event.params.soId.toHex()
  let loom = Loomshed.load(id)
  if (loom == null) {
    loom = new Loomshed(id)
  }

  log.debug("consoleCID: {}, consoleSOID: {}", [
    event.params.loomshedCid.toBase58(),
    event.params.soId.toString()
  ]);

  const loomshedCid = event.params.loomshedCid.toHexString();
  log.debug('console loomshed', [loomshedCid]);

  const loomshedBytes = ipfs.cat(loomshedCid);
  log.debug('console loomshedBytes', ['1111111']);
  if (loomshedBytes) {
    const loomshedContent = json.try_fromBytes(loomshedBytes);
  log.debug('console loomshedContent', ['00000000']);


  if (loomshedContent.isOk && loomshedContent.value.kind == JSONValueKind.OBJECT) {
    const loomshedMetadata = loomshedContent.value.toObject();

    const fabricId = loomshedMetadata.get('fabricId');
    loom.fabricId = fabricId ? fabricId.toString() : 'null';

    const soId = loomshedMetadata.get('soId');
    loom.soId = soId ? soId.toString() : 'null';

    const machineId = loomshedMetadata.get('machineId');
    loom.machineId = machineId ? machineId.toString() : 'null';

    const entryTimestamp = loomshedMetadata.get('entryTimestamp');
    loom.entryTimestamp = entryTimestamp ? entryTimestamp.toString() : 'null';

    const exitTimestamp = loomshedMetadata.get('exitTimestamp');
    loom.exitTimestamp = exitTimestamp ? exitTimestamp.toString() : 'null';

    const empId = loomshedMetadata.get('empId');
    loom.empId = empId ? empId.toString() : 'null';

  }

  loom.save();
}

