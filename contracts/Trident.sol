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
  struct Pellet {
    string status;
    string exitPoint;
    uint256 exitTimestamp;
  }

  struct SupplyOrder {
    string soId;
    string prepPo;
    string pelletsCid;
    string warpingCid;
    string sizingCid;
    string loomshedCid;
    string fabricIds;
  }

  // struct Fabric {
  //   gfInspection,
  // }


  struct Warehouse {
    string[] pelletIds;
    string binId;
    uint256 numberOfCones;
    uint256 quantity;
    string yarnUnit;
    string employeeId;
    string exitPoint;
    uint256 exitTimestamp;
  }

  mapping(string => SupplyOrder) private _soIdToSupplyDetails;
  // SupplyOrder[] private _supplyOrders;

  mapping(string => Warehouse) private _griToWarehouseDetails;
  mapping(string => string[]) private _soIdToGris;

  mapping(string => string) private _warperBeamIdToStatus;
  mapping(string => string) private _weaverBeamIdToStatus;
  // mapping(bytes => Pellet) private _pelletDidToStatus; // GRI:Pellet => status
  // mapping(string => Pellet[]) private _soIdToPellet;
  mapping(string => Pellet) private _pelletIdToDetails;


  event Loom(string indexed soId, string indexed loomshedCid);

  /*
    TODO - Add SO id to the pellet Details
  */
  function movePelletsFromWarehouse(
    string[] memory pelletIds,
    string memory exitPoint,
    uint256 exitTimestamp
  ) external {
    for(uint256 i=0; i< pelletIds.length; i++) {
      Pellet memory pellet = Pellet(
        "movedFromWarehouse",
        exitPoint,
        exitTimestamp
      );
      _pelletIdToDetails[pelletIds[i]] = pellet;
    }
  }

  /*
    Note - movePelletsToWarping() can be called multiple times for same SoId? In that case we need update option for each processing stage?
    Api should take the per warperBeam param
    {
      "warperBeamId": "BEAM_001",
      "employeeId": "EMP_001",
      "machineId": "MACHINE_001",
      "warpDate": "123123123",
      "pelletIds":["P_001", "P_002"]
    },
  */
  function addPelletsToWarpMachine(
    string memory soId,
    string memory warperBeamId,
    string memory warpingCid,
    string[] memory pelletIds
  ) external {
    if(bytes(_soIdToSupplyDetails[soId].warpingCid).length == 0) {
      SupplyOrder memory supplyOrder;
      supplyOrder.warpingCid = warpingCid;
      _soIdToSupplyDetails[soId] = supplyOrder;
      // _supplyOrders.push(soId);
    } else {
      SupplyOrder storage supplyOrder = _soIdToSupplyDetails[soId];
      supplyOrder.warpingCid = warpingCid;
    }

    _warperBeamIdToStatus[warperBeamId] = "atWarpingUnit";

    for(uint i=0; i< pelletIds.length; i++) {
      Pellet storage pellet = _pelletIdToDetails[pelletIds[i]];
      pellet.status = "receivedAtWarping";
    }
  }

  function moveWarperBeamsFromWarpingUnit(
    string[] memory warperBeamIds
  ) external {
    // Mark the beam status to movedToSizingUnit
    for(uint i=0; i< warperBeamIds.length; i++) {
      _warperBeamIdToStatus[warperBeamIds[0]] = "movedToSizingUnit";
    }
  }

  function addWarperBeamsToSizingMachine(
    string memory soId,
    string memory sizingCid
  ) external {

      SupplyOrder storage supplyOrder = _soIdToSupplyDetails[soId];
      supplyOrder.sizingCid = sizingCid;

  }

  function moveWarperBeamsToWarping(
    string[] memory warperBeamId
  ) external {
      for(uint i=0; i< warperBeamId.length; i++) {
        _warperBeamIdToStatus[warperBeamId[0]] = "atWarpingUnit";
      }
  }

  function moveWeaverBeamsFromSizingUnit(
    string[] memory weaverBeamIds
  ) external {
    for(uint i=0; i< weaverBeamIds.length; i++) {
        _warperBeamIdToStatus[weaverBeamIds[0]] = "movedToLoomShedUnit";
    }
  }

  function addWeaverBeamsToLoomMachine(
    string memory soId,
    string memory loomshedCid
  ) external {

      SupplyOrder storage supplyOrder = _soIdToSupplyDetails[soId];
      supplyOrder.loomshedCid = loomshedCid;


    emit Loom(soId, loomshedCid);
  }

  function getSoDetails(string memory soId) external view returns(SupplyOrder memory){
    return _soIdToSupplyDetails[soId];
  }

  // function gfProduced(string memory soId, string[] memory fabricIds)
}