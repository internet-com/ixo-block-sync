import { IDid, ICredential } from '../models/did';
import { DidDB } from '../db/models/did';

export class DidHandler {
	create = (didDoc: IDid) => {
		return new Promise((resolve: Function, reject: Function) => {
			return DidDB.create({}, didDoc, (err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res);
				}
			});
		});
	};

	addCredential = (did: string, credential: ICredential) => {
		return new Promise((resolve: Function, reject: Function) => {
			return DidDB.findOneAndUpdate({ did: did }, { $push: { credentials: credential } }, (err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res);
				}
			});
		});
	};

	getDidDocByDid = (params: any) => {
		return new Promise((resolve: Function, reject: Function) => {
			return DidDB.find({ did: params.did }, (err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res[0]);
				}
			});
		});
	};
}
