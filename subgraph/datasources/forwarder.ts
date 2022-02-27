import { events, transactions } from '@amxx/graphprotocol-utils';
import { ForwarderContract, ForwarderCreated, MetaTransactionExecuted } from '../../generated/schema';
import { ForwarderCreated as ForwarderCreatedEvent } from '../../generated/forwarder/Forwarder';
import { MetaTransactionExecuted as MetaTransactionEvent } from '../../generated/forwarder/Forwarder';
import { fetchAccount } from '../fetch/account';
import { fetchForwarder } from '../fetch/forwarder';

export function handleForwarderCreated(event: ForwarderCreatedEvent): void {
  const contract = fetchForwarder(event.address);
  const address = fetchAccount(event.params.forwarderAddress);

  const ev = new ForwarderCreated(events.id(event));
  ev.emitter = contract.id;
  ev.transaction = transactions.log(event).id;
  ev.timestamp = event.block.timestamp;

  ev.contract = contract.id;
  ev.forwarderAddress = event.params.forwarderAddress.toHexString();

  ev.save();
}

export function handleMetaTransactionExecuted(event: MetaTransactionEvent): void {
  const contract = fetchForwarder(event.address);
  const from = fetchAccount(event.params.from);
  const to = fetchAccount(event.params.to);

  const ev = new MetaTransactionExecuted(events.id(event));
  ev.emitter = contract.id;
  ev.transaction = transactions.log(event).id;
  ev.timestamp = event.block.timestamp;

  ev.contract = contract.id;
  ev.from = event.params.from.toHexString();
  ev.to = event.params.to.toHexString();

  ev.save();
}
