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
}