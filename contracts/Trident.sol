// SPDX-License-Identifier: MIT
// SettleMint.com
/**
 * Copyright (C) SettleMint NV - All Rights Reserved
 *
 * Use of this file is strictly prohibited without an active license agreement.
 * Distribution of this file, via any medium, is strictly prohibited.
 *
 * For license inquiries, contcontact hello@settlemint.com
 */
pragma solidity ^0.8.9;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/*
  WarpingCid - {
    warperBeamId, employeeId, machineId, warpDate, pelletIds: {GRI => [pelletIds]} (on create)
    exitPoint, exitTimestamp, leftoverQty (on update)
  }
  Note - Frontend application should be able to sort the pellets based on GRI and send in that format

  SizingCid - {

  }

  PelletsCid - [{
    string status;
    string exitPoint;
    uint256 exitTimestamp;
  },{
    string status;
    string exitPoint;
    uint256 exitTimestamp;
  }]
*/

contract Trident is Ownable {
  struct SupplyOrder {
    string soId;
    string prepPo;
    string pelletsCid;
    string warpingCid;
    string sizingCid;
    string loomshedCid;
    string fabricIds;
  }

  mapping(string => string) private _pettletIdToCid;
  mapping(string => string) private _pelletExitDetails;

  event AddPelletEvent(string pelletId, string pelletDetailsCid);
  event ExitPelletEvent(string soId, string pelletId, string pelletExitCid);
  event LoadPelletEvent(string soId, string pelletId, string creelMachineId, string warpMachineLoadingCid);
  event WarpingOutputEvent(string warpBeamId, string soId, string creelMachineId, string warpMachineOutputCid);
  event LoadWarperBeamEvent(string soId, string warperBeamId, string sizingMachineId, string sizingMachineLoadingCid);
  event SizingOutputEvent(string weaverBeamId, string soId, string sizingMachineId, string sizingMachineOutputCid);
  event SizingStorageEvent(string binId, string soId, string weaverBeamId, string sizingStorageCid);
  event AddNewPelletEvent(string pelletId, string soId, string pelletDetailsCid);
  event LoadWeaverBeamEvent(string soId, string weaverBeamId, string pelletId, string loomMachineId, string loomMachineLoadingCid);
  event LoomOutputEvent(string rollId, string soId, string loomMachineId, string loomMachineOutputCid);
  event LoadRollEvent(string soId, string rollId, string gfiMachineId, string gfiMachineLoadingCid);
  event GfiOutputEvent(string newRollId, string soId, string gfiMachineId, string gfiMachineOutputCid);
  event BatchingEvent(string lotId, string batchingCid);

  function addPellet(string memory pelletId, string memory pelletDetailsCid) external {
    _pettletIdToCid[pelletId] = pelletDetailsCid;

    emit AddPelletEvent(pelletId, pelletDetailsCid);
  }

  function movePelletFromWarehouse(
    string memory soId,
    string memory pelletId,
    string memory pelletExitCid
  ) external {
    _pelletExitDetails[pelletId] = pelletExitCid;

    emit ExitPelletEvent(soId, pelletId, pelletExitCid);
  }

  // Warping section

  function loadPelletToWarpMachine(
    string memory soId,
    string memory creelMachineId,
    string memory pelletId,
    string memory warpMachineLoadingCid
  ) external {
    emit LoadPelletEvent(soId, pelletId, creelMachineId, warpMachineLoadingCid);
  }

  function addWarpingOutput(
    string memory warpBeamId,
    string memory soId,
    string memory creelMachineId,
    string memory warpMachineOutputCid
  ) external {
    emit WarpingOutputEvent(warpBeamId, soId, creelMachineId, warpMachineOutputCid);
  }

  function loadBeamToSizingMachine(
    string memory soId,
    string memory sizingMachineId,
    string memory warperBeamId,
    string memory sizingMachineLoadingCid
  ) external {
    emit LoadWarperBeamEvent(soId, warperBeamId, sizingMachineId, sizingMachineLoadingCid);
  }

  function addSizingOutput(
    string memory weaverBeamId,
    string memory soId,
    string memory sizingMachineId,
    string memory sizingMachineOutputCid
  ) external {
    emit SizingOutputEvent(weaverBeamId, soId, sizingMachineId, sizingMachineOutputCid);
  }

  function storeWeaverBeams(
    string memory weaverBeamId,
    string memory soId,
    string memory binId,
    string memory sizingStorageCid
  ) external {
    emit SizingStorageEvent(binId, soId, weaverBeamId, sizingStorageCid);
  }

  function loadWeaverBeamToLoomMachine(
    string memory soId,
    string memory loomMachineId,
    string memory weaverBeamId,
    string memory pelletId,
    string memory loomMachineLoadingCid
  ) external {
    emit LoadWeaverBeamEvent(soId, loomMachineId, weaverBeamId, pelletId, loomMachineLoadingCid);
  }

  function addLoomshedOutput(
    string memory rollId,
    string memory soId,
    string memory loomMachineId,
    string memory loomMachineOutputCid
  ) external {
    emit LoomOutputEvent(rollId, soId, loomMachineId, loomMachineOutputCid);
  }

  function loadRollToGfiMachine(
    string memory soId,
    string memory rollId,
    string memory gfiMachineId,
    string memory gfiMachineLoadingCid
  ) external {
    emit LoadRollEvent(soId, rollId, gfiMachineId, gfiMachineLoadingCid);
  }

  function addGfiOutput(
    string memory newRollId,
    string memory soId,
    string memory gfiMachineId,
    string memory gfiMachineOutputCid
  ) external {
    emit GfiOutputEvent(newRollId, soId, gfiMachineId, gfiMachineOutputCid);
  }

  function addBatchingDetails(
    string memory lotId,
    string memory batchingCid
  ) external {
    emit BatchingEvent(lotId, batchingCid);
  }
}