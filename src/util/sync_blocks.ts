import { Connection } from "./connection";
import { BlockQueue, NewBlockEvent } from "../models/block";
import { ChainHandler } from "../handlers/chain_handler";
import { IChain } from "../models/chain";
import { TransactionHandler } from "../handlers/txn_handler";
import { StatsHandler } from "../handlers/stats_handler";
import { IStats } from "../models/stats";
const CLI = require('clui'),
    Spinner = CLI.Spinner;

export class SyncBlocks {
    private chainHandler = new ChainHandler();
    private txnHandler = new TransactionHandler();
    private statsHandler = new StatsHandler();

    startSync(chainUri: string) {
        let conn = new Connection(chainUri);
        this.chainHandler.getChainInfo().then((chain: IChain) => {
            conn.getLastBlock().then((block: any) => {
                if (!chain) {
                    this.initChainInfo(conn, false).then((chain: IChain) => {
                        this.startQueue(conn, chain);
                    });
                } else if (block.header.chain_id !== chain.chainId) {
                    this.initChainInfo(conn, true).then((chain: IChain) => {
                        this.startQueue(conn, chain);
                    });
                } else {
                    this.startQueue(conn, chain);
                }
            });
        });
        this.statsHandler.getStatsInfo().then((stats: IStats) => {
            if (!stats) {
                this.statsHandler.create();
            }
        });
    }

    stopSync(blockQueue: BlockQueue) {
        return blockQueue.stop();
    }

    initChainInfo(connection: Connection, isUpdate: boolean): Promise<IChain> {
        return new Promise((resolve: Function, reject: Function) => {
            connection.getLastBlock().then((block: any) => {
                let chain: IChain = { chainId: block.header.chain_id, blockHeight: 0 };
                if (isUpdate) {
                    resolve(this.chainHandler.update(chain));
                } else {
                    resolve(this.chainHandler.create(chain));
                }
            })
        });
    }

    startQueue(connection: Connection, chain: IChain) {
        let blockQueue = new BlockQueue(connection, chain.blockHeight);
        var sync = new Spinner('Syncing Blocks...  ', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']);

        blockQueue.onBlock((event: NewBlockEvent) => {
            this.chainHandler.setBlockHeight(event.getBlockHeight(), event.getChainId())
            sync.message('Syncing block number ' + event.getBlockHeight());
            if (event.getBlock().hasTransactions()) {
                let buf = Buffer.from(event.getBlock().getTransaction(), 'base64');
                console.log("TX DATA: " + buf.toString());
                this.txnHandler.routeTransaction(JSON.parse(buf.toString()))
            }
        });
        sync.start();
        blockQueue.start();
    }
}