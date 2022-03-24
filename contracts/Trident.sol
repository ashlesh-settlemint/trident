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
  event IssueNewPelletEvent(string soId, string pelletId);
  event LoadWeaverBeamEvent(string soId, string weaverBeamId, string pelletId, string loomMachineId, string loomMachineLoadingCid);
  event LoomOutputEvent(string rollId, string soId, string loomMachineId, string loomMachineOutputCid);
  event LoadRollEvent(string soId, string rollId, string gfiMachineId, string gfiMachineLoadingCid);
  event GfiOutputEvent(string newRollId, string soId, string gfiMachineId, string gfiMachineOutputCid);
  event BatchingEvent(string lotId, string batchingCid);

  event SingingPtrInputEvent(string lotId, string singingPtrInputCid);
  event MercerizingInputEvent(string lotId, string mercerizingInputCid);
  event DyeingInputEvent(string lotId, string dyeingInputCid);
  event PrintingInputEvent(string lotId, string printingInputCid);
  event FinishedFabricInputEvent(string lotId, string finishedFabricInputCid);

  event SingingPtrOutputEvent(string lotId, string singingPtrOutputCid);
  event MercerizingOutputEvent(string lotId, string mercerizingOutputCid);
  event DyeingOutputEvent(string lotId, string dyeingOutputCid);
  event PrintingOutputEvent(string lotId, string printingOutputCid);
  event FinishedFabricOutputEvent(string lotId, string finishedFabricOutputCid);

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

  function issueNewPellet(string memory soId, string memory pelletId) external {
    emit IssueNewPelletEvent(soId, pelletId);
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

  function addSingingPtrInput(
    string memory lotId,
    string memory singingPtrInputCid
  ) external {
    emit SingingPtrInputEvent(lotId, singingPtrInputCid);
  }

  function addSingingPtrOutput(
    string memory lotId,
    string memory singingPtrOutputCid
  ) external {
    emit SingingPtrOutputEvent(lotId, singingPtrOutputCid);
  }

  function addMercerizingInput(
    string memory lotId,
    string memory mercerizingInputCid
  ) external {
    emit MercerizingInputEvent(lotId, mercerizingInputCid);
  }

  function addMercerizingOutput(
    string memory lotId,
    string memory mercerizingOutputCid
  ) external {
    emit MercerizingOutputEvent(lotId, mercerizingOutputCid);
  }

  function addDyeingInput(
    string memory lotId,
    string memory dyeingInputCid
  ) external {
    emit DyeingInputEvent(lotId, dyeingInputCid);
  }

  function addDyeingOutput(
    string memory lotId,
    string memory dyeingOutputCid
  ) external {
    emit DyeingOutputEvent(lotId, dyeingOutputCid);
  }

  function addPrintingInput(
    string memory lotId,
    string memory printingInputCid
  ) external {
    emit PrintingInputEvent(lotId, printingInputCid);
  }

  function addPrintingOutput(
    string memory lotId,
    string memory printingOutputCid
  ) external {
    emit PrintingOutputEvent(lotId, printingOutputCid);
  }

  function addFinishedFabricInput(
    string memory lotId,
    string memory finishedFabricInputCid
  ) external {
    emit FinishedFabricInputEvent(lotId, finishedFabricInputCid);
  }

  function addFinishedFabricOutput(
    string memory lotId,
    string memory finishedFabricOutputCid
  ) external {
    emit FinishedFabricOutputEvent(lotId, finishedFabricOutputCid);
  }
}