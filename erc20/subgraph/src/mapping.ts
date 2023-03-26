import {
  Transfer,
} from "../generated/USDT/USDT"

import {Bytes} from "@graphprotocol/graph-ts";
import {Transfer as TransferEntity} from "../generated/schema";
import {concatenateBytes} from "./utils";

export function handleTransfer(event: Transfer): void {
  const id = concatenateBytes([event.transaction.hash, Bytes.fromBigInt(event.logIndex)]).toHex()
  const transfer = new TransferEntity(id)
  transfer.amount = event.params.value
  transfer.from = event.params.from
  transfer.to = event.params.to
  transfer.save()
}
