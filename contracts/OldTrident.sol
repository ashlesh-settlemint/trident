 /*
    {
      exitPoint: [{
        pelletId1: timestamp
      }, {
        pelletId2: timestamp
      }]
    }
    Question - How exitPoint and exitTimestamp will be updated? For that all pellets under a GRI should go to Warping unit at once.
    Will there be case when addPellets() will be called multiple times for a GRI?
  */
  // function addPellets(
  //   string memory gri,
  //   string[] memory pelletIds,
  //   string memory binId,
  //   uint256 numberOfCones,
  //   uint256 quantity,
  //   string memory yarnUnit,
  //   string memory employeeId
  // ) public {
  //   Warehouse storage warehouse = _griToWarehouseDetails[gri];
  //   bool appendPelletsFlag = false;

  //   if(bytes(warehouse.gri).length == 0) {
  //     Warehouse memory newWarehouse = Warehouse(
  //       gri,
  //       pelletIds,
  //       binId,
  //       numberOfCones,
  //       quantity,
  //       yarnUnit,
  //       employeeId,
  //       "",
  //       0
  //     );

  //     _griToWarehouseDetails[gri] = newWarehouse;
  //   } else {
  //     warehouse.numberOfCones += numberOfCones;
  //     warehouse.quantity += quantity;
  //     appendPelletsFlag = true;
  //   }

  //   for(uint i=0; i< pelletIds.length; i++) {
  //     warehouse.pelletIds.push(pelletIds[0]);

  //     bytes memory did = abi.encodePacked(
  //       "did:",
  //       gri,
  //       ":",
  //       pelletIds[0]
  //     );
  //     _pelletDidToStatus[did] = "receivedAtWarehouse";
  //   }
  // }