export interface IProject {
    data: IData;
    projectDid: string;
    pubKey: string;
    senderDid: string;
    txHash: string;
}

interface IData {
    title: string;
    projectDid: string;
    ownerName: string;
    ownerEmail: string;
    shortDescription: string;
    longDescription: string;
    impactAction: string;
    createdOn: Date;
    createdBy: string;
    projectLocation: string;
    requiredClaims: number,
    sdgs: number[];
    claimStats: IClaimStats;
    claims: IClaims[];
    templates: ITemplates;
    agentsStats: IAgentStats;
    agents: IAgent[];
    evaluatorPayPerClaim: string;
    socialMedia: ISocialMedia;
    ixo: IIxo;
    serviceEndpoint: string;
    imageLink: string;
    founder: IFounder;
}

interface IIxo {
    totalStaked: number;
    totalUsed: number;
}

interface ISocialMedia {
    facebookLink: string;
    instagramLink: string;
    twitterLink: string;
    webLink: string;
}

interface IFounder {
    name: string;
    email: string;
    countryOfOrigin: string;
    shortDescription: string;
    websiteURL: string;
    logoLink: string;
}

interface IClaimStats {
    currentSuccessful: number;
    currentRejected: number;
}

interface IClaims {
    date: Date;
    location: string;
    claimId: string;
    status: string;
    saDid: string;
    eaDid: string;
}

interface ITemplates {
    claim: string;
}

interface IAgentStats {
    evaluators: number;
    evaluatorsPending: number;
    serviceProviders: number;
    serviceProvidersPending: number;
    investors: number;
    investorsPending: number;
}

export interface IAgent {
    did: string;
    status: string;
    kyc?: boolean;
    role: string;
}
